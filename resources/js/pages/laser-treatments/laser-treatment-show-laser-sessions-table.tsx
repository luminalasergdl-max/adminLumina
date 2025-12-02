import { format } from "date-fns";

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

import { router } from '@inertiajs/react'

import { LaserTreatment } from "@/types/laser-treatment"
import { LaserSession } from "@/types/laser-session"
import laser_treatments from "@/routes/customers/laser_treatments"
import { show } from '@/routes/customers/laser_treatments/laser_sessions';
import { ExtendedCustomer } from "@/types/customer"

type LaserTreatmentShowLaserSessionsTableProps = {
    customer: ExtendedCustomer
    laserTreatment: LaserTreatment
}

export function LaserTreatmentShowLaserSessionsTable({ customer, laserTreatment }: LaserTreatmentShowLaserSessionsTableProps) {
    const columns: ColumnDef<LaserSession>[] = [
        {
            accessorKey: "",
            header: "Sesión",
            cell: ({ row }) => (row.index + 1)
        },
        {
            accessorKey: "power",
            header: "Potencia",

        },
        {
            accessorKey: "header",
            header: "Cabezal",
        },
        {
            accessorKey: "passes",
            header: "Pasadas",
        },
        {
            accessorKey: "price",
            header: "Precio",
        },
        {
            accessorKey: "date_hour",
            header: "Fecha y hora",
            cell: ({ row }) => (row.original.date_hour ? format(new Date(row.original.date_hour.slice(0, -1)), 'dd/MM/yyyy, HH:mm') : '-')
        },
        {
            accessorKey: "notes",
            header: "Notas",
        },
    ]

    const data = laserTreatment.laser_sessions

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
                                className={"cursor-pointer"}
                                key={row.id}
                                onClick={() => {
                                    router.get(show({ customer: customer.id, laser_treatment: laserTreatment.id, laser_session: row.original.id }, { query: { session_index: Number(row.id) + 1 } }))
                                }}
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
