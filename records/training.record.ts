import {NewTrainingEntity, TrainingEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type TrainingRecordResults = [TrainingEntity[], FieldPacket[]];

export class TrainingRecord implements TrainingEntity {
    id: string;
    name: string;
    description: string;
    numberOfSeries: number;
    exercise1name: string;
    exercise1pause: number;
    exercise2name?: string;
    exercise2pause?: number;
    exercise3name?: string;
    exercise3pause?: number;
    exercise4name?: string;
    exercise4pause?: number;
    exercise5name?: string;
    exercise5pause?: number;
    exercisesOrderInSerie: string;

    constructor(obj: NewTrainingEntity) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Nazwa treningu musi zawierać od 3 do 25 znaków.');
        }

        if (obj.description && obj.description.length > 255) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 255 znaków.');
        }

        if (obj.numberOfSeries < 1 || obj.numberOfSeries > 99) {
            throw new ValidationError('Liczba serii musi być większa od zera i nie może być większa niż 99.');
        }

        // todo dalsze walidacje

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.numberOfSeries = obj.numberOfSeries;
        this.exercise1name = obj.exercise1name;
        this.exercise1pause = obj.exercise1pause;
        this.exercise2name = obj.exercise2name;
        this.exercise2pause = obj.exercise2pause;
        this.exercise3name = obj.exercise3name;
        this.exercise3pause = obj.exercise3pause;
        this.exercise4name = obj.exercise4name;
        this.exercise4pause = obj.exercise4pause;
        this.exercise5name = obj.exercise5name;
        this.exercise5pause = obj.exercise5pause;
        this.exercisesOrderInSerie = obj.exercisesOrderInSerie;
    }

    static async getAll(): Promise<TrainingRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `training`") as TrainingRecordResults;
        return results.map((obj) => new TrainingRecord(obj));
    }

    static async getOne(id: string): Promise<TrainingRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `training` WHERE id = :id", {
            id,
        }) as TrainingRecordResults;

        return results.length === 0 ? null : new TrainingRecord(results[0]);
    }

}