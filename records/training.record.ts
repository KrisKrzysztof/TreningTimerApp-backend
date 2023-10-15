import {NewTrainingEntity, TrainingEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type TrainingRecordResults = [TrainingEntity[], FieldPacket[]];

export class TrainingRecord implements TrainingEntity {
    id: string;
    name: string;
    description: string;
    numberOfSeries: number;
    exerciseOne: string;
    pauseOne: number;
    exerciseTwo?: string;
    pauseTwo?: number;
    exerciseThree?: string;
    pauseThree?: number;
    exerciseFour?: string;
    pauseFour?: number;
    exerciseFive?: string;
    pauseFive?: number;
    exerciseSix?: string;
    pauseSix?: number;
    exerciseSeven?: string;
    pauseSeven?: number;
    exerciseEight?: string;
    pauseEight?: number;
    exerciseNine?: string;
    pauseNine?: number;
    exerciseTen?: string;
    pauseTen?: number;

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

        if (obj.exerciseOne === null) {
            throw new ValidationError('Trening musi zawierać przynajmniej jedno ćwiczenie');
        }
        // można dodać więcej walidacji

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.numberOfSeries = obj.numberOfSeries;
        this.exerciseOne = obj.exerciseOne;
        this.pauseOne = obj.pauseOne;
        obj.exerciseTwo ?
            this.exerciseTwo = obj.exerciseTwo : !obj.exerciseTwo;
        obj.pauseTwo ?
            this.pauseTwo = obj.pauseTwo : !obj.pauseTwo;
        obj.exerciseThree ?
            this.exerciseThree = obj.exerciseThree : !obj.exerciseThree;
        obj.pauseThree ?
            this.pauseThree = obj.pauseThree : !obj.pauseThree;
        obj.exerciseFour ?
            this.exerciseFour = obj.exerciseFour : !obj.exerciseFour;
        obj.pauseFour ?
            this.pauseFour = obj.pauseFour : !obj.pauseFour;
        obj.exerciseFive ?
            this.exerciseFive = obj.exerciseFive : !obj.exerciseFive;
        obj.pauseFive ?
            this.pauseFive = obj.pauseFive : !obj.pauseFive;
        obj.exerciseSix ?
            this.exerciseSix = obj.exerciseSix : !obj.exerciseSix;
        obj.pauseSix ?
            this.pauseSix = obj.pauseSix : !obj.pauseSix;
        obj.exerciseSeven ?
            this.exerciseSeven = obj.exerciseSeven : !obj.exerciseSeven;
        obj.pauseSeven ?
            this.pauseSeven = obj.pauseSeven : !obj.pauseSeven;
        obj.exerciseEight ?
            this.exerciseEight = obj.exerciseEight : !obj.exerciseEight;
        obj.pauseEight ?
            this.pauseEight = obj.pauseEight : !obj.pauseEight;
        obj.exerciseNine ?
            this.exerciseNine = obj.exerciseNine : !obj.exerciseNine;
        obj.pauseNine ?
            this.pauseNine = obj.pauseNine : !obj.pauseNine;
        obj.exerciseTen ?
            this.exerciseTen = obj.exerciseTen : !obj.exerciseTen;
        obj.pauseTen ?
            this.pauseTen = obj.pauseTen : !obj.pauseTen;

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

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `trainings`(`id`,`name`,`description`,`numberOfSeries`,`exerciseOne`,`exerciseTwo`,`exerciseThree`,`exerciseFour`,`exerciseFive`,`exerciseSix`,`exerciseSeven`,`exerciseEight`,`exerciseNine`,`exerciseTen`) VALUES(:id, :name, :description, :numberOfSeries, :exerciseOne, :exerciseTwo, :exerciseThree, :exerciseFour, :exerciseFive, :exerciseSix, :exerciseSeven, exerciseEight, :exerciseNine, exerciseTen)", {
            id: this.id,
            name: this.name,
            description: this.description,
            numberOfSeries: this.numberOfSeries,
            exerciseOne: this.exerciseOne,
            pauseOne: this.pauseOne,
            exerciseTwo: !this.exerciseTwo ? null : this.exerciseTwo,
            pauseTwo: !this.pauseTwo ? null : this.pauseTwo,
            exerciseThree: !this.exerciseThree ? null : this.exerciseThree,
            pauseThree: !this.pauseThree ? null : this.pauseThree,
            exerciseFour: !this.exerciseFour ? null : this.exerciseFour,
            pauseFour: !this.pauseFour ? null : this.pauseFour,
            exerciseFive: !this.exerciseFive ? null : this.exerciseFive,
            pauseFive: !this.pauseFive ? null : this.pauseFive,
            exerciseSix: !this.exerciseSix ? null : this.exerciseSix,
            pauseSix: !this.pauseSix ? null : this.pauseSix,
            exerciseSeven: !this.exerciseSeven ? null : this.exerciseSeven,
            pauseSeven: !this.pauseSeven ? null : this.pauseSeven,
            exerciseEight: !this.exerciseEight ? null : this.exerciseEight,
            pauseEight: !this.pauseEight ? null : this.pauseEight,
            exerciseNine: !this.exerciseNine ? null : this.exerciseNine,
            pauseNine: !this.pauseNine ? null : this.pauseNine,
            exerciseTen: !this.exerciseTen ? null : this.exerciseTen,
            pauseTen: !this.pauseTen ? null : this.pauseTen,
        });

        return this.name;
    }

    async delete(): Promise<string> {
        await pool.execute("DELETE FROM `trainings` WHERE `id` = :id", {
            id: this.id,
        })
        return this.name;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `trainings` SET `name` = :name, `description` = description,`numberOfSeries` = :numberOfSeries,`exerciseOne` = :exerciseOne,`exerciseTwo` = :exerciseTwo,`exerciseThree` = :exerciseThree,`exerciseFour` = :exerciseFour,`exerciseFive` = :exerciseFive,`exerciseSix` = :exerciseSix,`exerciseSeven` = :exerciseSeven,`exerciseEight` = :exerciseEight,`exerciseNine` = :exerciseNine,`exerciseTen` = :exerciseTen WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            description: this.description,
            numberOfSeries: this.numberOfSeries,
            exerciseOne: this.exerciseOne,
            pauseOne: this.pauseOne,
            exerciseTwo: !this.exerciseTwo ? null : this.exerciseTwo,
            pauseTwo: !this.pauseTwo ? null : this.pauseTwo,
            exerciseThree: !this.exerciseThree ? null : this.exerciseThree,
            pauseThree: !this.pauseThree ? null : this.pauseThree,
            exerciseFour: !this.exerciseFour ? null : this.exerciseFour,
            pauseFour: !this.pauseFour ? null : this.pauseFour,
            exerciseFive: !this.exerciseFive ? null : this.exerciseFive,
            pauseFive: !this.pauseFive ? null : this.pauseFive,
            exerciseSix: !this.exerciseSix ? null : this.exerciseSix,
            pauseSix: !this.pauseSix ? null : this.pauseSix,
            exerciseSeven: !this.exerciseSeven ? null : this.exerciseSeven,
            pauseSeven: !this.pauseSeven ? null : this.pauseSeven,
            exerciseEight: !this.exerciseEight ? null : this.exerciseEight,
            pauseEight: !this.pauseEight ? null : this.pauseEight,
            exerciseNine: !this.exerciseNine ? null : this.exerciseNine,
            pauseNine: !this.pauseNine ? null : this.pauseNine,
            exerciseTen: !this.exerciseTen ? null : this.exerciseTen,
            pauseTen: !this.pauseTen ? null : this.pauseTen,
        });
    }

}