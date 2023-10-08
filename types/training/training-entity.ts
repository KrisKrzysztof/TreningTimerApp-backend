export interface NewTrainingEntity extends Omit<TrainingEntity, 'id'> {
    id?: string;
}

export interface TrainingEntity {
    id: string;
    name: string;
    description: string;
    numberOfSeries: number;
    exerciseOne: string;
    exerciseTwo?: string;
    exerciseThree?: string;
    exerciseFour?: string;
    exerciseFive?: string;
    exerciseSix?: string;
    exerciseSeven?: string;
    exerciseEight?: string;
    exerciseNine?: string;
    exerciseTen?: string;
}
