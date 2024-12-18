const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isVeg: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableQty: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            required: true,
          },
          review: {
            type: String,
            required: true,
          },
        },
      ],
    },
    details: {
      type: String,
    },
    restroId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Food = mongoose.model("food", schema);

module.exports = Food;
