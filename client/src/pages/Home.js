import React, { useState, useEffect } from 'react';
import JustifiedGrid from 'react-justified-grid';

import '../styling/Home.css';

const Home = (props) => {
  const [images, setImages] = useState([]);

  const fetchImages = (imageList) => {
    imageList = imageList.map((id) => id.toString());
    const fetch_url =
      'http://localhost:3001/api/photos/batch/' + imageList.join(',');
    fetch(fetch_url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(
          data.map((pic) => {
            return {
              src: pic.image_path,
              width: pic.width,
              height: pic.height,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('fetch images');
    fetchImages([...Array(56).keys()]);
  }, []);

  return (
    <>
      <JustifiedGrid
        className='grid-container'
        images={images}
        rows={20}
        maxRowHeight={256}
        showIncompleteRow={true}
        gutter={5}
      />
    </>
  );
};

export default Home;
