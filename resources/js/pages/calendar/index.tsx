import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { AppointmentDialog, type Customer, type Appointment } from './appointment-dialog';
import { BlockedDatesDialog } from './blocked-dates-dialog';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calendario',
        href: '',
    },
];

export default function Calendar() {
    const { customers, appointments } = usePage<{ customers: Customer[], appointments: Appointment[] }>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isBlockedDatesDialogOpen, setIsBlockedDatesDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const handleDateClick = (info: any) => {
        setSelectedDate(info.dateStr);
        setSelectedAppointment(null);
        setIsDialogOpen(true);
    };

    const handleEventClick = (info: any) => {
        // Find appointment
        const id = parseInt(info.event.id);
        const appointment = appointments.find(a => a.id === id);

        if (appointment) {
            setSelectedAppointment(appointment);
            if (appointment.is_blocked) {
                setIsBlockedDatesDialogOpen(true);
            } else {
                setIsDialogOpen(true);
            }
        }
    };

    const handleSaveAppointment = (appointment: Appointment) => {
        if (appointment.id) {
            router.put(`/appointments/${appointment.id}`, appointment as any, {
                onSuccess: () => setIsDialogOpen(false),
            });
        } else {
            router.post('/appointments', appointment as any, {
                onSuccess: () => setIsDialogOpen(false),
            });
        }
    };

    const handleSaveBlockedDates = (appointment: Appointment) => {
        if (appointment.id) {
            router.put(`/appointments/${appointment.id}`, appointment as any, {
                onSuccess: () => setIsBlockedDatesDialogOpen(false),
            });
        } else {
            router.post('/appointments', appointment as any, {
                onSuccess: () => setIsBlockedDatesDialogOpen(false),
            });
        }
    };

    const handleDeleteAppointment = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            router.delete(`/appointments/${id}`, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setIsBlockedDatesDialogOpen(false);
                },
            });
        }
    };

    const calendarEvents = appointments?.map(appointment => {
        const isBlocked = appointment.is_blocked;

        const customerName = (appointment as any).customer?.full_name || 'Sin Asignar';
        const title = isBlocked ? 'Bloqueado' : customerName;

        return {
            id: String(appointment.id),
            title: title,
            start: `${appointment.start_date.split('T')[0]} ${appointment.start_time}`,
            end: `${appointment.end_date.split('T')[0]} ${appointment.end_time}`,
            color: isBlocked ? '#ef4444' : '#0ea5e9',
            extendedProps: appointment,
        };
    }) || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 flex justify-end">
                <Button variant="secondary" onClick={() => {
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setSelectedAppointment(null);
                    setIsBlockedDatesDialogOpen(true);
                }}>Bloquear Fechas</Button>
            </div>
            <div className="px-4 pb-4">
                <FullCalendar
                    plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek',
                    }}
                    buttonText={{
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                    }}
                    locale="es"
                    height={"60vh"}
                    events={calendarEvents}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </div>

            <AppointmentDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                appointment={selectedAppointment}
                customers={customers}
                selectedDate={selectedDate}
                onSave={handleSaveAppointment}
                onDelete={handleDeleteAppointment}
            />

            <BlockedDatesDialog
                isOpen={isBlockedDatesDialogOpen}
                onOpenChange={setIsBlockedDatesDialogOpen}
                appointment={selectedAppointment}
                selectedDate={selectedDate}
                onSave={handleSaveBlockedDates}
                onDelete={handleDeleteAppointment}
            />
        </AppLayout>
    )
}