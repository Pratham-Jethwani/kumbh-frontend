import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  AlertCircle,
  Truck,
  Video
} from 'lucide-react';

const COUNTRY_DIAL_CODES = [
  { code: '+91', country: 'IN', label: 'India (+91)' },
  { code: '+1', country: 'US', label: 'USA / Canada (+1)' },
  { code: '+44', country: 'GB', label: 'United Kingdom (+44)' },
  { code: '+61', country: 'AU', label: 'Australia (+61)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
  { code: '+65', country: 'SG', label: 'Singapore (+65)' },
  { code: '+49', country: 'DE', label: 'Germany (+49)' },
  { code: '+33', country: 'FR', label: 'France (+33)' },
  { code: '+60', country: 'MY', label: 'Malaysia (+60)' }
];

export default function ProductCheckout({ 
  product, 
  quantity = 1,
  currentCountry = 'IN',
  currencySymbol = 'Rs. ',
  onBack, 
  onCompleteCheckout,
  isProcessing = false 
}) {
  const titleLower = (product?.title || '').toLowerCase();

  // Exactly as requested:
  // "Sacred Godavari Jal & Kumbh Darshan Experience" is physical -> requires address and mobile number.
  // Other two products are NOT physical -> only valid WhatsApp number is needed (no address).
  const isPhysicalProduct = titleLower.includes('sacred godavari jal');

  // Form State
  const defaultDialCode = currentCountry === 'US' ? '+1' : '+91';
  const [dialCode, setDialCode] = useState(defaultDialCode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');

  // Physical Shipping Address State (only used if isPhysicalProduct)
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name';
    }

    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phoneNumber = isPhysicalProduct 
        ? 'Please enter a valid mobile number for delivery' 
        : 'Please enter a valid WhatsApp number for video delivery';
    } else if (cleanPhone.length < 8 || cleanPhone.length > 13) {
      errs.phoneNumber = 'Please enter a valid 8-13 digit phone number';
    }

    if (isPhysicalProduct) {
      if (!addressLine1.trim()) errs.addressLine1 = 'Street address is required';
      if (!city.trim()) errs.city = 'City is required';
      if (!postalCode.trim()) errs.postalCode = 'PIN / Postal code is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 80, behavior: 'smooth' });
      return;
    }

    const fullPhone = `${dialCode} ${phoneNumber.trim()}`;

    // Prepare custom order attributes for Shopify
    const attributes = [
      { key: 'Customer Name', value: customerName.trim() },
      { 
        key: isPhysicalProduct ? 'Contact Mobile' : 'WhatsApp Number', 
        value: fullPhone 
      },
      { 
        key: 'Delivery Type', 
        value: isPhysicalProduct ? 'Physical Holy Vessel Dispatch' : '100% Digital Sanctified Video' 
      }
    ];

    if (isPhysicalProduct) {
      attributes.push({
        key: 'Delivery Address',
        value: `${addressLine1.trim()}, ${addressLine2.trim() ? addressLine2.trim() + ', ' : ''}${city.trim()}, ${stateName.trim()} ${postalCode.trim()}`
      });
    }

    // Build concise order note for Shopify Admin
    const note = isPhysicalProduct
      ? `CUSTOMER: ${customerName.trim()} | PHONE: ${fullPhone} | ADDRESS: ${addressLine1.trim()}, ${city.trim()} - ${postalCode.trim()}`
      : `CUSTOMER: ${customerName.trim()} | WHATSAPP: ${fullPhone} | TYPE: Digital Video Delivery`;

    onCompleteCheckout({
      customerName: customerName.trim(),
      phoneNumber: fullPhone,
      email: email.trim(),
      isPhysicalProduct,
      shippingAddress: isPhysicalProduct ? {
        addressLine1,
        addressLine2,
        city,
        stateName,
        postalCode
      } : null,
      customDetails: {
        attributes,
        note,
        buyerIdentity: {
          phone: fullPhone.replace(/\s+/g, ''),
          email: email.trim()
        }
      }
    });
  };

  const unitPrice = parseFloat(product?.price || '0');
  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f6f2', color: '#1a1008', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Top Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e8dfd5',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button 
            type="button"
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#714a2c',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '6px 0'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to store</span>
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: '#391604', letterSpacing: '-0.02em' }}>
              NashikNirvana
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: '#15803d',
            fontWeight: 500
          }}>
            <Lock size={14} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '32px 20px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '36px',
          alignItems: 'start'
        }} className="checkout-two-col">

          {/* Left Column: Minimal Form Fields */}
          <div>
            <form onSubmit={handleSubmit} noValidate>

              {/* Contact Information */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e7ded5',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#391604', margin: 0 }}>
                    {isPhysicalProduct ? 'Contact & Delivery Details' : 'Devotee Contact Information'}
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: isPhysicalProduct ? '#b45309' : '#059669', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    {isPhysicalProduct ? (
                      <><Truck size={14} /> Physical Delivery</>
                    ) : (
                      <><Video size={14} /> WhatsApp Delivery</>
                    )}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                      Full Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} color="#9c7a60" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                      <input 
                        type="text"
                        value={customerName}
                        onChange={e => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors(prev => ({ ...prev, customerName: null }));
                        }}
                        placeholder="Enter full name"
                        style={{
                          width: '100%',
                          padding: '11px 14px 11px 38px',
                          borderRadius: '7px',
                          border: errors.customerName ? '1px solid #dc2626' : '1px solid #d4c5b6',
                          fontSize: '0.92rem',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    {errors.customerName && (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                        {errors.customerName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                      Email Address (for order confirmation) <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} color="#9c7a60" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                      <input 
                        type="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                        }}
                        placeholder="you@example.com"
                        style={{
                          width: '100%',
                          padding: '11px 14px 11px 38px',
                          borderRadius: '7px',
                          border: errors.email ? '1px solid #dc2626' : '1px solid #d4c5b6',
                          fontSize: '0.92rem',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    {errors.email && (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                      {isPhysicalProduct ? 'Valid Mobile Number' : 'Valid WhatsApp Number'} <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select
                        value={dialCode}
                        onChange={e => setDialCode(e.target.value)}
                        style={{
                          padding: '11px 10px',
                          borderRadius: '7px',
                          border: '1px solid #d4c5b6',
                          background: '#fff',
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        {COUNTRY_DIAL_CODES.map(c => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>

                      <div style={{ position: 'relative', flex: 1 }}>
                        <Phone size={16} color="#9c7a60" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                        <input 
                          type="tel"
                          value={phoneNumber}
                          onChange={e => {
                            setPhoneNumber(e.target.value);
                            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: null }));
                          }}
                          placeholder={isPhysicalProduct ? "10-digit mobile number" : "10-digit WhatsApp number"}
                          style={{
                            width: '100%',
                            padding: '11px 14px 11px 38px',
                            borderRadius: '7px',
                            border: errors.phoneNumber ? '1px solid #dc2626' : '1px solid #d4c5b6',
                            fontSize: '0.92rem',
                            background: '#fff',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                    {errors.phoneNumber ? (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                        {errors.phoneNumber}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.75rem', color: '#7a5a41', marginTop: '4px' }}>
                        {isPhysicalProduct 
                          ? 'Used for courier delivery updates and dispatch notification.' 
                          : 'Your sacred ritual darshan video will be shared directly to this WhatsApp number.'}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Physical Shipping Address - ONLY RENDERED FOR PHYSICAL PRODUCT */}
              {isPhysicalProduct && (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7ded5',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <MapPin size={18} color="#984b24" />
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#391604', margin: 0 }}>
                      Delivery Address
                    </h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    {/* Address Line 1 */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                        Street Address / Flat / House No. <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input 
                        type="text"
                        value={addressLine1}
                        onChange={e => {
                          setAddressLine1(e.target.value);
                          if (errors.addressLine1) setErrors(prev => ({ ...prev, addressLine1: null }));
                        }}
                        placeholder="House number, apartment name, street"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '7px',
                          border: errors.addressLine1 ? '1px solid #dc2626' : '1px solid #d4c5b6',
                          fontSize: '0.92rem',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.addressLine1 && (
                        <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                          {errors.addressLine1}
                        </div>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                        Apartment, suite, landmark (Optional)
                      </label>
                      <input 
                        type="text"
                        value={addressLine2}
                        onChange={e => setAddressLine2(e.target.value)}
                        placeholder="Landmark or additional directions"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '7px',
                          border: '1px solid #d4c5b6',
                          fontSize: '0.92rem',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* City, State, PIN Code */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                          City <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input 
                          type="text"
                          value={city}
                          onChange={e => {
                            setCity(e.target.value);
                            if (errors.city) setErrors(prev => ({ ...prev, city: null }));
                          }}
                          placeholder="City"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '7px',
                            border: errors.city ? '1px solid #dc2626' : '1px solid #d4c5b6',
                            fontSize: '0.92rem',
                            background: '#fff',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        {errors.city && (
                          <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                            {errors.city}
                          </div>
                        )}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                          State
                        </label>
                        <input 
                          type="text"
                          value={stateName}
                          onChange={e => setStateName(e.target.value)}
                          placeholder="State"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '7px',
                            border: '1px solid #d4c5b6',
                            fontSize: '0.92rem',
                            background: '#fff',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a2c17', marginBottom: '6px' }}>
                          PIN Code <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input 
                          type="text"
                          value={postalCode}
                          onChange={e => {
                            setPostalCode(e.target.value);
                            if (errors.postalCode) setErrors(prev => ({ ...prev, postalCode: null }));
                          }}
                          placeholder="PIN Code"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '7px',
                            border: errors.postalCode ? '1px solid #dc2626' : '1px solid #d4c5b6',
                            fontSize: '0.92rem',
                            background: '#fff',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        {errors.postalCode && (
                          <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                            {errors.postalCode}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #984b24 0%, #7a3212 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(152, 75, 36, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isProcessing ? 0.8 : 1,
                  boxSizing: 'border-box'
                }}
              >
                {isProcessing ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Proceed to Payment • {currencySymbol}{totalPrice}</span>
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.78rem', color: '#7a5a41' }}>
                Secure 256-Bit SSL Encrypted Payment
              </div>

            </form>
          </div>

          {/* Right Column: Clean Order Summary */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e7ded5',
              borderRadius: '12px',
              padding: '22px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#391604', margin: '0 0 16px 0', borderBottom: '1px solid #f0e9e1', paddingBottom: '10px' }}>
                Order Summary
              </h3>

              {/* Item Card */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '80px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#823816'
                }}>
                  <img 
                    src={product?.image || '/images/sacred-kumbh.webp'} 
                    alt={product?.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#271206', lineHeight: 1.35 }}>
                    {product?.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#886242', marginTop: '3px' }}>
                    Qty: {quantity}
                  </div>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#984b24' }}>
                  {currencySymbol}{unitPrice.toFixed(2)}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div style={{ borderTop: '1px solid #f0e9e1', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#684a32' }}>
                  <span>Subtotal</span>
                  <span>{currencySymbol}{totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#684a32' }}>
                  <span>Delivery</span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{
                  borderTop: '1px solid #e7ded5',
                  paddingTop: '12px',
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#271206'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#984b24' }}>{currencySymbol}{totalPrice}</span>
                </div>
              </div>

              {/* Minimal Trust Badge */}
              <div style={{
                marginTop: '16px',
                borderTop: '1px solid #f0e9e1',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#7a5a41'
              }}>
                <ShieldCheck size={14} color="#984b24" />
                <span>Authentic Kumbh Seva • Level 1 PCI-DSS Secure</span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
