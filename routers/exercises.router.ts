import {Router} from "express";

export const exercisesRouter: Router = Router()
    .get('/', async (req, res) => {
        //todo
        res.json("ok");
    })