import express from "express";
import serveHTML from "../utils/serveHtml";
import * as Home from "../views/Home/Home";

const indexRoute = express.Router();

indexRoute.route('/')
    .get(async (req, res) => {
        res.status(200).send(await serveHTML(Home, 'views/Home/Home.ts'));
    });

export default indexRoute;