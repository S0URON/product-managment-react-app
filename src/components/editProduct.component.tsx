import { Box, MenuItem, TextField } from "@mui/material";
import React from "react";
import { getListCategories } from "../services/category.service";
import { Category } from "../Types/category.types";
import { EditProductInput, EditProductProps } from "../Types/product.types";

const EditProduct: React.FC<EditProductProps> = (props) => {
    const { newProduct, setNewProduct } = props;
    const [categories, setCatogories] = React.useState<Category[]>([
        {
            _id: "1",
            name: "cat azdzad1",
        },
        { _id: "2", name: "catzad 2" },
    ]);

    const handleChange = (e: any) => {        
        setNewProduct((prev?: EditProductInput) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const getCategories = async () => {
        const c = await getListCategories();
        setCatogories(c);
    };
    React.useEffect(() => {
        getCategories();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    height: 500,
                    width: "30vw",
                    display: "flex",
                    margin: "auto",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextField
                    label="Name"
                    sx={{ margin: 3, width: "100%" }}
                    value={newProduct?.name}
                    onChange={handleChange}
                    name="name"
                />
                <TextField
                    label="Description"
                    sx={{ margin: 3, width: "100%" }}
                    value={newProduct?.description}
                    onChange={handleChange}
                    name="description"
                />
                <TextField
                    sx={{ margin: 3, color: "black", width: "100%" }}
                    value={newProduct?.category_id}
                    label="categories"
                    select
                    onChange={handleChange}
                    name="category_id"
                >
                    {categories && categories.map((c) => (
                        <MenuItem key={c._id} value={c._id}>
                            {c.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Price"
                    sx={{ margin: 3, width: "100%" }}
                    type="number"
                    name="price"
                    value={newProduct?.price}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default EditProduct;
