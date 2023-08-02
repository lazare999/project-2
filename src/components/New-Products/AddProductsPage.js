import { useRef, useState } from "react";

import classes from "./AddProductsPage.module.css";

function AddProductsPage(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enterePrice = parseFloat(priceInputRef.current.value);
    const enteredDescription = descriptionInputRef.current.value;
    const id = Math.random();
    

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      price: enterePrice,
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
          <label htmlFor="address">Price</label>
          <input type="number" required id="address" ref={priceInputRef} />
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
