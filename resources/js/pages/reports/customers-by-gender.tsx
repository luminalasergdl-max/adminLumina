import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple pie chart"

import { GenderTotal } from "@/types/reports"


type CustomersByGenderProps = {
    customersByGender: GenderTotal[]
}

export function CustomersByGender({ customersByGender }: CustomersByGenderProps) {
    const chartConfig = {
        masculino: {
            label: "Masculino",
            color: "var(--chart-1)"
        },
        femenino: {
            label: "Femenino",
            color: "var(--chart-3)"
        },
        null: {
            label: "Sin especificar",
            color: "var(--chart-5)"
        }
    } satisfies ChartConfig

    customersByGender.map((gender: GenderTotal) => {
        return Object.assign(gender, { fill: `var(--color-${gender.gender}` })
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Clientes por género
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[500px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={customersByGender} dataKey="total" nameKey="gender" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="gender" />}
                            className="-translate-y-2 flex-wrap gap-5 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}