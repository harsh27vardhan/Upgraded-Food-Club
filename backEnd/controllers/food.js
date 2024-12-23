const Food = require("../models/food");
const { getUser } = require("../services/auth");

function foodFilteration(food, payload) {
  const {
    searchStr = "",
    maxPrice = Infinity,
    rating = 0,
    discount = 0,
    isVeg = false,
  } = payload;
  const search = searchStr.toLowerCase();
  return food.filter(
    (item) =>
      (item.name.toLowerCase(),
      includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)) &&
      item.price <= maxPrice &&
      item.rating >= rating &&
      item.discount >= discount &&
      (!Boolean(isVeg) ? true : Boolean(item.isVeg))
  );
}

exports.searchFoodItems = (req, res) => {
  const { searchStr = "" } = req.params;
  const {
    maxPrice = 100000,
    rating = 0,
    discount = 0,
    isVeg = false,
    page = 1,
    limit = 10,
  } = req.body;
  console.log("Maximum Price: " + maxPrice);
  Food.find({})
    .then((food) => {
      // Filter the food items based on the criteria
      const filteredFood = food.filter((item) => {
        return (
          (item.name.toLowerCase().includes(searchStr.toLowerCase()) ||
            item.description.toLowerCase().includes(searchStr.toLowerCase()) ||
            item.category.toLowerCase().includes(searchStr.toLowerCase())) &&
          item.price <= maxPrice &&
          item.rating >= rating &&
          item.discount >= discount &&
          (isVeg ? item.isVeg : true) // Check if item is vegetarian if isVeg is true
        );
      });

      // Check if any food items were found
      if (filteredFood.length === 0) {
        return res.status(404).send({
          message:
            "There is no data with this string or unable to extract the data.",
        });
      }

      // Send the filtered food items
      return res.status(200).send(filteredFood);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error in fetching data.", err });
    });
};

exports.getFoodItem = (req, res) => {
  // console.log(req.cookie);
  // console.log(req.user);
  // res.cookie("user", req.user.role);
  const { restroId = null } = req.params;
  console.log("Restro id is : ", restroId);
  if (restroId) {
    console.log("In the restro id with :", restroId);
    Food.find({ restroId })
      .then((food) => {
        console.log(food);
        // const data = foodFilteration(food, req.params);
        // res.send({ status: "success", food: data });
        res.send({ status: "success", food });
      })
      .catch((err) => {
        res.send({ status: "error", message: err.message });
      });
  } else {
    console.log("In the restro id null");
    Food.find({})
      .then((food) => {
        console.log("food will be sent to the user", food);
        // const data = foodFilteration(food, req.params);
        res.send({ status: "success", food });
      })
      .catch((err) => {
        res.send({ status: "error", message: err });
      });
  }
};

exports.getFoodById = (req, res) => {
  const { foodId } = req.params;
  Food.findById(foodId)
    .then((food) => {
      if (!food) {
        return res.status(404).send({ message: "Food item not found" });
      }
      res.send({ status: "success", food });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving food item. Problem from Server." });
    });
};

exports.addFoodItem = (req, res) => {
  // console.log(req.user); //undefined
  const {
    name,
    description,
    details,
    category,
    isVeg,
    image,
    price,
    availableQty,
    rating,
    discount,
  } = req.body;
  const restroId = getUser(req.cookies.token)._id;
  console.log(restroId);
  Food.create({
    name,
    description,
    details,
    category,
    isVeg,
    rating,
    image,
    price,
    availableQty,
    discount,
    restroId,
  })
    .then((food) => {
      res.status(201).send({
        food,
        id: food._id,
        status: "success",
        message: "Food item created successfully",
      });
      console.log("Food added");
    })
    .catch((err) => {
      res.status(400).send({
        message: "Food item creation failed",
        ...err,
      });
      console.log("Food item creation failed");
      console.log(err);
    });
};

exports.updateFoodItem = (req, res) => {
  const {
    name,
    description,
    details,
    category,
    isVeg,
    image,
    price,
    availableQty,
    rating,
    discount,
  } = req.body;
  Food.findByIdAndUpdate(req.params.id, {
    name,
    description,
    details,
    category,
    isVeg,
    image,
    price,
    availableQty,
    rating,
    discount,
  })
    .then((food) => {
      return res.status(200).send({
        food,
        status: "success",
        message: "Food item updated successfully",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Food item updation failed",
        ...err,
      });
    });
};

exports.deleteFoodItem = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Food.findByIdAndDelete(id)
    .then((food) => {
      return res.status(200).send({
        food,
        staus: "success",
        message: "Food item deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Food item deletion failed",
        ...err,
      });
    });
};
