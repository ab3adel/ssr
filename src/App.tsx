import React from 'react';
import LogIn from './components/auth/index'
import HomePage from './components/layout'
import {useTranslation} from 'react-i18next'
import {Rotues} from './components/tools/routes'
import {useRoutes} from 'react-router-dom'
function App() {
  const {i18n}=useTranslation()
  let routes= useRoutes(Rotues)
  return (
    <div className="App" style={{direction:i18n.language === 'en'? 'ltr':'rtl'}}>
       {
        routes
       }
    </div>
  );
}

export default App;
