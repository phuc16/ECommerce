import {Navbar, Container, Row, Col} from 'react-bootstrap'
import brand from '../asset/img/Brand.png'
import '../asset/css/footer.css'
export default function Footer(){
    return(
        <div style={{backgroundColor: '#F4F6F8'}}>
            <Container >
                <Row>
                    <Col className="mb-3">
                        <Row>Chính sách giao hàng</Row>
                        <Row>Chính sách thanh toán</Row>
                        <Row>Chính sách đổi trả</Row>
                        <Row>Chất lượng dịch vụ</Row>
                    </Col>
                    <Col >
                        <Row>Giới thiệu về công ty</Row>
                        <Row>Tuyển dụng</Row>
                        <Row>Gửi góp ý và khiếu nại</Row>
                    </Col>
                    <Col  className='rd'>
                        <Row> <b className='rd-b'>Email hỗ trợ</b></Row>
                        <Row><b className='rd-b'>Tư vấn:</b> giftshop.gs@gmail.com</Row>
                        <Row><b className='rd-b'>Kỹ thuật:</b> giftshop.fb@gmail.com</Row>
                        <Row><b className='rd-b'>Góp ý:</b> giftshop.fb@gmail.com</Row>
                        <Row><b className='rd-b'>Tuyển dụng:</b> giftshop.recuit@gmail.com</Row>
                    </Col>
                    <Col xs={3}>
                        <img src={brand}/>
                    </Col>
                </Row>
                
            </Container>
            <Row className='row-under'>
                <div className='under'> 
                    Copyright © 2022. Trường Đại học Bách Khoa TPHCM<br/>
                    Liên hệ email: giftshop.dev@gmail.com<br/>
                    Số điện thoại: 0123456789
                </div>       
            </Row>
        </div>
        
    )
}