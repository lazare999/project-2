import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanelHeader from './AdminPanelHeader';
import classes from './AllProductsPage.module.css';

const AllProductsPage = () => {
    const [data, setData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('indoor');
    // const location = useLocation();
    // const thisPath = location?.state?.indoor || location?.state?.outdoor || location?.state?.office;
    // console.log(thisPath)
    const navigate = useNavigate();
    // const [itemKey, setItemKey] = useState(null)
    // console.log(itemKey)
    function redirect(item, itemKey) {
        const queryParams = new URLSearchParams({
            selectedItem: JSON.stringify(item),
            thisPath: selectedCategory,
            itemKey: itemKey,
        });
        navigate(`/products-detail?${queryParams.toString()}`);
    }

    useEffect(() => {
        fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${selectedCategory}.json`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                // setItemKey(Object.keys(jsonData));
            })

            .catch((error) => {
                console.error("Error:", error);
            });
    }, [selectedCategory]);

    return (
        <>
            <AdminPanelHeader />
            <div className={classes.container}>
                <p
                    onClick={() => setSelectedCategory('indoor')}
                    className={selectedCategory === 'indoor' ? classes.activeCategory : classes.category}
                >
                    Indoor
                </p>
                <p
                    onClick={() => setSelectedCategory('outdoor')}
                    className={selectedCategory === 'outdoor' ? classes.activeCategory : classes.category}
                >
                    Outdoor
                </p>
                <p
                    onClick={() => setSelectedCategory('office')}
                    className={selectedCategory === 'office' ? classes.activeCategory : classes.category}
                >
                    Office
                </p>
            </div>

            <div>
                {data &&
                    Object.entries(data).map(([itemKey, item]) => (
                        <div key={itemKey} className={classes.product}>
                            <h1> {item.title.length > 50
                                ? `${item.title.slice(0, 50)}...`
                                : item.title}</h1>
                            <img src={item.image} alt={item.title} className={classes.img} />
                            <button onClick={() => redirect(item, itemKey)} className={classes.btn}>
                                Show Details
                            </button>
                        </div>
                    ))}

            </div>
        </>
    );
}

export default AllProductsPage;


















