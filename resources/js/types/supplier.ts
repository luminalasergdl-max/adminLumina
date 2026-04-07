export interface Supplier {
    supplier_id: number;
    supplier_name: string;
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    created_at: string;
    updated_at: string;
}

export interface ExtendedSupplier extends Supplier {
    edit_url: string;
    delete_url: string;
}
