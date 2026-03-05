export type LaserSession = {
    id: number,
    laser_treatment_id: number,
    power: string,
    header: string,
    passes: number,
    price: number,
    notes: string,
    date_hour: string
    photo_0: string,
    photo_1: string,
    photo_2: string,
    package_id?: number,
}