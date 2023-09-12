import { useRef, useState } from "react";

import classes from "./AddProductsPage.module.css";

function AddProductsPage(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const image1InputRef = useRef();
  const image2InputRef = useRef();
  const image3InputRef = useRef();
  const image4InputRef = useRef();
  const image5InputRef = useRef();
  const priceInputRef = useRef();
  const shipingInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredImage1 = image1InputRef.current.value;
    const enteredImage2 = image2InputRef.current.value;
    const enteredImage3 = image3InputRef.current.value;
    const enteredImage4 = image4InputRef.current.value;
    const enteredImage5 = image5InputRef.current.value;
    const enterePrice = parseFloat(priceInputRef.current.value);
    const entereShiping = parseFloat(shipingInputRef.current.value);
    const enteredDescription = descriptionInputRef.current.value;
    const id = Math.random();
    

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      images: {
        image1: enteredImage1,
        image2: enteredImage2,
        image3: enteredImage3,
        image4: enteredImage4,
        image5: enteredImage5,
      },
      price: enterePrice,
      shiping: entereShiping,
      description: enteredDescription,
      option: selectedOption,
      id: id,
    };

    props.onAddProduct(meetupData);
  }

  function optionChangeHandler(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Product Name</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image1">Image1</label>
          <input type="url" required id="image1" ref={image1InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image2">Image2</label>
          <input type="url" required id="image2" ref={image2InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image3">Image3</label>
          <input type="url" required id="image3" ref={image3InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image4">Image4</label>
          <input type="url" required id="image4" ref={image4InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image5">Image5</label>
          <input type="url" required id="image5" ref={image5InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Price">Price</label>
          <input type="number" required id="address" ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Shiping">Siping Price</label>
          <input type="number" required id="Shiping" ref={shipingInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="select">Select Option</label>
          <select id="select" required onChange={optionChangeHandler}>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </>
  );
}

export default AddProductsPage;