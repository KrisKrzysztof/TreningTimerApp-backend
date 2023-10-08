import {Router} from "express";
import {ExerciseRecord} from "../records/exercise.record";

export const exercisesRouter: Router = Router()

    .get('/', async (req, res) => {
        const exercises = await ExerciseRecord.getAll();
        res.json(exercises);
    })

    .get('/:name', async (req, res) => {
        const exercise = await ExerciseRecord.getOne(req.params.name);
        res.json(exercise);
    })
