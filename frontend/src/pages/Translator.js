import React from 'react';
import "../styles/Translator.css";

const TranslatePage = () => {
  return (
    <div className="translate-container">
      <h1 className="translate-heading">🌐 Language Translator</h1>
      <p className="translate-subheading">
        Explore Indian languages with voice and translation using our AI-powered tool.
      </p>

      <a
        className="translator-btn"
        href="https://heritagetranslator.streamlit.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Translator Tool 🚀
      </a>
    </div>
  );
};

export default TranslatePage;
