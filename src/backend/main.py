from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, Session
from pydantic import BaseModel
from typing import List, Optional
import datetime

DATABASE_URL = "sqlite:///./stocks_portfolio.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    budget = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    stocks = relationship("StockEntry", back_populates="portfolio", cascade="all, delete")


class StockEntry(Base):
    __tablename__ = "stock_entries"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String)
    pe = Column(Float, nullable=True)
    pb = Column(Float, nullable=True)
    weight = Column(Float)
    allocation = Column(Float)

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"))
    portfolio = relationship("Portfolio", back_populates="stocks")


Base.metadata.create_all(bind=engine)
class StockBase(BaseModel):
    symbol: str
    pe: Optional[float] = None
    pb: Optional[float] = None
    weight: float
    allocation: float


class PortfolioCreate(BaseModel):
    budget: float
    stocks: List[StockBase]


class PortfolioResponse(PortfolioCreate):
    id: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/save-data")
def save_data(data: PortfolioCreate, db: Session = Depends(get_db)):
    portfolio = Portfolio(budget=data.budget)
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)

    for stock in data.stocks:
        db_stock = StockEntry(
            symbol=stock.symbol,
            pe=stock.pe,
            pb=stock.pb,
            weight=stock.weight,
            allocation=stock.allocation,
            portfolio_id=portfolio.id
        )
        db.add(db_stock)

    db.commit()
    return {
        "message": "Datele au fost salvate cu succes",
        "portfolio_id": portfolio.id
    }


@app.get("/portfolios", response_model=List[PortfolioResponse])
def get_portfolios(db: Session = Depends(get_db)):
    portfolios = db.query(Portfolio).all()
    return portfolios