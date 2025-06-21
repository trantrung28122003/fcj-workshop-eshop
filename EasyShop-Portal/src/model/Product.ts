export interface Product {
    id: string;
    name: string;
    price: number;
    stockCount: number;
    description?: string;
    imageUrl?: string;
    categoryId: string;
} 