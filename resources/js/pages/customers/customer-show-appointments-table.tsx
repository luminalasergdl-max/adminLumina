import { ExtendedCustomer } from "@/types/customer"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { type Appointment } from '../calendar/appointment-dialog'

type CustomerShowAppointmentsTableProps = {
    customer: ExtendedCustomer
}

export function CustomerShowAppointmentsTable({ customer }: CustomerShowAppointmentsTableProps) {
    const columns: ColumnDef<Appointment>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "start_date",
            header: "Fecha Inicio",
            cell: ({row}) => {
                const date = row.original.start_date;
                return date ? date.split('T')[0] : '-';
            }
        },
        {
            accessorKey: "start_time",
            header: "Hora Inicio",
        },
        {
            accessorKey: "end_date",
            header: "Fecha Fin",
            cell: ({row}) => {
                const date = row.original.end_date;
                return date ? date.split('T')[0] : '-';
            }
        },
        {
            accessorKey: "end_time",
            header: "Hora Fin",
        },
    ]

    const data = customer.appointments || [];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="mt-4 grid auto-rows-min gap-4 rounded-md border">
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
                                <span className='font-bold text-2xl'>
                                    Sin resultados.
                                </span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
