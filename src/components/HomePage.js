import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./HomePage.module.css";
import indoorImg from "./images/indoor.jpg";
import outdoorImg from "./images/outdoor.jpg";
import officeImg from "./images/office.jpg";

import Slider from "./slider/Slider";

function HomePage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); //
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const urls = [
      "https://project-2-c70d6-default-rtdb.firebaseio.com/outdoor.json",
      "https://project-2-c70d6-default-rtdb.firebaseio.com/indoor.json",
      "https://project-2-c70d6-default-rtdb.firebaseio.com/office.json",
    ];

    Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      .then((dataArray) => {

        const mergedItems = dataArray.reduce((acc, data) => {
          if (data) {
            const itemsData = Object.values(data);
            return [...acc, ...itemsData];
          }
          return acc;
        }, []);
        setItems(mergedItems);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    fetch("https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json")
      .then((response) => response.json())
      .then((ratingsData) => {
        setRatings(ratingsData);
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      });
  }, []);

  const calculateAverageRating = (itemID) => {
    const itemRatings = Object.values(ratings).filter(
      (rating) => rating.itemID === itemID
    );
    if (itemRatings.length === 0) return 0;

    const totalRating = itemRatings.reduce((sum, rating) => sum + rating.value, 0);
    return totalRating / itemRatings.length;
  };

  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  const sortedItems = items.slice().sort((a, b) => {
    const avgRatingA = calculateAverageRating(a.id);
    const avgRatingB = calculateAverageRating(b.id);
    return avgRatingB - avgRatingA;
  });

  // const images = [indoorImg, outdoorImg, officeImg];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Slider />
      <hr className={classes.hr} />
      <h2 className={classes.collections}>Collections</h2>

      <section className={classes.section}>
        <NavLink to="indoor" state={{ indoor: "indoor" }} className={classes["links-container"]}>
          <figure>
            <div className={classes.shadow}>
              <img src={indoorImg} alt="Indoor" />
            </div>
            <figcaption className={classes.figcaption}>Indoor design</figcaption>
          </figure>
        </NavLink>
        <NavLink to="outdoor" state={{ indoor: "outdoor" }} className={classes["links-container"]}>
          <figure>
            <div className={classes.shadow}>
              <img src={outdoorImg} alt="Outdoor" />
            </div>
            <figcaption className={classes.figcaption}>Outdoor design</figcaption>
          </figure>
        </NavLink>
        <NavLink to="office" state={{ indoor: "office" }} className={classes["links-container"]}>
          <figure>
            <div className={classes.shadow}>
              <img src={officeImg} alt="Office" />
            </div>
            <figcaption className={classes.figcaption}>Office design</figcaption>
          </figure>
        </NavLink>
      </section>
      <hr className={classes.hr} />
      <div>
        <h1>POPULAR PRODUCTS</h1>
        <Carousel responsive={responsive}>
          {sortedItems.map((item) => (
            <div key={item.id} className={classes.populadProducts} onClick={() => {
              const queryParams = new URLSearchParams({
                selectedItem: JSON.stringify(item),
                thisPath: "popularProducts",
              });
              navigate(`/product?${queryParams.toString()}`);
            }}
            >
              <h3>
                {item.title.length > 50
                  ? `${item.title.substring(0, 50)}...`
                  : item.title}
              </h3>
              <p>Price: ${item.price}</p>
              <p>Average Rating: {calculateAverageRating(item.id)}</p>
              <img src={item.image} alt={item.title} className={classes.popularProductsImg} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default HomePage;
