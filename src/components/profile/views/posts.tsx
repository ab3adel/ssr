
import { Col ,Row} from 'react-bootstrap'
import {PostCard} from '../../post-card'
import predefinedImage from '../../../images/home/image1.png'
import predefinedImage1 from '../../../images/home/image2.png'
import predefinedImage2 from '../../../images/home/image3.png'
import predefinedImage3 from '../../../images/home/image4.png'


export const Posts=()=>{

    return (
        <Col xs={12}>
            <Row>
                <Col sm={6} xs={12}>
                    <PostCard
                    title={{en:"Test",ar:"Test"}}
                    area={{en:"Kwait",ar:'Kwait'}}
                    currency={{en:'Kwd',ar:'Kwd'}}
                    testImages={[predefinedImage,predefinedImage1,predefinedImage2,predefinedImage3]}
                    price="3333"
                    role={{en:'realservice',ar:'realService'}}
                    username="User_333"
                    main_property_type={{en:'Flat',ar:"Flat"}}
                    number_of_bathrooms={4}
                    number_of_rooms={3}
                    price_type={{en:"Rent",ar:"Rent"}}
                    property_site={{en:'Kowait',ar:'Kwait'}}
                    tags={[{name:{en:'best-offer',ar:'best-offer'}}]}
                    likes={4}
                    images={[{path:'',file_name:{en:'',ar:''}}]}
                    id={1}
                    imgs_gallery_height={'200px'}
                    small_size={true}
                    for_profile={true}
                    user_id={-1}
                     />
                </Col>
                <Col sm={6} xs={12}>
                    <PostCard
                    title={{en:"Test",ar:"Test"}}
                    area={{en:"Kwait",ar:'Kwait'}}
                    currency={{en:'Kwd',ar:'Kwd'}}
                    testImages={[predefinedImage,predefinedImage1,predefinedImage2,predefinedImage3]}
                    price="3333"
                    role={{en:'realservice',ar:'realService'}}
                    username="User_333"
                    main_property_type={{en:'Flat',ar:"Flat"}}
                    number_of_bathrooms={4}
                    number_of_rooms={3}
                    price_type={{en:"Rent",ar:"Rent"}}
                    property_site={{en:'Kowait',ar:'Kwait'}}
                    tags={[{name:{en:'best-offer',ar:'best-offer'}}]}
                    likes={4}
                    images={[{path:'',file_name:{en:'',ar:''}}]}
                    id={1}
                    small_size={true}
                   imgs_gallery_height={'200px'}
                   for_profile={true}
                   user_id={-1}
                   
                     />
                </Col>
            </Row>
        </Col>
    )
}