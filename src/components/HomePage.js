import { NavLink, useLocation  } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "./images/image-1.jpg";
import image2 from "./images/image-2.jpg";
import image3 from "./images/image-3.jpg";
import classes from "./HomePage.module.css";
import indoorImg from './images/indoor.jpg'
import outdoorImg from './images/outdoor.jpg'
import officeImg from './images/office.jpg'

function HomePage() {
  const location = useLocation();
  // const thisPath =  location?.state?.indoor || location?.state?.outdoor || location?.state?.office;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const images = [image1, image2, image3];

  const indoor = 'indoor';
  const outdoor = 'outdoor';
  const office = 'office';


  // const links = [
  //   {
  //     url: indoor,
  //     alt: "Indoor",
  //     width: "300px", // Increase the width to your desired size (e.g., "500px")
  //     height: "200px", // Increase the height to your desired size (e.g., "300px")
  //   },
  //   {
  //     url: outdoor,
  //     alt: "Outdoor",
  //     width: "300px", // Increase the width to your desired size (e.g., "500px")
  //     height: "200px", // Increase the height to your desired size (e.g., "300px")
  //   },
  //   {
  //     url: office,
  //     alt: "Office",
  //     width: "300px", // Increase the width to your desired size (e.g., "500px")
  //     height: "200px", // Increase the height to your desired size (e.g., "300px")
  //   },
  // ];

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={classes["slider-container"]}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={classes["slider-slide"]}>
              <img
                className={classes["slider-image"]}
                src={image}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <section className={classes.section}>
        <NavLink to="indoor" state={{ indoor: indoor }} className={classes["links-container"]}>
          <figure>
            <img src={indoorImg} alt="Indoor" />
            <figcaption>for indoor design</figcaption>
          </figure>
        </NavLink>
        <NavLink to="indoor" state={{ indoor: outdoor }} className={classes["links-container"]}>
          <figure>
            <img src={outdoorImg} alt="Outdoor" />
            <figcaption>for outdoor design</figcaption>
          </figure>
        </NavLink>
        <NavLink to="indoor" state={{ indoor: office }} className={classes["links-container"]}>
          <figure>
            <img src={officeImg} alt="Office" />
            <figcaption>for office design</figcaption>
          </figure>
        </NavLink>
      </section>
    </>
  );
}

export default HomePage;
