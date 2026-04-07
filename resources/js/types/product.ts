export interface Product {
    id: number;
    name: string;
    brand: string;
    presentation: string;
    unit_of_measurement: string;
    minimum_stock: number;
    notes: string;
    created_at: string;
    updated_at: string;
}

export interface ExtendedProduct extends Product {
    edit_url: string;
    delete_url: string;
}
