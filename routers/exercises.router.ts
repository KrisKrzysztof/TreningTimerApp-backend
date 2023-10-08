import {Router} from "express";
import {ExerciseRecord} from "../records/exercise.record";
import {ValidationError} from "../utils/errors";

export const exercisesRouter: Router = Router()

    .get('/', async (req, res) => {
        const exercises = await ExerciseRecord.getAll();
        res.json(exercises);
    })

    .get('/:name', async (req, res) => {
        const exercise = await ExerciseRecord.getOne(req.params.name);
        res.json(exercise);
    })

    .post('/', async (req, res) => {
        const newExercise = new ExerciseRecord(req.body);
        const exercises = await ExerciseRecord.getAll();
        const exercisesNames = exercises.map(el => el.name);

        if (exercisesNames.includes(newExercise.name)) {
            throw new ValidationError('Takie ćwiczenie już istnieje.')
        }

        await newExercise.insert();
        res.json(newExercise);
    })

    .delete('/:name', async (req, res) => {
        const exercise = await ExerciseRecord.getOne(req.params.name);

        if (!exercise) {
            throw new ValidationError('Takiego ćwiczenia nie ma w bazie danych.')
        }

        await exercise.delete();
        res.json(exercise.name);
    })

    .patch('/:name', async (req, res) => {
        const exercise = await ExerciseRecord.getOne(req.params.name);

        if (!exercise) {
            throw new ValidationError('Takiego ćwiczenia nie ma w bazie danych.')
        }

        exercise.pause = req.body.pause;
        await exercise.update();
        res.json(exercise);
    })
