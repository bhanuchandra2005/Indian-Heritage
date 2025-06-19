import "../styles/TradePage.css";
import { EcommerceCard } from "../components/EcommerceCard";
import { useState, useEffect } from "react";

import imagesData from "../assets/ecom/E_COMMERCE_CardData/eComCardData";
import { WeHaveMoreImageData } from "../assets/ecom/WeHaveMore/WeHaveMoreData";
import EcoNavbar from "../components/Navbar";

import { LoadingPage } from "./LoadingPage";
import { Link } from "react-router-dom";
import CircularMenu2 from "../components/CircularMenu2";

export const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartWindow, setCartWindow] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const initialProducts = [
    // Clothing Category
    {
      id: 1,
      category: "Clothes",
      name: "Designer Kurta Set",
      price: 1899,
      originalPrice: 2499,
      discount: "24%",
      rating: 4,
      reviews: 42,
      badge: "New",
      image: "https://img.faballey.com/images/Product/WLK00532A/d3.jpg"
    },
    {
      id: 2,
      category: "Clothes",
      name: "Festive Sherwani",
      price: 3499,
      originalPrice: 4999,
      discount: "30%",
      rating: 5,
      reviews: 89,
      badge: "Bestseller",
      image: "https://cdn.sareesaga.com/image/cache/data18/blue-and-multi-colour-banarasi-jacquard-festival-sherwani-197192-1000x1375.jpg"
    },
    {
      id: 3,
      category: "Clothes",
      name: "Traditional Dhoti Set",
      price: 2299,
      originalPrice: 2999,
      discount: "23%",
      rating: 4,
      reviews: 36,
      badge: "Limited",
      image: "https://ramrajcotton.in/cdn/shop/files/5_c4599121-0854-4266-abe1-9b628c8db04e.jpg?v=1740457301"
    },
    {
      id: 4,
      category: "Clothes",
      name: "Wedding Collection Kurta",
      price: 1699,
      originalPrice: 2999,
      discount: "43%",
      rating: 5,
      reviews: 103,
      badge: "Sale",
      image: "https://www.manyavar.com/dw/image/v2/BJZV_PRD/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dw3f97cca9/How%20to%20Style%20a%20Kurta%20for%20a%20Wedding%20Party%20Dos%20and%20Don%E2%80%99ts_Blog_2_D_M.jpg"
    },
    {
      id: 5,
      category: "Clothes",
      name: "Silk Banarasi Saree",
      price: 5999,
      originalPrice: 7999,
      discount: "25%",
      rating: 5,
      reviews: 127,
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      category: "Clothes",
      name: "Handwoven Cotton Saree",
      price: 2499,
      originalPrice: 3299,
      discount: "24%",
      rating: 4.5,
      reviews: 87,
      badge: "Handcrafted",
      image: "https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    
    // Spices Category
    {
      id: 7,
      category: "Spices",
      name: "Premium Kashmiri Saffron",
      price: 1299,
      originalPrice: 1599,
      discount: "19%",
      rating: 5,
      reviews: 78,
      badge: "Premium",
      image: "https://images.unsplash.com/flagged/photo-1616462432325-36ee9a32fd0a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 8,
      category: "Spices",
      name: "Organic Turmeric Powder",
      price: 299,
      originalPrice: 399,
      discount: "25%",
      rating: 4.5,
      reviews: 152,
      badge: "Organic",
      image: "https://images.unsplash.com/photo-1595414902678-862fe51c9f27?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 9,
      category: "Spices",
      name: "Kerala Black Pepper",
      price: 349,
      originalPrice: 499,
      discount: "30%",
      rating: 4.5,
      reviews: 64,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1741518165765-af1c27e6795e?q=80&w=2691&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 10,
      category: "Spices",
      name: "Exotic Spice Gift Box",
      price: 1899,
      originalPrice: 2499,
      discount: "24%",
      rating: 5,
      reviews: 42,
      badge: "Gift",
      image: "https://images.unsplash.com/photo-1590052210004-8935aa660ff2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    
    // Instruments Category
    {
      id: 11,
      category: "Instruments",
      name: "Professional Tabla Set",
      price: 8999,
      originalPrice: 11999,
      discount: "25%",
      rating: 4.5,
      reviews: 38,
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1732359875125-da42b0e6297f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 12,
      category: "Instruments",
      name: "Rosewood Sitar",
      price: 15999,
      originalPrice: 18999,
      discount: "16%",
      rating: 5,
      reviews: 24,
      badge: "Handcrafted",
      image: "https://plus.unsplash.com/premium_photo-1700670284018-17d39357f45c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 13,
      category: "Instruments",
      name: "Bamboo Flute Set",
      price: 1299,
      originalPrice: 1699,
      discount: "24%",
      rating: 4.5,
      reviews: 91,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1558299244-f4bb4dd735b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 14,
      category: "Instruments",
      name: "Traditional Harmonium",
      price: 7999,
      originalPrice: 9999,
      discount: "20%",
      rating: 4.5,
      reviews: 47,
      badge: "Popular",
      image: "https://plus.unsplash.com/premium_photo-1681738775173-fced8021c53a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    
    // Handicrafts Category
    {
      id: 15,
      category: "HandiCrafts",
      name: "Marble Taj Mahal Replica",
      price: 2999,
      originalPrice: 3999,
      discount: "25%",
      rating: 5,
      reviews: 118,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1694378061058-bb6532de3bba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 16,
      category: "HandiCrafts",
      name: "Brass Buddha Statue",
      price: 1499,
      originalPrice: 1999,
      discount: "25%",
      rating: 4.5,
      reviews: 86,
      badge: "Handmade",
      image: "https://images.unsplash.com/photo-1667232235505-8e95709eeb49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 17,
      category: "HandiCrafts",
      name: "Rajasthani Puppet Set",
      price: 899,
      originalPrice: 1299,
      discount: "31%",
      rating: 4,
      reviews: 42,
      badge: "Traditional",
      image: "https://images.unsplash.com/photo-1630346789968-e2799a467caf?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 18,
      category: "HandiCrafts",
      name: "Hand-painted Wooden Elephant",
      price: 799,
      originalPrice: 1099,
      discount: "27%",
      rating: 4.5,
      reviews: 64,
      badge: "Artisanal",
      image: "https://images.unsplash.com/photo-1738717073370-80998187a5b9?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 19,
      category: "HandiCrafts",
      name: "Kashmir Papier-Mâché Box",
      price: 1299,
      originalPrice: 1699,
      discount: "24%",
      rating: 5,
      reviews: 37,
      badge: "Heritage",
      image: "https://plus.unsplash.com/premium_photo-1732212205909-b445f958d89f?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 20,
      category: "HandiCrafts",
      name: "Madhubani Painting",
      price: 2499,
      originalPrice: 2999,
      discount: "17%",
      rating: 4.5,
      reviews: 29,
      badge: "Limited",
      image: "https://plus.unsplash.com/premium_photo-1678257846725-e88b5280900b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const [products] = useState(initialProducts);

  useEffect(() => {
    // Simulate loading
    if (initialLoading) {
      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setInitialLoading(false);
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [initialLoading]);

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const toggleCart = (product) => {
    setCartItems(prevCartItems => {
      const isInCart = prevCartItems.some(item => item.id === product.id);
      if (isInCart) {
        return prevCartItems.filter(item => item.id !== product.id);
      } else {
        return [...prevCartItems, product];
      }
    });
  };

  const openCartWindow = () => {
    if (cartWindow && !cartWindow.closed) {
      cartWindow.focus();
      return;
    }

    const width = 600;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const newWindow = window.open('', 'cartWindow', 
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Shopping Cart</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
              .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #ddd; }
              .cart-title { font-size: 28px; color: #333; margin: 0; }
              .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #666; }
              .cart-items { max-height: 400px; overflow-y: auto; }
              .cart-item { display: flex; align-items: center; padding: 20px; background: white; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .item-image { width: 100px; height: 100px; object-fit: cover; border-radius: 4px; margin-right: 20px; }
              .item-details { flex: 1; }
              .item-name { font-size: 18px; margin: 0 0 8px 0; color: #333; }
              .item-price { color: #4CAF50; font-weight: bold; font-size: 16px; margin: 0; }
              .remove-btn { background: none; border: none; color: #ff4444; cursor: pointer; font-size: 24px; padding: 5px; }
              .cart-footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
              .total { display: flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px; }
              .checkout-btn { width: 100%; padding: 15px; background: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 18px; cursor: pointer; transition: background 0.3s; }
              .checkout-btn:hover { background: #45a049; }
              .empty-cart { text-align: center; padding: 40px; color: #666; font-size: 18px; }
              .order-form { display: none; padding: 20px; background: white; border-radius: 8px; margin-top: 20px; }
              .form-group { margin-bottom: 15px; }
              .form-group label { display: block; margin-bottom: 5px; color: #333; }
              .form-group input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
              .order-success { display: none; text-align: center; padding: 40px; background: #E8F5E9; border-radius: 8px; margin-top: 20px; }
              .order-success h2 { color: #2E7D32; margin-bottom: 20px; font-size: 28px; }
              .order-success p { color: #1B5E20; margin-bottom: 15px; font-size: 18px; }
              .success-icon { font-size: 64px; margin-bottom: 20px; color: #2E7D32; }
            </style>
          </head>
          <body>
            <div class="cart-header">
              <h1 class="cart-title">Shopping Cart</h1>
              <button class="close-btn" onclick="window.close()">×</button>
            </div>
            <div id="cartContent">
              <div class="cart-items">
                ${cartItems.length === 0 ? 
                  '<div class="empty-cart">Your cart is empty</div>' : 
                  cartItems.map(item => `
                    <div class="cart-item">
                      <img src="${item.image}" alt="${item.name}" class="item-image">
                      <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">₹${item.price}</p>
                      </div>
                      <button class="remove-btn" onclick="window.opener.removeFromCart(${item.id})">×</button>
                    </div>
                  `).join('')
                }
              </div>
              ${cartItems.length > 0 ? `
                <div class="cart-footer">
                  <div class="total">
                    <span>Total:</span>
                    <span>₹${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <button class="checkout-btn" onclick="showOrderForm()">Proceed to Checkout</button>
                </div>
              ` : ''}
            </div>

            <div id="orderForm" class="order-form">
              <h2>Shipping Details</h2>
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="fullName" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="email" required>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="phone" required>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" id="address" required>
              </div>
              <div class="form-group">
                <label>City</label>
                <input type="text" id="city" required>
              </div>
              <div class="form-group">
                <label>Postal Code</label>
                <input type="text" id="postalCode" required>
              </div>
              <button class="checkout-btn" onclick="placeOrder()">Place Order</button>
            </div>

            <div id="orderSuccess" class="order-success">
              <div class="success-icon">✓</div>
              <h2>Order Placed Successfully!</h2>
              <p>Thank you for your purchase.</p>
              <p>Order confirmation has been sent to your email.</p>
              <p>Your order will be shipped within 2-3 business days.</p>
              <button class="checkout-btn" onclick="window.close()">Close</button>
            </div>

            <script>
              function showOrderForm() {
                document.getElementById('cartContent').style.display = 'none';
                document.getElementById('orderForm').style.display = 'block';
              }

              function placeOrder() {
                document.getElementById('orderForm').style.display = 'none';
                document.getElementById('orderSuccess').style.display = 'block';
              }
            </script>
          </body>
        </html>
      `);

      newWindow.removeFromCart = (productId) => {
        window.removeFromCart(productId);
        
        if (newWindow && !newWindow.closed) {
          newWindow.close();
          openCartWindow();
        }
      };

      setCartWindow(newWindow);
    }
  };

  window.removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return initialLoading ? (
    <LoadingPage progress={loadingProgress} />
  ) : (
    <div className="index">
      <EcoNavbar />
      <CircularMenu2/>
      <div className="become-seller-btn-container">
        <Link to="/seller" className="become-seller-btn">Become a Seller</Link>
      </div>
      <div className="Categories-Intro">
        <h1 className="Categories-Intro-Title">HERITAGE MARKETPLACE</h1>
        <p style={{ 
          fontSize: '18px', 
          maxWidth: '800px', 
          margin: '0 auto',
          textAlign: 'center',
          color: '#555',
          marginTop: '60px',
          fontFamily: 'Poppins, sans-serif',
          lineHeight: '1.6'
        }}>
          Explore India's rich cultural heritage through our carefully curated collection of 
          traditional clothing, authentic spices, handcrafted instruments, and exquisite handicrafts.
        </p>
      </div>

      <div className="card-container-carousel">
        <div className="scrolling-wrapper-flexbox">
          {imagesData.map((image, index) => (
            <EcommerceCard
              key={index}
              imgSrc={image.imgSrc}
              title={image.title}
              className={index % 2 === 0 ? "overlap-eco-card" : "overlap-eco-card2"}
              onClick={() => setActiveCategory(image.title)}
            />
          ))}
        </div>
      </div>

      <div className="hottest-section">
        <div className="shopping-tools">
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className="shopping-btn wishlist-toggle"
            aria-label="View favorites"
          >
            <i className="heart-icon">♥</i>
            {favorites.length > 0 && (
              <span className="tool-badge">{favorites.length}</span>
            )}
          </button>
          
          <button 
            onClick={() => setShowCart(!showCart)}
            className="shopping-btn cart-toggle"
            aria-label="View cart"
          >
            <i className="cart-icon">🛒</i>
            {cartItems.length > 0 && (
              <span className="tool-badge">{cartItems.length}</span>
            )}
          </button>
        </div>

        {showFavorites && (
          <div className="favorites-panel">
            <div className="panel-header">
              <h3>Your Favorites</h3>
              <button onClick={() => setShowFavorites(false)} className="close-btn">×</button>
            </div>
            {favorites.length === 0 ? (
              <div className="empty-message">
                <p>You haven't added any items to your favorites yet.</p>
                <i className="empty-icon">♥</i>
              </div>
            ) : (
              <div className="panel-items">
                {favorites.map(item => (
                  <div key={item.id} className="panel-item">
                    <img src={item.image} alt={item.name} className="item-thumbnail" />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => toggleCart(item)} className="action-btn add-btn">
                        {cartItems.some(cartItem => cartItem.id === item.id) ? '✓' : '+'}
                      </button>
                      <button onClick={() => toggleFavorite(item)} className="action-btn remove-btn">×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showCart && (
          <div className="cart-panel">
            <div className="panel-header">
              <h3>Your Shopping Cart</h3>
              <button onClick={() => setShowCart(false)} className="close-btn">×</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-message">
                <p>Your cart is empty.</p>
                <i className="empty-icon">🛒</i>
              </div>
            ) : (
              <>
                <div className="panel-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="panel-item">
                      <img src={item.image} alt={item.name} className="item-thumbnail" />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <div className="item-price">₹{item.price}</div>
                      </div>
                      <button onClick={() => toggleCart(item)} className="action-btn remove-btn">×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total:</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <button className="checkout-btn" onClick={openCartWindow}>
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        )}

        <div className="hottest-header">
          <h2>Featured Collection</h2>
          <p>Discover the perfect blend of tradition and craftsmanship</p>
          <div className="hottest-filters">
            <button 
              className={`filter-btn ${activeCategory === "All" ? "active" : ""}`} 
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeCategory === "Clothes" ? "active" : ""}`}
              onClick={() => setActiveCategory("Clothes")}
            >
              Clothes
            </button>
            <button 
              className={`filter-btn ${activeCategory === "Spices" ? "active" : ""}`}
              onClick={() => setActiveCategory("Spices")}
            >
              Spices
            </button>
            <button 
              className={`filter-btn ${activeCategory === "Instruments" ? "active" : ""}`}
              onClick={() => setActiveCategory("Instruments")}
            >
              Instruments
            </button>
            <button 
              className={`filter-btn ${activeCategory === "HandiCrafts" ? "active" : ""}`}
              onClick={() => setActiveCategory("HandiCrafts")}
            >
              Handicrafts
            </button>
          </div>
        </div>

        <div className="category-description">
          {activeCategory === "All" && (
            <p>Explore our complete collection of authentic Indian cultural treasures</p>
          )}
          {activeCategory === "Clothes" && (
            <p>Traditional attire showcasing India's rich textile heritage and craftsmanship</p>
          )}
          {activeCategory === "Spices" && (
            <p>Authentic spices that bring the essence of Indian cuisine to your kitchen</p>
          )}
          {activeCategory === "Instruments" && (
            <p>Handcrafted musical instruments that carry the soul of Indian classical music</p>
          )}
          {activeCategory === "HandiCrafts" && (
            <p>Exquisite handicrafts that showcase the unparalleled skill of Indian artisans</p>
          )}
        </div>

        <div className="Hottest-card-containers">
          {products
            .filter(product => activeCategory === "All" || product.category === activeCategory)
            .map(product => (
            <div key={product.id} className="product-card">
              <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="quick-actions">
                  <button 
                    className={`quick-action-btn favorite-btn ${favorites.some(fav => fav.id === product.id) ? 'active' : ''}`} 
                    onClick={() => toggleFavorite(product)}
                  >
                    ♥
                  </button>
                  <button 
                    className={`quick-action-btn cart-btn ${cartItems.some(item => item.id === product.id) ? 'active' : ''}`}
                    onClick={() => toggleCart(product)}
                  >
                    {cartItems.some(item => item.id === product.id) ? '✓' : '+'}
                  </button>
                </div>
              </div>
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="actual-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">-{product.discount}</span>
                </div>
                <div className="product-rating">
                  <div className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</div>
                  <span className="reviews">({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className={`add-to-cart-btn ${cartItems.some(item => item.id === product.id) ? 'in-cart' : ''}`}
                  onClick={() => toggleCart(product)}
                  style={{
                    background: cartItems.some(item => item.id === product.id) 
                      ? 'linear-gradient(135deg, #66BB6A, #43A047)'
                      : 'linear-gradient(135deg, #4A148C, #7B1FA2)',
                  }}
                >
                  {cartItems.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
                <button 
                  className={`wishlist-btn ${favorites.some(fav => fav.id === product.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(product)}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="weHaveMoreSection" style={{ width: "100%", overflowX: "auto" }}>
        {WeHaveMoreImageData.map((image, index) => (
          <div
            key={index}
            className="WHM-image"
            style={{
              backgroundImage: `url('${image.imageSrc}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "50%", 
              height: "85%",
              marginLeft: "5%",
              flex: "0 0 auto",
            }}
          ></div>
        ))}
      </div>

      <footer className="trade-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Heritage Marketplace</h3>
            <p>Celebrating India's rich cultural heritage through authentic products</p>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>Traditional Clothing</li>
              <li>Authentic Spices</li>
              <li>Musical Instruments</li>
              <li>Handcrafted Items</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Customer Care</h4>
            <ul>
              <li>Shipping Information</li>
              <li>Returns Policy</li>
              <li>Track Your Order</li>
              <li>Contact Support</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>For Sellers</h4>
            <ul>
              <li><Link to="/seller" className="footer-link">Seller Dashboard</Link></li>
              <li><Link to="/seller" className="footer-link">Sell Your Products</Link></li>
              <li><Link to="/seller" className="footer-link">Seller Guidelines</Link></li>
              <li><Link to="/seller" className="footer-link">Payment Info</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Heritage Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TradePage; 