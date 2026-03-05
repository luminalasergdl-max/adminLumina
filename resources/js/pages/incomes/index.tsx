import AppLayout from "@/layouts/app-layout"
import { index } from '@/routes/incomes';
import { type BreadcrumbItem } from '@/types';

import {
    Button
} from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Income } from '@/types/income'

import { Head, Link, router } from '@inertiajs/react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

type IncomesIndexProps = {
    incomes: Income[]
    month: number
    year: number
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finanzas',
        href: '/finances',
    },
    {
        title: 'Ingresos',
        href: index().url,
    },
]

export default function IncomesIndex({ incomes, month, year }: IncomesIndexProps) {
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

    const columns: ColumnDef<Income>[] = [
        {
            accessorKey: "category",
            header: "Categoría",
            cell: ({ row }) => {
                const category = row.original.category;
                let className = '';
                let label = '';

                switch (category) {
                    case 'laserSession':
                        className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                        label = 'Láser';
                        break;
                    case 'microneedlingSession':
                        className = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                        label = 'Microneedling';
                        break;
                    case 'giftCard':
                        className = 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
                        label = 'Gift Card';
                        break;
                    case 'package':
                        className = 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
                        label = 'Paquete';
                        break;
                }

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
                        {label}
                    </span>
                )
            }
        },
        {
            accessorKey: "description",
            header: "Descripción",
        },
        {
            accessorKey: "amount",
            header: "Monto",
            cell: ({ row }) => (
                <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(row.original.amount)}
                </span>
            )
        },
    ]

    const table = useReactTable({
        data: incomes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const totalIncome = table.getFilteredRowModel().rows.reduce((sum, row) => sum + Number(row.original.amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ingresos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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

                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <Select
                            value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
                            onValueChange={(value) => {
                                if (value === "all") {
                                    table.getColumn("category")?.setFilterValue(undefined)
                                } else {
                                    table.getColumn("category")?.setFilterValue(value)
                                }
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Todas las Categorías" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las Categorías</SelectItem>
                                <SelectItem value="laserSession">Láser</SelectItem>
                                <SelectItem value="microneedlingSession">Microneedling</SelectItem>
                                <SelectItem value="package">Paquetes</SelectItem>
                                <SelectItem value="giftCard">Gift Cards</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="py-4" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        <span className='font-bold text-lg'>
                                            No hay ingresos registrados para este periodo.
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} className="text-right font-bold text-lg">
                                    Total
                                </TableCell>
                                <TableCell className="font-bold text-lg text-green-600 dark:text-green-400">
                                    {formatCurrency(totalIncome)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}
