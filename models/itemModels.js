const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    item_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ItemModel", ItemSchema);
