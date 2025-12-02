import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

import { asset } from '@/lib/utils'

export type CarouselElement = {
    description: string
    url: string
}

type CarouselProps = {
    imagesList: CarouselElement[]
}

export function LuminaCarousel({ imagesList }: CarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(imagesList[0]?.description || '')

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(imagesList[api.selectedScrollSnap()].description)
        api.on("select", () => {
            setCurrent(imagesList[api.selectedScrollSnap()].description)
        })
    }, [api])

    return (
        <>
            {
                imagesList.length
                    ? (
                        <>

                            <div className="text-muted-foreground py-2 text-center text-xl">
                                {current}
                            </div>
                            <div className="flex justify-center">
                                <Carousel className="w-full max-w-xl" setApi={setApi}>
                                    <CarouselContent>
                                        {imagesList.map((session, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <img src={asset(session.url)} className="w-60 object-contain" />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </>
                    ) :
                    <div>No se han subido imagenes</div>
            }
        </>
    )
}
