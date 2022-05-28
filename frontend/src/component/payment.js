import GHeader from "./header";
import {Container, Row, Col, Form, Button, ListGroup} from 'react-bootstrap'
import '../asset/css/payment.css'
import axios from 'axios';
import React, { useState, useEffect, useRef} from "react";
import {TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const initialFValues = {
    name: '',
    phone: '',
    email: '',
    address: ''
}

function Bill(props) {
    const { method, values } = props;
    const listItem = {
        1: {
            name: 'Sunflower',
            price: 0,
            size: 'large',
            amount: 2
        },
        2: {
            name: 'Rose',
            price: 400,
            size: 'medium',
            amount: 3
        }
    }

    const onPayment = (e) => {
        axios
            .post('http://localhost:5000/momo', {
              amount: total
          })
            .then((res) => {
                console.log(res.data);
                // navigate(res.data);
                window.location.replace(res.data);
            });
        // console.log(values)
        for (const i in values){    
            // console.log(i + '=' + values[i] + ';' + expires + ";path=/complete";)
            const d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = i + '=' + values[i] + ';' + expires + ";path=/complete";
        }
    }

    var total = 0;
    for (var i in listItem){
        total+= listItem[i]['price']*listItem[i]['amount'];
    }

    return(
        
        <div className="bill-container">
            <Container >
                <Row className="mb-2 title">
                    <p>ĐƠN HÀNG</p>
                </Row>
                <Row className="mb-2">
                    <hr/>
                </Row>
                
                <ListGroup className="cart-item">
                    {Object.keys(listItem).map(function(key, index) {
                        return(
                        <Row className='mb-4'>
                            <Row className='mb-3'>
                                <Col>{listItem[key]['name']}</Col>
                                <Col>{listItem[key]['price']} VND</Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>Size: {listItem[key]['size']}</Col>
                                <Col>x{listItem[key]['amount']}</Col>
                            </Row>  
                        </Row>
                        )
                        
                    })}
                      
                </ListGroup>

                <Row className="mb-2">
                    <hr style={{border: '1px dashed'}}/>
                </Row>

                <ListGroup className="fee">
                    <Row className='mb-2'>
                        <Col>Đơn hàng</Col>
                        <Col>{total} VND</Col>
                    </Row>   
                    <Row className='mb-2'>
                        <Col>Giảm</Col>
                        <Col>-0 VND</Col>
                    </Row>  
                    <Row className='mb-2'>
                        <Col>Phí vận chuyển</Col>
                        <Col>0 VND</Col>
                    </Row> 
                    <Row className='mb-2'>
                        <Col>Phí thanh toán</Col>
                        <Col>0 VND</Col>
                    </Row>  
                </ListGroup>
                <Row className="mb-2">
                    <hr style={{border: '1px dashed'}}/>
                </Row>
                <Row className="mb-4 total">
                    <Col>Tổng Cộng</Col>
                    <Col>{total} VND</Col>
                </Row>
                <Row className="mb-2 btn-row">
                    {
                        method === 'momo' ? 
                            <Button variant="none" type="submit" onClick={(e) => onPayment(e) } >
                                HOÀN TẤT ĐẶT HÀNG
                            </Button>
                        :
                            <Button variant="none" type="submit">
                                HOÀN TẤT ĐẶT HÀNG
                            </Button>
                    }
                    
                </Row>

            </Container>

        </div>
    )
}

export default function Payment(){

    const districtRef = useRef()
    const communeRef = useRef()

    
    const [values, setValues] = useState(initialFValues);

    const [provinces, setProvinces] = useState([])
    const [provinceSelect, setProvinceSelect] = useState('0')

    const [districts, setDistricts] = useState([])
    const [districtSelect, setDistrictSelect] = useState('0')

    const [communes, setCommunes] = useState([])
    const [communeSelect, setCommuneSelect] = useState('0')

    

    useEffect(() => {
        const fetAPIProvince = async () => {
            axios.get(`https://api.mysupership.vn/v1/partner/areas/province`).then(res => {
                setProvinces(res.data.results)
            })
            if (provinceSelect !== '0') {
                await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceSelect}`).then(res => {
                    setDistricts(res.data.results)
                })
            }
            if (districtSelect !== '0') {
                await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtSelect}`).then(res => {
                    setCommunes(res.data.results)
                })
            }
        }
        fetAPIProvince()
    }, [])
    const handleChangeProvince = async (e) => {
        setProvinceSelect(e.target.value)
        if (e.target.value === '0') {
            setDistricts([])
            setCommunes([])
        } else {
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${e.target.value}`).then(res => {
                setDistricts(res.data.results)
            })
        }
        setDistrictSelect('0')
        setCommuneSelect('0')
    }

    const handleChangeDistrict = async (e) => {
        setDistrictSelect(e.target.value)
        if (e.target.value === '0') {
            setCommunes([])
        } else {
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${e.target.value}`).then(res => {
                setCommunes(res.data.results)
            })
        }
        setCommuneSelect('0')
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        console.log(values)
    }

    const handleChangeCommune = (e) => {

        setCommuneSelect(e.target.value)
    }

    const [selectedValue, setSelectedValue] = React.useState('');
    
    const handleChangeMethoPay = (e) => {
        console.log(e)
        setSelectedValue(e.target.value);
    }

    // const controlProps = (item) => ({
    //     checked: selectedValue === item,
    //     onChange: handleChangeMethoPay,
    //     value: item,
    //     name: 'color-radio-button-demo',
    //     inputProps: { 'aria-label': item },
    // });

    return(
        <div>
            <div className="header">
            <GHeader/>
            </div>
            <Container>
                <Row>
                    <Col className = 'left-side' xs={6}>
                    <div className="payment-container">
                        <Container>
                            <Row>
                                <Col className="left-side">
                                    <Form>
                                        <Row className="form-label mb-3">
                                            <p>THÔNG TIN GIAO HÀNG</p>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <TextField
                                                    label="Họ tên"
                                                    id="outlined-basic"
                                                    name="name"
                                                    variant="outlined"
                                                    size="medium"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder='Nguyễn Văn A'
                                                    handleChange
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="formGridPassword">
                                            <TextField
                                                label="Số điện thoại"
                                                id="outlined-basic"
                                                name="phone"
                                                variant="outlined"
                                                size="medium"
                                                value={values.phone}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder='0999999999'
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <TextField
                                                label="Email"
                                                id="outlined-basic"
                                                name="email"
                                                variant="outlined"
                                                size="medium"
                                                value={values.email}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder='abc@gmail.com'
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <TextField
                                                label="Địa chỉ"
                                                id="outlined-basic"
                                                name="address"
                                                variant="outlined"
                                                size="medium"
                                                value={values.address}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder='43 QL91 (Số nhà)'
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridState">
                                            <TextField
                                                fullWidth
                                                label="Tỉnh/TP"
                                                name="province"
                                                required
                                                size='medium'
                                                variant="outlined"
                                                select
                                                value={provinceSelect}
                                                onChange={handleChangeProvince}
                                                defaultValue={"0"}
                                                SelectProps={{ native: true }}
                                            >
                                                <option value="0">
                                                    --Chọn Tỉnh/TP--
                                                </option>
                                                {provinces.map((province, index) => (
                                                    <option key={index} value={province.code}>
                                                        {province.name}
                                                    </option>
                                                ))}

                                            </TextField>
                                        </Form.Group>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridState">
                                            <TextField
                                                fullWidth
                                                label="Quận/Huyện"
                                                name="district"
                                                required
                                                size='medium'
                                                variant="outlined"
                                                select
                                                value={districtSelect}
                                                ref={districtRef}
                                                onChange={handleChangeDistrict}
                                                SelectProps={{ native: true }}
                                            >
                                                <option value="0">
                                                    --Chọn Quận/Huyện--
                                                </option>
                                                {districts.map((district, index) => (
                                                    <option key={index} value={district.code}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </TextField>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridState">
                                            <TextField
                                                fullWidth
                                                label="Xã/Phường"
                                                name="commune"
                                                required
                                                size='medium'
                                                variant="outlined"
                                                select
                                                value={communeSelect}
                                                onChange={handleChangeCommune}
                                                ref={communeRef}
                                                SelectProps={{ native: true }}
                                            >
                                                <option value="0">
                                                    --Chọn Xã/Phường--
                                                </option>
                                                {communes.map((commune, index) => (
                                                    <option key={index} value={commune.code}>
                                                        {commune.name}
                                                    </option>
                                                ))}
                                            </TextField>
                                            </Form.Group>
                                        </Row>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div >
                        <Container className="delivery">
                            <Col classname = 'left-side'>
                            <Form>
                                <Row className="form-label mb-1">
                                    <p>PHƯƠNG THỨC GIAO HÀNG</p>
                                </Row>
                                <Form.Check 
                                    type= 'checkbox'
                                    id= 'default-checkbox'
                                    label = 'Tốc độ tiêu chuẩn (từ 2-5 ngày làm việc)'
                                />
                                
                            </Form>
                            </Col>
                            <Col classname = 'right-side'>
                                
                            </Col>
                        </Container>
                    </div>
                    <div>
                        <Container className="payment-method">
                            <Col classname = 'left-side'>
                            <Form>
                                <Row className="form-label mb-1">
                                    <p>PHƯƠNG THỨC THANH TOÁN</p>
                                </Row>
                                
                                {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                    label="Thanh toán trực tiếp khi nhận hàng"
                                    name="group1"
                                    value = "paypal"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    className = 'mb-2'
                                    onChange={handleChangeMethoPay}
                                    />
                                    <Form.Check
                                    label="Thanh toán bằng thẻ quốc tế hoặc nội địa (ATM)"
                                    name="group1"
                                    value="paypal"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    className = 'mb-2'
                                    onChange={handleChangeMethoPay}
                                    />
                                    <Form.Check
                                    label="Thanh toán bằng ví Momo"
                                    name="group1"
                                    value="momo"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    className = 'mb-2'
                                    onChange={handleChangeMethoPay}
                                    />
                                </div>
                                ))}
                                
                            </Form>
                            </Col>
                            <Col classname = 'right-side'>
                                
                            </Col>
                        </Container>
                    </div>
                    </Col>
                    <Col xs={1}></Col>
                    <Col className = 'right-side' xs={5}>
                        <Bill method={selectedValue} values = {values}/>
                    </Col>
                </Row>
                
            </Container>
            
            

        </div>
    )
}