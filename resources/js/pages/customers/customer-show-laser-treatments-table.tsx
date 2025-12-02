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

import { LaserCategory } from "@/types/laser-category"
import { LaserTreatment } from "@/types/laser-treatment"

import { show as showLaserTreatments } from '@/routes/customers/laser_treatments';

type CustomerShowLaserTreatmentsTableProps = {
    customer: ExtendedCustomer
    laserCategories: LaserCategory[]
}

export function CustomerShowLaserTreatmentsTable({ customer, laserCategories }: CustomerShowLaserTreatmentsTableProps) {
    const columns: ColumnDef<LaserTreatment>[] = [
        {
            accessorKey: "laser_category_id",
            header: "Categoría",
            cell: ({row}) => (laserCategories.find((laserCategory) => ( laserCategory.id === row.original.laser_category_id))?.name)
        },
        {
            accessorKey: "brief_description",
            header: "Descripción Breve",
        },
        {
            accessorKey: "anatomic_place",
            header: "Lugar anatómico",
        },
        {
            accessorKey: "size",
            header: "Tamaño",
        },
    ]

    const data = customer.laser_treatments

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
                                    router.get(showLaserTreatments({customer: customer.id,laser_treatment: row.original.id}))
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
