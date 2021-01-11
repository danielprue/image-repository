import React, { useState } from 'react';
import { Button, Input, Modal, Pagination, Steps, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import EditableTagGroup from '../components/EditableTagGroup';

const { Step } = Steps;

const UploadModal = (props) => {
  //steps state
  const [uploadProgress, setUploadProgress] = useState(0);
  // Image wall state
  const [fileList, setFileList] = useState([]);
  // Image details info
  const [imageDetailsPage, setImageDetailsPage] = useState(0);
  const [imageNames, setImageNames] = useState({});
  const [imageDescriptions, setImageDescriptions] = useState({});
  const [imageTags, setImageTags] = useState({});

  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const handleUploadNext = () => {
    setUploadProgress(uploadProgress + 1);
    console.log(imageNames);
  };

  const handleUploadPrevious = () => {
    setUploadProgress(uploadProgress - 1);
  };

  const handleUploadOk = () => {};

  const handleUploadCancel = () => {
    props.handleUploadOnCancel();
    setFileList([]);
    setUploadProgress(0);
    setImageDetailsPage(0);
  };

  const handlePageChange = (page) => {
    setImageDetailsPage(page - 1);
    console.log(page - 1, fileList[page - 1]);
  };

  const handleNameChange = (event) => {
    setImageNames({ ...imageNames, [imageDetailsPage]: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setImageDescriptions({
      ...imageDescriptions,
      [imageDetailsPage]: event.target.value,
    });
  };

  return (
    <>
      <Modal
        title='Upload Images'
        visible={props.isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={[
          <Button
            key='previous'
            onClick={handleUploadPrevious}
            className={uploadProgress !== 2 ? null : 'hidden'}
            disabled={uploadProgress === 0}
          >
            Previous
          </Button>,

          <Button
            key='next'
            onClick={handleUploadNext}
            className={uploadProgress !== 2 ? null : 'hidden'}
            disabled={uploadProgress === 2 || fileList.length === 0}
          >
            Next
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleUploadOk}
            className={uploadProgress === 2 ? null : 'hidden'}
            disabled={uploadProgress !== 2}
          >
            Submit
          </Button>,
        ]}
      >
        <Steps progressDot current={uploadProgress}>
          <Step title='Choose Images' />
          <Step title='Add Details' />
          <Step title='Finish' />
        </Steps>

        {uploadProgress === 0 ? (
          <Upload
            listType='picture-card'
            fileList={fileList}
            showUploadList={{ showPreviewIcon: false }}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 10 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        ) : null}

        {uploadProgress === 1 ? (
          <>
            {fileList.map((image, i) => {
              return (
                <div key={i} className={imageDetailsPage === i ? '' : 'hidden'}>
                  <img src={image.thumbUrl} alt={image.name} />
                  <div className='image-details-form'>
                    Name:
                    <Input onChange={handleNameChange} />
                    Description:
                    <Input onChange={handleDescriptionChange} />
                    <EditableTagGroup
                      ImageTags={imageTags}
                      setImageTags={setImageTags}
                      imageNumber={i}
                    />
                  </div>
                </div>
              );
            })}
            <Pagination
              simple
              onChange={handlePageChange}
              total={fileList.length}
              defaultPageSize={1}
            />
          </>
        ) : null}

        {uploadProgress === 2 ? <></> : null}
      </Modal>
    </>
  );
};

export default UploadModal;
