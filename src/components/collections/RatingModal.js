import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import classes from './CollectionPage.module.css'; // You can adjust the CSS file path

function RatingModal({ closeModal,onRatingSubmit, thisPath, selectedItem }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
  
    const handleRatingClick = (ratingValue) => {
      setRating(ratingValue);
    };

    const handleSubmitRating = () => {
        // Perform any actions you need with the selected rating (e.g., sending to server)
  
  
        const newRating = {
          value: rating, // Use the selected rating value
          timestamp: new Date().toISOString(), // Add a timestamp to the rating
          category: thisPath, // Add the category of the item
          itemID: selectedItem.id, // Add the ID of the item
        };
  
        // Check if the itemID already exists in the database
        fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              // Loop through existing ratings to find the matching itemID
              for (const key in data) {
                if (data[key].itemID === selectedItem.id) {
                  // Update the existing rating value
                  newRating.value += data[key].value;
  
                  // Perform a PUT request to update the existing entry
                  return fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings/${key}.json`, {
                    method: "PUT",
                    body: JSON.stringify(newRating),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                }
              }
            }
  
            // If itemID doesn't exist, create a new entry with a POST request
            return fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/ratings.json`, {
              method: "POST",
              body: JSON.stringify(newRating),
              headers: {
                "Content-Type": "application/json",
              },
            });
          })
          .then((response) => {
            if (response.ok) {
              console.log("Rating data was stored.");
            } else {
              console.log("An error occurred while storing rating data.");
            }
          })
          .catch((error) => {
            console.log("An error occurred while storing rating data.", error);
          });
          onRatingSubmit();
          // Close the modal
          closeModal();
         
      };

      return (
        <>
          <div className={classes.modalWrapper}>
            <div className={classes.modalBackdrop} onClick={closeModal} />
            <div className={classes.modalBox}>
              <div className={classes.modal}>
                <button onClick={closeModal}>Close</button>
                <h1>RatingModal</h1>
                <div style={{display: 'flex'}}>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={ratingValue}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => handleRatingClick(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= (hover || rating) ? '#ffc107' : '#7e7e80'}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <button onClick={handleSubmitRating}>Submit Rating</button>
              </div>
            </div>
          </div>
        </>
      );
}

export default RatingModal;