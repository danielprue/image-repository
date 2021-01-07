// import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { Layout } from 'antd';
import { HomeOutlined, GithubOutlined } from '@ant-design/icons';

import Home from './pages/Home';
import Login from './pages/Login';
import ImageDetails from './pages/ImageDetails';

import './styling/App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
  // const [welcome, setWelcome] = useState('loading...');

  // const callAPI = () => {
  //   fetch('http://localhost:9000/testAPI')
  //     .then((res) => res.text())
  //     .then((res) => setWelcome(res))
  //     .catch((err) => err);
  // };

  // useEffect(() => {
  //   callAPI();
  // }, []);

  return (
    <div className='App'>
      <Layout className='layout'>
        <Header className='header'>
          <div className='header-container'>
            <HomeOutlined className='home-icon' />
            {/* make this clickable to go home */}
            {/* Home button, login/logout */}
          </div>
        </Header>
        <Content>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/image'>
            <ImageDetails />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>
        </Content>
        <Footer>
          <GithubOutlined className='github-icon' />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
