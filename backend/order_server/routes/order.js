import express from "express";
import axios from "axios";
const order = express.Router();

order.post("/books/purchase", (req, res) => {
  try {
    const uuid = req.body.uuid;
    const quantity = req.body.quantity;
    // Get current stock
    axios
      .get(`http://localhost:3000/api/catalog/search/${uuid}`)
      .then((response) => {
        const currentStock = response.data.stock;
        // Calculate new stock
        const newStock = currentStock - quantity;
        console.log(newStock);
        // Make the second request only if newStock is a valid value
        if (Number.isFinite(newStock)) {
          // Update stock
          axios
            .put("http://localhost:3000/api/update/updateStock", {
              uuid: uuid,
              newStock: newStock,
            })
            .then((updateResponse) => {
              console.log("Update Response:", updateResponse.data);
              const response = {message: " 1 "}
              console.log("1");
              res.json("Stock updated successfully");
            });
        } else {
          const response = {message: " 2 "}
          console.log("2");

          res.status(500).json("Invalid newStock value");
        }
      });
  } catch (error) {
    console.error("Error:", error.message);
    const response = {message: " 3"}
    console.log("3");
    res.status(500).json("Internal Server Error");
  }
});
console.log("hiii");
res.status(500).json("Internal Server Error");


export default order;


