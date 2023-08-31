const express = require("express");
const router = express.Router();

const {
  insertItem,
  getItems,
  getItemMeta,
  getFavoriteItems,
  getAllItems,
  deleteItem,
} = require("../controllers/itemController");

// insert new item
router.post("/insert", insertItem);

// delete item
router.post("/delete_item", deleteItem);

// get items
router.post("/get", getItems);

// get items metadata
router.post("/get_meta", getItemMeta);

// get favorite items
router.post("/get_favorite_items", getFavoriteItems);

// returns all items
router.post("/all_items", getAllItems);

module.exports = router;
