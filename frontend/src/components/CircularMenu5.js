import "./styles.css";
import { GiStreetLight } from "react-icons/gi"
import { MdTranslate } from "react-icons/md";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";
import useCircularMenuVoice from "./CircularMenuVoice";

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { PiMapTrifoldLight } from "react-icons/pi";

function CircularMenu5() {
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
            <a onClick={toggleChat} style={{ color: "white", fontSize: "2.0rem" }} data-voice-action="chat">
              <PiChatsCircleThin />
            </a>
          </li>
          
          {/* Home icon */}
          <li className="menu-item" data-voice-item="home">
            <Link to="/" data-voice-action="home">
              <AiFillHome />
            </Link>
          </li>
          
          {/* Translate icon */}
          <li className="menu-item" data-voice-item="translate">
            <a href="https://heritagetranslator.streamlit.app" target="_blank" data-voice-action="translate">
              <MdTranslate/>
            </a>
          </li>
          
          {/* Itinerary icon */}
          <li className="menu-item" data-voice-item="itinerary">
            <a href="/itinerary" data-voice-action="itinerary">
              <PiMapTrifoldLight />
            </a>
          </li>

          {/* Street View icon */}
          <li className="menu-item" data-voice-item="street">
            <a href="/streetview" data-voice-action="street">
              <GiStreetLight />
            </a>
          </li>
        </ul>
      </nav>

      {showChat && <FloatingChat />}
    </>
  );
}

export default CircularMenu5; 