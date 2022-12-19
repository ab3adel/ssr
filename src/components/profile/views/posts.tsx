
import { Col ,Row} from 'react-bootstrap'
import {PostCard} from '../../post-card'
import predefinedImage from '../../../images/home/image1.png'
import predefinedImage1 from '../../../images/home/image2.png'
import predefinedImage2 from '../../../images/home/image3.png'
import predefinedImage3 from '../../../images/home/image4.png'
import { iPost } from '../../tools/interface'
interface iProps{ posts:Partial<iPost>[]}

export const Posts=({posts}:iProps)=>{

    return (
        <Col xs={12}>
            <Row>
                {
                    posts && posts.length>0?
                    posts.map((ele,index)=>
                        <Col lg={6} md={12} xs={12} key={index}>
                            <PostCard
                            title={ele.title?ele.title:{en:'',ar:''}}
                            area={ele.area?ele.area:{en:'',ar:''}}
                            currency={ele.currency?ele.currency:{en:'Kwd',ar:'Kwd'}}
                            testImages={[predefinedImage,predefinedImage1,predefinedImage2,predefinedImage3]}
                            price={ele.price?ele.price:''}
                            role={ele.role?ele.role:{en:'',ar:''}}
                            username={ele.username?ele.username:"User_333"}
                            main_property_type={ele.main_property_type?ele.main_property_type:{en:'',ar:""}}
                            number_of_bathrooms={ele.number_of_bathrooms?ele.number_of_bathrooms:0}
                            number_of_rooms={ele.number_of_rooms?ele.number_of_rooms:0}
                            price_type={ele.price_type?ele.price_type:{en:"",ar:""}}
                            property_site={ele.property_site?ele.property_site:{en:'',ar:''}}
                            tags={ele.tags?ele.tags:[{name:{en:'',ar:''}}]}
                            likes={ele.likes?ele.likes:0}
                            images={ele.images?ele.images:[{path:'',file_name:{en:'',ar:''}}]}
                            id={ele.id?ele.id:-1}
                            imgs_gallery_height={'200px'}
                            small_size={true}
                            for_profile={true}
                            user_id={ele.user_id?ele.user_id:-1}
                            space={ele.space}
                            />
                        </Col>
                    )
                :
                <Col xs={12} className='d-flex justify-content-center align-items-center'style={{height:'50vh'}}>
                    <span className='h4 fw-bold'>You don't have posts to show !!</span>
                </Col>
                }
               
            </Row>
        </Col>
    )
}