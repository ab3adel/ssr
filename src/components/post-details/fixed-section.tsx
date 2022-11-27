import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import chat from "../../images/post-details/chat-icon.svg";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export const FixedSection = ({ post }: { post: any }) => {
  const { i18n } = useTranslation();
  let [style,setStyle]= useState({left:'auto',top:'auto',right:'auto'})
  useEffect(()=>{
    if (window.innerWidth > 567) {
      
      setStyle(()=> 
        i18n.language==='en'?
      {left:'auto',top:'1rem',right:'1rem'}
      :
      {left:'1rem',top:'1rem',right:'auto'})
    }
  },[i18n.language])
 
  return (
    <Col sm={4} xs={12} className="fixedSection p-sm-1 p-0"
    style={style}>
      <Card className="p-sm-2 p-0">
        <Row className="gy-3 p-2">
          <Col xs={12} className="fw-bold fs-5">
            Property Information
          </Col>
          {post.offer_type && (
            <>
              <Col lg={5} xs={6} className="fw-bold">
                Type
              </Col>
              <Col lg={4} xs={6}>
                <div className="tag grey">{i18n.language==='en' ? post.offer_type.en:post.offer_type.ar}</div>
              </Col>
            </>
          )}
          {post.price_type && (
            <>
              <Col lg={5} xs={6} className="fw-bold">
                Purpose
              </Col>
              <Col lg={4} xs={6}>
                <div className="tag grey">{i18n.language==='en' ?post.price_type.en : post.price_type.ar}</div>
              </Col>
            </>
          )}
          <Col lg={5} xs={6} className="fw-bold">
            Added on
          </Col>
          <Col lg={4} xs={6}>
            <div className="tag grey">
              {i18n.language === "en" ? post.updated_at.en : post.updated_at.ar}
            </div>
          </Col>
        { post?.PACIID && <>
          <Col lg={5} xs={6} className="fw-bold">
            PACIID
          </Col>
          <Col lg={4} xs={6}>
            <div className="tag grey">{post.PACIID ? post.PACIID : ""}</div>
          </Col>
          </>
          }
          <Col lg={5} xs={6} className="fw-bold">
            Direction
          </Col>
          <Col lg={4} xs={6}>
            <div className="tag grey">North West</div>
          </Col>
          <Col xs={12} className="fw-bold fs-5">
            Contact Owners
          </Col>
          <Col xs={12}>
            <Row className="gy-1">
              {post.phone_numbers && post.phone_numbers.length > 0
                ? post.phone_numbers.map((ele: any, index: number) => (
                    <Col
                      lg={10}
                      xs={12}
                      key={index}
                      className="d-flex 
                           justify-content-between 
                           align-items-center "
                    >
                      <span>{ele.phone}</span>
                      <div className="call">Call</div>
                    </Col>
                  ))
                : ""}
            </Row>
          </Col>
        </Row>
        <Col
          xs={0}
          sm={12}
          className="mt-4 p-1 d-none d-sm-flex justiyf-content-center"
        >
          <Col xs={9} className="chatBtn  ">
            <img src={chat} />
            <span>Chat</span>
          </Col>
        </Col>
      </Card>
    </Col>
  );
};
