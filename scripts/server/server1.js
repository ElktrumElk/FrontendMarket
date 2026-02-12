import express from "express";
import path from "path";

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {

});