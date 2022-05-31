import {Navbar, Container, Nav,Form, FormControl, Button} from 'react-bootstrap'
import {BsGiftFill, BsSearch, BsCartFill} from 'react-icons/bs';
import {FaSignInAlt} from 'react-icons/fa'
import '../asset/css/header.css'

function GNavbar(){
    return(
        <Navbar expand="lg" className='nav-header'>
            <Container fluid className='con-nav'>
                <Navbar.Brand href="#"> 
                {/* <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '} */}
                    <BsGiftFill/>
                    Gift Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                </Nav>
                <Form className="d-flex right-nav">
                    <FormControl
                    type="search"
                    placeholder="Ban muon tim gi"
                    className="me-2 nav-search"
                    aria-label="Search"
                    />
                    <Button variant=""><BsSearch/></Button>
                    <Button variant=""><BsCartFill/> Giỏ hàng</Button>
                    <Button variant="" ><FaSignInAlt/> Đăng nhập</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default function GHeader(){
    return(
        <div className='header'>
            <GNavbar/>
        </div>
    )
}