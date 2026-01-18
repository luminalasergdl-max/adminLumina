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

import { MicroneedlingTreatment } from "@/types/microneedling-treatment"
import { MicroneedlingSession } from "@/types/microneedling-session"

import { show } from '@/routes/customers/microneedling_treatments/microneedling_sessions';
import { ExtendedCustomer } from "@/types/customer"

type MicroneedlingTreatmentShowMicroneedlingSessionsTableProps = {
    customer: ExtendedCustomer
    microneedlingTreatment: MicroneedlingTreatment
}

export function MicroneedlingTreatmentShowMicroneedlingSessionsTable({ customer, microneedlingTreatment }: MicroneedlingTreatmentShowMicroneedlingSessionsTableProps) {
    const columns: ColumnDef<MicroneedlingSession>[] = [
        {
            accessorKey: "",
            header: "Sesión",
            cell: ({ row }) => (row.index + 1)
        },
        {
            accessorKey: "activo",
            header: "Activo",

        },
        {
            accessorKey: "agujas",
            header: "Agujas",
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

    const data = microneedlingTreatment.microneedling_sessions

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
                                    router.get(show({ customer: customer.id, microneedling_treatment: microneedlingTreatment.id, microneedling_session: row.original.id }, { query: { session_index: Number(row.id) + 1 } }))
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
