import React, { useState } from "react";
import { useDispatch } from "react-redux";
import sha256 from "sha256";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Form,
} from "reactstrap";
import { useFormik } from "formik";
import {
    postChangePassword,
    postUserProfileUpdate,
} from "../../redux/apiRequest";

import axios from "axios";
export default function UserProfile(args) {
    const userProfile = args.userProfile;
    const [image, setImage] = useState("");
    const [modalPassword, setModalPassword] = useState(false);
    const togglePassword = () => setModalPassword(!modalPassword);
    const [modalProfile, setModalProfile] = useState(false);
    const toggleProfile = () => setModalProfile(!modalProfile);
    const validate = (values) => {
        const errors = {};

        if (modalPassword) {
            if (!values.password) {
                errors.password = "Thiếu thông tin!";
            } else if (values.password.length < 8) {
                errors.password = "Cần tối thiểu 8 ký tự!";
            } else if (sha256(values.password) !== userProfile.password) {
                errors.password = "Sai mật khẩu";
            }

            if (!values.password) {
                errors.password = "Thiếu thông tin!";
            } else if (values.password.length < 8) {
                errors.password = "Cần tối thiểu 8 ký tự!";
            }

            if (!values.newPassword) {
                errors.newPassword = "Thiếu thông tin!";
            } else if (values.newPassword.length < 8) {
                errors.newPassword = "Cần tối thiểu 8 ký tự!";
            }

            if (!values.passwordConfirm) {
                errors.passwordConfirm = "Thiếu thông tin!";
            } else if (values.passwordConfirm !== values.newPassword) {
                errors.passwordConfirm = "2 mật khẩu không giống nhau";
            }
        } else if (modalProfile) {
            if (!values.name) {
                errors.name = "Thiếu thông tin!";
            } else if (values.name.length < 8) {
                errors.name = "Cần tối thiểu 8 ký tự!";
            }

            if (!values.phone) {
                errors.phone = "Thiếu thông tin!";
            } else if (values.phone.length < 10) {
                errors.phone = "Cần tối thiểu 10 số!";
            }

            if (!values.email) {
                errors.email = "Thiếu thông tin!";
            }
        }

        return errors;
    };
    const dispatch = useDispatch();
    //Khởi tạo dữ liệu ban đầu và gửi action
    const formik = useFormik({
        initialValues: {
            username: userProfile.username,
            name: userProfile.name,
            phone: userProfile.phone,
            email: userProfile.email,
            password: "",
            newPassword: "",
            passwordConfirm: "",
        },
        validate,
        onSubmit: (values) => {
            if (modalPassword) {
                if (
                    values.password !== "" &&
                    values.newPassword !== "" &&
                    values.passwordConfirm !== ""
                ) {
                    postChangePassword(dispatch, values);
                    togglePassword();
                }
            } else if (modalProfile) {
                if (
                    values.name !== "" &&
                    values.email !== "" &&
                    values.phone !== ""
                ) {
                    if (image) {
                        const formData = new FormData();
                        formData.append("image", image);
                        formData.append("imageName", image.name);
                        formData.append("username", values.username);
                        formData.append("name", values.name);
                        formData.append("email", values.email);
                        formData.append("phone", values.phone);
                            postUserProfileUpdate(dispatch, formData);
                    } else {
                        postUserProfileUpdate(dispatch, values);
                    }
                    toggleProfile();
                }
            }
        },
    });

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <>
            <center class="rounded-circle mb-3 ">
            <img
                    style={{width: 300}}
                    src={
                        userProfile.image
                            ? process.env.REACT_APP_SERVER_URL +
                              userProfile.image
                            : "/images/default-user.png"
                    }
                    alt={userProfile.name}
                />
                <h3>
                    {userProfile.name}
                </h3>
            </center>
            <Table className="">
                <tbody>
                    <tr>
                        <th scope="row">Email</th>
                        <td>:</td>
                        <td>{userProfile.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số điện thoại</th>
                        <td>:</td>
                        <td>{userProfile.phone}</td>
                    </tr>
                    <tr>
                        <th scope="row">Mật khẩu</th>
                        <td>:</td>
                        <td>
                            <Button color="warning" onClick={togglePassword}>
                                Thay đổi mật khẩu
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Chức năng</th>
                        <td>:</td>
                        <td>
                            <Button color="warning" onClick={toggleProfile}>
                                Cập nhật thông tin
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal
                isOpen={modalPassword}
                toggle={togglePassword}
                style={{ marginTop: 100 }}
            >
                <ModalHeader toggle={togglePassword}>
                    Thay đổi mật khẩu
                </ModalHeader>
                <ModalBody>
                    <Form
                        className="p-4 p-md-5 border rounded-3 bg-light"
                        onSubmit={formik.handleSubmit}
                    >
                        <FormGroup floating>
                            <Input
                                id="password"
                                name="password"
                                placeholder="d"
                                type="password"
                                required
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                invalid={formik.errors.password ? true : false}
                            />
                            <FormFeedback invalid>
                                {formik.errors.password}
                            </FormFeedback>
                            <Label for="password">Mật khẩu cũ</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                placeholder="d"
                                type="password"
                                required
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.newPassword ? true : false
                                }
                            />
                            <FormFeedback invalid>
                                {formik.errors.newPassword}
                            </FormFeedback>
                            <Label for="newPassword">Mật khẩu mới</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder="d"
                                type="password"
                                required
                                value={formik.values.passwordConfirm}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.passwordConfirm ? true : false
                                }
                            />
                            <FormFeedback invalid>
                                {formik.errors.passwordConfirm}
                            </FormFeedback>
                            <Label for="passwordConfirm">
                                Nhập lại mật khẩu
                            </Label>
                        </FormGroup>
                        <ModalFooter>
                            <Button
                                color="primary"
                                disabled={
                                    formik.errors.password ||
                                    formik.errors.newPassword ||
                                    formik.errors.passwordConfirm
                                        ? true
                                        : false
                                }
                                type="submit"
                            >
                                Thay đổi
                            </Button>
                            <Button color="secondary" onClick={togglePassword}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal
                isOpen={modalProfile}
                toggle={toggleProfile}
                style={{ marginTop: 100 }}
            >
                <ModalHeader toggle={toggleProfile}>
                    Cập nhât thông tin
                </ModalHeader>
                <ModalBody>
                    <Form
                        className="p-4 p-md-5 border rounded-3 bg-light"
                        onSubmit={formik.handleSubmit}
                    >
                        <FormGroup floating>
                            <Input
                                id="name"
                                name="name"
                                placeholder="d"
                                type="text"
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                invalid={formik.errors.name ? true : false}
                            />
                            <FormFeedback invalid>
                                {formik.errors.name}
                            </FormFeedback>
                            <Label for="name">Tên:</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="d"
                                type="number"
                                required
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                invalid={formik.errors.phone ? true : false}
                            />
                            <FormFeedback invalid>
                                {formik.errors.phone}
                            </FormFeedback>
                            <Label for="phone">Số điện thoại:</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="email"
                                name="email"
                                placeholder="d"
                                type="email"
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                invalid={formik.errors.email ? true : false}
                            />
                            <FormFeedback invalid>
                                {formik.errors.email}
                            </FormFeedback>
                            <Label for="email">Email:</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="file">Hình ảnh</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={handleImage}
                            />
                        </FormGroup>
                        <ModalFooter>
                            <Button
                                color="primary"
                                disabled={
                                    formik.errors.name ||
                                    formik.errors.phone ||
                                    formik.errors.email
                                        ? true
                                        : false
                                }
                                type="submit"
                            >
                                Cập nhật
                            </Button>
                            <Button color="secondary" onClick={toggleProfile}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}
