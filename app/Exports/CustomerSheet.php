<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithTitle;

class CustomerSheet implements FromCollection, WithTitle
{
    private $customer;

    public function __construct($customer)
    {
        $this->customer = $customer;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $data = [];

        // Header for Customer Info
        $data[] = ['INFORMACIÓN DEL CLIENTE'];
        $data[] = [
            'ID', 'Nombre Completo', 'Género', 'Fecha de Nacimiento', 'Teléfono 1', 'Teléfono 2', 'Email', 
            'Contacto de Emergencia', 'Teléfono de Emergencia', 'Código Postal', 'Diabetes', 'Hipertensión', 
            'Epilepsia', 'Enfermedades Autoinmunes', 'Cáncer / Melanoma', 'Trastornos de Coagulación', 
            'Enfermedades Cardíacas', 'Infecciones (Herpes / Bacterianas / Micóticas)', 'VIH / Inmunosupresión', 
            'Problemas de Cicatrización', 'Enfermedades de la Piel', 'Retinoides Sistémicos', 
            'Uso de Fotosensibilizantes', 'Alergias', 'Embarazo', 'Lactancia', 'Exposición Solar Reciente', 
            'Camas Solares', 'Fuma', 'Bebe Alcohol', 'Exposición Solar Frecuente'
        ];
        
        // Customer Data Row
        $data[] = [
            $this->customer->id,
            $this->customer->full_name,
            $this->customer->gender,
            $this->customer->birthdate ? $this->customer->birthdate->format('Y-m-d') : '',
            $this->customer->contact_phone_1,
            $this->customer->contact_phone_2,
            $this->customer->email,
            $this->customer->emergency_contact_name,
            $this->customer->emergency_contact_phone,
            $this->customer->zip_code,
            $this->customer->diabetes ? 'Sí' : 'No',
            $this->customer->hipertension ? 'Sí' : 'No',
            $this->customer->epilepsia ? 'Sí' : 'No',
            $this->customer->enfermedades_autoinmunes ? 'Sí' : 'No',
            $this->customer->cancer_melanoma ? 'Sí' : 'No',
            $this->customer->transtornos_coagulacion ? 'Sí' : 'No',
            $this->customer->enfermedades_cardiacas ? 'Sí' : 'No',
            $this->customer->infecciones_herpes_bacterianas_micoticas ? 'Sí' : 'No',
            $this->customer->vih_inmunosupresion ? 'Sí' : 'No',
            $this->customer->problemas_cicatrizacion ? 'Sí' : 'No',
            $this->customer->enfermedades_piel ? 'Sí' : 'No',
            $this->customer->retinoides_sistemicos ? 'Sí' : 'No',
            $this->customer->photosensitizer ? 'Sí' : 'No',
            $this->customer->alergias ? 'Sí' : 'No',
            $this->customer->embarazo ? 'Sí' : 'No',
            $this->customer->lactancia ? 'Sí' : 'No',
            $this->customer->exposicion_solar_reciente ? 'Sí' : 'No',
            $this->customer->camas_solares ? 'Sí' : 'No',
            $this->customer->smokes ? 'Sí' : 'No',
            $this->customer->drinks ? 'Sí' : 'No',
            $this->customer->frequent_solar_exposure ? 'Sí' : 'No',
        ];

        foreach ($this->customer->laserTreatments as $treatment) {
            $data[] = ['']; // Spacer
            $data[] = ['DATOS DEL TRATAMIENTO LÁSER'];
            $data[] = [
                '', 'ID del Tratamiento', 'Categoría', 'Descripción breve', 'Lugar anatómico', 'Tamaño', 'Antigüedad (años)', 
                'Número de retoques', 'Láser', 'Cirugía', 'Ácido', 'Otro', 'Terminado', 'Notas'
            ];
            $data[] = [
                '',
                $treatment->id,
                $treatment->category->name ?? 'N/A',
                $treatment->brief_description,
                $treatment->anatomic_place,
                $treatment->size,
                $treatment->years,
                $treatment->retouching,
                $treatment->laser ? 'Sí' : 'No',
                $treatment->surgery ? 'Sí' : 'No',
                $treatment->acid ? 'Sí' : 'No',
                $treatment->other,
                $treatment->finished ? 'Sí' : 'No',
                $treatment->notes,
            ];

            if ($treatment->packages->count() > 0) {
                $data[] = ['', 'PAQUETES CONTRATADOS'];
                $data[] = [
                    '', 'ID Paquete', 'Nombre Paquete', 'Precio', 'Sesiones Totales', 'Sesiones Usadas', 'Notas'
                ];
                foreach ($treatment->packages as $package) {
                    $data[] = [
                        '',
                        $package->id,
                        $package->package_name,
                        $package->package_price,
                        $package->package_sessions_total,
                        $package->package_sessions_used,
                        $package->notes,
                    ];
                }
            }

            if ($treatment->laserSessions->count() > 0) {
                $data[] = ['', '', 'SESIONES LÁSER'];
                $data[] = [
                    '', '', 'ID de la Sesión', 'Fecha y hora', 'Potencia', 'Cabezal', 'Pasadas', 'Precio', 'ID de Paquete', 'Notas'
                ];
                foreach ($treatment->laserSessions as $session) {
                    $data[] = [
                        '', 
                        '',
                        $session->id,
                        $session->date_hour ? $session->date_hour->format('Y-m-d H:i') : '',
                        $session->power,
                        $session->header,
                        $session->passes,
                        $session->price,
                        $session->package_id,
                        $session->notes,
                    ];
                }
            }
        }

        foreach ($this->customer->microneedlingTreatments as $treatment) {
            $data[] = ['']; // Spacer
            $data[] = ['DATOS DEL TRATAMIENTO MICRONEEDLING'];
            $data[] = [
                '', 'ID del Tratamiento', 'Objetivo', 'Lugar anatómico', 'Sesiones Previas', 
                'Láser', 'Cirugía', 'Ácido', 'Otro', 'Notas'
            ];
            $data[] = [
                '',
                $treatment->id,
                $treatment->objective,
                $treatment->anatomic_place,
                $treatment->previous_sessions,
                $treatment->laser ? 'Sí' : 'No',
                $treatment->surgery ? 'Sí' : 'No',
                $treatment->acid ? 'Sí' : 'No',
                $treatment->other,
                $treatment->notes,
            ];

            if ($treatment->microneedlingSessions->count() > 0) {
                $data[] = ['', '', 'SESIONES MICRONEEDLING'];
                $data[] = [
                    '', '', 'ID de la Sesión', 'Fecha y hora', 'Activo', 'Agujas', 'Precio', 'Notas'
                ];
                foreach ($treatment->microneedlingSessions as $session) {
                    $data[] = [
                        '', 
                        '',
                        $session->id,
                        $session->date_hour ? $session->date_hour->format('Y-m-d H:i') : '',
                        $session->activo,
                        $session->agujas,
                        $session->price,
                        $session->notes,
                    ];
                }
            }
        }

        return collect($data);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        // Cleaning title: remove invalid characters and limit length
        $title = str_replace(['*', ':', '/', '\\', '?', '[', ']'], '', $this->customer->full_name);
        return substr($title, 0, 31);
    }
}
