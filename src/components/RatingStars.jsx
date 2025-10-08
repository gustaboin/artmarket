// quise usar la libreria de react-rating-stars-component@2.2.0 pero no me funciono asique uso los iconos
/*
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating, size = 20 }) =>
{
  const stars = [];

  for (let i = 1; i <= 5; i++)
  {
    if (rating >= i)
    {
      stars.push(<FaStar key={i} color="green" size={size} />);
    } else if (rating + 0.5 >= i)
    {
      stars.push(<FaStarHalfAlt key={i} color="#ffd700" size={size} />);
    } else
    {
      stars.push(<FaRegStar key={i} color="#ccc" size={size} />);
    }
  }

  return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
};

export default RatingStars;
*/