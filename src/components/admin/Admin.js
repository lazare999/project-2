import classes from './Admin.module.css';
import {  Outlet } from 'react-router-dom';
import AdminAuth from './AdminAuth';

const Admin = () => {


    return <div className={classes.container}>
        <AdminAuth />
        <Outlet />
    </div>
}

export default Admin;