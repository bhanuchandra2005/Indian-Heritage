import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import { checkSpeechRecognitionSupport, requestMicrophonePermission } from '../utils/speechRecognitionPolyfill';
import 'regenerator-runtime/runtime';
import './GlobalVoiceControl.css';

/**
 * Global Voice Control component that enables voice navigation throughout the application
 */
const GlobalVoiceControl = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const routes = {
    home: '/',
    translate: '/translate',
    trade: '/trade',
    itinerary: '/itinerary'
  };

  // Commands that the voice recognition will respond to
  const commands = [
    // Navigation commands
    {
      command: 'go to *',
      callback: (destination) => handleNavigation(destination)
    },
    {
      command: 'navigate to *',
      callback: (destination) => handleNavigation(destination)
    },
    {
      command: 'open *',
      callback: (destination) => handleNavigation(destination)
    },
    
    // Circular menu commands
    {
      command: 'show menu',
      callback: () => toggleCircularMenu(true)
    },
    {
      command: 'open menu',
      callback: () => toggleCircularMenu(true)
    },
    {
      command: 'close menu',
      callback: () => toggleCircularMenu(false)
    },
    {
      command: 'hide menu',
      callback: () => toggleCircularMenu(false)
    },
    {
      command: 'toggle menu',
      callback: () => toggleCircularMenu()
    },
    
    // Menu item selection commands
    {
      command: 'select * (item)',
      callback: (item) => selectMenuItem(item)
    },
    {
      command: 'click * (item)',
      callback: (item) => selectMenuItem(item)
    },
    {
      command: 'choose * (item)',
      callback: (item) => selectMenuItem(item)
    },
    
    // Chat commands
    {
      command: 'open chat',
      callback: () => handleChatToggle(true)
    },
    {
      command: 'show chat',
      callback: () => handleChatToggle(true)
    },
    {
      command: 'close chat',
      callback: () => handleChatToggle(false)
    },
    {
      command: 'hide chat',
      callback: () => handleChatToggle(false)
    },
    
    // Voice control UI commands
    {
      command: 'show voice control',
      callback: () => setIsVisible(true)
    },
    {
      command: 'hide voice control',
      callback: () => setIsVisible(false)
    },
    {
      command: 'stop listening',
      callback: () => {
        stopListening();
        setMessage('Voice commands paused');
      }
    },
    {
      command: 'start listening',
      callback: () => {
        startListening();
        setMessage('Listening for commands...');
      }
    },
    {
      command: 'toggle voice',
      callback: () => setIsVisible(prev => !prev)
    }
  ];

  const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition({ commands });
  
  // Initialize and check browser support
  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const supportInfo = checkSpeechRecognitionSupport();
      console.log('Speech recognition support:', supportInfo);
    }
    
    // Start listening on initial load (if browser supports it)
    if (browserSupportsSpeechRecognition) {
      startListening();
    }
    
    // Add keyboard shortcut to toggle voice control visibility
    const handleKeyDown = (e) => {
      // Alt+V to toggle voice control visibility
      if (e.altKey && e.key === 'v') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      stopListening();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [browserSupportsSpeechRecognition]);
  
  // Sync our state with the actual listening state
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  // Start speech recognition 
  const startListening = () => {
    try {
      // Force a microphone permission request if needed
      requestMicrophonePermission()
        .then(() => {
          SpeechRecognition.startListening({ continuous: true });
          setMessage('Listening for commands...');
        })
        .catch(error => {
          console.error('Microphone permission error:', error);
          setMessage('Microphone access denied. Please allow access in your browser settings.');
        });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setMessage('Error starting speech recognition. Please check browser permissions.');
    }
  };

  // Stop speech recognition
  const stopListening = () => {
    try {
      SpeechRecognition.stopListening();
      setMessage('Voice commands paused');
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  // Handle navigation commands
  const handleNavigation = (destination) => {
    const dest = destination.toLowerCase().trim();
    setMessage(`Navigating to ${dest}...`);
    
    // Check if the destination exists in our route map
    if (routes[dest]) {
      if (routes[dest] === null) {
        // Special case for items without direct routes like "chat"
        if (dest === 'chat') {
          handleChatToggle(true);
        }
      } else {
        navigate(routes[dest]);
      }
    } else {
      // Try to find a close match
      const possibleMatches = Object.keys(routes).filter(key => 
        key.includes(dest) || dest.includes(key)
      );
      
      if (possibleMatches.length > 0) {
        navigate(routes[possibleMatches[0]]);
      } else {
        setMessage(`I don't know how to navigate to ${dest}`);
      }
    }
  };

  // Toggle the circular menu via voice
  const toggleCircularMenu = (forceState) => {
    try {
      // Get the menu toggler checkbox
      const menuToggler = document.querySelector('.menu-toggler');
      if (menuToggler) {
        const newState = forceState !== undefined ? forceState : !menuToggler.checked;
        menuToggler.checked = newState;
        setMessage(newState ? 'Menu opened' : 'Menu closed');
        
        // Also dispatch a custom event that our CircularMenu components can listen for
        const event = new CustomEvent('toggle-circular-menu', {
          detail: { 
            open: newState,
            source: 'voice'
          },
          bubbles: true
        });
        window.dispatchEvent(event);
      } else {
        setMessage('Menu not found on this page');
      }
    } catch (error) {
      console.error('Error toggling menu:', error);
      setMessage('Error toggling menu');
    }
  };

  // Select a menu item by voice
  const selectMenuItem = (item) => {
    try {
      // First ensure the circular menu is open
      toggleCircularMenu(true);
      
      const normalizedItem = item.toLowerCase().trim();
      setMessage(`Selecting ${normalizedItem}...`);
      
      // Short delay to ensure menu is fully opened
      setTimeout(() => {
        // Look for menu items with the matching data attribute
        const menuItems = document.querySelectorAll(`[data-voice-item="${normalizedItem}"]`);
        if (menuItems.length > 0) {
          // Click the link inside this menu item
          const link = menuItems[0].querySelector('a');
          if (link) {
            link.click();
          }
        } else {
          // Try direct navigation as a fallback
          handleNavigation(normalizedItem);
        }
      }, 300);
    } catch (error) {
      console.error('Error selecting menu item:', error);
      setMessage(`Error selecting ${item}`);
    }
  };

  // Handle chat toggle
  const handleChatToggle = (forceState) => {
    try {
      // First make sure the menu is open
      toggleCircularMenu(true);
      
      // Short delay to ensure menu is visible
      setTimeout(() => {
        // Find the chat button in the menu
        const chatItem = document.querySelector('[data-voice-item="chat"]');
        if (chatItem) {
          const chatButton = chatItem.querySelector('a');
          if (chatButton) {
            chatButton.click();
            setMessage(forceState ? 'Opening chat' : 'Closing chat');
          }
        } else {
          setMessage('Chat not available on this page');
        }
      }, 300);
    } catch (error) {
      console.error('Error toggling chat:', error);
      setMessage('Error toggling chat');
    }
  };

  // Don't render anything if speech recognition is not supported
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className={`global-voice-control ${isVisible ? 'visible' : 'minimized'}`}>
      {isVisible ? (
        <>
          <div className="voice-header">
            <h4>Voice Control</h4>
            <button 
              className="minimize-button"
              onClick={() => setIsVisible(false)}
              aria-label="Minimize voice control"
            >
              −
            </button>
          </div>
          
          <div className="voice-status">
            <span className={`status-indicator ${isListening ? 'active' : 'inactive'}`} />
            <span className="status-text">{isListening ? 'Listening...' : 'Voice inactive'}</span>
          </div>
          
          {message && <div className="voice-message">{message}</div>}
          
          <div className="voice-buttons">
            <button 
              onClick={() => isListening ? stopListening() : startListening()}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
          </div>
          
          <div className="voice-commands">
            <h5>Available Commands:</h5>
            <ul>
              <li>"go to home/translate/trade/itinerary"</li>
              <li>"show menu" / "hide menu"</li>
              <li>"select translate/trade/itinerary/trip"</li>
              <li>"open chat" / "close chat"</li>
              <li>"stop listening" / "start listening"</li>
              <li>"hide voice control"</li>
            </ul>
          </div>
          
          {transcript && (
            <div className="voice-transcript">
              <span>Heard: {transcript}</span>
              <button 
                onClick={resetTranscript}
                className="reset-button"
              >
                Clear
              </button>
            </div>
          )}
        </>
      ) : (
        <button 
          className="voice-activate-button"
          onClick={() => setIsVisible(true)}
          aria-label="Show voice control"
        >
          <span className={`voice-icon ${isListening ? 'active' : ''}`}>🎤</span>
        </button>
      )}
    </div>
  );
};

export default GlobalVoiceControl; 