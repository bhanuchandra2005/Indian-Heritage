import "./styles.css";
import { MdStorefront } from "react-icons/md";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";
import { MdTranslate } from "react-icons/md";
import useCircularMenuVoice from "./CircularMenuVoice";

import { PiMapTrifoldLight } from "react-icons/pi";
import { GiDirectionSigns } from "react-icons/gi";

function CircularMenu1() {
  const [showChat, setShowChat] = useState(false);
  const menuTogglerRef = useCircularMenuVoice();

  const toggleChat = (e) => {
    e.preventDefault();
    setShowChat((prev) => !prev);
  };

  return (                                                                                                                                                                           
    <>
      <nav className="menu" id="menu">
        <input 
          className="menu-toggler" 
          type="checkbox" 
          ref={menuTogglerRef}
          data-voice-target="circular-menu"
        />
        <label htmlFor="menu-toggler"></label>

        <ul style={{ transition: "all 300ms linear" }}>
          {/* Chat icon */}
          <li className="menu-item" data-voice-item="chat">
            <a href="#chat" onClick={toggleChat} style={{ color: "white", fontSize: "2.0rem" }} data-voice-action="chat">
              <PiChatsCircleThin />
            </a>
          </li>
          
          {/* Translate icon */}
          <li className="menu-item" data-voice-item="translate">
            <a href="https://heritagetranslator.streamlit.app" target="_blank" rel="noreferrer" data-voice-action="translate">
              <MdTranslate/>
            </a>
          </li>
          
          {/* Trip planner icon */}
          <li className="menu-item" data-voice-item="trip">
            <a href="/" data-voice-action="home">
              <GiDirectionSigns/>
            </a>
          </li>
          
          {/* Itinerary icon */}                 
          <li className="menu-item" data-voice-item="itinerary">
            <a href="/itinerary" data-voice-action="itinerary">
              <PiMapTrifoldLight />
            </a>
          </li>

          {/* Trade icon */}
          <li className="menu-item" data-voice-item="trade">
            <a href="/trade" data-voice-action="trade">
              <MdStorefront />
            </a>
          </li>
        </ul>
      </nav>

      {showChat && <FloatingChat />}
    </>
  );
}

export default CircularMenu1; 