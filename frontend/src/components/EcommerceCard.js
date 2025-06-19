import "../styles/EcommerceCard.css";
import flower from "../assets/ecom/Flower.png"

export const EcommerceCard = ({ imgSrc, title, className, onClick }) => {
  return (
    <div 
      className={className || "overlap-eco-card"} 
      onClick={onClick}
    >
      <div className="eco-card-title">
        {title}
      </div>
      <div>
        <img src={flower} alt="" className="flower-up"/>
        <img src={flower} alt="" className="flower-down"/>
      </div>

      <img
        className="eco-card-image"
        alt={title}
        src={imgSrc}
      />
    </div>
  );
};
