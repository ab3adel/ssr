import React, {Suspense} from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {HelmetProvider} from 'react-helmet-async'
import './i18n'

import SettingProvider from './components/tools/context/setting-context/setting-provider'
import NotificationProvider from './components/tools/context/notification/notification-provider';
import AuthContextProvider from './components/tools/context/auth-context/auth-provider';
import ChatContextProvider from './components/tools/context/chat-context/chat-provider';
import {RecoilRoot} from 'recoil'
import { Spinner } from './components/tools/spinner';

const root = 
  document.getElementById('root') as HTMLElement

ReactDOM.hydrateRoot(
  root,
  <HelmetProvider>
    <AuthContextProvider>
      <ChatContextProvider>

        <SettingProvider>
          <NotificationProvider>
            <RecoilRoot>
              <Suspense fallback={<Spinner />}>
             
                  <App />
          
              </Suspense>
            </RecoilRoot>
          
          </NotificationProvider>
        </SettingProvider>
      </ChatContextProvider>
      </AuthContextProvider>
    </HelmetProvider>

);


