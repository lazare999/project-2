// import classes from './AdminPanel.module.css';

import { Outlet } from "react-router-dom";
import AdminPanelHeader from "./AdminPanelHeader";


// import NewProductPage from "../New-Products/NewProducts";

const AdminPanel = () => {
    return <>
        <AdminPanelHeader />
        <Outlet />
    </>

//  return <NewProductPage />
}

export default AdminPanel;