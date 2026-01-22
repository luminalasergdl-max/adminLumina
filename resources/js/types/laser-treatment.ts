import { LaserSession } from "./laser-session"

export type LaserTreatment = {
    id: number,
    laser_category_id: number,
    brief_description: string,
    anatomic_place: string,
    size: string,
    years: number,
    retouching: number,
    laser: boolean,
    surgery: boolean,
    acid: boolean,
    other: string,
    notes: string,
    laser_sessions: LaserSession[],
    photo_0?: string,
    photo_1?: string,
    photo_2?: string,
    finished: boolean,
}
