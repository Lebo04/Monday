const express = require('express');
const cors = require('cors');
const app = express();
const port = parseInt(process.env.port) || 4000;
const route = express.Router();
const bodyParser = require("body-parser");
const db = require("./lib/db_connection");
const path = require("path");

app.use(
    route,
    express.json(),
    bodyParser.urlencoded({ extended: false})
);

route.get('/', (req, res) => {
    res.statusCode(200).sendFile(path.join(__dirname, "./view/index.html"))
})

route.get("/users", (req, res) => {
    const strQry = `
      SELECT userID firstName, lastName, emailAdd
      FROM Users;
      `;
  
    //---db---//
    db.query(strQry, (err, data) => {
      if (err) throw err;
      res.status(200).json({ result: data });
    });
  });

route.post("/register", bodyParser.json(), (req, res) => {
    let detail = req.body;
    console.log(detail);
    const strQry = `
      INSERT INTO Users
      SET ?;
      `;
    db.query(strQry, [detail], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A user record was saved" });
      }
    });
  });
  
  route.put("/update/:id", bodyParser.json(), (req, res) => {
    let detail = req.body;
    const strQry = `UPDATE Users 
      SET ? 
      WHERE firstName = ?;
      `;
    db.query(strQry, [detail, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A record has been updated" });
      }
    });
  });
  
  route.delete("/delete/:id", (req, res) => {
    let detail = req.body;
    const strQry = `DELETE FROM Users
      WHERE ?; 
      `;
    db.query(strQry, [detail, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A record has been deleted" });
      }
    });

  });

  route.get("/products", (req, res) => {
    const strQry = `
      SELECT prodId, prodName, prodPrice, prodQuantity
      FROM Products;
      `;
  
    db.query(strQry, (err, data) => {
      if (err) throw err;
      res.status(200).json({ result: data });
    });
  });

  route.post("/addProducts", bodyParser.json(), (req, res) => {
    let detail = req.body;
    console.log(detail);

    const strQry = `
      INSERT INTO Products
      SET ?;
      `;
    db.query(strQry, [detail], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A user record was saved" });
      }
    });
  });
  
  route.put("/updateProducts/:id", bodyParser.json(), (req, res) => {
    let detail = req.body;
    const strQry = `UPDATE Products 
      SET ? 
      WHERE lastName = ?;
      `;
    db.query(strQry, [detail, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A record has been updated" });
      }
    });
  });
  
  route.delete("/deleteProducts/:id", (req, res) => {
    let detail = req.body;
    const strQry = `DELETE FROM Products
      WHERE lastName = ?;
      `;
    db.query(strQry, [detail, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ msg: "A record has been deleted" });
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})