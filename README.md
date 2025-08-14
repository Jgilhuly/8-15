# Product CRUD API - Demo Stub

A simple FastAPI-based CRUD API for managing products, designed for demonstrating AI-powered development with Cursor.

## Features

- Basic CRUD operations for products
- In-memory storage (no database required)
- RESTful API endpoints
- Pydantic models for data validation
- Pre-loaded sample data

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python main.py
```

3. Access the API:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Frontend UI - E-commerce Homepage

- Web app: http://localhost:8000/app/
- **Professional e-commerce design** that mimics real online stores
- Features:
  - **Complete e-commerce layout**: Top bar, header, navigation, hero section
  - **Category showcase**: Visual category cards with images
  - **Product grid**: Beautiful product cards with images and actions
  - **Interactive elements**: Search, cart functionality, product modals
  - **Responsive design**: Works perfectly on all devices
  - **Modern styling**: Professional shadows, animations, and hover effects
  - **Newsletter signup**: Customer engagement section
  - **Comprehensive footer**: Links, social media, contact info

<!-- Docker removed for simplicity -->

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

## Demo Use Cases

This stub is designed for demonstrating AI-powered development. Some ideas:

1. **Add AI-powered search**: Implement semantic search across product descriptions
2. **Product recommendations**: Add ML-based product recommendation engine
3. **Smart categorization**: Auto-categorize products using AI
4. **Content generation**: Generate product descriptions using LLMs
5. **Sentiment analysis**: Analyze and categorize product reviews
6. **Price optimization**: AI-driven dynamic pricing suggestions

## TODOs for AI Enhancement

The codebase includes several TODOs that are great for AI-assisted development:

- Add validation logic for product creation
- Implement proper error handling
- Add search endpoint with AI-powered features
- Create product recommendations endpoint
- Add input sanitization and data validation

## Sample Data

The application starts with sample products in electronics, appliances, and accessories categories. 