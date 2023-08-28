import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { server_url } from "../../utilities/constants";
import { Items } from "../../components";
import "./Favorites.scss";

const Favorites = () => {
  const [favItems, setFavItems] = useState([]);
  const { favorite } = useUserContext();

  const getFavoriteItems = async () => {
    const response = await fetch(`${server_url}/goods/get_favorite_items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite }),
    });
    const json = await response.json();
    setFavItems(json);
  };

  useEffect(() => {
    getFavoriteItems();
  }, []);
  return (
    <div className="favorites_holder">
      {favorite.length === 0 ? (
        <div className="empty">you do not have any favorite items yet</div>
      ) : (
        <div className="items_holder">
          <Items items={favItems} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
