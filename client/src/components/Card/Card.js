import React, { useState, useEffect } from "react";
import "./Card.scss";
import { useUserContext } from "../../contexts/UserContext";
import { server_url } from "../../utilities/constants";
import { useNavigate } from "react-router-dom";
const Card = ({ id, title, item_url, image_url }) => {
  const { _id, favorite } = useUserContext();
  const [liked, setLiked] = useState(favorite.includes(id));
  const navigate = useNavigate();
  useEffect(() => {
    setLiked(favorite.includes(id));
  }, [favorite]);
  const updateFavorite = async () => {
    try {
      const result = await fetch(`${server_url}/user/update_favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: _id, newFavorite: favorite }),
      });
      const json = await result.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    // if user is logged in
    if (_id === "") {
      // if ok is clicked
      const response = window.confirm("You must login to like items");
      if (response) {
        console.log("ok is clicked");
        navigate("/login");
      }
    } else {
      if (favorite.includes(id)) {
        const index = favorite.indexOf(id);
        // the second argument is to remove the item at index
        favorite.splice(index, 1);
      } else {
        favorite.push(id);
      }
      updateFavorite();
      setLiked(!liked);
    }
  };
  return (
    <a
      className="card"
      style={{ width: "250px" }}
      href={item_url}
      target="_blank"
      rel="noreferrer"
    >
      <img className="card-img-top" src={image_url} alt="Card img" />
      <div className="card-body">
        <p className="card-text">{title}</p>
        {liked ? (
          <i
            class="fa-solid fa-heart heart"
            onClick={(e) => handleFavorite(e)}
          ></i>
        ) : (
          <i
            class="fa-regular fa-heart heart"
            onClick={(e) => handleFavorite(e)}
          ></i>
        )}
      </div>
    </a>
  );
};

export default Card;
