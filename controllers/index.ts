import express from "express";
import serveHTML from "../utils/serveHtml";
import Home from "../views/Home/Home";

const indexRoute = express.Router();

// Creating an index route to render the homepage.
indexRoute.route('/')
    .get(async (req, res) => {
        res.status(200).send(await serveHTML(Home, 'views/Home/Home.ts'));
    });

export default indexRoute;