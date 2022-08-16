import React from 'react';
import LogIn from './components/auth/index'
import {useTranslation} from 'react-i18next'
function App() {
  const {i18n}=useTranslation()
  return (
    <div className="App" style={{direction:i18n.language === 'en'? 'ltr':'rtl'}}>
       <LogIn />
    </div>
  );
}

export default App;
