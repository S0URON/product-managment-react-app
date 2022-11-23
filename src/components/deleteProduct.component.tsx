import React from "react";
import { Box, Typography } from "@mui/material";

const DeleteProduct: React.FC = () => {
    return (
        <Box
            sx={{
                width: "10vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
            }}
        >
            <Typography sx={{ margin: 2 }}>comfirm delete ?</Typography>
        </Box>
    );
};

export default DeleteProduct;
