import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API Server is listening on Port: ${PORT}`);
});
