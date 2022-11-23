import config from "../config/config";
import { Category, CreateCategoryInput } from "../Types/category.types";

export const createCategory = async (
    category: CreateCategoryInput
): Promise<boolean> => {
    const res = await fetch(`${config.apiUrl}/category`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(category),
    });

    if (res.status === 200) return true;

    return false;
};

export const getListCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${config.apiUrl}/category`, {
        method: "get",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
    });
    const data = await res.json();
    if (res.status === 200) return data.categories;

    return [];
};
