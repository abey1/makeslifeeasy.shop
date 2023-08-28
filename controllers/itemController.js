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
  const limitedAmount = 8;
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
    const length = Math.ceil(allItems.length / 8);
    res.status(200).json({ length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoriteItems = async (req, res) => {
  const { favorite } = req.body;

  try {
    const response = await ItemModel.find({ _id: { $in: favorite } });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { insertItem, getItems, getItemMeta, getFavoriteItems };
