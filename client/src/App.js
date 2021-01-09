// import { useEffect, useState } from 'react';
import { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { Form, Button, Input, Layout, Menu, Modal } from 'antd';
import { HomeOutlined, GithubOutlined } from '@ant-design/icons';

import Home from './pages/Home';
import Login from './pages/Login';
import ImageDetails from './pages/ImageDetails';

import './styling/App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(
    false
  );
  const history = useHistory();
  const handleHomeClick = () => {
    history.push('/');
  };

  // const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

  // const login = (
  //   <Form {...layout} name='login' initialValues={{ remember: true }}>
  //     <Form.Item
  //       label='Username'
  //       name='username'
  //       rules={[{ required: true, message: 'Please input your username' }]}
  //     >
  //       <Input />
  //     </Form.Item>
  //   </Form>
  // );

  const handleClickLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleClickRegisterModal = () => {
    setIsRegistrationModalVisible(true);
  };

  const handleOnCancel = () => {
    setIsLoginModalVisible(false);
    setIsRegistrationModalVisible(false);

    const selected = document.querySelector('.ant-menu-item-selected');
    if (selected) selected.classList.remove('ant-menu-item-selected');
  };

  return (
    <div className='App'>
      <Layout className='layout'>
        <Header className='header'>
          <div className='header-container'>
            <HomeOutlined className='home-icon' onClick={handleHomeClick} />
            <div className='login-buttons'>
              <Menu theme='dark' mode='horizontal'>
                <Menu.Item key='login-menu' onClick={handleClickLoginModal}>
                  Login
                </Menu.Item>
                <Modal
                  title='Login'
                  visible={isLoginModalVisible}
                  footer={null}
                  onCancel={handleOnCancel}
                >
                  <Form
                    name='login'
                    initialValues={{ remember: true }}
                    layout='vertical'
                  >
                    <Form.Item label='Username' name='username' rules={[]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[]}>
                      <Input.Password />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form>
                </Modal>
                <Menu.Item
                  key='register-menu'
                  onClick={handleClickRegisterModal}
                >
                  Register
                </Menu.Item>
                <Modal
                  title='Register'
                  visible={isRegistrationModalVisible}
                  footer={null}
                  onCancel={handleOnCancel}
                >
                  <Form
                    name='register'
                    initialValues={{ remember: true }}
                    layout='vertical'
                  >
                    <Form.Item label='Username' name='username' rules={[]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[]}>
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label='Confirm Password'
                      name='confirm-password'
                      rules={[]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form>
                </Modal>
                <Menu.Item key='guest-account'>Guest Account</Menu.Item>
              </Menu>
            </div>
          </div>
        </Header>
        <Content>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/image/:id'>
            <ImageDetails />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>
        </Content>
        <Footer className='footer'>
          <GithubOutlined className='github-icon' />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
