import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { CheckIcon, ChevronsUpDownIcon, Trash2, MessageCircle } from 'lucide-react';

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

export function AppointmentDialog({
    isOpen,
    onOpenChange,
    appointment,
    customers,
    selectedDate,
    onSave,
    onDelete,
}: AppointmentDialogProps) {
    const [viewMode, setViewMode] = useState<'show' | 'edit'>('show');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [query, setQuery] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [whatsappReminder, setWhatsappReminder] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (appointment) {
                const customer = customers.find(c => c.id === appointment.customer_id) || null;
                setSelectedCustomer(customer);
                setStartDate(appointment.start_date.split('T')[0]);
                setEndDate(appointment.end_date.split('T')[0]);
                setStartTime(appointment.start_time);
                setEndTime(appointment.end_time);
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
                return customer.full_name?.toLowerCase().includes(query.toLowerCase())
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
        });
    };

    const isEditMode = !!appointment?.id;
    const isFuture = new Date(`${startDate}T${startTime}`) > new Date();
    const canSendWhatsApp = isEditMode && isFuture && !!selectedCustomer?.contact_phone_1;

    const handleWhatsApp = () => {
        if (!selectedCustomer?.contact_phone_1) return;
        const msg = `Hola! te recordamos que tienes una cita pendiente el día ${startDate} a las ${startTime}`;
        const phone = selectedCustomer.contact_phone_1.replace(/\D/g, '');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {viewMode === 'show' ? 'Detalles de la Reserva' : isEditMode ? 'Editar Reserva' : 'Nueva Reserva'}
                    </DialogTitle>
                </DialogHeader>

                {viewMode === 'show' ? (
                    <div className="py-4 grid gap-4">
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Cliente</span>
                            <p className="font-medium text-lg">{selectedCustomer?.full_name || 'Sin asignar'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Fecha Inicio</span>
                                <p>{startDate}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Fecha Fin</span>
                                <p>{endDate}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Hora Inicio</span>
                                <p>{startTime}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Hora Fin</span>
                                <p>{endTime}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 grid gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="customer">Cliente</Label>
                            <Combobox value={selectedCustomer} onChange={setSelectedCustomer}>
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring sm:text-sm">
                                        <ComboboxInput
                                            className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-0"
                                            displayValue={(customer: Customer) => customer ? customer.full_name : ''}
                                            onChange={(event) => setQuery(event.target.value)}
                                            placeholder="Buscar cliente..."
                                        />
                                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronsUpDownIcon className="h-4 w-4 text-muted-foreground opacity-50" aria-hidden="true" />
                                        </ComboboxButton>
                                    </div>
                                    <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md sm:text-sm z-50">
                                        {filteredCustomers.length === 0 && query !== '' ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-muted-foreground">
                                                No se encontraron clientes.
                                            </div>
                                        ) : (
                                            filteredCustomers.map((customer) => (
                                                <ComboboxOption
                                                    key={customer.id}
                                                    value={customer}
                                                    className={({ focus }) =>
                                                        `relative cursor-pointer select-none py-2 pl-8 pr-4 ${focus ? 'bg-accent text-accent-foreground' : 'text-foreground'
                                                        }`
                                                    }
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                {customer.full_name}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-primary">
                                                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </ComboboxOption>
                                            ))
                                        )}
                                    </ComboboxOptions>
                                </div>
                            </Combobox>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="start_date">Fecha Inicio</Label>
                                <Input id="start_date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="end_date">Fecha Fin</Label>
                                <Input id="end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="start_time">Hora Inicio</Label>
                                <Input id="start_time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="end_time">Hora Fin</Label>
                                <Input id="end_time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-sm font-medium text-destructive mb-2 px-2">
                        {error}
                    </div>
                )}

                {viewMode === 'show' ? (
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between w-full gap-2 mt-4">
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {canSendWhatsApp && (
                                <Button variant="outline" className="w-full sm:w-auto text-green-600 border-green-600 hover:bg-green-50" onClick={handleWhatsApp}>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    WhatsApp
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end">
                            <Button className="w-full sm:w-auto" onClick={() => setViewMode('edit')}>Editar/borrar</Button>
                        </div>
                    </DialogFooter>
                ) : (
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between w-full gap-2 mt-4">
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {isEditMode && onDelete && (
                                <Button variant="destructive" className="w-full sm:w-auto" onClick={() => appointment?.id && onDelete(appointment.id)}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end">
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => {
                                if (appointment) {
                                    setViewMode('show');
                                } else {
                                    onOpenChange(false);
                                }
                            }}>Cancelar</Button>
                            <Button className="w-full sm:w-auto" onClick={handleSave}>Guardar</Button>
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
