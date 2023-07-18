//* IMPORT LIBRARY
const express = require("express");
const cors = require("cors");

const bearerToken = require("express-bearer-token");

const PORT = 2000;

//* CONFIG LIBRARY
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.listen(PORT, () => console.log("API Runnning on port : ", PORT));

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrates mysql with express</h4>");
});

//* IMPORT ROUTERS
const { blogRouters, userRouters } = require("./routers");

app.use(blogRouters, userRouters);
