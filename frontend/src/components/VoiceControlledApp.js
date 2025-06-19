import React, { useState } from 'react';
import VoiceControl from './VoiceControl';
import './VoiceControlledApp.css';

const VoiceControlledApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prevLogs => [...prevLogs, { id: Date.now(), message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleCommand = (command) => {
    addLog(`Received command: ${command}`);
    
    if (command.startsWith('open ') || command.startsWith('navigate ')) {
      const page = command.replace(/^(open |navigate )/, '').toLowerCase();
      handleNavigation(page);
    } 
    else if (command.startsWith('select ')) {
      const item = command.replace('select ', '').toLowerCase();
      handleSelection(item);
    }
    else if (command.startsWith('search ')) {
      const term = command.replace('search ', '');
      setSearchTerm(term);
      addLog(`Searching for: ${term}`);
    }
    else if (command === 'clear') {
      setSearchTerm('');
      setSelectedItem(null);
      addLog('Cleared search and selection');
    }
    else if (command === 'reset') {
      setActiveSection('home');
      setSearchTerm('');
      setSelectedItem(null);
      addLog('Reset application state');
    }
  };

  const handleNavigation = (page) => {
    switch (page) {
      case 'home':
      case 'dashboard':
      case 'products':
      case 'settings':
      case 'profile':
      case 'about':
        setActiveSection(page);
        addLog(`Navigated to ${page}`);
        break;
      default:
        addLog(`Unknown page: ${page}`);
    }
  };

  const handleSelection = (item) => {
    setSelectedItem(item);
    addLog(`Selected item: ${item}`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="section">
            <h2>Home</h2>
            <p>Welcome to the voice-controlled app demo! Try saying commands like:</p>
            <ul>
              <li>"open products"</li>
              <li>"navigate to settings"</li>
              <li>"search for items"</li>
              <li>"select option 1"</li>
            </ul>
          </div>
        );
      case 'dashboard':
        return (
          <div className="section">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Users</h3>
                <p className="stat-value">1,234</p>
              </div>
              <div className="stat-card">
                <h3>Revenue</h3>
                <p className="stat-value">$5,678</p>
              </div>
              <div className="stat-card">
                <h3>Products</h3>
                <p className="stat-value">42</p>
              </div>
            </div>
          </div>
        );
      case 'products':
        const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];
        const filteredProducts = searchTerm ? 
          products.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase())) : 
          products;
          
        return (
          <div className="section">
            <h2>Products</h2>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="product-list">
              {filteredProducts.map((product, index) => (
                <li 
                  key={index} 
                  className={selectedItem === product.toLowerCase() ? 'selected' : ''}
                  onClick={() => handleSelection(product.toLowerCase())}
                >
                  {product}
                </li>
              ))}
            </ul>
            {filteredProducts.length === 0 && <p>No products found matching "{searchTerm}"</p>}
          </div>
        );
      case 'settings':
        return (
          <div className="section">
            <h2>Settings</h2>
            <div className="settings-options">
              <div className="setting-item">
                <label>
                  <input type="checkbox" /> Enable notifications
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" /> Dark mode
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" /> Auto-save
                </label>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="section">
            <h2>Profile</h2>
            <div className="profile-info">
              <div className="avatar">👤</div>
              <h3>User Name</h3>
              <p>user@example.com</p>
              <button>Edit Profile</button>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="section">
            <h2>About</h2>
            <p>This is a demo of a voice-controlled React application using react-speech-recognition.</p>
            <p>You can navigate between pages, search for items, and select options using voice commands.</p>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="voice-controlled-app">
      <header>
        <h1>Voice Controlled App</h1>
        <nav>
          <ul>
            {['Home', 'Dashboard', 'Products', 'Settings', 'Profile', 'About'].map((item) => (
              <li 
                key={item} 
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={() => handleNavigation(item.toLowerCase())}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      
      <main>
        <div className="content">
          {renderSection()}
        </div>
        
        <aside className="sidebar">
          <VoiceControl onCommand={handleCommand} />
          
          <div className="command-logs">
            <h3>Command Logs</h3>
            <ul>
              {logs.map(log => (
                <li key={log.id}>
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-message">{log.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default VoiceControlledApp; 