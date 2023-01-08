import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { isLogout } from "../../redux/apiRequest";

function Menu() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.info);
    const serverUrl = process.env.REACT_APP_SERVER_ADMIN_URL || '';
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar expand="md" fixed="top" color="light" className="z-index-2" >
            <Link to="/" className="text-decoration-none">
                <NavbarBrand className="text-darkYellow">
                    <img
                        alt="logo"
                        src='/images/logo.jpg'
                        style={{
                            height: 60,
                            width: 70,
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
                </Nav>
                <NavbarText>
                    {userState === "" ? (
                        <Link to="/Login">
                            <Button className="btn btn-lg rounded-5 btn-darkYellow fw-semibold">
                                ĐÓNG GÓP NGAY
                            </Button>
                        </Link>
                    ) : (
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                <img
                                    src={userState.images ? process.env.REACT_APP_SERVER_URL + userState.image : "/images/default-user.png"}
                                    alt="mdo"
                                    width="32"
                                    height="32"
                                    className="rounded-circle"
                                />
                            </DropdownToggle>
                            <DropdownMenu>
                                <a href={userState.status === 3 ? serverUrl+"/dashboard" : "/dashboard"} className="text-decoration-none"><DropdownItem>{userState.status === 3 ? "Dashboard" : "Tài khoản"}</DropdownItem></a>
                                <a href={userState.status === 3 ? serverUrl+"/history" : "/history"} className="text-decoration-none"><DropdownItem>Lịch sử</DropdownItem></a>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => isLogout(dispatch)}>Đăng xuất</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )}
                </NavbarText>
            </Collapse>
        </Navbar>
    );
}

export default Menu;