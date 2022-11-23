import React from "react";
import { Alert, Box, Button, MenuItem, Snackbar, TextField } from "@mui/material";
import { getListCategories } from "../../services/category.service";
import { createProduct } from "../../services/product.service";
import { Category } from "../../Types/category.types";
import { CreateProductInput } from "../../Types/product.types";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
    const [categories, setCatogories] = React.useState<Category[]>([
        {
            _id: "1",
            name: "cat azdzad1",
        },
        { _id: "2", name: "catzad 2" },
    ]);
    const [newProduct, setNewProduct] = React.useState<CreateProductInput>();
    const [addResult, setAddResult] = React.useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

    const navigate = useNavigate();
    const handleChange = (e: any) => {
        setNewProduct((prev?: CreateProductInput) => ({...prev, [e.target.name] : e.target.value}))
    }

    const getCategories = async () => {
        const c = await getListCategories();
        setCatogories(c);
    };

    const handleSave = async () => {
        if (newProduct) {
            let success = await createProduct(newProduct);
            setAddResult(success);
        }
        setSnackbarOpen(true);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
        if (addResult)
            navigate("/products")
    }

    React.useEffect(() => {
        getCategories();
    }, []);
    return (
        <Box
            sx={{
                width: "100vw",
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
                    name="name"
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    sx={{ margin: 3, width: "100%" }}
                    onChange={handleChange}

                />
                <TextField
                    sx={{ margin: 3, color: "black", width: "100%" }}
                    value={newProduct?.category_id}
                    label="categories"
                    select
                    name="category_id"
                    onChange={handleChange}
                >
                    {categories.map((c) => (
                        <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Price"
                    sx={{ margin: 3, width: "100%" }}
                    type="number"
                    name="price"
                    onChange={handleChange}
                />
                <Button sx={{ margin: 3, width: 200 }} variant="contained" disabled={!newProduct} onClick={() => handleSave()}>
                    Submit
                </Button>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={addResult ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {addResult ? "all good !" : "sth went wrong !"}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddProduct;
