import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Card, Tag } from 'antd';
import { Image } from 'cloudinary-react';

import '../styling/ImageDetails.css';

const ImageDetails = () => {
  const [image, setImage] = useState(null);
  const match = useRouteMatch();

  const fetchImage = (id) => {
    fetch(`http://localhost:3001/api/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchImage(match.params.id);
  }, [match.params.id]);

  return (
    <div className='image-details'>
      {image ? (
        <>
          <div className='image-display'>
            <Image
              cloudName='devm7fql3'
              publicId={image.public_id}
              width='512'
            />
          </div>
          <Card title={image.name} className='image-info'>
            <p>{image.description}</p>
            <p>{`${image.width} x ${image.height}`}</p>
            {image.tags.map((value, i) => {
              return (
                <Tag key={i} className='image-info-tag'>
                  {value}
                </Tag>
              );
            })}
          </Card>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageDetails;
