// src/components/LandingPage.js
import "../styles/Home.css";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//images
import clouds_1 from "../assets/HomePage/clouds_1.png";
import clouds_2 from "../assets/HomePage/clouds_2.png";
import bg from "../assets/HomePage/full.png";
import fg from "../assets/HomePage/man2.png";
import ramayanBG from "../assets/HomePage/ramayanBG.png";
import ramayanFG from "../assets/HomePage/ramayanFG.png";
import arrowFG from "../assets/HomePage/arrowFG.png";
import arrowBGNew from "../assets/HomePage/RamHoverBG_Large.png";
import arrowRotate from "../assets/HomePage/arrowRotate.png";
import rathBG from "../assets/HomePage/rathBG.png";
import rathFG from "../assets/HomePage/rathFG.png";
import flybird from "../assets/HomePage/flybird.gif";
import birdy from "../assets/HomePage/birdy.gif";

// New slideshow images
import slide1 from "../assets/Home/1.1.avif";
import slide2 from "../assets/Home/1.2.avif";
import slide3 from "../assets/Home/1.3.avif";
// Second slideshow images
import slide2_1 from "../assets/Home/2.1.avif";
import slide2_2 from "../assets/Home/2.2.avif";
// Third slideshow images
import slide3_1 from "../assets/Home/3.1.avif";
import slide3_2 from "../assets/Home/3.2.avif";
import slide3_3 from "../assets/Home/3.3.avif";
// Fourth slideshow images
import slide4_1 from "../assets/Home/4.1.avif";
import slide4_2 from "../assets/Home/4.2.avif";
import slide4_3 from "../assets/Home/4.3.avif";
// Fifth slideshow images
import slide5_1 from "../assets/Home/5.1.avif";
import slide5_2 from "../assets/Home/5.2.jpg";
import slide5_3 from "../assets/Home/5.3.webp";
// Sixth slideshow images
import slide6_1 from "../assets/Home/6.1.jpg";
import slide6_2 from "../assets/Home/6.2.jpg";
import slide6_3 from "../assets/Home/6.3.jpg";
// Seventh slideshow images
import slide7_1 from "../assets/Home/7.1.jpg";
import slide7_2 from "../assets/Home/7.2.jpg";
import slide7_3 from "../assets/Home/7.3.jpg";
// Eighth slideshow images
import slide8_1 from "../assets/Home/8.1.jpg";
import slide8_2 from "../assets/Home/8.2.jpg";
import slide8_3 from "../assets/Home/8.3.jpg";
// Ninth slideshow images
import slide9_1 from "../assets/Home/9.1.jpg";
import slide9_2 from "../assets/Home/9.2.jpg";
import slide9_3 from "../assets/Home/9.3.jpg";
// Tenth slideshow images
import slide10_1 from "../assets/Home/10.1.jpg";
import slide10_2 from "../assets/Home/10.2.jpg";
import slide10_3 from "../assets/Home/10.3.jpg";
// Eleventh slideshow images
import slide11_1 from "../assets/Home/11.1.jpg";
import slide11_2 from "../assets/Home/11.2.jpg";
import slide11_3 from "../assets/Home/11.3.jpg";

import CircularMenu1 from "../components/CircularMenu1";
import { Footer } from "../components/Footer";
import { LoadingPage } from "./LoadingPage";

gsap.registerPlugin(ScrollTrigger);

// Slideshow Component
const ImageSlideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);
  
  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      
      <div className="slideshow-dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Define slide arrays
  const firstSlideshow = [slide1, slide2, slide3];
  const secondSlideshow = [slide2_1, slide2_2];
  const thirdSlideshow = [slide3_1, slide3_2, slide3_3];
  const fourthSlideshow = [slide4_1, slide4_2, slide4_3];
  const fifthSlideshow = [slide5_1, slide5_2, slide5_3];
  const sixthSlideshow = [slide6_1, slide6_2, slide6_3];
  const seventhSlideshow = [slide7_1, slide7_2, slide7_3];
  const eighthSlideshow = [slide8_1, slide8_2, slide8_3];
  const ninthSlideshow = [slide9_1, slide9_2, slide9_3];
  const tenthSlideshow = [slide10_1, slide10_2, slide10_3];
  const eleventhSlideshow = [slide11_1, slide11_2, slide11_3];
  
  // Create refs for animated elements to optimize animations
  const menuRef = useRef(null);
  const bgRef = useRef(null);
  const manRef = useRef(null);
  const rmynFGRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const textRef = useRef(null);
  const headingH2Ref = useRef(null);
  const arrowBGNewRef = useRef(null);
  const arrowRotateRef = useRef(null);
  const rathFGRef = useRef(null);
  const arrowRef = useRef(null);
  const bird5Ref = useRef(null);

  const imageUrls = [
    clouds_1,
    clouds_2,
    bg,
    fg,
    ramayanBG,
    ramayanFG,
    arrowFG,
    arrowBGNew,
    arrowRotate,
    rathBG,
    rathFG,
    slide1,
    slide2,
    slide3,
    slide2_1,
    slide2_2,
    slide3_1,
    slide3_2,
    slide3_3,
    slide4_1,
    slide4_2,
    slide4_3,
    slide5_1,
    slide5_2,
    slide5_3,
    slide6_1,
    slide6_2,
    slide6_3,
    slide7_1,
    slide7_2,
    slide7_3,
    slide8_1,
    slide8_2,
    slide8_3,
    slide9_1,
    slide9_2,
    slide9_3,
    slide10_1,
    slide10_2,
    slide10_3,
    slide11_1,
    slide11_2,
    slide11_3
  ];

  // Preload images more efficiently with progress tracking and prioritization
  useEffect(() => {
    let loadedImagesCount = 0;
    const totalImages = imageUrls.length;
    
    // Prioritize critical above-the-fold images
    const criticalImages = [
      bg,
      fg,
      clouds_1,
      clouds_2
    ];
    
    // Secondary images that can load after critical ones
    const secondaryImages = imageUrls.filter(img => !criticalImages.includes(img));
    
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Use cache for faster loading on subsequent visits
        img.fetchPriority = criticalImages.includes(url) ? "high" : "auto";
        img.decoding = "async"; // Use async decoding for better performance
        
        img.onload = () => {
          loadedImagesCount++;
          // Update loading progress as a percentage
          const progress = Math.floor((loadedImagesCount / totalImages) * 100);
          setLoadingProgress(progress);
          
          // Show content earlier once critical images are loaded (min 50% progress)
          if ((progress >= 50 && criticalImages.every(img => img.complete)) || 
              loadedImagesCount === totalImages) {
            setTimeout(() => {
              setImagesLoaded(true);
            }, 300); // Small delay for smooth transition
          }
          resolve(img);
        };
        
        img.onerror = (err) => {
          loadedImagesCount++;
          const progress = Math.floor((loadedImagesCount / totalImages) * 100);
          setLoadingProgress(progress);
          console.error(`Failed to load image: ${url}`, err);
          reject(err);
        };
        
        img.src = url;
      });
    };
    
    // Load images in order of importance
    const loadAllImages = async () => {
      // First load critical images in parallel
      await Promise.all(criticalImages.map(url => loadImage(url)))
        .catch(err => console.error("Error loading critical images:", err));
      
      // Then load remaining images in batches
      const batchSize = 5;
      for (let i = 0; i < secondaryImages.length; i += batchSize) {
        const batch = secondaryImages.slice(i, i + batchSize);
        await Promise.all(batch.map(url => loadImage(url)))
          .catch(err => console.error("Error in image batch:", err));
      }
    };
    
    // Start loading images
    loadAllImages();
      
    // Try to load RathBG image
    const RathBGImg = new Image();
    RathBGImg.src = "../assets/HomePage/RamHoverBG.png";
    RathBGImg.onload = () => {
      // arrowBGNewRef.current.src = RathBGImg.src;
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up GSAP animations with optimizations
  useEffect(() => {
    if (!imagesLoaded) return;
    
    // Create a timeline for better performance
    // const tl = gsap.timeline();
    
    // Batch animations for better performance
    const scrollAnimations = () => {
      // Menu animations
      gsap.to(menuRef.current, {
        scrollTrigger: {
          trigger: "#my-footer",
          scrub: true,
        },
        start: "top 100%",
        y: "-790",
      });

      gsap.to(menuRef.current, {
        x: 0,
        scrollTrigger: {
          trigger: ".section3",
          scrub: true,
          x: -500,
        },
      });

      // Background and foreground animations
      gsap.to(bgRef.current, {
        scrollTrigger: {
          scrub: 1,
        },
        scale: 1.5,
      });

      gsap.to(manRef.current, {
        scrollTrigger: {
          scrub: 1,
        },
        scale: 0.5,
      });

      gsap.to(rmynFGRef.current, {
        scrollTrigger: {
          trigger: "#rmynFG", 
          scrub: 1,
          start: "top center",
          end: "bottom center",
        },
        x: -250,
        y: -50,
        scale: 0.7,
      });

      // Cloud animations
      gsap.to(cloud1Ref.current, {
        x: 750,
        scrollTrigger: {
          scrub: 1,
        },
      });

      gsap.to(cloud2Ref.current, {
        x: -750,
        scrollTrigger: {
          scrub: 1,
        },
      });

      // Other animations
      gsap.to(textRef.current, {
        scrollTrigger: {
          scrub: 1,
        },
        y: 800,
      });

      // Removing the animation that moves the heading to the right
      // Instead, we'll add a subtle fade-in effect to keep it centered
      gsap.to(headingH2Ref.current, {
        scrollTrigger: {
          trigger: "#heading",
          scrub: 1,
          start: "top 80%",
          end: "bottom 20%",
        },
        opacity: 1,
        y: 0,
        x: 0, // Explicitly set x to 0 to ensure it stays centered
      });

      gsap.to(arrowBGNewRef.current, {
        scrollTrigger: {
          trigger: ".section2",
          scrub: 1,
        },
        scale: 1.2,
      });

      gsap.to(arrowRotateRef.current, {
        scale: 1,
        duration: 2.5,
        rotate: 360,
        scrollTrigger: {
          ease: "power2.inOut",
          trigger: ".section2",
          scroller: "body",
          scrub: true,
        },
      });

      gsap.fromTo(
        rathFGRef.current,
        { x: 200 },
        {
          duration: 3,
          x: 0,
          scrollTrigger: {
            ease: "power2.inOut",
            trigger: ".section3",
            scrub: 2,
          },
        }
      );

      gsap.to(arrowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: ".arrow",
          start: "top center",
          end: "50% center",
          scrub: true,
        },
      });

      gsap.to(bird5Ref.current, {
        x: -1400,
        duration: 10,
        repeat: -1,
        repeatDelay: 0.5,
        scrollTrigger: {
          trigger: "#section2",
          start: "top -35%",
          end: "bottom 100%",
        },
      });
    };

    // Debounce scroll events
    let timeout;
    // const handleScroll = () => {
    //   if (timeout) {
    //     window.cancelAnimationFrame(timeout);
    //   }
    //   timeout = window.requestAnimationFrame(scrollAnimations);
    // };

    // Initialize animations
    scrollAnimations();
    
    // Cleanup function
    return () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      
      // Kill ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  return (
    <div>
      {!imagesLoaded && <LoadingPage percentage={loadingProgress} />}
      <CircularMenu1 />
      <section className="section" id="top-section">
        <img src={bg} id="bg" alt="bg" ref={bgRef} />
        <h5 id="text" ref={textRef}>INDIAN HERITAGE</h5>
        <img src={fg} alt="man2" id="man" ref={manRef} />
        <img
          src={clouds_1}
          style={{
            position: "absolute",
          }}
          alt="cloud1"
          id="cloud1"
          ref={cloud1Ref}
        />
        <img
          src={clouds_2}
          style={{
            position: "absolute",
          }}
          alt="cloud2"
          id="cloud2"
          ref={cloud2Ref}
        />
      </section>

      <section className="section1">
        <img src={ramayanBG} id="rmynBG" alt="rmynBG" />
        <img src={ramayanFG} id="rmynFG" alt="rmynFG" ref={rmynFGRef} />
        <img
          src={flybird}
          id="bird1"
          alt="bird"
        />
        <img
          src={flybird}
          id="bird2"
          alt="bird"
        />
        <img
          src={flybird}
          id="bird3"
          alt="bird"
        />
        <img
          src={flybird}
          id="bird4"
          alt="bird"
        />
        
        <img
          src={birdy}
          id="bird5"
          alt="bird"
          ref={bird5Ref}
        />
      </section>

      <section className="section2">
        <img
          src={arrowBGNew}
          id="arrowBG123"
          className="arrowBGNew"
          alt="Arrow BG Sky"
          ref={arrowBGNewRef}
        />
        <img src={arrowRotate} id="arrowRotate" alt="arrowRotate" ref={arrowRotateRef} />
        <img src={arrowFG} id="arrowFG" alt="arrowFG" />
      </section>

      <section className="section3">
        <img src={rathBG} id="rathBG" alt="rathBG" />
        <img src={rathFG} id="rathFG" alt="rathFG" ref={rathFGRef} />
      </section>


      <svg
        className="arrow"
        width="40px"
        height="80px"
        viewBox="0 0 247 390"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.5",
        }}
        ref={arrowRef}
      >

      </svg> 
      
     
      <div className="modern-section">
        <div className="modern-heading">
          <h2 
            ref={headingH2Ref}
            style={{
              width: "100%",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto"
            }}
          >
            The Indian Legacy
          </h2>
          <div className="heading-underline"></div>
        </div>
        
        <div className="modern-grid">
          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>India's Geographical Diversity</h3>
              <p>
                From the snow capped peaks of the Himalayas to the sunny shores of Kerala, India is a land full of breathtaking natural beauty. Each region has its own unique landscapes that have shaped local cultures and traditions.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={firstSlideshow} />
            </div>
          </div>

          <div className="modern-card reverse" data-aos="fade-up">
            <div className="card-content">
              <h3>Regional Diversity</h3>
              <p>
                India's heritage is like a colorful patchwork quilt, stitched together by the unique cultures of its different regions. From the majestic forts of Rajasthan in the west to the peaceful backwaters of Kerala in the south, every corner of the country tells its own story.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={secondSlideshow} />
            </div>
          </div>

          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Time Travel through Dynasties</h3>
              <p>
                Step into the past and explore the powerful dynasties that shaped India's rich history. From the wisdom of the Mauryas and the golden age of the Guptas to the grandeur of the Mughals and the valor of the Marathas each era brought its own legacy.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={thirdSlideshow} />
            </div>
          </div>
        </div>
      </div>

      <div className="modern-section dark-section">
        <div className="modern-heading">
          <h2
            style={{
              width: "100%",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto"
            }}
          >
            Echoes of India's Past
          </h2>
          <div className="heading-underline"></div>
        </div>
        
        <div className="modern-grid">
          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Indus Valley Civilization</h3>
              <p>
                Travel back over 4,000 years to uncover the roots of India's ancient past. The Indus Valley was one of the world's earliest urban civilizations, known for its advanced city planning, mysterious script, and thriving trade networks.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={fourthSlideshow} />
            </div>
          </div>

          <div className="modern-card reverse" data-aos="fade-up">
            <div className="card-content">
              <h3>The Mughal Era</h3>
              <p>
                Immerse yourself in the opulence and artistry of the Mughal dynasty. Marvel at the breathtaking Taj Mahal, explore the majestic Red Fort, and witness the elegant fusion of Indian and Persian cultures that defined this golden age of architecture, art, and culture.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={fifthSlideshow} />
            </div>
          </div>

          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Independence Struggle</h3>
              <p>
                Step into the pages of India's courageous fight for freedom from British colonial rule. Delve into the life and philosophy of Mahatma Gandhi, whose path of non-violence inspired a nation, and discover the sacrifices of countless freedom fighters who ignited the flame of independence.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={sixthSlideshow} />
            </div>
          </div>
        </div>
      </div>

      <div className="modern-section">
        <div className="modern-heading">
          <h2
            style={{
              width: "100%",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto"
            }}
          >
            Timeless Art & Grandeur
          </h2>
          <div className="heading-underline"></div>
        </div>
        
        <div className="modern-grid">
          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Temples of Khajuraho</h3>
              <p>
                Uncover the artistry and symbolism etched in stone at Khajuraho, a UNESCO World Heritage site. Admire its intricate carvings that celebrate life, spirituality, and human expression through exquisite temple architecture.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={seventhSlideshow} />
            </div>
          </div>

          <div className="modern-card reverse" data-aos="fade-up">
            <div className="card-content">
              <h3>Ellora and Ajanta Caves</h3>
              <p>
                Journey through time in the rock-cut sanctuaries of Ellora and Ajanta. These ancient caves, adorned with vibrant murals and intricate sculptures, chronicle the evolution of Indian art, spirituality, and craftsmanship across centuries.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={eighthSlideshow} />
            </div>
          </div>

          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Majestic Forts & Royal Palaces</h3>
              <p>
                Step into India's regal past through its grand forts and opulent palaces. From the hilltop Amber Fort in Jaipur to the illuminated splendor of Mysore Palace, uncover the architectural brilliance, rich history, and legendary tales etched into their walls.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={ninthSlideshow} />
            </div>
          </div>
        </div>
      </div>

      <div className="modern-section dark-section">
        <div className="modern-heading">
          <h2
            style={{
              width: "100%",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto"
            }}
          >
            Flavors of India
          </h2>
          <div className="heading-underline"></div>
        </div>
        
        <div className="modern-grid">
          <div className="modern-card" data-aos="fade-up">
            <div className="card-content">
              <h3>Spice Trails of India</h3>
              <p>
                From fiery chilies to fragrant cardamom, Indian cuisine is a vibrant celebration of spices. Embark on a flavorful journey across the diverse regions of India, uncovering the stories, ingredients, and iconic dishes that define its world-renowned culinary heritage.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={tenthSlideshow} />
            </div>
          </div>

          <div className="modern-card reverse" data-aos="fade-up">
            <div className="card-content">
              <h3>Savoring the Streets</h3>
              <p>
                Dive into India's buzzing street food scene, where every corner offers a burst of flavor. Whether it's tangy chaat in Delhi or the iconic vada pav of Mumbai, the streets serve up a delicious adventure like no other.
              </p>
            </div>
            <div className="card-image">
              <ImageSlideshow slides={eleventhSlideshow} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
