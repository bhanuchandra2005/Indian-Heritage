// Speech Recognition API Polyfill
import 'regenerator-runtime/runtime';

// This function sets up the SpeechRecognition object with the appropriate browser prefix
export const setupSpeechRecognition = () => {
  // Check if the browser has native support for SpeechRecognition
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('This browser does not support speech recognition natively.');
    return null;
  }

  // Use the appropriate implementation based on browser support
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  // Set up grammar list for better recognition
  if (window.SpeechGrammarList) {
    window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    
    // Create a grammar list for common commands
    const commands = [
      'open', 'navigate', 'go to', 'select', 'search', 'find', 
      'clear', 'reset', 'start', 'stop', 'help'
    ];
    
    const grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;';
    const speechRecognitionList = new window.SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    
    return { 
      SpeechRecognition: window.SpeechRecognition,
      grammarList: speechRecognitionList
    };
  }
  
  return { 
    SpeechRecognition: window.SpeechRecognition,
    grammarList: null
  };
};

// Check if the browser supports the necessary speech recognition features
export const checkSpeechRecognitionSupport = () => {
  const support = {
    speechRecognition: false,
    continuousListening: false,
    interimResults: false,
    alternatives: false
  };
  
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    support.speechRecognition = true;
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Check for continuous listening support
      recognition.continuous = true;
      if (recognition.continuous === true) {
        support.continuousListening = true;
      }
      
      // Check for interim results support
      recognition.interimResults = true;
      if (recognition.interimResults === true) {
        support.interimResults = true;
      }
      
      // Check for alternatives support
      recognition.maxAlternatives = 5;
      if (recognition.maxAlternatives === 5) {
        support.alternatives = true;
      }
      
      // Clean up
      recognition.abort();
    } catch (error) {
      console.error('Error testing speech recognition capabilities:', error);
    }
  }
  
  return support;
};

// Handle browser microphone permission
export const requestMicrophonePermission = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      reject('This browser does not support the MediaDevices API');
      return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Stop all tracks immediately, we just needed permission
        stream.getTracks().forEach(track => track.stop());
        resolve(true);
      })
      .catch(error => {
        console.error('Microphone permission error:', error);
        reject(error);
      });
  });
};

export default setupSpeechRecognition; 