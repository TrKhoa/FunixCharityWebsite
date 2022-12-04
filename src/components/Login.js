import React, { useState } from "react";
import {
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Form,
    Button,
} from "reactstrap";

const LoginForm = (type) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isRegister, setIsRegister] = useState(type.isRegister);
    const [error, setError] = useState("");
    if(isRegister){
        return (
            <Form className="p-4 p-md-5 border rounded-3 bg-light">
                <h2 className="text-center">Đăng ký</h2>
                <FormGroup floating>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Tên"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormFeedback valid>
                        Sweet! that name is available
                    </FormFeedback>
                    <Label for="name">Tên</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="user"
                        name="user"
                        placeholder="Tài khoản"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormFeedback valid>
                        Sweet! that name is available
                    </FormFeedback>
                    <Label for="user">Tài khoản</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormFeedback invalid>Sai</FormFeedback>
                    <Label for="password">Mật khẩu</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="rePassword"
                        name="rePassword"
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <FormFeedback invalid>Sai</FormFeedback>
                    <Label for="rePassword">Nhập lại mật khẩu</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormFeedback valid>
                        Sweet! that name is available
                    </FormFeedback>
                    <Label for="email">Email</Label>
                </FormGroup>
    
                <div className="d-flex justify-content-end">
                    <div
                        className="hover-darkYellow c-pointer col-xxl-4"
                        onClick={()=> setIsRegister(!isRegister)}
                    >
                        Đã có tài khoản?
                    </div>
                </div>
                <br />
                <Button className="w-100 btn btn-lg btn-darkYellow">
                    Đăng ký
                </Button>
            </Form>
        );
    } else {
        return (
            <Form className="p-4 p-md-5 border rounded-3 bg-light">
                <h2 className="text-center">Đăng Nhập</h2>
                <FormGroup floating>
                    <Input
                        id="user"
                        name="user"
                        placeholder="Tài khoản"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormFeedback valid>
                        Sweet! that name is available
                    </FormFeedback>
                    <Label for="user">Tài khoản</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormFeedback invalid>Sai</FormFeedback>
                    <Label for="password">Mật khẩu</Label>
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <div
                        className="hover-darkYellow c-pointer col-xxl-4"
                        onClick={()=> setIsRegister(!isRegister)}
                    >
                        Chưa có tài khoản?
                    </div>
                </div>
                <br />
                <Button className="w-100 btn btn-lg btn-darkYellow">
                    Đăng nhập
                </Button>
            </Form>
        );
    }
};

export default function Login(value) {
    return (
        <div className="container-fluid col-xl-12 col-xxl-12 pt-5">
            <div className="row position-relative align-items-center justify-content-center g-lg-5 py-5">
                <div className="col-lg-12">
                    <img
                        className="w-100"
                        src="/image/login/closeup-diverse-people-joining-their-hands.jpg"
                        alt="1"
                    />
                </div>
                <div className="position-absolute col-md-10 align-middle col-lg-5">
                    <LoginForm isRegister={false}/>
                </div>
            </div>
        </div>
    );
}
