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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar expand="md" fixed="top" color="light" className="z-index-2">
            <Link to="/" className="text-decoration-none">
                <NavbarBrand className="text-darkYellow">
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
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            <NavLink>Trang chủ</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/Cause" className="nav-link">
                            <NavLink>Các hoàn cảnh cần quyên góp</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link nav-link-active">
                            <NavLink>Về chúng tôi</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            <NavLink>Blog</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            <NavLink>Liên hệ</NavLink>
                        </Link>
                    </NavItem>
                </Nav>
                <NavbarText>
                    <Link to="/Login">
                        <Button className="btn btn-lg rounded-5 btn-darkYellow fw-semibold">
                            ĐÓNG GÓP NGAY
                        </Button>
                    </Link>
                    <UncontrolledDropdown className="d-none">
                        <DropdownToggle nav caret>
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Option 1</DropdownItem>
                            <DropdownItem>Option 2</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Reset</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </NavbarText>
            </Collapse>
        </Navbar>
    );
}

export default Menu;
