export type Outcome = {
    id: number
    name: string
    description: string | null
    amount: string | number
    type: 'fixed' | 'variable'
    date: string
    created_at: string
    updated_at: string
}
