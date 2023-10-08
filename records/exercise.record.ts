import {ExerciseEntity} from "../types/training/exercise-entity";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type ExerciseRecordResults = [ExerciseEntity[], FieldPacket[]];


export class ExerciseRecord implements ExerciseEntity {
    name: string;
    pause: number;
    constructor(obj: ExerciseEntity) {

        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Nazwa ćwiczenia musi zawierać od 3 do 25 znaków.');
        }

        if (obj.pause < 1 || obj.pause > 99) {
            throw new ValidationError('Pauza nie może być dłuższa niż 99 minut i krótsza niż minuta.')
        }

        this.name = obj.name
        this.pause = obj.pause
    }

    static async getAll(): Promise<ExerciseRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `exercises`") as ExerciseRecordResults;
        return results.map((obj) => new ExerciseRecord(obj));
    }

    static async getOne(name: string): Promise<ExerciseRecord> {
        const [results] = await pool.execute("SELECT * FROM `exercises` WHERE name = :name", {
            name,
        }) as ExerciseRecordResults;
        return results.length === 0 ? null : new ExerciseRecord(results[0]);
    }

}