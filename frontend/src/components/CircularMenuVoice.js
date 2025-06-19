import { useRef, useEffect } from 'react';

/**
 * CircularMenuVoice - A utility component to add voice control functionality to circular menus
 * 
 * This component doesn't render anything, but adds event listeners and refs to make
 * circular menu components voice-controllable.
 * 
 * @param {Function} onVoiceCommand - Optional callback to handle voice commands
 * @returns {Object} - Returns the ref to be attached to the menu toggler input
 */
const useCircularMenuVoice = (onVoiceCommand) => {
  const menuTogglerRef = useRef(null);
  
  // Allow the menu to be controlled programmatically through window events
  useEffect(() => {
    const handleVoiceMenuToggle = (event) => {
      if (event.detail && event.detail.source === 'voice') {
        if (menuTogglerRef.current) {
          menuTogglerRef.current.checked = event.detail.open;
          
          // Call the callback if provided
          if (onVoiceCommand && typeof onVoiceCommand === 'function') {
            onVoiceCommand(event.detail);
          }
        }
      }
    };

    window.addEventListener('toggle-circular-menu', handleVoiceMenuToggle);
    
    return () => {
      window.removeEventListener('toggle-circular-menu', handleVoiceMenuToggle);
    };
  }, [onVoiceCommand]);
  
  return menuTogglerRef;
};

export default useCircularMenuVoice; 