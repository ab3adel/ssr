import React , {useContext}from 'react';

import {useTranslation} from 'react-i18next'
import {Rotues} from './components/tools/routes'
import {useRoutes} from 'react-router-dom'
import {Notify} from './components/tools/toast'
import notificationContext from './components/tools/context/notification/notification-context'
function App() {
  const {i18n}=useTranslation()
  let routes= useRoutes(Rotues)
  const {notify,setNotify} = useContext(notificationContext)
  
  const handleCloseNotify=()=>setNotify((pre:any)=>({...pre,show:false}))
  return (
    <div className="App" style={{direction:i18n.language === 'en'? 'ltr':'rtl'}}>
       {
        routes
       }
         <Notify
             {...notify}
             close={handleCloseNotify}
        />
    </div>
  );
}

export default App;
