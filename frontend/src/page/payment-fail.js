import GHeader from "../component/header"
import {Container, Row, Col, Form, Button, ListGroup} from 'react-bootstrap'
import brand from '../asset/img/Brand.png'
import '../asset/css/paymentComplete.css'
import Footer from "../component/footer";
export default function PaymentFail(){
    return(
        <div>
            <div className="header">
                <GHeader/>
            </div>
            <Container>
                <Row className="title">
                    <Col className = 'left-side' xs={4}>
                        <hr/>
                    </Col>
                    <Col className = 'mid' xs={4} style={{textAlign: 'center'}}>
                        GIAO DỊCH <br/>
                        THẤT BẠI
                    </Col>
                    <Col className = 'right-side' xs={4}>
                        <hr/>
                    </Col>
                </Row>
                <Row className="content" style={{alignItems: 'center'}}>
                    <img className="brand" src={brand}/>
                </Row>
                <Row className="thank-you mb-10" style={{marginBottom: '100px'}} >
                    <div>LIÊN HỆ BỘ PHẬN CHĂM SÓC KHÁCH HÀNG ĐỂ ĐƯỢC HỖ TRỢ</div>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}