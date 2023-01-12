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
import { postChangePassword } from "../../redux/apiRequest";

export default function UserProfile(args) {
    const userProfile = args.userProfile;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const validate = (values) => {
        const errors = {};

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
        } else if (values.passwordConfirm != values.newPassword) {
            errors.passwordConfirm = "2 mật khẩu không giống nhau";
        }

        return errors;
    };
    const dispatch = useDispatch();
    //Khởi tạo dữ liệu ban đầu và gửi action
    const formik = useFormik({
        initialValues: {
            username: userProfile.username,
            password: "",
            newPassword: "",
            passwordConfirm: "",
        },
        validate,
        onSubmit: (values) => {
            if (
                values.password != "" &&
                values.newPassword != "" &&
                values.passwordConfirm != ""
            ) {
                postChangePassword(dispatch, values);
            }
        },
    });
    return (
        <>
            <center>
                <img
                    src={
                        userProfile.image
                            ? process.env.REACT_APP_SERVER_URL +
                              userProfile.image
                            : "/images/default-user.png"
                    }
                    alt={userProfile.name}
                />
                <h3>
                    {userProfile.name} <i class="fa-solid fa-pen-to-square"></i>
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
                            <Button color="warning" onClick={toggle}>
                                Thay đổi mật khẩu
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle} style={{ marginTop: 100 }}>
                <ModalHeader toggle={toggle}>Thay đổi mật khẩu</ModalHeader>
                <ModalBody>
                    <Form
                        className="p-4 p-md-5 border rounded-3 bg-light"
                        onSubmit={formik.handleSubmit}
                    >
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
                            <Label for="password">Mật khẩu cũ</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                placeholder="Mật khẩu"
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
                                placeholder="Mật khẩu"
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
                                onClick={toggle}
                            >
                                Thay đổi
                            </Button>{" "}
                            <Button color="secondary" onClick={toggle}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}
