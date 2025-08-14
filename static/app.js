const api = {
  async list() {
    const res = await fetch('/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },
  async get(id) {
    const res = await fetch(`/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  }
};

const els = {
  search: document.getElementById('search-input'),
  productsGrid: document.getElementById('products-grid'),
  productModal: document.getElementById('product-modal'),
  modalBody: document.getElementById('modal-body'),
  cartCount: document.querySelector('.cart-count')
};

function getProductImage(product) {
  // Map categories to stock images
  const imageMap = {
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center',
    'Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
    'Accessories': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
    'Clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center',
    'Books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
    'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center'
  };
  
  return imageMap[product.category] || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center';
}

function renderProducts(products) {
  els.productsGrid.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${getProductImage(product)}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-price">$${Number(product.price).toFixed(2)}</div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="viewProduct(${product.id})">View Details</button>
          <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    els.productsGrid.appendChild(productCard);
  });
}

let allProducts = [];
let cart = [];

async function loadProducts() {
  try {
    allProducts = await api.list();
    renderProducts(allProducts);
  } catch (e) {
    console.error('Failed to load products:', e);
  }
}

function applyFilter() {
  const q = (els.search.value || '').toLowerCase().trim();
  if (!q) return renderProducts(allProducts);
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderProducts(filtered);
}

function viewProduct(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  const created = product.created_at ? new Date(product.created_at) : null;
  els.modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${getProductImage(product)}" alt="${product.name}" style="width: 100%; max-width: 400px; height: 300px; border-radius: 16px; object-fit: cover; border: 2px solid var(--border);" />
    </div>
    <h2 style="margin: 0 0 20px 0; color: var(--text);">${product.name}</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
      <div>
        <div style="color: var(--muted); font-size: 14px; margin-bottom: 5px;">Category</div>
        <div style="font-weight: 500;">${product.category}</div>
      </div>
      <div>
        <div style="color: var(--muted); font-size: 14px; margin-bottom: 5px;">Price</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--primary);">$${Number(product.price).toFixed(2)}</div>
      </div>
      <div>
        <div style="color: var(--muted); font-size: 14px; margin-bottom: 5px;">In Stock</div>
        <div style="font-weight: 500;">${product.in_stock ? 'Yes' : 'No'}</div>
      </div>
      <div>
        <div style="color: var(--muted); font-size: 14px; margin-bottom: 5px;">Added</div>
        <div style="font-weight: 500;">${created ? created.toLocaleDateString() : '—'}</div>
      </div>
    </div>
    <div style="margin-bottom: 20px;">
      <div style="color: var(--muted); font-size: 14px; margin-bottom: 8px;">Description</div>
      <div style="line-height: 1.6;">${product.description}</div>
    </div>
    <div style="margin-bottom: 20px;">
      <div style="color: var(--muted); font-size: 14px; margin-bottom: 8px;">Tags</div>
      <div>${(product.tags || []).join(', ') || '—'}</div>
    </div>
    <div style="display: flex; gap: 15px; justify-content: center;">
      <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;
  
  els.productModal.style.display = 'flex';
}

function closeModal() {
  els.productModal.style.display = 'none';
}

function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  
  // Show a brief notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    font-weight: 500;
  `;
  notification.textContent = `${product.name} added to cart!`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  els.cartCount.textContent = totalItems;
}

// Event listeners
els.search.addEventListener('input', applyFilter);

// Close modal when clicking outside
els.productModal.addEventListener('click', (e) => {
  if (e.target === els.productModal) {
    closeModal();
  }
});

// Close modal with close button
document.querySelector('.close').addEventListener('click', closeModal);

// Initialize
loadProducts();


