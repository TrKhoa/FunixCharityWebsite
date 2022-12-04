import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
            <Navbar expand="md" fixed="top" color="light" className="z-index-2">
                <NavbarBrand href="/" className="text-darkYellow">
                    <img
                        alt="logo"
                        src="/image/logo.jpg"
                        style={{
                            height: 60,
                            width: 80,
                        }}
                    />
                    VINADONATION
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem >
                            <Link to="/" className="nav-link">
                                <NavLink>Trang chủ</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem >
                            <Link to="/" className="nav-link">
                                <NavLink>Các hoàn cảnh cần quyên góp</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem >
                            <Link to="/" className="nav-link nav-link-active">
                                <NavLink>Về chúng tôi</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem >
                            <Link to="/" className="nav-link">
                                <NavLink>Blog</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem >
                            <Link to="/" className="nav-link">
                                <NavLink>Liên hệ</NavLink>
                            </Link>
                        </NavItem>
                    </Nav>
                    <NavbarText><Button className="btn btn-lg rounded-5 btn-darkYellow fw-semibold">ĐÓNG GÓP NGAY</Button></NavbarText>
                </Collapse>
            </Navbar>
    );
}

export default Menu;
