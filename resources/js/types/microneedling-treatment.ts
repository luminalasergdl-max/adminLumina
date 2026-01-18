import { MicroneedlingSession } from "./microneedling-session"

export type MicroneedlingTreatment = {
    id: number,
    objective: string,
    anatomic_place: string,
    previous_sessions: number,
    laser: boolean,
    surgery: boolean,
    acid: boolean,
    other: string,
    activo: string,
    notes: string,
    microneedling_sessions: MicroneedlingSession[],
    photo_0?: string,
    photo_1?: string,
    photo_2?: string,
}