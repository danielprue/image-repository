import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';
import { Image } from 'cloudinary-react';

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
          <Card title={image.name}>{image.description}</Card>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageDetails;
