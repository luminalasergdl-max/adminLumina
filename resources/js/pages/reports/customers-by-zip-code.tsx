import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple pie chart"

import { ZipCodeTotal } from "@/types/reports"


type CustomersByZipCodeProps = {
    customersByZipCode: ZipCodeTotal[]
}

export function CustomersByZipCode({ customersByZipCode }: CustomersByZipCodeProps) {
    const chartConfig = {
        zip_code: {
            label: "Código Postal",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    customersByZipCode.map((zipCode: ZipCodeTotal) => {
        return Object.assign(zipCode, { color: `var(--color-zip_code}` })
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Clientes por Código Postal
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[500px]"
                >
                    <BarChart
                        accessibilityLayer
                        data={customersByZipCode}
                        layout="vertical"
                    >
                        <XAxis type="number" dataKey="total" hide />
                        <YAxis
                            dataKey="zip_code"
                            type="category"
                            tickLine={false}
                            tickMargin={12}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="total" fill="var(--color-zip_code)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}