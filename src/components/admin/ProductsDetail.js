import React, { useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom'; 
import AdminPanelHeader from './AdminPanelHeader';

import classes from "../New-Products/AddProductsPage.module.css";

const ProductsDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedItem = JSON.parse(queryParams.get("selectedItem"));
    const thisPath = queryParams.get("thisPath");
    const itemKey = queryParams.get("itemKey");
    // console.log('product key:', itemKey)

    const [inputValue, setInputValue] = useState(selectedItem || []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const firebaseUrl = `https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}/${itemKey}.json`;
        // console.log(firebaseUrl)
        fetch(firebaseUrl, {
            method: 'PATCH',
            body: JSON.stringify(inputValue),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Data updated successfully");
                    return response.json();
                } else {
                    throw new Error("Error updating data");
                }
            })
            .then(response => {
                console.log(Object.keys(response));
            })

            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const firebaseUrl = `https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}/${itemKey}.json`;
            fetch(firebaseUrl, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Data deleted successfully");
                  navigate("/admin-panel"); 
                } else {
                    throw new Error("Error deleting data");
                }
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
        }
    };

    const handleImageInputChange = (fieldName, newValue) => {
        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            images: {
                ...prevInputValue.images,
                [fieldName]: newValue,
            },
        }));
    };

    return (
        <>
            <AdminPanelHeader />
            <div>
                <h1>Product Details</h1>
                {selectedItem && (
                    <div>
                        <form className={classes.form} onSubmit={handleFormSubmit} >
                            <div className={classes.control}>
                                <label htmlFor="title">Product Name</label>
                                <input type="text" required id="title" value={inputValue.title} onChange={(e) => setInputValue((prevInputValue) => ({ ...prevInputValue, title: e.target.value }))} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image">Image</label>
                                <input type="url" required id="image" defaultValue={inputValue.image} onChange={(e) => setInputValue((prevInputValue) => ({ ...prevInputValue, image: e.target.value }))} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image1">Image1</label>
                                <input
                                    type="url"
                                    required
                                    id="image1"
                                    defaultValue={inputValue?.images?.image1 || ''}
                                    onChange={(e) => handleImageInputChange('image1', e.target.value)}
                                />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image2">Image2</label>
                                <input
                                    type="url"
                                    required
                                    id="image2"
                                    defaultValue={inputValue?.images?.image2 || ''}
                                    onChange={(e) => handleImageInputChange('image2', e.target.value)}
                                />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image3">Image3</label>
                                <input
                                    type="url"
                                    required
                                    id="image3"
                                    defaultValue={inputValue?.images?.image3 || ''}
                                    onChange={(e) => handleImageInputChange('image3', e.target.value)}
                                />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image4">Image4</label>
                                <input
                                    type="url"
                                    required
                                    id="image4"
                                    defaultValue={inputValue?.images?.image4 || ''}
                                    onChange={(e) => handleImageInputChange('image4', e.target.value)}
                                />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="image5">Image5</label>
                                <input
                                    type="url"
                                    required
                                    id="image5"
                                    defaultValue={inputValue?.images?.image5 || ''}
                                    onChange={(e) => handleImageInputChange('image5', e.target.value)}
                                />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="Price">Price</label>
                                <input type="number" required id="address" value={inputValue.price} onChange={(e) => setInputValue((prevInputValue) => ({ ...prevInputValue, price: e.target.value }))} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="Shiping">Shiping Price</label>
                                <input type="number" required id="Shiping" value={inputValue.shiping} onChange={(e) => setInputValue((prevInputValue) => ({ ...prevInputValue, shiping: e.target.value }))} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    required
                                    rows="5"
                                    defaultValue={inputValue.description}
                                    onChange={(e) => setInputValue((prevInputValue) => ({ ...prevInputValue, description: e.target.value }))}
                                ></textarea>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="select">Select Option</label>
                                <select id="select" required >
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="Office">Office</option>
                                </select>
                            </div>
                            <div className={classes.actions}>
                                <button type="submit">Update Product</button>
                                <button onClick={handleDelete}>Delete Product</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductsDetail;





