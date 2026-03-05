import AppLayout from "@/layouts/app-layout"
import { index, edit } from "@/routes/outcomes"
import { type BreadcrumbItem } from "@/types"
import { Head, Link } from "@inertiajs/react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Outcome } from "@/types/outcome"

type OutcomeShowProps = {
    outcome: Outcome
}

export default function OutcomeShow({ outcome }: OutcomeShowProps) {
    const title = 'Detalles de Egreso'

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(Number(amount))
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
        {
            title,
            href: '',
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Card className="m-8">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{title}</CardTitle>
                        <Link
                            href={edit({ outcome: outcome.id }).url}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Editar Egreso
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold text-muted-foreground">Nombre</h3>
                            <p className="text-lg">{outcome.name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-muted-foreground">Monto</h3>
                            <p className="text-xl font-bold text-red-600 dark:text-red-400">-{formatCurrency(outcome.amount)}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-muted-foreground">Tipo de Egreso</h3>
                            <p className="text-lg">{outcome.type === 'fixed' ? 'Fijo' : 'Variable'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-muted-foreground">Fecha Registrada</h3>
                            <p className="text-lg">{outcome.date}</p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="font-semibold text-muted-foreground">Descripción</h3>
                            <p className="whitespace-pre-wrap">{outcome.description || 'Sin descripción'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="font-semibold text-muted-foreground">Fechas del sistema</h3>
                            <p className="text-sm text-muted-foreground">Creado: {new Date(outcome.created_at).toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Actualizado: {new Date(outcome.updated_at).toLocaleString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    )
}
