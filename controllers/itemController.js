const ItemModel = require("../models/itemModels");

const insertItem = async (req, res) => {
  const { title, item_url, image_url } = req.body;
  try {
    const item = await ItemModel.create({ title, item_url, image_url });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  const limitedAmount = 2;
  const { page } = req.body;
  try {
    const items = await ItemModel.find()
      .skip(page * limitedAmount)
      .limit(limitedAmount);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemMeta = async (req, res) => {
  try {
    const allItems = await ItemModel.find();
    const length = allItems.length;
    res.status(200).json({ length });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = { insertItem, getItems, getItemMeta };
