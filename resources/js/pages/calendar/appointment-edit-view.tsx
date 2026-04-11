import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { CheckIcon, ChevronsUpDownIcon, Trash2 } from 'lucide-react';
import { type Customer, type Appointment } from './appointment-dialog';

interface AppointmentEditViewProps {
    viewMode: 'edit' | 'reschedule' | 'show';
    isEditMode: boolean;
    appointment: Appointment | null;
    selectedCustomer: Customer | null;
    setSelectedCustomer: (customer: Customer | null) => void;
    filteredCustomers: Customer[];
    query: string;
    setQuery: (query: string) => void;
    startDate: string;
    handleStartDateChange: (val: string) => void;
    endDate: string;
    setEndDate: (val: string) => void;
    startTime: string;
    handleStartTimeChange: (val: string) => void;
    endTime: string;
    setEndTime: (val: string) => void;
    timesRescheduled: number;
    setTimesRescheduled: (val: number) => void;
    error: string | null;
    handleSave: () => void;
    onDelete?: (id: number) => void;
    setViewMode: (mode: 'show' | 'edit' | 'reschedule') => void;
    onOpenChange: (open: boolean) => void;
}

export function AppointmentEditView({
    viewMode,
    isEditMode,
    appointment,
    selectedCustomer,
    setSelectedCustomer,
    filteredCustomers,
    query,
    setQuery,
    startDate,
    handleStartDateChange,
    endDate,
    setEndDate,
    startTime,
    handleStartTimeChange,
    endTime,
    setEndTime,
    timesRescheduled,
    setTimesRescheduled,
    error,
    handleSave,
    onDelete,
    setViewMode,
    onOpenChange
}: AppointmentEditViewProps) {
    return (
        <>
            <div className="py-4 grid gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="customer">Cliente</Label>
                    {isEditMode || viewMode === 'reschedule' ? (
                        <div>
                            <p className="font-medium text-lg mt-1">
                                {selectedCustomer ? (
                                    <Link href={`/customers/${selectedCustomer.id}`} className="text-primary underline">
                                        {selectedCustomer.full_name}
                                    </Link>
                                ) : 'Sin asignar'}
                            </p>
                        </div>
                    ) : (
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
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="start_date">Fecha Inicio</Label>
                        <Input id="start_date" type="date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end_date">Fecha Fin</Label>
                        <Input id="end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="start_time">Hora Inicio</Label>
                        <Input id="start_time" type="time" value={startTime} onChange={(e) => handleStartTimeChange(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end_time">Hora Fin</Label>
                        <Input id="end_time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                </div>
                <div className="text-xs font-medium text-yellow-600">
                    Verifica el formato am/pm!
                </div>

                {viewMode === 'reschedule' && (
                    <div className="mt-2 text-sm text-muted-foreground border-t pt-4">
                        Reagendado: {timesRescheduled} {timesRescheduled === 1 ? 'vez' : 'veces'}
                    </div>
                )}

                {viewMode === 'edit' && isEditMode && (
                    <div className="flex flex-col gap-2 mt-2 border-t pt-4">
                        <Label htmlFor="times_rescheduled">Veces reagendado</Label>
                        <Input
                            id="times_rescheduled"
                            type="number"
                            min="0"
                            className="w-1/3"
                            value={timesRescheduled}
                            onChange={(e) => setTimesRescheduled(parseInt(e.target.value) || 0)}
                        />
                        <span className="text-xs text-yellow-600">
                            Editar detalles no cuenta como reagendar, por favor usa el botón específico en la pantalla anterior!
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <div className="text-sm font-medium text-destructive mb-2 px-2">
                    {error}
                </div>
            )}

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
        </>
    );
}
