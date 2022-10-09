import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n'
import {BrowserRouter as Router} from 'react-router-dom'
import SettingProvider from './components/tools/context/setting-context/setting-provider'
import NotificationProvider from './components/tools/context/notification/notification-provider';
import AuthContextProvider from './components/tools/context/auth-context/auth-provider';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AuthContextProvider>

      <SettingProvider>
        <NotificationProvider>
          
            <Router>
              <App />
            </Router>
        
        </NotificationProvider>
      </SettingProvider>
    </AuthContextProvider>

);


