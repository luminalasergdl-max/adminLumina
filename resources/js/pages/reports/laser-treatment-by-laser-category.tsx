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

import { LaserTreatmentByLaserCategoryTotal } from "@/types/reports"

const chartConfig = {
    total: {
        label: "Total",
        color: "#2563eb",
    },
} satisfies ChartConfig

type LaserTreatmentByLaserCategoryProps = {
    laserTreatmentsByLaserCategory: LaserTreatmentByLaserCategoryTotal[]
}

export function LaserTreatmentByLaserCategory({ laserTreatmentsByLaserCategory }: LaserTreatmentByLaserCategoryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tratamientos laser por categoría</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <BarChart accessibilityLayer data={laserTreatmentsByLaserCategory}>
                        <XAxis
                            dataKey="laser_category_name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                            allowDecimals={false}
                        />
                        <YAxis
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                            allowDecimals={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="total" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
