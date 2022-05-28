import GHeader from "../component/header";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import React, { useState, useEffect, useRef} from "react";
import brand from "../asset/img/Brand.png";
import axios from 'axios';
import "../asset/css/paymentComplete.css";

function PaymentFail() {
  return (
    <div>
      <div className="header">
        <GHeader />
      </div>
      <Container>
        <Row className="title">
          <Col className="left-side" xs={4}>
            <hr />
          </Col>
          <Col className="mid" xs={4} style={{ textAlign: "center" }}>
            GIAO DỊCH <br />
            THẤT BẠI
          </Col>
          <Col className="right-side" xs={4}>
            <hr />
          </Col>
        </Row>
        <Row className="content" style={{ alignItems: "center" }}>
          <img className="brand" src={brand} />
        </Row>
        <Row className="thank-you">
          <div>LIÊN HỆ BỘ PHẬN CHĂM SÓC KHÁCH HÀNG ĐỂ ĐƯỢC HỖ TRỢ</div>
        </Row>
      </Container>
    </div>
  );
}

export default function PaymentComplete() {
    var code = -1;
    var transId = ''
    var href = window.location.href
    href.split("&").forEach((e) => {
        var [field, value] = e.split("=");
        if (field === 'resultCode') {
            code = value;
        }
        if (field === 'transId') {
          transId = value;
      }
    })

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    useEffect(() => {
      if (code == 0){
        const email =  getCookie('email');
        console.log(email)
        if (email !== ''){
          const d = new Date();
          d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          // console.log('email' + '='+ email + ';' + expires + ";")
          document.cookie = 'email' + '='+ email + ';' + expires + ";path=/complete";
          const name =  getCookie('name');
          const phone =  getCookie('phone');
          axios
          .post('http://localhost:5000/email', {
            "recivers": [email],
            "subject": "ĐẶT HÀNG THÀNH CÔNG",
            "content": ` Khách hàng ${name} số điện thoại ${phone} đã đặt hàng thành công.\n \
Mã đơn hàng của bạn là ${transId}, hãy lưu lại để tra cứu đơn hàng khi cần thiết. \n \
Gọi ngay 0983684xxx trước khi đơn hàng chuyển qua giao nhận để thay đổi thông tin cần thiết. \n \
\n \
CẢM ƠN BẠN ĐÃ LUÔN TIN TƯỞNG GIFT SHOP! \n`,
          "attachments" : []
          })
          .then((res) => {
              console.log(res.data);
          });
        }
      }
      
    });

  return (
    <div>
      {code != 0 ? (
        <PaymentFail />
      ) : (
        <div>
          <div className="header">
            <GHeader />
          </div>
          <Container>
            <Row className="title">
              <Col className="left-side" xs={4}>
                <hr />
              </Col>
              <Col className="mid" xs={4} style={{ textAlign: "center" }}>
                ĐẶT HÀNG <br />
                THÀNH CÔNG
              </Col>
              <Col className="right-side" xs={4}>
                <hr />
              </Col>
            </Row>
            <Row className="content" style={{ textAlign: "center" }}>
              <div>
                Mã đơn hàng của bạn là{" "}
                <b style={{ color: "#C44569" }}>G103Z20</b>, hãy lưu lại để tra
                cứu đơn hàng khi cần thiết.
                <br />
                Gọi ngay <b style={{ color: "#C44569" }}> 0983684xxx</b> trước
                khi đơn hàng chuyển qua giao nhận để thay đổi thông tin cần
                thiết
              </div>
            </Row>
            <Row className="content" style={{ alignItems: "center" }}>
              <img className="brand" src={brand} />
            </Row>
            <Row className="thank-you">
              <div>CẢM ƠN BẠN ĐÃ LUÔN TIN TƯỞNG GIFT SHOP</div>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
