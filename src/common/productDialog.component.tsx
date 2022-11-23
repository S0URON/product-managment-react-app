import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import DeleteProduct from "../components/deleteProduct.component";
import EditProduct from "../components/editProduct.component";
import { deleteProduct, updateProduct } from "../services/product.service";
import { EditProductInput, ProductDialogProps } from "../Types/product.types";

const ProductDialog: React.FC<ProductDialogProps> = (props) => {
    const { setDialogOpen, dialogOpen, selectedProduct, handleClose } = props;
    const [newProduct, setNewProduct] = React.useState<EditProductInput>();

    React.useEffect(() => {
        setNewProduct({
            _id: selectedProduct?._id,
            name: selectedProduct?.name,
            category_id: selectedProduct?.category?._id,
            description: selectedProduct?.description,
            price: selectedProduct?.price,
        });
    }, [selectedProduct]);
    const handleConfirm = async (action: string) => {
        switch (action) {
            case "delete":
                await deleteProduct(selectedProduct?._id || "");
                break;
            case "edit":
                if (newProduct) await updateProduct(newProduct);
                break;
            default:
                break;
        }
        onDialogClose();
    };

    const renderContent = () => {
        if (dialogOpen.action === "edit")
            return (
                <EditProduct
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}
                />
            );
        else if (dialogOpen.action === "delete") return <DeleteProduct />;
    };

    const checkAction = () => {
        if (dialogOpen.action === "edit") return "success";
        else if (dialogOpen.action === "delete") return "error";
    };

    const onDialogClose = () => {
        handleClose();
        setDialogOpen({ action: "", isOpen: false });
    };
    return (
        <Dialog open={dialogOpen.isOpen} onClose={onDialogClose}>
            <DialogContent>{renderContent()}</DialogContent>
            <DialogActions>
                <Button onClick={onDialogClose}>cancel</Button>
                <Button
                    color={checkAction()}
                    variant="contained"
                    onClick={() => handleConfirm(dialogOpen.action)}
                >
                    confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
