export interface NewTrainingEntity extends Omit<TrainingEntity, 'id'> {
    id?: string;
}

export interface TrainingEntity {
    id: string;
    name: string;
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
    exercisesOrderInSerie: string[];
}
