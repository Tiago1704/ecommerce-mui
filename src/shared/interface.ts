export interface ProductoML {
    id: string;
    title: string;
    condition: string;
    currency_id: string;
    price: number;
    thumbnail: string;
    warranty: string;
    image: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pictures: any[];
}