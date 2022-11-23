import React from "react";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import AddCategory from "./modules/addCategory/addCategory.component";
import AddProduct from "./modules/addProduct/addProduct.component";
import Home from "./modules/home/home.component";
import ProductList from "./modules/productList/productList.component";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        loader : () => {
            redirect("products");
        },
        children: [
            {
                path: "products",
                element: <ProductList />,
            },
            {
                path: "addProduct",
                element: <AddProduct />,
            },
            {
                path: "addCategory",
                element: <AddCategory />,
            }
        ],
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
