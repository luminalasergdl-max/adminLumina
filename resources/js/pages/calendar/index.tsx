import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { AppointmentDialog, type Customer, type Appointment } from './appointment-dialog';
import { BlockedDatesDialog } from './blocked-dates-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState('');

    const calendarRef = useRef<FullCalendar | null>(null);

    useEffect(() => {
        if (!calendarRef.current) return;
        const api = calendarRef.current.getApi();
        if (searchQuery.trim().length > 0) {
            if (api.view.type !== 'listMonth') {
                api.changeView('listMonth');
            }
        } else {
             if (api.view.type === 'listMonth') {
                 api.changeView('dayGridMonth');
             }
        }
    }, [searchQuery]);

    const handleDateClick = (info: any) => {
        if (calendarRef.current?.getApi().view.type === 'dayGridMonth') {
            calendarRef.current?.getApi().changeView('timeGridWeek');
        } else {
            setSelectedDate(info.dateStr);
            setSelectedAppointment(null);
            setIsDialogOpen(true);
        }
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
                onSuccess: () => {
                    setIsDialogOpen(false);
                    if (appointment.is_rescheduling) {
                        alert('¡Cita reagendada con éxito!');
                    }
                },
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

    const filteredAppointments = appointments?.filter(appointment => {
        if (!searchQuery) return true;
        
        const q = searchQuery.toLowerCase();
        const customer = (appointment as any).customer;
        
        if (customer) {
            if (customer.full_name?.toLowerCase().includes(q)) return true;
            if (customer.contact_phone_1?.includes(q)) return true;
            if (customer.contact_phone_2?.includes(q)) return true;
        }
        
        if (appointment.is_blocked && 'bloqueado'.includes(q)) return true;

        return false;
    }) || [];

    const calendarEvents = filteredAppointments.map(appointment => {
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
            <div className="p-4 flex justify-end gap-16 sm:gap-2">
                <Input
                    placeholder="Buscar cliente por nombre o número teléfonico..."
                    className="max-w"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="secondary" onClick={() => {
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setSelectedAppointment(null);
                    setIsBlockedDatesDialogOpen(true);
                }}>Bloquear Fechas</Button>
            </div>
            <div className="px-4 pb-4">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listMonth',
                    }}
                    buttonText={{
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        list: 'Lista',
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