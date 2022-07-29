import React from 'react';
import {Layout, Typography} from 'antd'
import {ContentRoot, HeaderRoot} from './styles'
import './App.css';
import Page from "./Components/Page";
import 'antd/dist/antd.min.css'

const App = () => {
    const {Title} = Typography

    return (
        <Layout>
            <HeaderRoot>
                <Title level={3} style={{ color: '#c5e8f1', margin: 0 }}>Ant Design Table</Title>
            </HeaderRoot>
            <ContentRoot>
                <Page />
            </ContentRoot>
        </Layout>
    );
}

export default App;
