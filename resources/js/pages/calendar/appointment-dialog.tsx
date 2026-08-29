import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { AppointmentEditView } from './appointment-edit-view';
import { AppointmentShowView } from './appointment-show-view';

export interface Customer {
    id: number;
    full_name: string;
    contact_phone_1?: string;
}

export interface Appointment {
    id?: number;
    customer_id: number | null;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    is_blocked?: boolean;
    whatsapp_reminder_sent: boolean;
    times_rescheduled?: number;
    is_rescheduling?: boolean;
}

interface AppointmentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    appointment: Appointment | null;
    customers: Customer[];
    selectedDate: string | null;
    onSave: (appointment: Appointment) => void;
    onDelete?: (id: number) => void;
}

export function AppointmentDialog({ isOpen, onOpenChange, appointment, customers, selectedDate, onSave, onDelete }: AppointmentDialogProps) {
    const [viewMode, setViewMode] = useState<'show' | 'edit' | 'reschedule'>('show');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [query, setQuery] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [whatsappReminder, setWhatsappReminder] = useState(false);
    const [timesRescheduled, setTimesRescheduled] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (appointment) {
                const customer = customers.find((c) => c.id === appointment.customer_id) || null;
                setSelectedCustomer(customer);
                setStartDate(appointment.start_date.split('T')[0]);
                setEndDate(appointment.end_date.split('T')[0]);
                setStartTime(appointment.start_time);
                setEndTime(appointment.end_time);
                setTimesRescheduled(appointment.times_rescheduled || 0);
            } else {
                setSelectedCustomer(null);

                let parsedDate = selectedDate || '';
                let defaultStartTime = '09:00';
                let defaultEndTime = '10:00';

                if (selectedDate && selectedDate.includes('T')) {
                    const parts = selectedDate.split('T');
                    parsedDate = parts[0];
                    defaultStartTime = parts[1].substring(0, 5);

                    const hour = parseInt(defaultStartTime.substring(0, 2));
                    const nextHour = (hour + 1).toString().padStart(2, '0');
                    defaultEndTime = `${nextHour}:${defaultStartTime.substring(3, 5)}`;
                } else if (selectedDate && selectedDate.length > 10) {
                    // Fallback if there's no T but there's a space (e.g. YYYY-MM-DD HH:mm)
                    const parts = selectedDate.split(' ');
                    if (parts.length > 1) {
                        parsedDate = parts[0];
                        defaultStartTime = parts[1].substring(0, 5);
                        const hour = parseInt(defaultStartTime.substring(0, 2));
                        const nextHour = (hour + 1).toString().padStart(2, '0');
                        defaultEndTime = `${nextHour}:${defaultStartTime.substring(3, 5)}`;
                    }
                }

                setStartDate(parsedDate);
                setEndDate(parsedDate);
                setStartTime(defaultStartTime);
                setEndTime(defaultEndTime);
            }
            setQuery('');
            setError(null);
            setViewMode(appointment ? 'show' : 'edit');
        }
    }, [isOpen, appointment, selectedDate, customers]);

    const filteredCustomers =
        query === ''
            ? customers
            : customers?.filter((customer) => {
                  return customer.full_name?.toLowerCase().includes(query.toLowerCase());
              }) || [];

    const handleSave = () => {
        setError(null);

        if (!startDate || !endDate || !startTime || !endTime) {
            setError('Todos los campos de fecha y hora son obligatorios.');
            return;
        }

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        if (endDateTime <= startDateTime) {
            setError('La fecha y hora de fin deben ser posteriores a la de inicio.');
            return;
        }

        onSave({
            id: appointment?.id,
            customer_id: selectedCustomer?.id || null,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            whatsapp_reminder_sent: whatsappReminder,
            times_rescheduled: timesRescheduled,
            is_rescheduling: viewMode === 'reschedule',
        });
    };

    const isEditMode = !!appointment?.id;
    const isFuture = new Date(`${endDate}T${endTime}`) > new Date();
    const canSendWhatsApp = isEditMode && isFuture && !!getWhatsAppUrl(selectedCustomer?.contact_phone_1);

    const handleWhatsApp = () => {
        if (!selectedCustomer?.contact_phone_1) return;
        const msg = `Hola! te recordamos que tienes una cita pendiente el día ${startDate} a las ${startTime}`;
        const whatsappUrl = getWhatsAppUrl(selectedCustomer.contact_phone_1, msg);

        if (whatsappUrl) {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleStartDateChange = (newStartDate: string) => {
        setStartDate(newStartDate);
        if (newStartDate > endDate || !endDate) {
            setEndDate(newStartDate);
        }
    };

    const handleStartTimeChange = (newStartTime: string) => {
        setStartTime(newStartTime);
        if (newStartTime) {
            const [hours, minutes] = newStartTime.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            date.setMinutes(date.getMinutes() + 60);

            const endHours = String(date.getHours()).padStart(2, '0');
            const endMinutes = String(date.getMinutes()).padStart(2, '0');
            setEndTime(`${endHours}:${endMinutes}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {viewMode === 'show'
                            ? 'Detalles de la Reserva'
                            : viewMode === 'reschedule'
                              ? 'Reagendar Reserva'
                              : isEditMode
                                ? 'Editar Reserva'
                                : 'Nueva Reserva'}
                    </DialogTitle>
                </DialogHeader>

                {viewMode === 'show' ? (
                    <AppointmentShowView
                        selectedCustomer={selectedCustomer}
                        startDate={startDate}
                        endDate={endDate}
                        startTime={startTime}
                        endTime={endTime}
                        timesRescheduled={timesRescheduled}
                        canSendWhatsApp={canSendWhatsApp}
                        handleWhatsApp={handleWhatsApp}
                        setViewMode={setViewMode}
                    />
                ) : (
                    <AppointmentEditView
                        viewMode={viewMode}
                        isEditMode={isEditMode}
                        appointment={appointment}
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        filteredCustomers={filteredCustomers}
                        query={query}
                        setQuery={setQuery}
                        startDate={startDate}
                        handleStartDateChange={handleStartDateChange}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        startTime={startTime}
                        handleStartTimeChange={handleStartTimeChange}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        timesRescheduled={timesRescheduled}
                        setTimesRescheduled={setTimesRescheduled}
                        error={error}
                        handleSave={handleSave}
                        onDelete={onDelete}
                        setViewMode={setViewMode}
                        onOpenChange={onOpenChange}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
