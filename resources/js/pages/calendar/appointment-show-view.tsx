import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import { type Customer } from './appointment-dialog';

interface AppointmentShowViewProps {
    selectedCustomer: Customer | null;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timesRescheduled: number;
    canSendWhatsApp: boolean;
    handleWhatsApp: () => void;
    setViewMode: (mode: 'show' | 'edit' | 'reschedule') => void;
}

export function AppointmentShowView({
    selectedCustomer,
    startDate,
    endDate,
    startTime,
    endTime,
    timesRescheduled,
    canSendWhatsApp,
    handleWhatsApp,
    setViewMode
}: AppointmentShowViewProps) {
    return (
        <>
            <div className="py-4 grid gap-4">
                <div>
                    <span className="text-sm font-medium text-muted-foreground">Cliente</span>
                    <p className="font-medium text-lg">
                        {selectedCustomer ? (
                            <Link href={`/customers/${selectedCustomer.id}`} className="text-primary underline">
                                {selectedCustomer.full_name}
                            </Link>
                        ) : 'Sin asignar'}
                    </p>
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
                <div className="mt-2 text-sm text-muted-foreground border-t pt-4">
                    Reagendado: {timesRescheduled} {timesRescheduled === 1 ? 'vez' : 'veces'}
                </div>
            </div>

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
                    <Button variant="secondary" className="w-full sm:w-auto" onClick={() => setViewMode('reschedule')}>Reagendar</Button>
                    <Button className="w-full sm:w-auto" onClick={() => setViewMode('edit')}>Editar detalles/borrar</Button>
                </div>
            </DialogFooter>
        </>
    );
}
