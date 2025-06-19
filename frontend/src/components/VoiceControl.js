import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { checkSpeechRecognitionSupport, requestMicrophonePermission } from '../utils/speechRecognitionPolyfill';
import 'regenerator-runtime/runtime';
import './VoiceControl.css';

const VoiceControl = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('');
  const [debugInfo, setDebugInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);
  
  const commands = [
    {
      command: 'open *',
      callback: (page) => handleCommand(`open ${page}`)
    },
    {
      command: 'navigate to *',
      callback: (page) => handleCommand(`navigate ${page}`)
    },
    {
      command: 'select *',
      callback: (item) => handleCommand(`select ${item}`)
    },
    {
      command: 'search for *',
      callback: (term) => handleCommand(`search ${term}`)
    },
    {
      command: 'clear',
      callback: () => handleCommand('clear')
    },
    {
      command: 'reset',
      callback: () => handleCommand('reset')
    },
    {
      command: 'stop listening',
      callback: () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
        setMessage('Voice commands paused');
      }
    },
    {
      command: 'start listening',
      callback: () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
        setMessage('Listening for commands...');
      }
    }
  ];

  const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening, isMicrophoneAvailable } = useSpeechRecognition({ commands });
  
  const handleCommand = (command) => {
    setMessage(`Executing: ${command}`);
    if (onCommand) {
      onCommand(command);
    }
  };

  useEffect(() => {
    // Check browser support details
    if (typeof window !== 'undefined') {
      const supportInfo = checkSpeechRecognitionSupport();
      setDebugInfo(prev => ({ ...prev, support: supportInfo }));
    }

    // Check if mic permission already granted
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' })
        .then((permissionStatus) => {
          setPermissionStatus(permissionStatus.state);
          setDebugInfo(prev => ({ ...prev, initialPermission: permissionStatus.state }));
          
          permissionStatus.onchange = () => {
            setPermissionStatus(permissionStatus.state);
            setDebugInfo(prev => ({ ...prev, currentPermission: permissionStatus.state }));
          };
        })
        .catch(error => {
          console.error('Permission query error:', error);
          setDebugInfo(prev => ({ ...prev, permissionError: error.message }));
        });
    } else {
      setDebugInfo(prev => ({ ...prev, permissionsAPI: 'Not supported' }));
    }
  }, []);

  // Sync our state with the actual listening state
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const startListening = () => {
    try {
      // Force a microphone permission request if needed
      requestMicrophonePermission()
        .then(() => {
          SpeechRecognition.startListening({ continuous: true });
          setMessage('Listening for commands...');
          setDebugInfo(prev => ({ ...prev, listeningStarted: new Date().toLocaleTimeString() }));
        })
        .catch(error => {
          setMessage('Microphone access denied. Please allow access in your browser settings.');
          setDebugInfo(prev => ({ ...prev, micPermissionError: error.message }));
        });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setMessage('Error starting speech recognition. Please check browser permissions.');
      setDebugInfo(prev => ({ ...prev, startError: error.message }));
    }
  };

  const stopListening = () => {
    try {
      SpeechRecognition.stopListening();
      setMessage('Voice commands paused');
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="voice-control-error">
        <h3>Speech Recognition Not Available</h3>
        <p>Your browser doesn't support speech recognition.</p>
        <p>Please try Chrome, Edge, or Safari on desktop.</p>
      </div>
    );
  }

  if (!isMicrophoneAvailable && permissionStatus !== 'granted') {
    return (
      <div className="voice-control-error">
        <h3>Microphone Access Required</h3>
        <p>Please allow microphone access in your browser settings to use voice controls.</p>
        <p>Current permission status: {permissionStatus || 'unknown'}</p>
        <button 
          onClick={() => {
            startListening(); // This will trigger the permission prompt
            setTimeout(() => stopListening(), 500);
          }}
          className="permission-button"
        >
          Request Microphone Permission
        </button>
      </div>
    );
  }

  return (
    <div className="voice-control">
      <div className="voice-status">
        <span className={`status-indicator ${isListening ? 'active' : 'inactive'}`} />
        <span className="status-text">{isListening ? 'Listening...' : 'Voice inactive'}</span>
        {permissionStatus && <span className="permission-status">Mic: {permissionStatus}</span>}
      </div>
      {message && <div className="voice-message">{message}</div>}
      <div className="voice-buttons">
        <button 
          onClick={() => {
            if (isListening) {
              stopListening();
            } else {
              startListening();
            }
          }}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div className="voice-transcript">
        <h4>Transcript:</h4>
        <p>{transcript || '(Say something...)'}</p>
      </div>
      <div className="voice-control-help">
        <p>Try saying: "open products", "navigate to settings", "search for items", etc.</p>
        <p><strong>Note:</strong> For best results, use Chrome or Edge on desktop.</p>
      </div>
      <div className="voice-debug-toggle">
        <button 
          onClick={() => setShowDebug(!showDebug)} 
          className="debug-toggle-button"
        >
          {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
        </button>
      </div>
      
      {showDebug && (
        <div className="voice-debug-info">
          <h4>Debug Information</h4>
          <p>Browser: {navigator.userAgent}</p>
          <p>Speech Recognition Support: {debugInfo.support?.speechRecognition ? 'Yes' : 'No'}</p>
          <p>Continuous Listening: {debugInfo.support?.continuousListening ? 'Yes' : 'No'}</p>
          <p>Interim Results: {debugInfo.support?.interimResults ? 'Yes' : 'No'}</p>
          <p>Mic Permission: {permissionStatus || 'unknown'}</p>
          <p>Current Listening State: {listening ? 'Active' : 'Inactive'}</p>
          <p>Microphone Available: {isMicrophoneAvailable ? 'Yes' : 'No'}</p>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default VoiceControl; 