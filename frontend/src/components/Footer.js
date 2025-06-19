import React from "react";
import "../styles/Footer.css";

export const Footer = () => {
  const SocialUrls = [
    {
      id: "1",
      name: "Srakshin Chityala",
      LI: "https://www.linkedin.com/in/srakshin/",
      GH: "https://github.com/Srakshin",
      email: "bsrakshin@gmail.com",
      phone: "+91 8341606749"
    },
    {
      id: "2",
      name: "Megharaj Bhanu Chandra",
      LI: "https://www.linkedin.com/in/bhanu-chandra-1b6929269/",
      GH: "#",
      email: "mbhanuchandra003@gmail.com",
      phone: "+91 8374108107"
    },
    {
      id: "3",
      name: "Jashwanth Mareddy",
      LI: "https://www.linkedin.com/in/jashwanth-mareddy-7361a3216/",
      GH: "https://github.com/jashwanth1234110",
      email: "jashwanthmareddy@gmail.com",
      phone: "+91 9347310160"
    },
    {
      id: "4",
      name: "Kaushal Siripuram",
      LI: "https://www.linkedin.com/in/siripuram-kaushal-9b7844350/",
      GH: "https://github.com/Kaushal1201",
      email: "kaushalsiripuram@gmail.com",
      phone: "+91 9063304286"
    },
  ];

  return (
    <footer id="my-footer" className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-sections horizontal">
            <div className="footer-section">
              <h2 className="footer-title">Know us!</h2>
              <div className="footer-columns">
                <div className="footer-column">
                  <h3 className="footer-subtitle">GitHub</h3>
                  <ul className="footer-list">
                    {SocialUrls.map((item) => (
                      <li key={`gh-${item.id}`}>
                        <a href={item.GH} target="_blank" rel="noreferrer">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-subtitle">LinkedIn</h3>
                  <ul className="footer-list">
                    {SocialUrls.map((item) => (
                      <li key={`li-${item.id}`}>
                        <a href={item.LI} target="_blank" rel="noreferrer">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h2 className="footer-title">Contact us!</h2>
              <div className="footer-columns">
                <div className="footer-column">
                  <h3 className="footer-subtitle">E-mail</h3>
                  <ul className="footer-list">
                    <li><a href={`mailto:${SocialUrls[0].email}`}>{SocialUrls[0].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[1].email}`}>{SocialUrls[1].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[2].email}`}>{SocialUrls[2].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[3].email}`}>{SocialUrls[3].email}</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-subtitle">Phone</h3>
                  <ul className="footer-list">
                    <li><a href={`tel:${SocialUrls[0].phone.replace(/\s/g, '')}`}>{SocialUrls[0].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[1].phone.replace(/\s/g, '')}`}>{SocialUrls[1].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[2].phone.replace(/\s/g, '')}`}>{SocialUrls[2].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[3].phone.replace(/\s/g, '')}`}>{SocialUrls[3].phone}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-divider horizontal-divider"></div>
          
          <div className="footer-copyright-section">
            <h2 className="footer-title centered-title">Copyright</h2>
            <ul className="footer-list centered-list">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-use">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-divider horizontal-divider"></div>
        
        <div className="footer-bottom">
          <p>Designed with <span>❤</span> celebrating Indian culture</p>
        </div>
      </div>
    </footer>
  );
};
