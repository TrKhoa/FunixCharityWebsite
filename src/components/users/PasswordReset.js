import { useFormik } from "formik";
import { useLocation } from "react-router-dom"
import {
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Form,
    Button,
} from "reactstrap";
import {
    postPasswordReset,
} from "../../redux/apiRequest";

export default function PasswordReset() {
    //Khai báo biến
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('username');
    const token = new URLSearchParams(search).get('token');
    //Kiểm tra dữ liệu nhập
    const validate = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = "Thiếu thông tin!";
        } else if (values.password.length < 8) {
            errors.password = "Cần tối thiểu 8 ký tự!";
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm = "Thiếu thông tin!";
        } else if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = "Passwords không giống nhau";
        }
        return errors;
    };
    //Gửi action
    const formik = useFormik({
        initialValues: {
            username: username,
            token: token,
            password: "",
            passwordConfirm: "",
        },
        validate,
        onSubmit: (values) => {
            postPasswordReset(formik.values);
        },
    });

    //Trả về
    return (
        <Form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={formik.handleSubmit}
        >
            <h2 className="text-center">Thay đổi mật khẩu</h2>
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
                <FormFeedback invalid>{formik.errors.password}</FormFeedback>
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
            <br />
            <Button
                disabled={
                    formik.errors.password || formik.errors.passwordConfirm
                        ? true
                        : false
                }
                type="submit"
                className="w-100 btn btn-lg btn-darkYellow"
            >
                Xác nhận
            </Button>
        </Form>
    );
}
