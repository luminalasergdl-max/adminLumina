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
import { Package } from "@/types/package"

import { show } from '@/routes/customers/laser_treatments/packages';
import { ExtendedCustomer } from "@/types/customer"

type LaserTreatmentShowPackagesTableProps = {
    customer: ExtendedCustomer
    laserTreatment: LaserTreatment
}

export function LaserTreatmentShowPackagesTable({ customer, laserTreatment }: LaserTreatmentShowPackagesTableProps) {
    const columns: ColumnDef<Package>[] = [
        {
            accessorKey: "",
            header: "Paquete",
            cell: ({ row }) => (row.index + 1)
        },
        {
            accessorKey: "package_name",
            header: "Nombre",
        },
        {
            accessorKey: "package_price",
            header: "Precio",
        },
        {
            accessorKey: "package_sessions_total",
            header: "Sesiones totales",
        },
        {
            accessorKey: "package_sessions_used",
            header: "Sesiones usadas",
        },
        {
            accessorKey: "notes",
            header: "Notas",
        },
    ]

    console.log(laserTreatment)

    const data = laserTreatment.packages || []

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
                                    router.get(show({ customer: customer.id, laser_treatment: laserTreatment.id, package: row.original.id }, { query: { package_index: Number(row.id) + 1 } }))
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
