import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Descriptions, PageHeader, Tag } from 'antd';
import { Image } from 'cloudinary-react';

import '../styling/ImageDetails.css';

const ImageDetails = () => {
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const [uploader, setUploader] = useState('unknown');
  const match = useRouteMatch();
  const history = useHistory();

  const fetchImage = (id) => {
    fetch(`http://localhost:3001/api/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUsername = (id) => {
    fetch(`http://localhost:3001/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUploader(data.username);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchImage(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (image) {
      fetchUsername(image.uploader);
      if (image.width > image.height) {
        setImageDimensions({ width: '80%' });
      } else {
        setImageDimensions({ height: '100%' });
      }
    }
  }, [image]);

  return (
    <div className='image-details'>
      <div className='image-details-header'>
        <PageHeader
          ghost={false}
          onBack={() => history.goBack()}
          title={image ? image.name : 'Loading'}
          subTitle={image ? `by ${uploader}` : 'loading'}
        >
          <Descriptions size='small' column={1}>
            <Descriptions.Item label='Description'>
              {image ? image.description : ''}
            </Descriptions.Item>
            <Descriptions.Item label='Dimensions'>
              {image ? `${image.width} x ${image.height}` : ''}
            </Descriptions.Item>
            <Descriptions.Item label='Tags'>
              {image ? (
                <>
                  {image.tags.map((value, i) => {
                    return <Tag key={i}>{value}</Tag>;
                  })}
                </>
              ) : (
                <></>
              )}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
      {image ? (
        <>
          <div
            className='image-display'
            style={{ maxWidth: '1024px', width: '100%', height: '60vh' }}
          >
            <Image
              cloudName='devm7fql3'
              publicId={image.public_id}
              style={{ ...imageDimensions }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageDetails;
