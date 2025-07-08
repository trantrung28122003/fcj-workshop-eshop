import React, { useState } from "react";
import AuthenticationShared from "./Shared/AuthenticationShared";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import type {
  APISignInRequest,
  SignInRequest,
} from "../../../model/Authentication";
import { Field, Form, Formik } from "formik";
import { HTTP_OK } from "../../../constants/HTTPCode";
import DataLoader from "../../../components/lazyLoadComponent/DataLoader";
import styles from "./Shared/AuthenticationShared.module.css";
import { Link } from "react-router-dom";
import { signUp } from "../../../services/CognitoService";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    localStorage.clear();
    navigate("/login");
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Địa chỉ email phải hợp lệ")
      .required("Địa chỉ email là bắt buộc"),
    userName: yup
      .string()
      .required("Tên tài khoản là bắt buộc")
      .max(50, "Tên tài khoản không được vượt quá 50 ký tự"),
    fullName: yup
      .string()
      .required("Họ và tên là bắt buộc")
      .max(50, "Họ và tên không được vượt quá 50 ký tự"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
    termAndConditions: yup
      .boolean()
      .oneOf([true], "Bạn phải chấp nhận các điều khoản và điều kiện"),
  });

  const doSignUp = (account: APISignInRequest) => {
    const request: APISignInRequest = {
      email: account.email,
      userName: account.userName,
      fullName: account.fullName,
      password: account.password,
    };

    setIsLoading(true);
    signUp(request)
      .then((response) => {
        if (response.status === HTTP_OK) {
          // Chuyển hướng đến trang xác thực email thay vì hiển thị thông báo thành công
          navigate("/email-verification", {
            state: {
              email: account.email,
              userName: account.userName,
            },
          });
        }
      })
      .catch((error) => {
        const errorType = error?.response?.data?.__type;

        if (errorType === "UsernameExistsException") {
          setRegisterError("Email đã được sử dụng. Vui lòng chọn email khác.");
        } else if (errorType === "InvalidPasswordException") {
          setRegisterError(
            "Mật khẩu phải chứa chữ thường, chữ in hoa, chữ số và ký tự đặc biệt."
          );
        } else {
          setRegisterError("Đăng ký thất bại. Vui lòng thử lại sau.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <AuthenticationShared
        title="Tạo tài khoản mới "
        subtitle="Đăng ký để bắt đầu chia sẻ những bài viết của bạn"
      >
        <DataLoader isLoading={isLoading} />

        <Formik
          initialValues={{
            email: "",
            userName: "",
            fullName: "",
            imageName: "",
            password: "",
            confirmPassword: "",
            termAndConditions: false,
          }}
          validationSchema={schema}
          onSubmit={(values: SignInRequest) => {
            if (!values.termAndConditions) {
              setRegisterError(
                "Bạn phải chấp nhận các điều khoản và điều kiện"
              );
              return;
            }
            const requestPayload: APISignInRequest = {
              email: values.email,
              userName: values.userName,
              fullName: values.fullName,
              password: values.password,
            };
            setRegisterError(null);
            doSignUp(requestPayload);
          }}
          validateOnChange
        >
          {({ touched, errors, handleChange }) => (
            <Form className={styles.auth_form}>
              {(registerError ||
                (errors.termAndConditions && touched.termAndConditions)) && (
                <div className={styles.form_error_message}>
                  {registerError || errors.termAndConditions}
                </div>
              )}

              <div className={styles.form_group}>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={styles.form_control}
                  placeholder="Nhập họ và tên"
                  autoComplete="name"
                />
                <label htmlFor="fullName" className={styles.form_label}>
                  Họ và tên
                </label>
                {errors.fullName && touched.fullName && (
                  <div className={styles.error_message}>{errors.fullName}</div>
                )}
              </div>

              <div className={styles.form_group}>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  className={styles.form_control}
                  placeholder="Nhập tên tài khoản"
                  autoComplete="name"
                />
                <label htmlFor="userName" className={styles.form_label}>
                  Tên tài khoản
                </label>
                {errors.userName && touched.userName && (
                  <div className={styles.error_message}>{errors.userName}</div>
                )}
              </div>

              <div className={styles.form_group}>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={styles.form_control}
                  placeholder="Nhập email"
                  autoComplete="email"
                />
                <label htmlFor="email" className={styles.form_label}>
                  Email
                </label>
                {errors.email && touched.email && (
                  <div className={styles.error_message}>{errors.email}</div>
                )}
              </div>

              <div className={styles.form_group}>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={styles.form_control}
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                />
                <label htmlFor="password" className={styles.form_label}>
                  Mật khẩu
                </label>
                {errors.password && touched.password && (
                  <div className={styles.error_message}>{errors.password}</div>
                )}
              </div>

              <div className={styles.form_group}>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.form_control}
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                />
                <label htmlFor="confirmPassword" className={styles.form_label}>
                  Xác nhận mật khẩu
                </label>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className={styles.error_message}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* <div className={styles.form_group}>
                <input
                  type="file"
                  id="imageName"
                  className={styles.form_control}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.currentTarget.files) {
                      setFieldValue(
                        "imageName",
                        event.currentTarget.files[0].name
                      );
                      setFieldValue("file", event.currentTarget.files[0]);
                    }
                  }}
                />
                <label htmlFor="imageName" className={styles.form_label}>
                  Ảnh đại diện
                </label>
                {errors.imageName && touched.imageName && (
                  <div className={styles.error_message}>{errors.imageName}</div>
                )}
              </div> */}

              <div className={styles.form_group}>
                <label className={styles.checkbox_label}>
                  <input
                    type="checkbox"
                    id="termAndConditions"
                    name="termAndConditions"
                    onChange={handleChange}
                  />{" "}
                  Tôi đồng ý với{" "}
                  <a href="#" className={styles.auth_link}>
                    Chính sách bảo mật & Các điều khoản
                  </a>
                </label>
              </div>

              <div className={styles.form_group}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btn_primary}`}
                >
                  Đăng ký
                </button>
              </div>

              <div
                className={styles.form_group}
                style={{ textAlign: "center" }}
              >
                <p>
                  Đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className={styles.auth_link}
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </AuthenticationShared>
    </>
  );
};

export default Register;
