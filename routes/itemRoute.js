const express = require("express");
const router = express.Router();

const {
  insertItem,
  getItems,
  getItemMeta,
} = require("../controllers/itemController");

// insert new item
router.post("/insert", insertItem);

// get items
router.post("/get", getItems);

// get items metadata
router.post("/get_meta", getItemMeta);

module.exports = router;
