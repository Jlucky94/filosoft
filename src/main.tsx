import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {store} from "redux/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DashBoard from "pages/DashBoard/DashBoard";
import Favourites from "pages/Favourites/Favourites";

const routes = [
    {
        path: "/",
        element: <DashBoard/>,

    },
    {
        path: "/list",
        element: <Favourites/>,

    },
]
const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
