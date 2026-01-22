import AppLayout from "@/layouts/app-layout"
import { index, create, show } from '@/routes/gift_card';
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
} from "@/components/ui/table"

import { format } from 'date-fns'

import {
    Input
} from "@/components/ui/input"

import { GiftCard } from '@/types/gift-card'
import { GiftCardCampaign } from '@/types/gift-card-campaign'

import { Head, Link } from '@inertiajs/react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { router } from '@inertiajs/react'

type GiftCardsListProps = {
    giftCards: GiftCard[]
    giftCardCampaigns: GiftCardCampaign[]
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tarjetas de regalo',
        href: index().url,
    },
]

export default function GiftCardsList({ giftCards, giftCardCampaigns }: GiftCardsListProps) {
    const markAsUsed = async (id: number) => {
        try {
            router.patch(`/markAsUsed/${id}`, {}, {
                onSuccess: () => {
                    alert('Tarjeta usada ')
                }
            })
        } catch (error) {

        }
    }

    const columns: ColumnDef<GiftCard>[] = [
        {
            accessorKey: "sender",
            header: "Emisor",
        },
        {
            accessorKey: "receiver_phone",
            header: "Receptor",
            cell: ({ row }) => (
                <span className='underline'>
                    <a href={`https://wa.me/${row.original.receiver_phone}`} target='blank' rel="noopener" >
                        {row.original.receiver}
                    </a>
                </span >
            )
        },
        {
            accessorKey: "gift_card_campaign_id",
            header: "Campaña",
            cell: ({ row }) => (giftCardCampaigns.find((giftCardCampaign) => (giftCardCampaign.id === row.original.gift_card_campaign_id))?.campaign_name)
        },
        {
            accessorKey: "price",
            header: "Precio",
        },
        {
            accessorKey: "created_at",
            header: "Fecha de registro",
            cell: ({ row }) => (format(row.original.created_at, 'dd/MM/yyyy'))
        },
        {
            accessorKey: "",
            header: " ",
            cell: ({ row }) => {
                return (

                    row.original.redeemed ?
                        'Usada'
                        :
                        <Button onClick={(e) => {
                            e.stopPropagation()
                            markAsUsed(row.original.id)
                        }}>
                            Marcar como usada
                        </Button>
                )
            }
        }
    ]

    const table = useReactTable({
        data: giftCards,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarjetas de Regalo" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end gap-16 sm:gap-2">
                    <Input
                        placeholder="Buscar por emisor, receptor..."
                        value={table.getState().globalFilter ?? ''}
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                        className="max-w"
                    />
                    <Link
                        href={create().url}
                        method={create().method}
                        as="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        Nueva Tarjeta
                    </Link>
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
                                        className={"cursor-pointer"}
                                        key={row.id}
                                        onClick={() => {
                                            router.get(show({ gift_card: row.original.id }))
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