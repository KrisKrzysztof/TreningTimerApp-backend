export interface NewTrainingEntity extends Omit<TrainingEntity, 'id'> {
    id?: string;
}
// export type NewTrainingEntity = Omit<TrainingEntity, 'id'>;


export interface TrainingEntity {
    id: string;
    name: string;
    description: string | null;
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
}
