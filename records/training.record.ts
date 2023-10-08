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
    exerciseOne: string;
    exerciseTwo: string;
    exerciseThree?: string;
    exerciseFour?: string;
    exerciseFive?: string;
    exerciseSix?: string;
    exerciseSeven?: string;
    exerciseEight?: string;
    exerciseNine?: string;
    exerciseTen?: string;

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

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.numberOfSeries = obj.numberOfSeries;
        this.exerciseOne = obj.exerciseOne;
        obj.exerciseTwo ?
            this.exerciseTwo = obj.exerciseTwo : !obj.exerciseTwo;
        obj.exerciseThree ?
            this.exerciseThree = obj.exerciseThree : !obj.exerciseThree;
        obj.exerciseFour ?
            this.exerciseFour = obj.exerciseFour : !obj.exerciseFour;
        obj.exerciseFive ?
            this.exerciseFive = obj.exerciseFive : !obj.exerciseFive;
        obj.exerciseSix ?
            this.exerciseSix = obj.exerciseSix : !obj.exerciseSix;
        obj.exerciseSeven ?
            this.exerciseSeven = obj.exerciseSeven : !obj.exerciseSeven;
        obj.exerciseEight ?
            this.exerciseEight = obj.exerciseEight : !obj.exerciseEight;
        obj.exerciseNine ?
            this.exerciseNine = obj.exerciseNine : !obj.exerciseNine;
        obj.exerciseTen ?
            this.exerciseTen = obj.exerciseTen : !obj.exerciseTen;

    }

    static async getAll(): Promise<TrainingRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `trainings`") as TrainingRecordResults;
        return results.map((obj) => new TrainingRecord(obj));
    }

    static async getOne(id: string): Promise<TrainingRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `trainings` WHERE id = :id", {
            id,
        }) as TrainingRecordResults;

        return results.length === 0 ? null : new TrainingRecord(results[0]);
    }

}