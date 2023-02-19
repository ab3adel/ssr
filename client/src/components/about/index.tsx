import './about.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../../images/instaaqarlogo.svg'
import { useTranslation } from 'react-i18next'
import {useGetPage} from '../tools/apis/useGetPage'
import { useEffect, useState } from 'react'
import { Spinner } from '../tools/spinner'
import SEO from '../tools/seo'
const About =()=>{
    const {i18n,t}=useTranslation()
    const {getPage,isGetPageLoading,pageData,pageError} =useGetPage()
    const [about,setAbout]=useState({body:{__html:''},title:{en:'',ar:''}})
    useEffect(()=>{
        getPage('About Insta Aqar')
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
        <Container className='aboutContainer'    style={{background:'white'}}>
            <SEO
            title="حول انستاعقار" 
            description='انستاعقار تطبيق العقارات الاحدث والأشمل في الكويت, يمكنك تصفح بيع وشراء 
            العقارات من منازل,شقق سكنية,بيوت,محال تجارية,مكاتب بالاضافة الى كل الأخبار المتعلقة بالعقارات ,ويضمن اعلى مستوى من الخصوصية'
            />
            <Col xs={12} className="h-100">

            <Row className="p-1 gy-4 justify-content-between h-100"
            style={{background:'white'}}>
                <Col xs={12} className="d-flex justify-content-center align-items-center py-1 flex-column"
                >
                    

                    <img src={Logo} className="logo"/>
                  

                    <h2 className="title">{i18n.language==='en'?about.title.en:about.title.ar}</h2>
                   
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
export default About;