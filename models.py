"""Pydantic models for product data structures."""
from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel


class Product(BaseModel):
    """Product model with all fields."""
    id: int
    name: str
    description: str
    price: float
    category: str
    tags: List[str] = []
    in_stock: bool = True
    created_at: datetime = datetime.now()


class ProductCreate(BaseModel):
    """Model for creating a new product."""
    name: str
    description: str
    price: float
    category: str
    tags: List[str] = []
    in_stock: bool = True


class ProductUpdate(BaseModel):
    """Model for updating an existing product."""
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    in_stock: Optional[bool] = None
