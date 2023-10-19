import {Router} from "express";
import {TrainingRecord} from "../records/training.record";
import {ValidationError} from "../utils/errors";

export const trainingsRouter: Router = Router()

    .get('/', async (req, res) => {
        const trainings = await TrainingRecord.getAll();
        res.json(trainings);
    })

    .get('/:id', async (req, res) => {
        const training = await TrainingRecord.getOne(req.params.id);
        res.json(training);
    })

    .post('/', async (req, res) => {
        const newTraining = new TrainingRecord(req.body);
        await newTraining.insert();
        res.json(newTraining);
    })

    .delete('/:id', async (req, res) => {

        if (req.params.id.startsWith('protected')) {
            throw new ValidationError('ten trening jest chroniony');
        }

        const training = await TrainingRecord.getOne(req.params.id);

        if (!training) {
            throw new ValidationError(
                'Trening o danym ID nie istnieje w bazie danych.')
        }

        await training.delete();
        res.json(training.name);
    })

    .patch('/:id', async (req, res) => {
        const training = await TrainingRecord.getOne(req.params.id);

        if (!training) {
            throw new ValidationError(
                'Trening o danym ID nie istnieje w bazie danych.')
        }

        const newTraining = new TrainingRecord({
            ...req.body,
            id: training.id,
        });
        await newTraining.update();
        res.json(newTraining);
    })
