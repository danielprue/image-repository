import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Button, Descriptions, PageHeader, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Image } from 'cloudinary-react';

import '../styling/ImageDetails.css';

const ImageDetails = () => {
  const [image, setImage] = useState(null);
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

  // const handleDownloadClick = () => {
  //   fetch(`http://localhost:3001/api/photos/${image.id}/download`);
  // };

  useEffect(() => {
    fetchImage(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (image) fetchUsername(image.uploader);
  }, [image]);

  return (
    <div className='image-details'>
      <div className='image-details-header'>
        <PageHeader
          ghost={false}
          onBack={() => history.goBack()}
          title={image ? image.name : 'Loading'}
          subTitle={image ? `by ${uploader}` : 'loading'}
          extra={[
            <a href='' download={image ? image.image_path : ''}>
              <Button type='primary' icon={<DownloadOutlined />} size='large'>
                Download
              </Button>
            </a>,
          ]}
        >
          <Descriptions size='small' column={1}>
            <Descriptions.Item label='Description'>
              {image ? image.description : ''}
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
          <div className='image-display'>
            <Image
              cloudName='devm7fql3'
              publicId={image.public_id}
              width='512'
            />
          </div>
          {/* <Card title={image.name} className='image-info'>
            <p>{image.description}</p>
            <p>{`${image.width} x ${image.height}`}</p>
            {image.tags.map((value, i) => {
              return (
                <Tag key={i} className='image-info-tag'>
                  {value}
                </Tag>
              );
            })}
          </Card> */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageDetails;
