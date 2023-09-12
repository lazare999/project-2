import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';

const slidesData = [
  {
    image: '//pebona.myshopify.com/cdn/shop/files/slide-3_2197ca57-f8fd-4192-8fa1-4d74e6edfa37.jpg?v=1613699544',
    promoTitle: 'limited edition Sale Offer 20% Off This Week',
    mainTitle: 'Pebona Amazing Sport Sneakers 2018',
    subtitle: 'Light knit upper adapts to the shape of your foot for flexible and natural movement.',
    link: '#'
  },
  {
    image: 'https://www.thespruce.com/thmb/NB8B7jozH2NN9acJ39DbdaTMmd8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-desks-4155171-hero-faaa214445524b4485f9aa1cee5fbc2e.jpg',
    promoTitle: 'limited edition Sale Offer 20% Off This Week',
    mainTitle: 'Pebona Amazing Sport Sneakers 2018',
    subtitle: 'Light knit upper adapts to the shape of your foot for flexible and natural movement.',
    link: '#'
  },
  // Add more slide data objects as needed
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Automatically switch to the next slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slide}
        style={{ backgroundImage: `url(${slidesData[currentSlide].image})` }}
      >
        <div className={styles.slideProgress}></div>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colLg12} style={{ height: '530px' }}>
              <div className={`${styles.slideContent} ${styles.whiteScheme} ${styles.layerAnimation1}`}>
                <p className={styles.promoTitle}>{slidesData[currentSlide].promoTitle}</p>
                <h1 className={styles.mainTitle}>
                  <span>{slidesData[currentSlide].mainTitle}</span>
                </h1>
                <p className={styles.subtitle}>{slidesData[currentSlide].subtitle}</p>
                <div className={styles.slideButton}>
                  <a className={styles.defaultBtn} href={slidesData[currentSlide].link}>
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
