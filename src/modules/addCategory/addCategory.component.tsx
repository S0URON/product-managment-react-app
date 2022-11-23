import React from "react";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    TextField,
} from "@mui/material";
import { CreateCategoryInput } from "../../Types/category.types";
import { createCategory } from "../../services/category.service";

const AddCategory: React.FC = () => {
    const [newCategory, setNewCategory] = React.useState<CreateCategoryInput>();
    const [addResult, setAddResult] = React.useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

    const handleChange = (e: any) => {
        setNewCategory({ name: e.target.value });
    };
    const onSubmit = async () => {
        if (newCategory) {
            let success = await createCategory(newCategory);
            setAddResult(success);
        }
        setSnackbarOpen(true);
    };
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
                    onChange={handleChange}
                />
                <Button
                    sx={{ margin: 3, width: 200 }}
                    onClick={() => onSubmit()}
                    variant="contained"
                >
                    Submit
                </Button>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={addResult ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {addResult ? "all good !" : "sth went wrong !"}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddCategory;
