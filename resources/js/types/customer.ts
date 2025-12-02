import { LaserTreatment } from './laser-treatment'

export type Customer = {
    id: number,
    full_name: string,
    email: string,
    gender: string,
    birthdate: string,
    contact_phone_1: string,
    contact_phone_2: string,
    zip_code: string,
    emergency_contact_name: string,
    emergency_contact_phone: string,
    instagram: boolean
    maps: boolean
    mouth_mouth: boolean
    other_hear_about_us: string
    diabetes: boolean
    hipertension: boolean
    epilepsia: boolean
    enfermedades_autoinmunes: boolean
    cancer_melanoma: boolean
    transtornos_coagulacion: boolean
    enfermedades_cardiacas: boolean
    infecciones_herpes_bacterianas_micoticas: boolean
    vih_inmunosupresion: boolean
    problemas_cicatrizacion: boolean
    enfermedades_piel: boolean
    retinoides_sistemicos: boolean
    photosensitizer: boolean
    alergias: boolean
    embarazo: boolean
    lactancia: boolean
    exposicion_solar_reciente: boolean
    camas_solares: boolean
    smokes: boolean
    drinks: boolean
    frequent_solar_exposure: boolean
    laser_treatments: LaserTreatment[]
}

export interface ExtendedCustomer extends Customer {
    edit_url: string
    delete_url: string
}

export const diseaseFields: Array<{ key: keyof ExtendedCustomer; label: string }> = [
    { key: 'diabetes', label: 'Diabetes' },
    { key: 'hipertension', label: 'Hipertensión' },
    { key: 'epilepsia', label: 'Epilepsia' },
    { key: 'enfermedades_autoinmunes', label: 'Enfermedades Autoinmunes' },
    { key: 'cancer_melanoma', label: 'Cáncer / Melanoma' },
    { key: 'transtornos_coagulacion', label: 'Trastornos de Coagulación' },
    { key: 'enfermedades_cardiacas', label: 'Enfermedades Cardíacas' },
    { key: 'infecciones_herpes_bacterianas_micoticas', label: 'Infecciones (Herpes / Bacterianas / Micóticas)' },
    { key: 'vih_inmunosupresion', label: 'VIH / Inmunosupresión' },
    { key: 'problemas_cicatrizacion', label: 'Problemas de Cicatrización' },
    { key: 'enfermedades_piel', label: 'Enfermedades de la Piel' },
    { key: 'retinoides_sistemicos', label: 'Retinoides Sistémicos' },
    { key: 'photosensitizer', label: 'Uso de Fotosensibilizantes' },
    { key: 'alergias', label: 'Alergias' },
    { key: 'embarazo', label: 'Embarazo' },
    { key: 'lactancia', label: 'Lactancia' },
    { key: 'exposicion_solar_reciente', label: 'Exposición Solar Reciente' },
    { key: 'camas_solares', label: 'Camas Solares' },
    { key: 'smokes', label: 'Fuma' },
    { key: 'drinks', label: 'Bebe Alcohol' },
    { key: 'frequent_solar_exposure', label: 'Exposición Solar Frecuente' },
]
