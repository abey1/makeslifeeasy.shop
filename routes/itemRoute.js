const express = require("express");
const router = express.Router();

const {
  insertItem,
  getItems,
  getItemMeta,
  getFavoriteItems,
} = require("../controllers/itemController");

// insert new item
router.post("/insert", insertItem);

// get items
router.post("/get", getItems);

// get items metadata
router.post("/get_meta", getItemMeta);

// get favorite items
router.post("/get_favorite_items", getFavoriteItems);

module.exports = router;
