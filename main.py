"""FastAPI application for Product CRUD operations."""
from typing import List
import uvicorn

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

from models import Product, ProductCreate, ProductUpdate
from database import db

app = FastAPI(
    title="Product CRUD API",
    description="A simple CRUD API for managing products",
    version="1.0.0"
)

app.mount("/app", StaticFiles(directory="static", html=True), name="static")


@app.get("/app", include_in_schema=False)
def app_index_redirect():
    """Redirect to the SPA root with trailing slash."""
    return RedirectResponse(url="/app/")

@app.get("/")
def read_root():
    """Root endpoint returning welcome message."""
    return {"message": "Welcome to the Product CRUD API"}


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.get("/products", response_model=List[Product])
def get_products():
    """Get all products"""
    return db.get_all_products()


@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    """Get a specific product by ID"""
    product = db.get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/products", response_model=Product)
def create_product(product: ProductCreate):
    """Create a new product"""
    # TODO: Add validation logic here
    return db.create_product(product)


@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate):
    """Update an existing product"""
    # TODO: Add validation and error handling
    updated_product = db.update_product(product_id, product_update)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    """Delete a product"""
    # TODO: Add proper response handling
    success = db.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
