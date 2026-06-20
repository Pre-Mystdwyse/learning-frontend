import React from "react"
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './CSS/style.css'
import ProfilePage from "./pages/ProfilePage"
import ShopPage from "./pages/ShopPage"
import QuestPage from "./pages/QuestPage"

//сперва нужно создать объект маршрутизатора с путями
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, //App теперь layout
        children: [
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/shop",
                element: <ShopPage />
            },
            {
                path: "/quests",
                element: <QuestPage />
            }
        ]
    }
]);

//передача маршрутизатора в RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)