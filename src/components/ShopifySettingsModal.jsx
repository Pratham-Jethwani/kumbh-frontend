import React, { useState } from 'react';
import { X, Check, AlertCircle, ShoppingBag, Key, Globe, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredShopifyConfig, saveShopifyConfig, storefrontApiRequest } from '../shopify';

export default function ShopifySettingsModal({ isOpen, onClose, onConfigSaved }) {
  if (!isOpen) return null;

  const initialConfig = getStoredShopifyConfig();
  const [shopDomain, setShopDomain] = useState(initialConfig.shopDomain || '');
  const [storefrontAccessToken, setStorefrontAccessToken] = useState(initialConfig.storefrontAccessToken || '');
  const [apiVersion, setApiVersion] = useState(initialConfig.apiVersion || '2024-07');
  const [testStatus, setTestStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestStatus(null);
    try {
      const testQuery = `
        query testShop {
          shop {
            name
            description
            primaryDomain {
              url
            }
          }
        }
      `;
      const config = { shopDomain, storefrontAccessToken, apiVersion };
      const data = await storefrontApiRequest(testQuery, {}, config);
      if (data?.shop?.name) {
        setTestStatus({
          type: 'success',
          message: `Connected successfully to "${data.shop.name}"!`
        });
      } else {
        setTestStatus({
          type: 'error',
          message: 'Connection responded but shop details could not be retrieved.'
        });
      }
    } catch (err) {
      setTestStatus({
        type: 'error',
        message: err.message || 'Failed to connect to Shopify Storefront API'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const config = {
      shopDomain: shopDomain.trim(),
      storefrontAccessToken: storefrontAccessToken.trim(),
      apiVersion,
      isConnected: Boolean(shopDomain.trim() && storefrontAccessToken.trim())
    };
    saveShopifyConfig(config);
    if (onConfigSaved) onConfigSaved(config);
    onClose();
  };

  const handleResetToDemo = () => {
    const config = {
      shopDomain: '',
      storefrontAccessToken: '',
      apiVersion: '2024-07',
      isConnected: false
    };
    saveShopifyConfig(config);
    setShopDomain('');
    setStorefrontAccessToken('');
    setTestStatus(null);
    if (onConfigSaved) onConfigSaved(config);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px', padding: '32px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={20} color="#4ade80" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                Shopify Headless Sales Channel
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Connect your custom frontend to your live Shopify store
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Informational Callout */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.08)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          fontSize: '0.83rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '20px'
        }}>
          💡 <strong>How Headless Works:</strong> Create a Headless / Storefront API app in your Shopify Admin Settings &rarr; Apps and Sales Channels &rarr; Develop Apps, then paste your domain and public token below.
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Shopify Store Domain
            </label>
            <input 
              type="text" 
              placeholder="e.g. your-kumbh-store.myshopify.com"
              value={shopDomain}
              onChange={e => setShopDomain(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Storefront API Access Token
            </label>
            <input 
              type="password" 
              placeholder="e.g. shpat_xxxxxxxxxxxxxxxx or public token"
              value={storefrontAccessToken}
              onChange={e => setStorefrontAccessToken(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Storefront API Version
            </label>
            <select
              value={apiVersion}
              onChange={e => setApiVersion(e.target.value)}
              style={{
                width: '100%',
                background: '#131722',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            >
              <option value="2024-07">2024-07 (Latest Stable)</option>
              <option value="2024-04">2024-04</option>
              <option value="2024-01">2024-01</option>
            </select>
          </div>
        </div>

        {/* Test Result Message */}
        {testStatus && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '20px',
            background: testStatus.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(230, 57, 70, 0.15)',
            border: `1px solid ${testStatus.type === 'success' ? '#4ade80' : '#e63946'}`,
            color: testStatus.type === 'success' ? '#4ade80' : '#ff7a85'
          }}>
            {testStatus.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{testStatus.message}</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            onClick={handleResetToDemo}
            className="btn btn-secondary" 
            style={{ fontSize: '0.85rem', padding: '10px 16px' }}
          >
            Reset to Demo Catalog
          </button>

          <button 
            type="button" 
            onClick={handleTestConnection}
            disabled={!shopDomain || !storefrontAccessToken || isTesting}
            className="btn btn-secondary"
            style={{
              fontSize: '0.85rem',
              padding: '10px 18px',
              opacity: (!shopDomain || !storefrontAccessToken || isTesting) ? 0.5 : 1
            }}
          >
            {isTesting ? 'Verifying...' : 'Test Connection'}
          </button>

          <button 
            type="button" 
            onClick={handleSave}
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '10px 22px' }}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
