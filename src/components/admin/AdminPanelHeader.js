import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AdminPanelHeader.module.css';

const AdminPanelHeader = () => {
    return (
        <header className={classes.header}>
            <h1 style={{ fontSize: '1.9em' }}>Admin Panel</h1>
            <div className={classes.container}>
                <Link to="/all-products" className={window.location.pathname === '/all-products' ? classes.active : ''}><p>All Products</p></Link>
                <Link to="/add-new-products" className={window.location.pathname === '/add-new-products' ? classes.active : ''}><p>Add New Products</p></Link>
            </div>
        </header>
    );
}

export default AdminPanelHeader;
