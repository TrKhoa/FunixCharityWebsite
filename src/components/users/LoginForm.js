import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Form,
    Button,
} from "reactstrap";
import { postRegister, postLogin, postPasswordForgot, resetError } from "../../redux/apiRequest";

export default function LoginForm(type) {
    const errMessage = useSelector((state) => state.user.error);
    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = "Thiếu thông tin!";
        } else if (values.username.length < 4) {
            errors.username = "Cần tối thiểu 4 ký tự!";
        }

        if(!isForgot)
        {
            if (!values.password) {
                errors.password = "Thiếu thông tin!";
            } else if (values.password.length < 8) {
                errors.password = "Cần tối thiểu 8 ký tự!";
            }
            if (isRegister) {
                if (!values.name) {
                    errors.name = "Thiếu thông tin!";
                } else if (values.name.length < 4) {
                    errors.name = "Cần tối thiểu 4 ký tự!";
                }
    
                if (!values.passwordConfirm) {
                    errors.passwordConfirm = "Thiếu thông tin!";
                } else if (values.password !== values.passwordConfirm) {
                    errors.passwordConfirm = "Passwords không giống nhau";
                }

                if (!values.phone) {
                    errors.phone = "Thiếu thông tin!";
                }
    
                if (!values.email) {
                    errors.email = "Thiếu thông tin!";
                }

                
            }
        }
        

        return errors;
    };
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            passwordConfirm: "",
        },
        validate,
        onSubmit: (values) => {
            if(isForgot){
                postPasswordForgot(values)
            } else {
                if (isRegister) {
                    postRegister(dispatch, formik.values);
                    if (!errMessage) {
                        setIsRegister(!isRegister);
                        formik.resetForm({
                            values: {
                                username: formik.values.username,
                                password: "",
                            },
                        });
                    }
                } else {
                    postLogin(dispatch, formik.values);
                }
            }
            
        },
    });
    const [isRegister, setIsRegister] = useState(type.isRegister);
    const [isForgot, setPasswordForgot] = useState(false);

    useEffect(() => {
        resetError(dispatch);
    }, [isRegister]);

    if (isForgot) {
        return (
            <Form
                className="p-4 p-md-5 border rounded-3 bg-light"
                onSubmit={formik.handleSubmit}
            >
                <h2 className="text-center">Quên mật khẩu</h2>
                <FormGroup floating>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Tài khoản"
                        type="text"
                        required
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        invalid={formik.errors.username ? true : false}
                    />
                    <FormFeedback invalid>
                        {formik.errors.username}
                    </FormFeedback>
                    <Label for="user">Tài khoản</Label>
                </FormGroup>
                <br />
                <Button
                    type="submit"
                    className="w-100 btn btn-lg btn-darkYellow"
                >
                    Xác nhận
                </Button>
            </Form>
        );
    } else {
        if (isRegister) {
            return (
                <Form
                    className="p-4 p-md-5 border rounded-3 bg-light"
                    onSubmit={formik.handleSubmit}
                >
                    <h2 className="text-center">Đăng ký</h2>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Tên"
                            type="text"
                            required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            invalid={formik.errors.name ? true : false}
                        />
                        <FormFeedback invalid>{formik.errors.name}</FormFeedback>
                        <Label for="name">Tên</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Tài khoản"
                            type="text"
                            required
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            invalid={formik.errors.username ? true : false}
                        />
                        <FormFeedback invalid>
                            {formik.errors.username}
                        </FormFeedback>
                        <Label for="username">Tài khoản</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Mật khẩu"
                            type="password"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            invalid={formik.errors.password ? true : false}
                        />
                        <FormFeedback invalid>
                            {formik.errors.password}
                        </FormFeedback>
                        <Label for="password">Mật khẩu</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            required
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            invalid={formik.errors.passwordConfirm ? true : false}
                        />
                        <FormFeedback invalid>
                            {formik.errors.passwordConfirm}
                        </FormFeedback>
                        <Label for="passwordConfirm">Nhập lại mật khẩu</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            invalid={formik.errors.email ? true : false}
                        />
                        <FormFeedback invalid>{formik.errors.email}</FormFeedback>
                        <Label for="email">Email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="phone"
                            type="number"
                            required
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            invalid={formik.errors.phone ? true : false}
                        />
                        <FormFeedback invalid>{formik.errors.phone}</FormFeedback>
                        <Label for="phone">Số điện thoại</Label>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <div
                            className="hover-darkYellow c-pointer col-xxl-4"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                formik.resetForm({
                                    values: {
                                        username: formik.values.username,
                                        password: formik.values.password,
                                    },
                                });
                            }}
                        >
                            Đã có tài khoản?
                        </div>
                    </div>
                    <br />
                    <Button
                        disabled={!formik.isValid}
                        type="submit"
                        className="w-100 btn btn-lg btn-darkYellow"
                    >
                        Đăng ký
                    </Button>
                </Form>
            );
        } else {
            return (
                <Form
                    className="p-4 p-md-5 border rounded-3 bg-light"
                    onSubmit={formik.handleSubmit}
                >
                    <h2 className="text-center">Đăng Nhập</h2>
                    <FormGroup floating>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Tài khoản"
                            type="text"
                            required
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            invalid={formik.errors.username ? true : false}
                        />
                        <FormFeedback invalid>
                            {formik.errors.username}
                        </FormFeedback>
                        <Label for="user">Tài khoản</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Mật khẩu"
                            type="password"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            invalid={formik.errors.password ? true : false}
                        />
                        <FormFeedback invalid>
                            {formik.errors.password}
                        </FormFeedback>
                        <Label for="password">Mật khẩu</Label>
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <div
                            className="hover-darkYellow c-pointer col-xxl-4"
                            onClick={() => {
                                setPasswordForgot(!isForgot);
                            }}
                        >
                            Quên mật khẩu?
                        </div>
                        <div
                            className="hover-darkYellow c-pointer col-xxl-4 justify-self-end"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                formik.resetForm({
                                    values: {
                                        username: formik.values.username,
                                        password: formik.values.password,
                                    },
                                });
                            }}
                        >
                            Chưa có tài khoản?
                        </div>
                    </div>
                    <br />
                    <Button
                        disabled={
                            formik.errors.username || formik.errors.password
                                ? true
                                : false
                        }
                        type="submit"
                        className="w-100 btn btn-lg btn-darkYellow"
                    >
                        Đăng nhập
                    </Button>
                </Form>
            );
        }
    }
}
