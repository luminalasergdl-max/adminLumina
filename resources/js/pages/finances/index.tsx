import AppLayout from "@/layouts/app-layout"
import { index } from "@/routes/finances"
import { index as incomesIndex } from "@/routes/incomes"
import { index as outcomesIndex, create as createOutcome } from "@/routes/outcomes"
import { type BreadcrumbItem } from "@/types"
import { Head, Link, router } from "@inertiajs/react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

type FinancesIndexProps = {
    month: number
    year: number
    incomeTotal: number
    outcomeTotal: number
}

export default function FinancesIndex({ month, year, incomeTotal, outcomeTotal }: FinancesIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Finanzas',
            href: index().url,
        },
    ]

    const months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' },
    ]

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handleFilterChange = (newMonth: number, newYear: number) => {
        router.get(index().url, { month: newMonth, year: newYear }, { preserveState: true, preserveScroll: true });
    };

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(Number(amount))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finanzas" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Select
                            value={month.toString()}
                            onValueChange={(val) => handleFilterChange(Number(val), year)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Mes" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map(m => (
                                    <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={year.toString()}
                            onValueChange={(val) => handleFilterChange(month, Number(val))}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Año" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map(y => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Link
                        href={createOutcome().url}
                        method={createOutcome().method}
                        as="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        <Plus className="h-4 w-4" />
                        Registrar Egreso
                    </Link>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href={incomesIndex().url} className="rounded-xl border bg-card text-card-foreground shadow flex flex-col p-6 space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold text-muted-foreground">Ingresos del periodo</h3>
                        <p className="text-3xl font-bold">
                            {formatCurrency(incomeTotal)}
                        </p>
                    </Link>

                    <Link href={outcomesIndex().url} className="rounded-xl border bg-card text-card-foreground shadow flex flex-col p-6 space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold text-muted-foreground">Egresos del periodo</h3>
                        <p className="text-3xl font-bold">
                            -{formatCurrency(outcomeTotal)}
                        </p>
                    </Link>

                    <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col p-6 space-y-2">
                        <h3 className="font-semibold text-muted-foreground">Balance</h3>
                        <p className={`text-3xl font-bold ${incomeTotal - outcomeTotal >= 0 ? 'text-primary' : 'text-red-600 dark:text-red-400'}`}>
                            {formatCurrency(incomeTotal - outcomeTotal)}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
