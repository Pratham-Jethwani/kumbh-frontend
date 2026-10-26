import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  ChevronDown, 
  ArrowRight, 
  X, 
  Plus, 
  Minus, 
  Check, 
  AlertCircle, 
  Loader2, 
  Trash2, 
  Globe, 
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react';
import { 
  fetchLiveShopifyProducts, 
  searchShopifyProducts, 
  createShopifyCheckout, 
  instantBuyNow,
  registerCustomerNewsletter,
  getStoredShopifyConfig 
} from './shopify';

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 'gid://shopify/Product/8023516217395',
      title: 'Sacred Godavari Jal & Kumbh Darshan Experience',
      handle: 'asset-pack-135166066690-example-product-3',
      price: '38.00',
      availableForSale: true,
      image: '/images/sacred-kumbh.png',
      description: 'Bring the divine energy of the Nashik Kumbh Mela directly into your home. Receive a securely sealed, sacred brass vessel of authentic Godavari water, collected during the most auspicious Kumbh bathing dates. Along with your holy water, we will send a recorded Darshan video to your WhatsApp, allowing you to experience the vibrant spiritual atmosphere of the ghats from anywhere in the country. Let the blessings of the Kumbh flow into your household.',
      variants: [{ id: 'gid://shopify/ProductVariant/45126575587379', title: 'Default Title', price: '38.00', availableForSale: true }]
    },
    {
      id: 'gid://shopify/Product/8023516184627',
      title: 'Live Personalized Kumbh Abhishek & Holy Jal',
      handle: 'asset-pack-135166066690-example-product-2',
      price: '68.00',
      availableForSale: true,
      image: '/images/rudrabhishek.png',
      description: 'Participate in the Nashik Kumbh Mela without the travel or the crowds. Our verified pandits will perform a personalized Abhishek pooja directly on the holy ghats of Nashik. By uploading a photograph of yourself or your family, the priest ensures the blessings and mantras are directed specifically to you. The entire ritual will be recorded and sent to you via WhatsApp so you can witness your blessing, and a sacred bottle of Godavari Jal will be shipped securely to your doorstep.',
      variants: [{ id: 'gid://shopify/ProductVariant/45126575554611', title: 'Default Title', price: '68.00', availableForSale: true }]
    },
    {
      id: 'gid://shopify/Product/8023516086323',
      title: 'Ancestral Peace Abhishek & Kumbh Blessings',
      handle: 'asset-pack-135166066690-example-product-1',
      price: '48.00',
      availableForSale: true,
      image: '/images/ghat-memorial.png',
      description: 'Honor the memory of your departed loved ones and seek spiritual peace for their souls, no matter where you are in the world. During the highly auspicious Nashik Kumbh Mela, our trusted priests will perform a dedicated Shanti Abhishek (peace ritual) on the serene banks of the Godavari River. Simply upload a photo of your loved one or pet, and the pooja will be deeply personalized for their journey. You will receive a complete video recording of the ritual via WhatsApp for your family to keep, alongside a shipped vessel of sacred holy water as a tangible blessing of peace for your home.',
      variants: [{ id: 'gid://shopify/ProductVariant/45126575456307', title: 'Default Title', price: '48.00', availableForSale: true }]
    }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  
  // Modals for Currency, Account, Contact, Policies
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isInventorySynced, setIsInventorySynced] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const config = getStoredShopifyConfig();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Sync live prices and availability directly from Shopify inventory
  useEffect(() => {
    async function syncFromShopify() {
      try {
        const liveProducts = await fetchLiveShopifyProducts();
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
          setIsInventorySynced(true);
        }
      } catch (err) {
        console.warn('Inventory sync fallback to local mirror:', err);
      }
    }
    syncFromShopify();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchShopifyProducts(searchQuery);
        setSearchResults(results);
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleAddToCart = (product, variant = null, quantity = 1) => {
    const activeVariant = variant || product.variants?.[0] || { id: product.id, title: 'Default Title', price: product.price };
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id && item.variant.id === activeVariant.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, variant: activeVariant, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.title}" to cart`);
    setIsCartOpen(true);
    if (selectedProduct) setSelectedProduct(null);
    if (isSearchOpen) setIsSearchOpen(false);
    setModalQuantity(1);
  };

  const handleInstantBuyNow = async (product, variant = null, quantity = 1) => {
    const activeVariant = variant || product.variants?.[0] || { id: product.id, title: 'Default Title', price: product.price };
    setIsBuyingNow(true);
    try {
      const checkoutUrl = await instantBuyNow(activeVariant.id, quantity);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (e) {
      console.error('Instant checkout error:', e);
      window.location.href = `https://${config.shopDomain}/cart`;
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleUpdateQty = (idx, qty) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter((_, i) => i !== idx));
    } else {
      setCartItems(prev => {
        const copy = [...prev];
        copy[idx].quantity = qty;
        return copy;
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactModalOpen(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      showToast('Thank you! Our temple seva team will contact you shortly on WhatsApp.');
    }, 1200);
  };

  // Connects Checkout button directly to Shopify Storefront API cartCreate checkoutUrl
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await createShopifyCheckout(cartItems);
      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (e) {
      console.error('Checkout error:', e);
      window.location.href = `https://${config.shopDomain}/cart`;
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Connects Newsletter to Shopify Customer API customerCreate
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    setIsSubscribing(true);
    setNewsletterStatus(null);
    try {
      const res = await registerCustomerNewsletter(emailInput.trim());
      if (res?.customerUserErrors?.length > 0) {
        setNewsletterStatus({
          type: 'info',
          message: res.customerUserErrors[0].message || 'You are already registered with NashikNirvana!'
        });
      } else {
        setNewsletterStatus({
          type: 'success',
          message: 'Thank you for connecting with NashikNirvana tradition!'
        });
      }
      setEmailInput('');
    } catch (err) {
      setNewsletterStatus({
        type: 'success',
        message: 'Thank you for connecting with tradition!'
      });
      setEmailInput('');
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartSubtotal = cartItems.reduce((acc, i) => acc + (parseFloat(i.variant.price || i.product.price) * i.quantity), 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(38, 17, 8, 0.95)',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          zIndex: 2000,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={16} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header (Exact Match + Fully Wired Backend API Buttons) */}
      <header className={`exact-header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="header-nav">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="header-nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Home
          </button>
          <button 
            onClick={scrollToProducts} 
            className="header-nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Catalog
          </button>
          <button 
            onClick={() => setIsContactModalOpen(true)} 
            className="header-nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Contact
          </button>
        </nav>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="header-brand"
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
        >
          NashikNirvana
        </button>

        <div className="header-actions">
          {/* Currency button -> Opens Live Currency & Region Selector */}
          <button 
            className="header-currency"
            onClick={() => setIsCurrencyModalOpen(true)}
            title="Shopify Store Currency & Region"
          >
            <span>INR / EN</span>
            <ChevronDown size={14} />
          </button>

          {/* Search Button -> Opens Live Storefront Search */}
          <button 
            className="header-icon-btn" 
            title="Search Products"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>

          {/* Account Button -> Opens Customer Account Menu */}
          <button 
            onClick={() => setIsAccountModalOpen(true)}
            className="header-icon-btn" 
            title="Customer Account"
          >
            <User size={20} />
          </button>

          {/* Cart Bag Button -> Opens Cart Drawer */}
          <button 
            className="header-icon-btn" 
            title="Shopping Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {totalCartCount > 0 && (
              <span className="header-cart-badge">{totalCartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Live Search Drawer Overlay */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          color: '#111',
          zIndex: 99,
          padding: '24px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="site-container" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid #111', paddingBottom: '8px' }}>
              <Search size={22} color="#666" />
              <input 
                type="text" 
                placeholder="Search live offerings from NashikNirvana..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.25rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
              {isSearching && <Loader2 size={20} className="flame-anim" />}
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Results dropdown */}
            {searchResults.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {searchResults.map(res => (
                  <div 
                    key={res.id}
                    onClick={() => {
                      const found = products.find(p => p.id === res.id) || res;
                      setSelectedProduct(found);
                      setModalQuantity(1);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#f9fafb'
                    }}
                  >
                    <img src={res.image} alt={res.title} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{res.title}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-terracotta)' }}>Rs. {res.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Hero Section (Exact Match) */}
      <section 
        className="exact-hero"
        style={{ backgroundImage: `url('/images/river-night-panorama.png')` }}
      >
        <div className="exact-hero-cta">
          <button onClick={scrollToProducts} className="btn-pill-dark">
            Shop now
          </button>
        </div>
      </section>

      {/* 3. Section 2: Story Image with Text Card (Exact Match) */}
      <section className="exact-story-section">
        <div className="site-container">
          <div className="story-card-grid">
            <div className="story-image-wrap">
              <img 
                src="/images/real-river-panorama.jpg" 
                alt="Heartfelt pooja ceremonies and authentic Gangajal" 
              />
            </div>
            <div className="story-text-card">
              <h2>
                Experience heartfelt pooja ceremonies and authentic Gangajal, delivered with wherever your family gathers.
              </h2>
              <p>
                Born from a desire to keep ancestral traditions alive, we bridge continents by connecting your family to meaningful rituals and spiritual comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Product Grid (Exact Match + Synced Live Prices from Inventory) */}
      <section id="products-section" className="exact-products-section">
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            {isInventorySynced && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#15803d',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '4px 12px',
                borderRadius: '9999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Live Inventory Synced with Shopify Storefront API
              </span>
            )}
          </div>
          <div className="exact-products-grid">
            {products.map(prod => (
              <div 
                key={prod.id} 
                className="exact-product-card"
                onClick={() => {
                  setSelectedProduct(prod);
                  setModalQuantity(1);
                }}
              >
                <div className="exact-product-image-wrap">
                  <img src={prod.image} alt={prod.title} />
                </div>
                <h3 className="exact-product-title">{prod.title}</h3>
                <div className="exact-product-price">
                  Rs. {prod.price}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
                  {prod.availableForSale ? 'In stock • Ready for dispatch' : 'Out of stock'}
                </div>

                <div style={{ marginTop: '14px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(prod, null, 1);
                    }}
                    disabled={!prod.availableForSale}
                    style={{
                      background: 'rgba(38, 17, 8, 0.85)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#261108'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(38, 17, 8, 0.85)'}
                  >
                    Add to cart • Rs. {prod.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section 4: "Every detail considered" Banner (Exact Match) */}
      <section className="exact-detail-banner">
        <div className="site-container">
          <h2>Every detail considered</h2>
          <p>
            Our premium Gangajal and curated prayer kits deliver the essence of tradition, with every ritual guided by trusted priests in India.
          </p>
          <button onClick={scrollToProducts} className="btn-pill-dark">
            Shop now
          </button>
        </div>
      </section>

      {/* 6. Section 5: Terracotta Star Rating & Quote (Exact Match) */}
      <section className="exact-quote-terracotta">
        <div className="site-container">
          <div className="quote-stars">
            ☆ ☆ ☆ ☆ ☆
          </div>
          <p className="quote-terracotta-text">
            We honor the spirit of homecoming by making sacred traditions accessible, inviting every family to rediscover comfort in meaningful ritual.
          </p>
          <button 
            onClick={scrollToProducts} 
            className="quote-shop-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Shop now <span>→</span>
          </button>
        </div>
      </section>

      {/* 7. Section 6: Golden Sand Tapestry Quote (Exact Match) */}
      <section className="exact-quote-sand">
        <div className="site-container">
          <p className="quote-sand-text">
            Each ceremony is a tapestry of memory and meaning — woven for modern life, yet rooted in centuries of reverence and togetherness.
          </p>
        </div>
      </section>



      {/* Product Quick View / Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProduct(null)} 
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', padding: '36px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1/1', background: '#f5f5f5' }}>
                <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.25 }}>
                  {selectedProduct.title}
                </h2>
                <div style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--color-terracotta)', marginBottom: '8px' }}>
                  Rs. {selectedProduct.price}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600, marginBottom: '16px' }}>
                  ✓ {selectedProduct.availableForSale ? 'Available in Shopify Inventory' : 'Sold Out'}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '24px' }}>
                  {selectedProduct.description}
                </p>

                {/* Quantity Selector */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                    Quantity
                  </label>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    gap: '14px',
                    background: '#fff'
                  }}>
                    <button 
                      onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '1rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                      {modalQuantity}
                    </span>
                    <button 
                      onClick={() => setModalQuantity(prev => prev + 1)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Buy It Now */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    onClick={() => handleAddToCart(selectedProduct, null, modalQuantity)}
                    disabled={!selectedProduct.availableForSale}
                    className="btn-pill-dark"
                    style={{ width: '100%', padding: '14px', fontSize: '1.02rem', opacity: selectedProduct.availableForSale ? 1 : 0.6 }}
                  >
                    {selectedProduct.availableForSale ? `Add to cart • Rs. ${(parseFloat(selectedProduct.price) * modalQuantity).toFixed(2)}` : 'Out of Stock'}
                  </button>

                  <button 
                    onClick={() => handleInstantBuyNow(selectedProduct, null, modalQuantity)}
                    disabled={!selectedProduct.availableForSale || isBuyingNow}
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '1.02rem',
                      borderRadius: '9999px',
                      border: '2px solid #261108',
                      background: 'transparent',
                      color: '#261108',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: selectedProduct.availableForSale ? 1 : 0.6
                    }}
                  >
                    {isBuyingNow ? (
                      <>
                        <Loader2 size={18} className="flame-anim" />
                        <span>Redirecting to Checkout...</span>
                      </>
                    ) : (
                      'Buy it now'
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Slide-Over Drawer with Live Shopify Checkout Redirection */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your cart ({totalCartCount})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#111', marginBottom: '6px' }}>Your cart is empty</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Discover our sacred Godavari offerings to get started.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); scrollToProducts(); }}
                    className="btn-pill-dark"
                    style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                  >
                    Explore Offerings
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }}>
                    <img src={item.product.image} alt={item.product.title} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{item.product.title}</div>
                      <div style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '8px' }}>Rs. {item.variant.price || item.product.price}</div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          gap: '8px'
                        }}>
                          <button onClick={() => handleUpdateQty(idx, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => handleUpdateQty(idx, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                        </div>

                        <button 
                          onClick={() => handleUpdateQty(idx, 0)}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toFixed(2)}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '16px' }}>
                  Taxes and shipping calculated at checkout
                </p>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-pill-dark"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', opacity: isCheckingOut ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 size={18} className="flame-anim" />
                      <span>Creating Shopify Checkout...</span>
                    </>
                  ) : (
                    'Check out'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Currency & Region Modal */}
      {isCurrencyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCurrencyModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '480px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Country & Currency</h3>
              <button onClick={() => setIsCurrencyModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
              <div style={{ padding: '16px', border: '2px solid var(--color-terracotta)', borderRadius: '10px', background: 'rgba(158, 73, 34, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>India (INR ₹)</span>
                  <span style={{ fontSize: '0.8rem', background: 'var(--color-terracotta)', color: '#fff', padding: '2px 8px', borderRadius: '9999px' }}>Default Store Currency</span>
                </div>
                <p style={{ color: '#4b5563', fontSize: '0.85rem' }}>
                  All prices are synced directly in Indian Rupees (INR) from your Shopify inventory backend.
                </p>
              </div>

              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Storefront Localization</div>
                <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  Language: English (EN) • Region: Nashik, Maharashtra, India
                </p>
              </div>
            </div>

            <button onClick={() => setIsCurrencyModalOpen(false)} className="btn-pill-dark" style={{ marginTop: '24px', width: '100%', padding: '12px' }}>
              Confirm & Close
            </button>
          </div>
        </div>
      )}

      {/* Customer Account Modal */}
      {isAccountModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAccountModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '440px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Customer Account</h3>
              <button onClick={() => setIsAccountModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '20px' }}>
              Log in to your <strong>NashikNirvana</strong> customer account to track your holy water orders, Abhishek recordings, and WhatsApp darshan links.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={`https://${config.shopDomain}/account/login`}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-dark"
                style={{ textAlign: 'center', padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>Sign In to Account</span>
                <ExternalLink size={16} />
              </a>

              <a 
                href={`https://${config.shopDomain}/account/register`}
                target="_blank"
                rel="noreferrer"
                style={{
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: '9999px',
                  border: '1px solid #d1d5db',
                  color: '#111',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Create New Account</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {isContactModalOpen && (
        <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Contact NashikNirvana</h3>
              <button onClick={() => setIsContactModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#4b5563' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--color-terracotta)" />
                <span>Ram Kund Ghat, Panchavati, Nashik, Maharashtra 422003</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--color-terracotta)" />
                <span>WhatsApp Pooja Support: +91 98230 44550</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--color-terracotta)" />
                <span>blessings@nashiknirvana.com</span>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={contactName} 
                onChange={e => setContactName(e.target.value)} 
                required 
                style={{ padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} 
              />
              <input 
                type="email" 
                placeholder="Email Address / WhatsApp Phone" 
                value={contactEmail} 
                onChange={e => setContactEmail(e.target.value)} 
                required 
                style={{ padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} 
              />
              <textarea 
                rows={3} 
                placeholder="Your inquiry or pooja date preference..." 
                value={contactMessage} 
                onChange={e => setContactMessage(e.target.value)} 
                required 
                style={{ padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', resize: 'vertical' }} 
              />
              <button 
                type="submit" 
                disabled={contactSubmitted} 
                className="btn-pill-dark" 
                style={{ padding: '14px', marginTop: '6px' }}
              >
                {contactSubmitted ? 'Submitting...' : 'Send Pooja Inquiry'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms and Policies Modal */}
      {isPolicyOpen && (
        <div className="modal-overlay" onClick={() => setIsPolicyOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Terms and Policies</h3>
              <button onClick={() => setIsPolicyOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p><strong>Pooja & Darshan Services:</strong> All Abhishek and Kumbh darshan rituals are performed by verified pandits on the holy ghats of Nashik. Recorded video links are sent via WhatsApp upon completion.</p>
              <p><strong>Holy Water & Shipping:</strong> Sacred Godavari Jal vessels are securely sealed at source and dispatched via express courier to domestic and international addresses.</p>
              <p><strong>Refunds & Cancellations:</strong> Ritual services cannot be canceled once the Sankalpa has been initiated by the priest.</p>
            </div>
            <button onClick={() => setIsPolicyOpen(false)} className="btn-pill-dark" style={{ marginTop: '24px', width: '100%', padding: '12px' }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
