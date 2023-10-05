import {Router} from "express";

export const trainingRouter: Router = Router()

    .get('/', (req, res) => {
        res.json("ok");
    })