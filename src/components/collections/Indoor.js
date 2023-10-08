// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import classes from "./Collections.module.css";

// import { getDatabase } from "firebase/database";


// function Indoor(props) {
//   const [data, setData] = useState(null);
//   const location = useLocation();
//   const thisPath = location?.state?.indoor || location?.state?.outdoor || location?.state?.office;
//   const navigate = useNavigate();

//   function openModal(item) {
//     const queryParams = new URLSearchParams({
//       selectedItem: JSON.stringify(item),
//       thisPath: thisPath
//     });
//     navigate(`/product?${queryParams.toString()}`);
//   }

//   const database = getDatabase();
// console.log(database)

//   useEffect(() => {
//     fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}.json`)
//       .then((response) => response.json())
//       .then((jsonData) => {
//         setData(jsonData);
//         console.log(jsonData);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, [thisPath]);
//  console.log(thisPath)
//   if (!data) {
//     return <div>Loading...</div>;
//   }

// const consoleItemKeyHandler = (item) => {
//   const queryParamss = new URLSearchParams({
//     selectedItem: JSON.stringify(item),
    
//   });
//   console.log(queryParamss)
// }

//   return (
//     <>
//       <div className={classes.bigContainer} >
//         {Object.values(data).map((item) => (
//           <>
//             <div
//               key={item.id}
//               className={classes.container}
//               onClick={() => consoleItemKeyHandler(item)}
//             >
//               <div>
//                 <img src={item.image} alt="indoor" className={classes.image} />
//               </div>
//               <div className={classes.details}>
//                 <h3 className={classes.title}>
//                   {item.title.length > 22 ? item.title.substring(0, 22) + "..." : item.title}
//                 </h3>
//                 <h4 className={classes.price}>{item.price} $</h4>
//               </div>
//             </div>
//           </>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Indoor;








import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Collections.module.css";

function Indoor(props) {
  const [data, setData] = useState(null);
  const location = useLocation();
  const thisPath = location?.state?.indoor || location?.state?.outdoor || location?.state?.office;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [thisPath]);

  const consoleDocumentIdHandler = useCallback((documentId) => {
    const queryParams = new URLSearchParams({
      documentId,
      thisPath,
    });
    navigate(`/product?${queryParams.toString()}`);
    console.log("Clicked on document ID:", documentId);
  }, [navigate, thisPath]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const documentIds = Object.keys(data);

  return (
    <div className={classes.bigContainer}>
      {documentIds.map((documentId) => (
        <div
          key={documentId}
          className={classes.container}
          onClick={() => consoleDocumentIdHandler(documentId)}
        >
          <div>
            <img src={data[documentId].image} alt="indoor" className={classes.image} />
          </div>
          <div className={classes.details}>
            <h3 className={classes.title}>
              {data[documentId].title.length > 22
                ? data[documentId].title.substring(0, 22) + "..."
                : data[documentId].title}
            </h3>
            <h4 className={classes.price}>{data[documentId].price} $</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Indoor;

