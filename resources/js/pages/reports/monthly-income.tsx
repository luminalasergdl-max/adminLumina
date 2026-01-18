import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldLabel,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Spinner } from "@/components/ui/spinner"

import { useEffect, useState } from "react"

type MonthlyIncomeProps = {
    currentMonthIncome: number
}

export function MonthlyIncome({ currentMonthIncome }: MonthlyIncomeProps) {
    const currentYear = new Date().getFullYear()

    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString())
    const [selectedYear, setSelectedYear] = useState(currentYear.toString())

    const [monthIncome, setMonthIncome] = useState(currentMonthIncome)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMonthIncome = async () => {
            try {
                setLoading(true)
                const response = await fetch(`incomeByPeriod/${selectedMonth}/${selectedYear}`)

                response.json().then(setMonthIncome)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMonthIncome()
    }, [selectedMonth, selectedYear])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Ingreso Mensual
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="flex gap-4">
                    <Field>
                        <FieldLabel>
                            Mes
                        </FieldLabel>
                        <Select
                            defaultValue={selectedMonth.toString()}
                            value={selectedMonth.toString()}
                            onValueChange={setSelectedMonth}
                            name="month"
                        >
                            <SelectTrigger className="w-[90px]">
                                <SelectValue placeholder="Selecciona un mes" />
                            </SelectTrigger>

                            <SelectContent>
                                {[...Array(12)].map((_, i) =>
                                    <SelectItem value={(i + 1).toString()} key={i}>
                                        {Intl.DateTimeFormat("es-MX", { month: 'long' }).format(new Date(2000, i))}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel>
                            Año
                        </FieldLabel>
                        <Select
                            defaultValue={selectedYear.toString()}
                            value={selectedYear.toString()}
                            onValueChange={setSelectedYear}
                            name="year"
                        >
                            <SelectTrigger className="w-[90px]">
                                <SelectValue placeholder="Selecciona un año" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 5 }, (_, i) => i + 2025).map((x, i) => (
                                    <SelectItem value={x.toString()} key={i}>
                                        {x}
                                    </SelectItem>
                                ))
                                }
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <div className="text-center text-5xl font-extrabold mt-4">
                    {loading ? <Spinner className="size-12" /> : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(monthIncome)}
                </div>
            </CardContent>
        </Card>
    )
}