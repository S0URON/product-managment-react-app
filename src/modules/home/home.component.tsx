import { ArrowDownward } from "@mui/icons-material";
import { Drawer, Button, List, Box, ListItem, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    React.useEffect(() => {
        navigate("products");
    }, []);
    return (
        <div>
            <Button
                onClick={() => toggleDrawer()}
                sx={{ width: "100vw", height: 70 }}
            >
                <ArrowDownward sx={{ width: 50, height: 50 }} />
            </Button>
            <Drawer
                open={drawerOpen}
                anchor="top"
                onClose={() => toggleDrawer()}
            >
                <Box>
                    <List>
                        <ListItem>
                            <Button
                                sx={{ width: "100vw", height: 70 }}
                                onClick={() => {
                                    navigate("products");
                                    toggleDrawer();
                                }}
                            >
                                <Typography>Product List</Typography>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                sx={{ width: "100vw", height: 70 }}
                                onClick={() => {
                                    navigate("addProduct");
                                    toggleDrawer();
                                }}
                            >
                                <Typography>Add Product</Typography>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                sx={{ width: "100vw", height: 70 }}
                                onClick={() => {
                                    navigate("addCategory");
                                    toggleDrawer();
                                }}
                            >
                                <Typography>Add Category</Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Outlet />
        </div>
    );
};

export default Home;
