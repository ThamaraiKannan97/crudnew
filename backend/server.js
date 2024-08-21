const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM data"; // Use the correct table name here
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO data (`Name`,`Position`,`Dept`,`Salary`) VALUES(?)";
  const values = [req.body.name, req.body.position, req.body.dept, req.body.salary];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "update data set `Name`=?, `Position`=?, `Dept`=?,`Salary`=? where ID=?";
  const values = [req.body.name, req.body.position, req.body.dept, req.body.salary];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});


app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM data WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ error });
    }
    return res.json({  data });
  });
});

app.get("/view/:id", (req, res) => {
  const sql = "SELECT * FROM data WHERE id = ?"; // Ensure 'data' is the correct table name
  const id = req.params.id; // Corrected to use req.params

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json("Error");
    }
    return res.json(data[0]); // Return the first result if it's a single item
  });
});



app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
