// import React, { useState, useEffect } from "react";
// import classes from './Collections.module.css'

// function Office() {
//     const [data, setData] = useState(null);

//     const [showModal, setShowModal] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);
  
//     function openModal(item) {
//       setSelectedItem(item);
//       setShowModal(true);
//     }
  
//     function closeModal() {
//       setShowModal(false);
//     }
  
//     useEffect(() => {
//       fetch("https://project-2-c70d6-default-rtdb.firebaseio.com/office.json")
//         .then((response) => response.json())
//         .then((jsonData) => {
//           setData(jsonData);
//           console.log(jsonData);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }, []);
  
//     if (!data) {
//       return <div>Loading...</div>;
//     }
  
//     function DetailModal() {
//       return (
//         <>
//           <div className={classes.modalWrapper}>
//             <div className={classes.modalBackdrop} onClick={closeModal} />
//             <div className={classes.modalBox}>
//               <div className={classes.modal}>
//                 <button onClick={closeModal}>Close</button>
//                 <div
//                   key={selectedItem.id}
//                   className={classes.container}
//                   onClick={() => openModal(selectedItem)}
//                 >
//                   <div>
//                     <img
//                       src={selectedItem.image}
//                       alt="indoor"
//                       className={classes.image}
//                     />
//                   </div>
//                   <div className={classes.details}>
//                     <h3 className={classes.title}>{selectedItem.title}</h3>
//                     <h4>{selectedItem.description}</h4>
//                     <h4 className={classes.price}>{selectedItem.price} $</h4>
  
//                     <p>{selectedItem.details}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       );
//     }
  
//     return (
//       <>
//         {Object.values(data).map((item) => (
//           <div
//             key={item.id}
//             className={classes.container}
//             onClick={() => openModal(item)}
//           >
//             <div>
//               <img src={item.image} alt="office" className={classes.image} />
//             </div>
//             <div className={classes.details}>
//               <h3 className={classes.title}>{item.title}</h3>
//               <h4 className={classes.price}>{item.price} $</h4>
//             </div>
//           </div>
//         ))}
//         {showModal && <DetailModal closeModal={closeModal} />}
      
//       </>
//     );
// }

// export default Office;