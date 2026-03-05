export type Income = {
    id: string
    category: 'laserSession' | 'microneedlingSession' | 'giftCard' | 'package'
    amount: number
    description: string
}
