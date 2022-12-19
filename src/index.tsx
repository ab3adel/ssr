import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './i18n'
import { BrowserRouter as Router } from 'react-router-dom'
import SettingProvider from './components/tools/context/setting-context/setting-provider'
import NotificationProvider from './components/tools/context/notification/notification-provider';
import AuthContextProvider from './components/tools/context/auth-context/auth-provider';
import {RecoilRoot} from 'recoil'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>

      <SettingProvider>
        <NotificationProvider>
          <RecoilRoot>

              <Router>
                <App />
              </Router>
          </RecoilRoot>
        
        </NotificationProvider>
      </SettingProvider>
    </AuthContextProvider>

);


