import AppLayout from "@/layouts/app-layout"
import { index, create, edit, show, destroy } from '@/routes/outcomes';
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

import { format } from 'date-fns'

import {
    Input
} from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import { Outcome } from '@/types/outcome'

import { Head, Link, router } from '@inertiajs/react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

type OutcomesIndexProps = {
    outcomes: Outcome[]
    month: number
    year: number
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finanzas',
        href: '/finances',
    },
    {
        title: 'Egresos',
        href: index().url,
    },
]

export default function OutcomesIndex({ outcomes, month, year }: OutcomesIndexProps) {
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

    const deleteOutcome = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este egreso?')) {
            router.delete(destroy({ outcome: id }).url)
        }
    }

    const columns: ColumnDef<Outcome>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "date",
            header: "Fecha",
            cell: ({ row }) => {
                const dateSplit = row.original.date.split('-');
                if (dateSplit.length === 3) {
                    return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
                }
                return row.original.date;
            }
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.original.type === 'fixed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'}`}>
                    {row.original.type === 'fixed' ? 'Fijo' : 'Variable'}
                </span>
            )
        },
        {
            accessorKey: "amount",
            header: "Monto",
            cell: ({ row }) => (
                <span className="font-semibold">
                    {formatCurrency(row.original.amount)}
                </span>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const outcomeId = row.original.id;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={edit({ outcome: outcomeId }).url}>
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteOutcome(outcomeId);
                                }}
                            >
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]

    const table = useReactTable({
        data: outcomes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const totalOutcome = table.getFilteredRowModel().rows.reduce((sum, row) => sum + Number(row.original.amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Egresos" />
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
                        <Input
                            placeholder="Buscar egreso..."
                            value={table.getState().globalFilter ?? ''}
                            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                            className="max-w-[200px]"
                        />
                        <Select
                            value={(table.getColumn("type")?.getFilterValue() as string) ?? "all"}
                            onValueChange={(value) => {
                                if (value === "all") {
                                    table.getColumn("type")?.setFilterValue(undefined)
                                } else {
                                    table.getColumn("type")?.setFilterValue(value)
                                }
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todos los Tipos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los Tipos</SelectItem>
                                <SelectItem value="fixed">Fijo</SelectItem>
                                <SelectItem value="variable">Variable</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link
                            href={create().url}
                            method={create().method}
                            as="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 sm:w-auto w-40 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Nuevo Egreso
                        </Link>
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
                                            No hay egresos registrados.
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} className="text-right font-bold text-lg">
                                    Total
                                </TableCell>
                                <TableCell colSpan={2} className="font-bold text-lg">
                                    {formatCurrency(totalOutcome)}
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
