import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {

      const indoorResponse = await fetch('https://project-2-c70d6-default-rtdb.firebaseio.com/indoor.json');
      const indoorData = await indoorResponse.json();

      const outdoorResponse = await fetch('https://project-2-c70d6-default-rtdb.firebaseio.com/outdoor.json');
      const outdoorData = await outdoorResponse.json();

      const officeResponse = await fetch('https://project-2-c70d6-default-rtdb.firebaseio.com/office.json');
      const officeData = await officeResponse.json();

      const combinedItems = [
        ...Object.values(indoorData),
        ...Object.values(outdoorData),
        ...Object.values(officeData)
      ];


      const imageUrls = combinedItems.map(item => item.image);


      const imageUrlsWithProperties = imageUrls.map(url => ({
        original: url,
        thumbnail: url,
      }));

      setImages(imageUrlsWithProperties);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ImageGallery items={images} />
      )}
    </div>
  );
};

export default GalleryPage;
