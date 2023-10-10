import express, {json, Router} from "express";
import cors from 'cors';
require('express-async-errors');
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import {trainingsRouter} from "./routers/trainings.router";
import {exercisesRouter} from "./routers/exercises.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // number of request in time above
}));

const router = Router();

router.use('/trainings', trainingsRouter);
router.use('/exercises', exercisesRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});