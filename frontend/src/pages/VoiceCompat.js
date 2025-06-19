import React, { useEffect, useState } from 'react';
import { 
  checkSpeechRecognitionSupport, 
  requestMicrophonePermission 
} from '../utils/speechRecognitionPolyfill';
import '../components/VoiceControl.css';
import './VoiceCompat.css';

const VoiceCompat = () => {
  const [compatInfo, setCompatInfo] = useState({
    browser: '',
    os: '',
    speechRecognition: false,
    speechSynthesis: false,
    webkitSpeechRecognition: false,
    SpeechRecognition: false,
    continuousListening: false,
    interimResults: false,
    microphonePermission: 'unknown',
    testing: false,
    errors: []
  });

  const [testStep, setTestStep] = useState(0);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Get browser info
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';

    if (userAgent.indexOf('Chrome') > -1) {
      browser = 'Chrome';
    } else if (userAgent.indexOf('Firefox') > -1) {
      browser = 'Firefox';
    } else if (userAgent.indexOf('Safari') > -1) {
      browser = 'Safari';
    } else if (userAgent.indexOf('Edge') > -1 || userAgent.indexOf('Edg') > -1) {
      browser = 'Edge';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
      browser = 'Internet Explorer';
    }

    if (userAgent.indexOf('Windows') > -1) {
      os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
      os = 'MacOS';
    } else if (userAgent.indexOf('Linux') > -1) {
      os = 'Linux';
    } else if (userAgent.indexOf('Android') > -1) {
      os = 'Android';
    } else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
      os = 'iOS';
    }

    // Check basic feature support
    const supportInfo = checkSpeechRecognitionSupport();
    
    setCompatInfo({
      ...compatInfo,
      browser,
      os,
      speechRecognition: supportInfo.speechRecognition,
      speechSynthesis: 'speechSynthesis' in window,
      webkitSpeechRecognition: 'webkitSpeechRecognition' in window,
      SpeechRecognition: 'SpeechRecognition' in window,
      continuousListening: supportInfo.continuousListening,
      interimResults: supportInfo.interimResults
    });
  }, [compatInfo]);

  const checkMicrophonePermission = async () => {
    setTestStep(1);
    addTestResult('Requesting microphone permission...');
    try {
      await requestMicrophonePermission();
      setCompatInfo({
        ...compatInfo,
        microphonePermission: 'granted'
      });
      addTestResult('✅ Microphone permission granted');
    } catch (error) {
      setCompatInfo({
        ...compatInfo,
        microphonePermission: 'denied',
        errors: [...compatInfo.errors, error.message]
      });
      addTestResult(`❌ Microphone permission denied: ${error.message}`);
    }
    setTestStep(2);
  };

  const testSpeechRecognition = () => {
    setTestStep(3);
    setCompatInfo({
      ...compatInfo,
      testing: true
    });
    addTestResult('Testing speech recognition...');

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        addTestResult('❌ SpeechRecognition not available in this browser');
        setTestStep(4);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        addTestResult('✅ Speech recognition started successfully');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        addTestResult(`✅ Recognized speech: "${transcript}"`);
      };

      recognition.onerror = (event) => {
        addTestResult(`❌ Speech recognition error: ${event.error}`);
        setCompatInfo({
          ...compatInfo,
          errors: [...compatInfo.errors, event.error]
        });
      };

      recognition.onend = () => {
        addTestResult('Speech recognition ended');
        setCompatInfo({
          ...compatInfo,
          testing: false
        });
        setTestStep(4);
      };

      recognition.start();
      
      // Stop after 10 seconds
      setTimeout(() => {
        if (recognition) {
          recognition.stop();
        }
      }, 10000);
    } catch (error) {
      addTestResult(`❌ Error initializing speech recognition: ${error.message}`);
      setCompatInfo({
        ...compatInfo,
        testing: false,
        errors: [...compatInfo.errors, error.message]
      });
      setTestStep(4);
    }
  };

  const addTestResult = (result) => {
    setTestResults(prev => [...prev, { 
      id: Date.now(), 
      message: result, 
      time: new Date().toLocaleTimeString() 
    }]);
  };

  return (
    <div className="voice-compat-page">
      <div className="voice-control">
        <h2>Speech Recognition Compatibility Test</h2>
        
        <div className="compat-info">
          <h3>Browser Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Browser:</td>
                <td>{compatInfo.browser}</td>
              </tr>
              <tr>
                <td>Operating System:</td>
                <td>{compatInfo.os}</td>
              </tr>
              <tr>
                <td>User Agent:</td>
                <td className="user-agent">{navigator.userAgent}</td>
              </tr>
            </tbody>
          </table>
          
          <h3>Speech Recognition Support</h3>
          <table>
            <tbody>
              <tr>
                <td>Speech Recognition API:</td>
                <td>{compatInfo.speechRecognition ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>Standard API:</td>
                <td>{compatInfo.SpeechRecognition ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>WebKit API:</td>
                <td>{compatInfo.webkitSpeechRecognition ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>Speech Synthesis:</td>
                <td>{compatInfo.speechSynthesis ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>Continuous Listening:</td>
                <td>{compatInfo.continuousListening ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>Interim Results:</td>
                <td>{compatInfo.interimResults ? '✅ Supported' : '❌ Not supported'}</td>
              </tr>
              <tr>
                <td>Microphone Permission:</td>
                <td>{compatInfo.microphonePermission === 'granted' 
                  ? '✅ Granted' 
                  : compatInfo.microphonePermission === 'denied' 
                    ? '❌ Denied' 
                    : '❓ Unknown'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="test-controls">
          {testStep === 0 && (
            <button 
              onClick={checkMicrophonePermission}
              disabled={compatInfo.testing}
              className="test-button"
            >
              1. Test Microphone Permission
            </button>
          )}
          
          {testStep === 2 && (
            <button 
              onClick={testSpeechRecognition}
              disabled={compatInfo.testing || compatInfo.microphonePermission !== 'granted'}
              className="test-button"
            >
              2. Test Speech Recognition
            </button>
          )}
          
          {testStep === 4 && (
            <button 
              onClick={() => {
                setTestStep(0);
                setTestResults([]);
              }}
              className="test-button"
            >
              Restart Tests
            </button>
          )}
          
          {compatInfo.testing && (
            <p className="testing-message">
              <span className="status-indicator active"></span>
              Listening... Please speak into your microphone
            </p>
          )}
        </div>
        
        {testResults.length > 0 && (
          <div className="test-results">
            <h3>Test Results</h3>
            <ul>
              {testResults.map(result => (
                <li key={result.id}>
                  <span className="result-time">{result.time}</span>
                  <span className="result-message">{result.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {compatInfo.errors.length > 0 && (
          <div className="error-summary">
            <h3>Errors Encountered</h3>
            <ul>
              {compatInfo.errors.map((error, index) => (
                <li key={index} className="error-item">{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="compatibility-help">
          <h3>Browser Compatibility</h3>
          <p><strong>Recommended Browsers:</strong></p>
          <ul>
            <li>Chrome (Desktop) - Full support</li>
            <li>Edge (Desktop) - Full support</li>
            <li>Safari (Desktop) - Partial support</li>
            <li>Chrome (Android) - Partial support</li>
          </ul>
          <p><strong>Not Supported:</strong></p>
          <ul>
            <li>Firefox - No support for Speech Recognition API</li>
            <li>Safari (iOS) - Limited support</li>
            <li>Internet Explorer - No support</li>
          </ul>
          <p>For best results, use Chrome or Edge on desktop.</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceCompat; 