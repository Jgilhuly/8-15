"""Database module for in-memory product storage."""
from typing import List, Optional
from datetime import datetime

from models import Product, ProductCreate, ProductUpdate


class InMemoryDatabase:
    """In-memory database for storing and managing products."""

    def __init__(self):
        self.products: List[Product] = []
        self.next_id = 1
        self._init_sample_data()

    def _init_sample_data(self):
        """Initialize the database with sample product data."""
        sample_products = [
            ProductCreate(
                name="Wireless Headphones",
                description="High-quality wireless headphones with noise cancellation",
                price=199.99,
                category="Electronics",
                tags=["audio", "wireless", "premium"]
            ),
            ProductCreate(
                name="Coffee Maker",
                description="Programmable coffee maker with built-in grinder",
                price=89.99,
                category="Appliances",
                tags=["kitchen", "coffee", "automatic"]
            ),
            ProductCreate(
                name="Laptop Stand",
                description="Adjustable aluminum laptop stand for ergonomic work",
                price=45.99,
                category="Accessories",
                tags=["ergonomic", "aluminum", "adjustable"]
            ),
            ProductCreate(
                name="Running Shoes",
                description="Lightweight running shoes with excellent cushioning",
                price=129.99,
                category="Sports",
                tags=["running", "athletic", "comfortable"]
            ),
            ProductCreate(
                name="Design Book",
                description="Comprehensive guide to modern web design principles",
                price=34.99,
                category="Books",
                tags=["design", "web", "education"]
            )
        ]

        for product_data in sample_products:
            self.create_product(product_data)

    def create_product(self, product_data: ProductCreate) -> Product:
        """Create a new product in the database."""
        product = Product(
            id=self.next_id,
            **product_data.dict(),
            created_at=datetime.now()
        )
        self.products.append(product)
        self.next_id += 1
        return product

    def get_all_products(self) -> List[Product]:
        """Get all products from the database."""
        return self.products

    def get_product(self, product_id: int) -> Optional[Product]:
        """Get a specific product by ID."""
        for product in self.products:
            if product.id == product_id:
                return product
        return None

    def update_product(self, product_id: int, update_data: ProductUpdate) -> Optional[Product]:
        """Update an existing product in the database."""
        product = self.get_product(product_id)
        if not product:
            return None

        update_dict = update_data.dict(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(product, field, value)

        return product

    def delete_product(self, product_id: int) -> bool:
        """Delete a product from the database."""
        for i, product in enumerate(self.products):
            if product.id == product_id:
                del self.products[i]
                return True
        return False


# Global database instance
db = InMemoryDatabase()
