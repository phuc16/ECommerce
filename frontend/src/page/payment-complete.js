import GHeader from "../component/header";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import brand from "../asset/img/Brand.png";
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
    var href = window.location.href
    href.split("&").forEach((e) => {
        var [field, value] = e.split("=");
        if (field === 'resultCode') {
            code = value;
        }

    })

    

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
