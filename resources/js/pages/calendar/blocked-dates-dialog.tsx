import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { type Appointment } from './appointment-dialog';

interface BlockedDatesDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    appointment: Appointment | null;
    selectedDate: string | null;
    onSave: (appointment: Appointment) => void;
    onDelete?: (id: number) => void;
}

export function BlockedDatesDialog({
    isOpen,
    onOpenChange,
    appointment,
    selectedDate,
    onSave,
    onDelete,
}: BlockedDatesDialogProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (appointment) {
                setStartDate(appointment.start_date.split('T')[0]);
                setEndDate(appointment.end_date.split('T')[0]);
                setStartTime(appointment.start_time);
                setEndTime(appointment.end_time);
            } else {
                let parsedDate = selectedDate || '';
                let defaultStartTime = '09:00';
                let defaultEndTime = '18:00';

                if (selectedDate && selectedDate.includes('T')) {
                    const parts = selectedDate.split('T');
                    parsedDate = parts[0];
                    defaultStartTime = parts[1].substring(0, 5);
                    
                    const hour = parseInt(defaultStartTime.substring(0, 2));
                    const nextHour = (hour + 1).toString().padStart(2, '0');
                    defaultEndTime = `${nextHour}:${defaultStartTime.substring(3, 5)}`;
                } else if (selectedDate && selectedDate.length > 10) {
                    const parts = selectedDate.split(' ');
                    if(parts.length > 1) {
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
            setError(null);
        }
    }, [isOpen, appointment, selectedDate]);

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
            customer_id: null, // Blocked dates typically don't have a customer
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            is_blocked: true, // Always true for this dialog
            whatsapp_reminder_sent: false,
        });
    };

    const isEditMode = !!appointment?.id;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Editar Bloqueo de Disponibilidad' : 'Nuevo Bloqueo de Disponibilidad'}</DialogTitle>
                </DialogHeader>

                <div className="py-4 grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="block_start_date">Fecha Inicio</Label>
                            <Input id="block_start_date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="block_end_date">Fecha Fin</Label>
                            <Input id="block_end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="block_start_time">Hora Inicio</Label>
                            <Input id="block_start_time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="block_end_time">Hora Fin</Label>
                            <Input id="block_end_time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-sm font-medium text-destructive mb-2 px-2">
                        {error}
                    </div>
                )}

                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2">
                    {isEditMode && onDelete ? (
                        <Button variant="destructive" onClick={() => appointment?.id && onDelete(appointment.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                        </Button>
                    ) : (
                        <div />
                    )}
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
