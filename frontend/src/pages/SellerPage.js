import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EcoNavbar from "../components/Navbar";
import "../styles/SellerPage.css";

const SellerPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    description: '',
    productImages: [],
    govtId: null,
    businessLicense: null
  });
  
  const [sellerProducts, setSellerProducts] = useState([
    {
      id: 1,
      name: "Hand-painted Madhubani Wall Art",
      category: "HandiCrafts",
      price: 3499,
      stock: 12,
      sales: 24,
      rating: 4.5,
      image: "https://5.imimg.com/data5/SELLER/Default/2021/6/PF/QG/HN/7544323/madhubani-painting-on-handmade-paper-500x500.jpg",
      status: "Active"
    },
    {
      id: 2,
      name: "Traditional Banarasi Silk Saree",
      category: "Clothes",
      price: 8999,
      stock: 5,
      sales: 18,
      rating: 5,
      image: "https://assets.ajio.com/medias/sys_master/root/20230602/5t3H/6479ab1342f9e729d7986b58/-473Wx593H-464834108-yellow-MODEL.jpg",
      status: "Active"
    },
    {
      id: 3,
      name: "Premium Kashmiri Saffron (10g)",
      category: "Spices",
      price: 2499,
      stock: 20,
      sales: 35,
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/71ZqS7cd9tL._AC_UF1000,1000_QL80_.jpg",
      status: "Active"
    }
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    images: []
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'productImages') {
      setFormData({
        ...formData,
        [name]: [...formData.productImages, ...files]
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleNewProductImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      images: [...e.target.files]
    });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend API
    console.log("Registration data submitted:", formData);
    // Simulate successful registration
    setIsRegistered(true);
    setActiveTab('dashboard');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend API
    const newProductWithId = {
      ...newProduct,
      id: sellerProducts.length + 1,
      sales: 0,
      rating: 0,
      status: "Pending",
      image: newProduct.images.length > 0 ? URL.createObjectURL(newProduct.images[0]) : ''
    };
    
    setSellerProducts([...sellerProducts, newProductWithId]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      description: '',
      stock: '',
      images: []
    });
    
    // Switch to products tab to show the newly added product
    setActiveTab('products');
  };

  const renderDashboard = () => (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your Seller Dashboard</h2>
        <p>Manage your products and track your sales</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{sellerProducts.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>{sellerProducts.reduce((sum, product) => sum + product.sales, 0)}</h3>
            <p>Total Sales</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{(sellerProducts.reduce((sum, product) => sum + product.rating, 0) / sellerProducts.length).toFixed(1)}</h3>
            <p>Average Rating</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{sellerProducts.reduce((sum, product) => sum + (product.price * product.sales), 0).toLocaleString()}</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🛍️</div>
            <div className="activity-content">
              <p>New order received for <strong>Hand-painted Madhubani Wall Art</strong></p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p>New 5-star review for <strong>Traditional Banarasi Silk Saree</strong></p>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p>Sales report for August is now available</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <button 
          className="action-btn" 
          onClick={() => setActiveTab('products')}
        >
          View All Products
        </button>
        <button 
          className="action-btn" 
          onClick={() => setActiveTab('addProduct')}
        >
          Add New Product
        </button>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="seller-products">
      <div className="products-header">
        <h2>Your Products</h2>
        <button className="add-product-btn" onClick={() => setActiveTab('addProduct')}>
          Add New Product
        </button>
      </div>
      
      <div className="product-filters">
        <select className="filter-select">
          <option value="all">All Categories</option>
          <option value="Clothes">Clothes</option>
          <option value="Spices">Spices</option>
          <option value="Instruments">Instruments</option>
          <option value="HandiCrafts">Handicrafts</option>
        </select>
        
        <select className="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        
        <div className="search-box">
          <input type="text" placeholder="Search products..." />
          <button>🔍</button>
        </div>
      </div>
      
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-thumbnail" 
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.sales}</td>
                <td>
                  <div className="rating">
                    <span>{product.rating}</span>
                    <span className="star">⭐</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-icon edit-icon">✏️</button>
                    <button className="action-icon delete-icon">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="add-product-section">
      <h2>Add New Product</h2>
      <p>Complete the form below to add a new product to your inventory</p>
      
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input 
            type="text" 
            id="productName" 
            name="name" 
            value={newProduct.name}
            onChange={handleNewProductChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="productCategory">Category</label>
          <select 
            id="productCategory" 
            name="category" 
            value={newProduct.category}
            onChange={handleNewProductChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Clothes">Clothes</option>
            <option value="Spices">Spices</option>
            <option value="Instruments">Instruments</option>
            <option value="HandiCrafts">Handicrafts</option>
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productPrice">Price (₹)</label>
            <input 
              type="number" 
              id="productPrice" 
              name="price" 
              value={newProduct.price}
              onChange={handleNewProductChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="productStock">Stock Quantity</label>
            <input 
              type="number" 
              id="productStock" 
              name="stock" 
              value={newProduct.stock}
              onChange={handleNewProductChange}
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <textarea 
            id="productDescription" 
            name="description" 
            rows="4" 
            value={newProduct.description}
            onChange={handleNewProductChange}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="productImages">Product Images</label>
          <div className="file-upload">
            <input 
              type="file" 
              id="productImages" 
              name="productImages"
              onChange={handleNewProductImageChange}
              multiple 
              accept="image/*" 
              required
            />
            <div className="upload-label">
              <span>Drag & drop images or click to browse</span>
            </div>
          </div>
          
          {newProduct.images.length > 0 && (
            <div className="image-preview-container">
              {Array.from(newProduct.images).map((file, index) => (
                <div key={index} className="image-preview">
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => setActiveTab('products')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="seller-orders">
      <h2>Your Orders</h2>
      <p>Manage and track all your orders</p>
      
      <div className="order-filters">
        <select className="filter-select">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        
        <div className="date-filter">
          <label>Date Range:</label>
          <input type="date" className="date-input" />
          <span>to</span>
          <input type="date" className="date-input" />
        </div>
        
        <div className="search-box">
          <input type="text" placeholder="Search by order ID or customer..." />
          <button>🔍</button>
        </div>
      </div>
      
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD8294</td>
              <td>Priya Sharma</td>
              <td>Hand-painted Madhubani Wall Art</td>
              <td>15 Aug 2023</td>
              <td>₹3,499</td>
              <td><span className="status-badge shipped">Shipped</span></td>
              <td>
                <button className="view-details-btn">View Details</button>
              </td>
            </tr>
            <tr>
              <td>#ORD8293</td>
              <td>Rahul Patel</td>
              <td>Traditional Banarasi Silk Saree</td>
              <td>14 Aug 2023</td>
              <td>₹8,999</td>
              <td><span className="status-badge processing">Processing</span></td>
              <td>
                <button className="view-details-btn">View Details</button>
              </td>
            </tr>
            <tr>
              <td>#ORD8290</td>
              <td>Amit Kumar</td>
              <td>Premium Kashmiri Saffron (10g)</td>
              <td>12 Aug 2023</td>
              <td>₹2,499</td>
              <td><span className="status-badge delivered">Delivered</span></td>
              <td>
                <button className="view-details-btn">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="seller-analytics">
      <h2>Sales Analytics</h2>
      <p>Track your performance and growth</p>
      
      <div className="analytics-filters">
        <select className="filter-select">
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="last3months">Last 3 Months</option>
          <option value="last6months">Last 6 Months</option>
          <option value="lastyear">Last Year</option>
          <option value="alltime">All Time</option>
        </select>
      </div>
      
      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>₹77,496</h3>
          <p>Total Revenue</p>
          <span className="trend positive">↑ 12.5%</span>
        </div>
        
        <div className="analytics-card">
          <h3>77</h3>
          <p>Total Orders</p>
          <span className="trend positive">↑ 8.2%</span>
        </div>
        
        <div className="analytics-card">
          <h3>4.7</h3>
          <p>Average Rating</p>
          <span className="trend positive">↑ 0.3</span>
        </div>
        
        <div className="analytics-card">
          <h3>₹1,006</h3>
          <p>Average Order Value</p>
          <span className="trend positive">↑ 4.3%</span>
        </div>
      </div>
      
      <div className="chart-container">
        <h3>Sales Overview</h3>
        <div className="chart-placeholder">
          <div className="chart-bars">
            <div className="chart-bar" style={{height: '60%'}}><span>Jan</span></div>
            <div className="chart-bar" style={{height: '45%'}}><span>Feb</span></div>
            <div className="chart-bar" style={{height: '75%'}}><span>Mar</span></div>
            <div className="chart-bar" style={{height: '50%'}}><span>Apr</span></div>
            <div className="chart-bar" style={{height: '65%'}}><span>May</span></div>
            <div className="chart-bar" style={{height: '90%'}}><span>Jun</span></div>
            <div className="chart-bar" style={{height: '80%'}}><span>Jul</span></div>
            <div className="chart-bar" style={{height: '95%'}}><span>Aug</span></div>
          </div>
        </div>
      </div>
      
      <div className="top-products">
        <h3>Top Selling Products</h3>
        <div className="top-products-list">
          {sellerProducts
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 3)
            .map((product, index) => (
              <div key={product.id} className="top-product-item">
                <span className="rank">{index + 1}</span>
                <img src={product.image} alt={product.name} className="product-thumbnail" />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>₹{product.price.toLocaleString()} • {product.sales} sold</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderRegistrationForm = () => (
    <div className="seller-registration">
      <div className="registration-header">
        <h2>Become a Seller on Heritage Marketplace</h2>
        <p>Join our community of artisans and sellers showcasing India's rich cultural heritage</p>
      </div>
      
      <form className="registration-form" onSubmit={handleRegistrationSubmit}>
        <div className="form-section">
          <h3>Business Information</h3>
          
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input 
              type="text" 
              id="businessName" 
              name="businessName" 
              value={formData.businessName}
              onChange={handleFormChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="ownerName">Owner's Name</label>
            <input 
              type="text" 
              id="ownerName" 
              name="ownerName" 
              value={formData.ownerName}
              onChange={handleFormChange}
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleFormChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleFormChange}
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Business Address</label>
            <textarea 
              id="address" 
              name="address" 
              rows="3" 
              value={formData.address}
              onChange={handleFormChange}
              required
            ></textarea>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Product Information</h3>
          
          <div className="form-group">
            <label htmlFor="category">Product Category</label>
            <select 
              id="category" 
              name="category" 
              value={formData.category}
              onChange={handleFormChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Clothes">Clothes</option>
              <option value="Spices">Spices</option>
              <option value="Instruments">Instruments</option>
              <option value="HandiCrafts">Handicrafts</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Tell us about your products</label>
            <textarea 
              id="description" 
              name="description" 
              rows="4" 
              value={formData.description}
              onChange={handleFormChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="productImages">Sample Product Images</label>
            <div className="file-upload">
              <input 
                type="file" 
                id="productImages" 
                name="productImages"
                onChange={handleFileChange}
                multiple 
                accept="image/*" 
                required
              />
              <div className="upload-label">
                <span>Drag & drop images or click to browse</span>
                <p>Upload at least 3 images of your products</p>
              </div>
            </div>
            
            {formData.productImages.length > 0 && (
              <div className="image-preview-container">
                {Array.from(formData.productImages).map((file, index) => (
                  <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h3>Verification Documents</h3>
          
          <div className="form-group">
            <label htmlFor="govtId">Government ID (Aadhaar, PAN, etc.)</label>
            <div className="file-upload">
              <input 
                type="file" 
                id="govtId" 
                name="govtId"
                onChange={handleFileChange}
                accept="image/*, application/pdf" 
                required
              />
              <div className="upload-label">
                <span>Drag & drop file or click to browse</span>
              </div>
            </div>
            
            {formData.govtId && (
              <div className="file-info">
                <span>File selected: {formData.govtId.name}</span>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="businessLicense">Business License/Registration (if applicable)</label>
            <div className="file-upload">
              <input 
                type="file" 
                id="businessLicense" 
                name="businessLicense"
                onChange={handleFileChange}
                accept="image/*, application/pdf" 
              />
              <div className="upload-label">
                <span>Drag & drop file or click to browse</span>
              </div>
            </div>
            
            {formData.businessLicense && (
              <div className="file-info">
                <span>File selected: {formData.businessLicense.name}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="form-agreement">
          <input type="checkbox" id="agreement" required />
          <label htmlFor="agreement">
            I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a> of Heritage Marketplace.
          </label>
        </div>
        
        <div className="form-actions">
          <Link to="/" className="cancel-btn">Cancel</Link>
          <button type="submit" className="submit-btn">Submit Application</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="seller-page">
      <EcoNavbar />

      {isRegistered ? (
        <div className="seller-container">
          <div className="seller-sidebar">
            <div className="seller-profile">
              <div className="profile-avatar">
                {formData.businessName ? formData.businessName.charAt(0) : 'S'}
              </div>
              <div className="profile-info">
                <h3>{formData.businessName || "Your Business"}</h3>
                <p>Seller</p>
              </div>
            </div>
            
            <nav className="seller-nav">
              <button 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </button>
              
              <button 
                className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <span className="nav-icon">📦</span>
                Products
              </button>
              
              <button 
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <span className="nav-icon">🛍️</span>
                Orders
              </button>
              
              <button 
                className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <span className="nav-icon">📈</span>
                Analytics
              </button>
              
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span className="nav-icon">⚙️</span>
                Settings
              </button>
            </nav>
            
            <div className="sidebar-footer">
              <Link to="/" className="back-to-marketplace">
                Back to Marketplace
              </Link>
            </div>
          </div>
          
          <div className="seller-content">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'addProduct' && renderAddProduct()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && (
              <div className="settings-placeholder">
                <h2>Account Settings</h2>
                <p>This page is under construction.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        renderRegistrationForm()
      )}
    </div>
  );
};

export default SellerPage; 