import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { FaStar, FaPlus, FaEquals } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CartContext from "../../store/cart-context";

import { addToFavorites } from "../Auth-Modal/action";
import { useDispatch } from "react-redux";

import DetailModal from "./DitailModal";
import RatingModal from "./RatingModal";

import classes from './CollectionPage.module.css';

function CollectionPage() {
  // const [selectedOption, setSelectedOption] = useState("Indoor");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedItem = JSON.parse(queryParams.get("selectedItem"));
  const thisPath = queryParams.get("thisPath");
  const dispatch = useDispatch();
  // console.log(thisPath);

  // const [heartClicked, setHeartClicked] = useState(false);
  // console.log(heartClicked)
  const [addToFavoritesClicked, setAddToFavoritesClicked] = useState(false);
  const [data, setData] = useState(null);
  // console.log(data)

  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  const cartCtx = useContext(CartContext);

  const [selectedItems, setSelectedItems] = useState(null);
  const [showDitailModal, setShowDitailModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false)

  console.log(data)

  const [averageRating, setAverageRating] = useState(null);

  const [ratingUpdated, setRatingUpdated] = useState(false);

  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  function openDitailModal(item) {
    setSelectedItems(item);
    setShowDitailModal(true);
    setShowRatingModal(false)
  }

  function closeModal() {
    setShowDitailModal(false);
    setShowRatingModal(false);
  }

  function openRatingModal() {
    setShowRatingModal(true)
  }

  useEffect(() => {
    fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [thisPath]);

  // const pathForHeartIcon = "m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  const image1 = selectedItem.images.image1;
  const image2 = selectedItem.images.image2;
  const image3 = selectedItem.images.image3;
  const image4 = selectedItem.images.image4;
  const image5 = selectedItem.images.image5;
  const images = [image1, image2, image3, image4, image5]
  console.log(image1)




  // const SamplePrevArrow = ({ onClick }) => (
  //   <div className={classes.customPrevArrow} onClick={onClick}>
  //     &lt;
  //   </div>
  // );


  // const SampleNextArrow = ({ onClick }) => (
  //   <div className={classes.customNextArrow} onClick={onClick}>
  //     &gt;
  //   </div>
  // );

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   prevArrow: <SamplePrevArrow />,
  //   nextArrow: <SampleNextArrow />
  // };

  const sliderSettings = {
    responsive: {
      // Define breakpoints for different screen sizes
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
    },
    // Other settings like autoPlay, autoPlaySpeed, etc.
    autoPlay: true,
    autoPlaySpeed: 2000,
  };


  let allSelectedItem = {
    image: selectedItem ? selectedItem.image : null,
    price: selectedItem ? selectedItem.price : null,
    shiping: selectedItem ? selectedItem.shiping : null,
    description: selectedItem ? selectedItem.description : null,
    title: selectedItem ? selectedItem.title : null,
    id: selectedItem ? selectedItem.id : null,
  };

  function changeColor() {
    // setHeartClicked(prevState => !prevState);

    if (!addToFavoritesClicked) {
      setAddToFavoritesClicked(true);
      addToFavoritesHandler(allSelectedItem);
    }

    setTimeout(() => {
      // setHeartClicked(false);
      setAddToFavoritesClicked(false);
    }, 1000);
  }


  function addToFavoritesHandler(item) {
    dispatch(addToFavorites(item));
  }



  // function optionChangeHandler(event) {
  //   setSelectedOption(event.target.value);
  // }




  // function DetailModal() {
  //   return (
  //     <>
  //       <div className={classes.modalWrapper} >
  //         <div className={classes.modalBackdrop} onClick={closeModal} />
  //         <div className={classes.modalBox}>
  //           <div className={classes.modal}>
  //             <button onClick={closeModal}>Close</button>
  //             <div
  //               key={selectedItem.id}
  //             // className={classes.container}
  //             // onClick={() => openModal(selectedItems)}
  //             >
  //               <div>
  //                 <img
  //                   src={selectedItems.image}
  //                   alt="indoor"
  //                   className={classes.image}
  //                 />
  //               </div>
  //               <div className={classes.details}>
  //                 <h3 className={classes.title}>{selectedItems.title}</h3>
  //                 <h4>{selectedItems.description}</h4>
  //                 <h4 className={classes.price}>{selectedItems.price} $</h4>
  //               </div>
  //             </div>

  //             <div>
  //               <button onClick={() => addToFavoritesHandler(selectedItems)}>
  //                 Add Favorites
  //               </button>
  //               <button onClick={() => cartCtx.addItem(selectedItems)}>
  //                 Add Cart
  //               </button>

  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }  

  // function RatingModal({ closeModal }) {
  //   const [rating, setRating] = useState(null);
  //   const [hover, setHover] = useState(null);

  //   const handleRatingClick = (ratingValue) => {
  //     setRating(ratingValue);
  //   };

  //   const handleSubmitRating = () => {
  //     // Perform any actions you need with the selected rating (e.g., sending to server)


  //     const newRating = {
  //       value: rating, // Use the selected rating value
  //       timestamp: new Date().toISOString(), // Add a timestamp to the rating
  //       category: thisPath, // Add the category of the item
  //       itemID: selectedItem.id, // Add the ID of the item
  //     };

  //     // Check if the itemID already exists in the database
  //     fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data) {
  //           // Loop through existing ratings to find the matching itemID
  //           for (const key in data) {
  //             if (data[key].itemID === selectedItem.id) {
  //               // Update the existing rating value
  //               newRating.value += data[key].value;

  //               // Perform a PUT request to update the existing entry
  //               return fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings/${key}.json`, {
  //                 method: "PUT",
  //                 body: JSON.stringify(newRating),
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //               });
  //             }
  //           }
  //         }

  //         // If itemID doesn't exist, create a new entry with a POST request
  //         return fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json`, {
  //           method: "POST",
  //           body: JSON.stringify(newRating),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //       })
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Rating data was stored.");
  //         } else {
  //           console.log("An error occurred while storing rating data.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("An error occurred while storing rating data.", error);
  //       });
  //       // Close the modal
  //       closeModal();

  //   };



  //   return (
  //     <>
  //       <div className={classes.modalWrapper}>
  //         <div className={classes.modalBackdrop} onClick={closeModal} />
  //         <div className={classes.modalBox}>
  //           <div className={classes.modal}>
  //             <button onClick={closeModal}>Close</button>
  //             <h1>RatingModal</h1>
  //             <div>
  //               {[...Array(5)].map((star, i) => {
  //                 const ratingValue = i + 1;
  //                 return (
  //                   <label key={ratingValue}>
  //                     <input
  //                       type="radio"
  //                       name="rating"
  //                       value={ratingValue}
  //                       onClick={() => handleRatingClick(ratingValue)}
  //                     />
  //                     <FaStar
  //                       className="star"
  //                       color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
  //                       onMouseEnter={() => setHover(ratingValue)}
  //                       onMouseLeave={() => setHover(null)}
  //                     />
  //                   </label>
  //                 );
  //               })}
  //             </div>
  //             <button onClick={handleSubmitRating}>Submit Rating</button>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  function handleRatingSubmission() {
    
    setRatingUpdated(true);
  }

  useEffect(() => {
    fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json`)
      .then(response => response.json())
      .then(data => {
        let totalRating = 0;
        let ratingCount = 0;

        for (const key in data) {
          if (data[key].itemID === selectedItem.id) {
            totalRating += data[key].value;
            ratingCount++;
          }
        }
        if (ratingCount > 0) {
          const avgRating = totalRating / ratingCount;
          setAverageRating(avgRating);
        }
        if (ratingUpdated) {
          setRatingUpdated(false);
        }
      })
      .catch(error => {
        console.log("Error fetching ratings:", error);
      });
  }, [selectedItem, averageRating, ratingUpdated]);



  return (
    <div>
      <h1 className={classes.header}>Product Details</h1>
      {selectedItem && (
        <div>
          <div className={classes.conteiner}>
            <div className={classes.border}>
              <div className={classes.productInfo}>
                <div className={classes.productImageContainer}>
                  {images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      className={
                        selectedImageIndex === index
                          ? classes.selectedProductImage
                          : hoveredImageIndex === index
                            ? classes.hoveredProductImage
                            : classes.productImage
                      }
                      onClick={() => {
                        console.log('Clicked on image:', index);
                        setSelectedImageIndex(index);
                      }}
                      onMouseEnter={() => {
                        console.log('Mouse entered image:', index);
                        setHoveredImageIndex(index);
                      }}
                      onMouseLeave={() => {
                        console.log('Mouse left image:', index);
                        setHoveredImageIndex(null);
                      }} // Reset hovered image
                    />
                  ))}
                </div>
                <div>
                  <img
                    src={images[hoveredImageIndex !== null ? hoveredImageIndex : selectedImageIndex]}
                    alt={`Product ${hoveredImageIndex !== null ? hoveredImageIndex + 1 : selectedImageIndex + 1}`}
                    className={classes.img}
                  />

                </div>
                <div className={classes.descriptionConteiner}>
                  <h1 className={classes.title}>
                    <span style={{ whiteSpace: 'pre-line' }}>
                      {selectedItem.title.length > 50 ? (
                        selectedItem.title.match(/.{1,50}/g).map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))
                      ) : (
                        selectedItem.title
                      )}
                    </span>
                  </h1>
                  <p className={classes.price}>$ {selectedItem.price} </p>
                  <div>
                    <h3>Description:</h3>
                    <h4 className={classes.description}>
                      <span style={{ whiteSpace: 'pre-line' }}>
                        {selectedItem.description.length > 90 ? (
                          selectedItem.description.match(/.{1,90}/g).map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))
                        ) : (
                          selectedItem.description
                        )}
                      </span>
                    </h4>
                  </div>
                  <div>
                    <h4>Ratings:</h4>
                    <div className={classes.stars}>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label key={ratingValue}>
                            <input
                              type='radio'
                              name='rating'
                              value={ratingValue}
                            // onClick={() => setRating(ratingValue)} 
                            />
                            <FaStar
                              className='star'
                              color={
                                (averageRating >= 1 && ratingValue === 1) || 
                                  (averageRating >= 5 && ratingValue === 2) || 
                                  (averageRating >= 10 && ratingValue === 3) || 
                                  (averageRating >= 15 && ratingValue === 4) || 
                                  (averageRating >= 20 && ratingValue === 5) 
                                  ? '#ffc107'
                                  : '#7e7e80'
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <button onClick={openRatingModal}>to add your rating click here</button>
                    {/* {averageRating !== null && (
                    <div>
                      Average Rating: {averageRating.toFixed(2)} 
                    </div>
                  )} */}

                    <div className={classes.favorites} onClick={changeColor}>
                      <button className={addToFavoritesClicked ? classes.addToFavoritesRed : classes.addToFavorites}>
                        Add To Favorites
                        <AiOutlineHeart style={{ fontSize: 'x-large', marginLeft: '10px' }} />
                      </button>
                      {/* <p
                        className={`${classes.heartBtn} ${heartClicked ? classes.heartClicked : ""}`}
                      >
                        <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={pathForHeartIcon} fillRule="nonzero" />
                      </svg>
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.totalprice}>
              <h3>Product Price:</h3>
              <p className={classes.price}>$ {selectedItem.price} </p>
              <FaPlus />
              <h3>Shiping Price:</h3>
              <p className={classes.price}>$ {selectedItem.shiping}</p>
              <FaEquals />
              <h3>Total Price:</h3>
              <p className={classes.price}>$ {selectedItem.shiping + selectedItem.price}</p>
              <button className={classes.button} onClick={() => cartCtx.addItem(selectedItem)}>Add To Cart</button>
            </div>
          </div>
          <br />
          <hr className={classes.hr} />
        </div>
      )}
      <br />
      <div>
        <h1>Products from this category</h1>
        {data ? (
          <Carousel {...sliderSettings}>
            {Object.values(data).map((item) => (
              <div
                key={item.id}
                className={classes.containerForProducts}
                onClick={() => openDitailModal(item)}
              >
                <div>
                  <img src={item.image} alt="indoor" className={classes.image} />
                </div>
                <div className={classes.details}>
                  <h3 className={classes.title}>
                    {item.title.length > 22
                      ? item.title.substring(0, 22) + "..."
                      : item.title}
                  </h3>
                  <h4 className={classes.price}>{item.price} $</h4>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* {showDitailModal && <DetailModal closeModal={closeModal} />} */}
      {showDitailModal && (
        <DetailModal
          closeModal={closeModal}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          addToFavoritesHandler={addToFavoritesHandler}
          cartCtx={cartCtx}
        />
      )}
      {/* {showRatingModal && <RatingModal closeModal={closeModal} />} */}
      {showRatingModal && (
        <RatingModal
          closeModal={() => setShowRatingModal(false)}
          onRatingSubmit={handleRatingSubmission}
          thisPath={thisPath}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}

export default CollectionPage;