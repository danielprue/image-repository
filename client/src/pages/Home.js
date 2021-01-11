import React, { useState, useEffect } from 'react';
import JustifiedGrid from 'react-justified-grid';
import { useHistory } from 'react-router-dom';

import { Image } from 'cloudinary-react';

import '../styling/Home.css';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import { PageHeader, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import UploadModal from '../components/UploadModal';

const Home = (props) => {
  const history = useHistory();
  const [images, setImages] = useState([]);

  // props for upload modal
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const handleUploadOnCancel = () => {
    setIsUploadModalVisible(false);
  };

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
      <div className='home-page-header'>
        <PageHeader
          backIcon={false}
          title='Image Repository'
          extra={[
            <Tooltip
              title='Login to use this feature'
              trigger={props.loginStatus ? [] : 'hover'}
              key='tooltip'
            >
              <Button
                disabled={!props.loginStatus}
                icon={<UploadOutlined />}
                onClick={() => setIsUploadModalVisible(true)}
              >
                Upload Image
              </Button>
            </Tooltip>,
          ]}
        >
          {/* Add search and upload stuff here */}
          <UploadModal
            isUploadModalVisible={isUploadModalVisible}
            handleUploadOnCancel={handleUploadOnCancel}
          />
        </PageHeader>
      </div>
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
                  >
                    <Transformation crop='scale' width='512' />
                  </Image>
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
