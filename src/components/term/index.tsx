import './term.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../../images/instaaqarlogo.svg'
import { useTranslation } from 'react-i18next'
import {useGetPage} from '../tools/apis/useGetPage'
import { useEffect, useState } from 'react'
import { Spinner } from '../tools/spinner'
const Term =()=>{
    const {i18n,t}=useTranslation()
    const {getPage,isGetPageLoading,pageData,pageError} =useGetPage()
    const [about,setAbout]=useState({body:{__html:''},title:{en:'',ar:''}})
    useEffect(()=>{
        getPage('Terms & Conditions')
    },[i18n.language])
    useEffect(()=>{
        if (!pageError) {
            if (pageData && pageData.length>0) {

                setAbout(pre=>
                    ({
                        body:{__html:i18n.language==='en'?pageData[0].body.en:pageData[0].body.ar},
                        title:pageData[0].title
                    })
                    )
            }
        }
    },[isGetPageLoading])
    if (isGetPageLoading) return <Spinner />
    return (
        <Container className='termContainer'    style={{background:'white'}}>
            <Col xs={12} className="h-100">

            <Row className="p-1 gy-4 justify-content-between h-100"
            style={{background:'white'}}>
                <Col xs={12} className="d-flex justify-content-center align-items-center py-1 flex-column"
                >
                    

                    <img src={Logo} className="logo"/>
                  

                    <span className="title">{i18n.language==='en'?about.title.en:about.title.ar}</span>
                   
                </Col>
                <Col xs={12}  className={'p-2 text-center d-flex justify-content-center'}
                 style={{background:'white'}}>
                    <Col xs={12} sm={8} className="text">
                        <div  style={{fontFamily:'Cairo'}}
                        dangerouslySetInnerHTML={
                           about.body
                        }>

                        </div>
                
                    </Col>
                </Col>
                <Col xs={12} className="spacer" >
                    
                </Col>
            </Row>
            </Col>
        </Container>
    )
}
export default Term;