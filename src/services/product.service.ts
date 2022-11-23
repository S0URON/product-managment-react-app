import config from "../config/config";
import { CreateProductInput, EditProductInput, Product } from "../Types/product.types";

export const createProduct = async (
    p: CreateProductInput
): Promise<boolean> => {
    const res = await fetch(`${config.apiUrl}/produit`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(p),
    });

    if (res.status === 200) return true;

    return false;
};

export const getListProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${config.apiUrl}/produit`, {
        method: "get",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
    });
    const data = await res.json();
    if (res.status === 200)
        return data.products.map((p: any) => ({
            ...p,
            category: p.category_id,
        }));

    return [];
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    const res = await fetch(`${config.apiUrl}/produit/${id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
    });

    if (res.status === 200) return true;

    return false;
};

export const updateProduct = async (
    p: EditProductInput
): Promise<boolean> => {
    const res = await fetch(`${config.apiUrl}/produit/${p._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(p),
    });

    if (res.status === 200) return true;

    return false;
};
