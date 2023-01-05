import {Helmet} from 'react-helmet-async'

interface iProps {title:string,description:string,name:string,type:string}
const SEO =({title,description,name,type}:iProps)=>{
    return (
        <Helmet>
            <title>{title} </title>
            <meta name='description' content={description}/>

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" itemProp="image" content="https://backend.instaaqar.com/logo2.png"/>
            
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}
export default SEO;