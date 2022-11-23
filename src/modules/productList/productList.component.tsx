import {
    Box,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React from "react";
import { Product } from "../../Types/product.types";
import { getListProducts } from "../../services/product.service";
import ProductDialog from "../../common/productDialog.component";

const columns = [
    "ID",
    "Name",
    "Description",
    "Category",
    "Price",
    "Created At",
    "Action",
];

const ProductList: React.FC = () => {
    const [productList, setProductList] = React.useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<Product>();
    const [dialogOpen, setDialogOpen] = React.useState({
        action: "",
        isOpen: false,
    });

    const getProducts = async () => {
        const p = await getListProducts();
        setProductList(p);
    };

    React.useEffect(() => {
        getProducts();
    }, []);
    return (
        <Box
            sx={{
                height: 400,
                width: "100vw",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <TableContainer sx={{ margin: "auto", width: "70vw" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((colName, index) => (
                                <TableCell key={index}>{colName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList &&
                            productList.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.createdAt}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{ margin: 1 }}
                                            variant="outlined"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setDialogOpen({
                                                    action: "edit",
                                                    isOpen: true,
                                                });
                                            }}
                                        >
                                            <Edit />
                                        </Button>
                                        <Button
                                            sx={{ margin: 1 }}
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setDialogOpen({
                                                    action: "delete",
                                                    isOpen: true,
                                                });
                                            }}
                                        >
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ProductDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                selectedProduct={selectedProduct}
                handleClose={() => {getProducts()}}
            />
        </Box>
    );
};

export default ProductList;
