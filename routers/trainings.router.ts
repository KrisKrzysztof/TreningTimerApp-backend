import {Router} from "express";
import {TrainingRecord} from "../records/training.record";

export const trainingsRouter: Router = Router()

    .get('/', async (req, res) => {
        const trainings = await TrainingRecord.getAll();
        res.json(trainings);
    })

    .get('/:id', async (req, res) => {
        const training = await TrainingRecord.getOne(req.params.id);
        res.json(training);
    })