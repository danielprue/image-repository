import React, { useState, useEffect } from 'react';
import JustifiedGrid from 'react-justified-grid';
import { useHistory } from 'react-router-dom';

import { Image, Transformation } from 'cloudinary-react';

import '../styling/Home.css';

const Home = (props) => {
  const history = useHistory();
  const [images, setImages] = useState([]);

  const fetchImages = (imageList = null) => {
    let fetch_url = '';
    if (!imageList) {
      fetch_url = 'http://localhost:3001/api/photos/all';
    } else {
      imageList = imageList.map((id) => id.toString());
      fetch_url =
        'http://localhost:3001/api/photos/batch/' + imageList.join(',');
    }
    fetch(fetch_url)
      .then((res) => res.json())
      .then((data) => {
        setImages(
          data.map((pic) => {
            return {
              src: pic.image_path,
              height: pic.height,
              width: pic.width,
              public_id: pic.public_id,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handlePicClick = (event) => {
    const public_id = event.target.getAttribute('id');
    history.push(`/image/${public_id}`);
  };

  return (
    <>
      <JustifiedGrid
        className='grid-container'
        images={images}
        rows={20}
        maxRowHeight={256}
        showIncompleteRow={true}
        gutter={5}
      >
        {(processedImages) => (
          <React.Fragment>
            {processedImages.map((image, i) => {
              const { width, height, left, top, originalData } = image;
              return (
                <div
                  key={i}
                  style={{ position: 'absolute', left: left, top: top }}
                >
                  <Image
                    id={originalData.public_id}
                    cloudName='devm7fql3'
                    public_id={originalData.public_id}
                    width={width}
                    height={height}
                    onClick={handlePicClick}
                    loading='lazy'
                  ></Image>
                </div>
              );
            })}
          </React.Fragment>
        )}
      </JustifiedGrid>
    </>
  );
};

export default Home;
