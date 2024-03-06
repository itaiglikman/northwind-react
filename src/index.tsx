import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { appStore } from './Redux2/Store';
import interceptors from './Utils/Interceptors';

// Register interceptors for adding token in request:
interceptors.create();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>

        {/* provider - let info pass through all child components.
        for redux new version 
        1. npm i @reduxjs/toolkit
        2. npm i react-redux @types/react-redux
        **not needed for the old version
        npm i redux
        */}
        <Provider store={appStore}>
            <Layout />
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
