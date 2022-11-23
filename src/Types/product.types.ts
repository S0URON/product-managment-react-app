import { Category } from "./category.types";

export interface Product {
    _id: string;
    name: string;
    description?: string;
    category: Category;
    price: number;
    createdAt: string;
}

export interface EditProductProps {
    newProduct?: EditProductInput,
    setNewProduct?: any,
}

export type CreateProductInput = {
    name?: string;
    description?: string;
    category_id?: string;
    price?: number;
}

export type EditProductInput = {
    _id?: string,
    name?: string;
    description?: string;
    category_id?: string;
    price?: number;
}

export type ProductDialogProps = {
    setDialogOpen: any;
    dialogOpen: any;
    selectedProduct?: Product;
    handleClose?: any;
};