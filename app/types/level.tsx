export enum LevelStatus {
    Completed = 'completed',
    InProgress = 'in_progress',
    Locked = 'locked',
}

export type Level = {
    id: string;
    name: string;
    icon: string;
    status: LevelStatus;
    pointsRequired: number;
    pointsEarned: number;
};