import React from "react";
import "./Items.scss";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
import Card from "../Card/Card";

const Items = ({ items, setItems }) => {
  const { isLoading } = useGlobalAppContext();
  // console.log("in items", items);
  return (
    <div className="items_container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        items &&
        items.map((item, index) => {
          // console.log(item);
          return (
            <Card
              id={item._id}
              title={item.title}
              image_url={item.image_url}
              item_url={item.item_url}
              setItems={setItems}
              items={items}
            />
          );
        })
      )}
    </div>
  );
};

export default Items;
