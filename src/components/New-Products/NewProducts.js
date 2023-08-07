




import React from "react";
import { useSelector } from "react-redux";
import AddProductsPage from "./AddProductsPage";

function NewProductPage() {
  const isAdmin = useSelector((state) => state.isAdmin);

  function addProductHandler(enteredProductData) {
    const selectedOption = enteredProductData.option;

    let folderName = "";
    if (selectedOption === "Indoor") {
      folderName = "indoor";
    } else if (selectedOption === "Outdoor") {
      folderName = "outdoor";
    } else if (selectedOption === "Office") {
      folderName = "office";
    }

    fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${folderName}.json`, {
      method: "POST",
      body: JSON.stringify(enteredProductData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product data was stored.");
        } else {
          console.log("An error occurred while storing product data.");
        }
      })
      .catch((error) => {
        console.log("An error occurred while storing product data.", error);
      });
  }
console.log(isAdmin)
  return (
    <>
      {isAdmin ? (
        <AddProductsPage onAddProduct={addProductHandler} />
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </>
  );
}

export default NewProductPage;