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

import { HowDidYouKnowAboutUsTotal } from "@/types/reports"

type CustomersByHowDidYouKnownAboutUsProps = {
    customersByHowDidYouKnownAboutUs: HowDidYouKnowAboutUsTotal[]
}

export function CustomersByHowDidYouKnownAboutUs({ customersByHowDidYouKnownAboutUs }: CustomersByHowDidYouKnownAboutUsProps) {
    const chartConfig = {
        instagram: {
            label: "Instagram",
            color: "var(--chart-1)"
        },
        maps: {
            label: "Maps",
            color: "var(--chart-2)"
        },
        boca_a_boca: {
            label: "Boca a boca",
            color: "var(--chart-3)"
        },
        otro: {
            label: "Otro",
            color: "var(--chart-4)"
        }
    } satisfies ChartConfig

    customersByHowDidYouKnownAboutUs.map((item: HowDidYouKnowAboutUsTotal) => {
        let id = item.how_did_you_known_about_us.toLowerCase().replace(/ /g, "_");
        return Object.assign(item, { id: id, fill: `var(--color-${id})` })
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Clientes por medio de contacto
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
                        <Pie data={customersByHowDidYouKnownAboutUs} dataKey="total" nameKey="id" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="id" />}
                            className="-translate-y-2 flex-wrap gap-5 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
