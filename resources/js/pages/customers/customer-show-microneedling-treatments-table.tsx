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

import { router } from '@inertiajs/react'

import { MicroneedlingTreatment } from "@/types/microneedling-treatment"

import { show as showMicroneedlingTreatments } from '@/routes/customers/microneedling_treatments';

type CustomerShowMicroneedlingTreatmentsTableProps = {
    customer: ExtendedCustomer
}

export function CustomerShowMicroneedlingTreatmentsTable({ customer }: CustomerShowMicroneedlingTreatmentsTableProps) {
    const columns: ColumnDef<MicroneedlingTreatment>[] = [
        {
            accessorKey: "objective",
            header: "Objetivo",
        },
        {
            accessorKey: "anatomic_place",
            header: "Lugar anatómico",
        },
        {
            accessorKey: "activo",
            header: "Activo",
        },
    ]

    const data = customer.microneedling_treatments

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
                                    router.get(showMicroneedlingTreatments({customer: customer.id,microneedling_treatment: row.original.id}))
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
