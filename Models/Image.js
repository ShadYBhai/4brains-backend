const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: {
    type: Object,
  },
});

const ImageS = mongoose.model("image", imageSchema);

module.exports = ImageS;
