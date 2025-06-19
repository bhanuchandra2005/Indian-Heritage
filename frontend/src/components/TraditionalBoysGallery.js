import React from 'react';
import '../styles/TraditionalBoysGallery.css';

const TraditionalBoysGallery = () => {
  const traditionalAttireInfo = [
    {
      id: 1,
      title: 'Traditional Sherwani',
      description: 'A royal attire with origins in Mughal and Persian traditions, the sherwani is an elegant knee-length coat with intricate embroidery and embellishments. It symbolizes regality and is commonly worn during wedding ceremonies and formal celebrations. The detailed craftsmanship in gold thread work (zari), mirror work, and beading showcases India\'s rich artisanal skills.'
    },
    {
      id: 2,
      title: 'South Indian Dhoti Kurta',
      description: 'The dhoti kurta is a symbol of reverence and tradition in South Indian culture. The dhoti, a single piece of cloth draped around the waist, is paired with a simple kurta top. This attire is often worn during religious ceremonies, temple visits, and traditional celebrations. Regional variations include different draping styles and material choices, from silk in Tamil Nadu to cotton in Kerala.'
    },
    {
      id: 3,
      title: 'Festive Kurta Pajama',
      description: 'The versatile kurta pajama combines comfort with cultural aesthetics. The kurta is a loose-fitting tunic that falls to the knees, while the pajama refers to the lightweight trousers. This outfit is adorned with various embellishments during festive occasions like Diwali, Eid, or family gatherings. The designs often incorporate traditional motifs that represent specific cultural meanings and heritage.'
    }
  ];

  return (
    <section className="traditional-boys-section">
      <div className="traditional-boys-heading">
        <h2>Traditional Boys Attire</h2>
        <div className="heading-divider"></div>
        <p>
          Exploring the rich cultural heritage of traditional Indian clothing for boys
          from different regions and ceremonies across India.
        </p>
      </div>
      
      <div className="traditional-attire-info">
        {traditionalAttireInfo.map((attire) => (
          <div className="attire-info-card" key={attire.id}>
            <h3 className="attire-title">{attire.title}</h3>
            <p className="attire-description">{attire.description}</p>
          </div>
        ))}
        
        <div className="attire-additional-info">
          <h3>Cultural Significance</h3>
          <p>
            Traditional attire in India is more than just clothing; it represents cultural values, regional 
            identity, and family heritage. The choice of fabric, colors, and patterns often has symbolic 
            meaning related to religious beliefs, seasonal celebrations, and social status. These garments
            connect younger generations to their cultural roots and play an important role in ceremonies
            that mark significant life events.
          </p>
          
          <h3>Modern Adaptations</h3>
          <p>
            While preserving traditional elements, contemporary designers have innovated with cuts, 
            fabrics, and styling to make these garments more accessible for today's youth. Modern 
            sherwanis might incorporate Western tailoring techniques, while kurtas often feature 
            fusion elements that appeal to young boys. These adaptations ensure that traditional
            attire remains relevant while honoring its cultural origins.
          </p>
        </div>
      </div>
      
      <div className="view-more-container">
        <button className="view-more-btn">Learn More About Traditional Attire</button>
      </div>
    </section>
  );
};

export default TraditionalBoysGallery; 