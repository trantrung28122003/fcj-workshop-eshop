import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationShared from "./Shared/AuthenticationShared";
import styles from "./Shared/AuthenticationShared.module.css";
import { HTTP_OK } from "../../../constants/HTTPCode";
import type { LoginRequest } from "../../../model/Authentication";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import DataLoader from "../../../components/lazyLoadComponent/DataLoader";
import { signIn } from "../../../services/CognitoService";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    userName: yup
      .string()
      .required("Tên tài khảon không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
  });
  const doLogin = (user: LoginRequest) => {
    signIn(user)
          .then((response) => {
            if (response.status === HTTP_OK) {
              localStorage.setItem("authentication", JSON.stringify(response.data.AuthenticationResult));
              const decodedToken: any = jwtDecode(response.data.AuthenticationResult.IdToken);
              const groups: string[] = decodedToken["cognito:groups"] || [];
              if (groups.includes("admin")) {
                navigate("/admin", { replace: true });
              } else {
                navigate("/", { replace: true });
              }
            }
          })
      .catch((error) => {
      const errorType = error?.response?.data?.__type;
        if (errorType === "UserNotConfirmedException") {
            localStorage.setItem("lastSignUpUsername", user.userName);
            localStorage.setItem("isLogin", "true");
            navigate("/email-verification");
        } else {
          setLoginError("Đăng nhập thất bại. Vui lòng thử lại sau.");
        }
        setIsLoading(false);
      });
  };

  const handleRegister = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <AuthenticationShared>
  
      <DataLoader isLoading={isLoading} />
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values: LoginRequest) => {
          console.log("Form submitted with values:", values);
          setLoginError(null);
          doLogin(values);
        }}
        validateOnChange
      >
        {({ touched, errors, handleSubmit }) => (
          <Form className={styles.auth_form} onSubmit={handleSubmit}>
            {loginError && (
              <div className={styles.form_error_message}>{loginError}</div>
            )}
            <div className={styles.form_group}>
              <Field
                type="userName"
                id="userName"
                name="userName"
                className={styles.form_control}
                placeholder="Nhập tên tài khoản của bạn"
                autoComplete="userName"
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
                type="password"
                id="password"
                name="password"
                className={styles.form_control}
                placeholder="Nhập mật khẩu của bạn"
                autoComplete="current-password"
              />
              <label htmlFor="password" className={styles.form_label}>
                Mật khẩu
              </label>
              {errors.password && touched.password && (
                <div className={styles.error_message}>{errors.password}</div>
              )}
            </div>

            <div className={styles.form_group}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btn_primary}`}
              >
                Đăng nhập
              </button>
            </div>

            <div className={styles.form_group}>
              <a
              >
                Bạn quên mật khẩu? Quên ráng chịuu!!!
              </a>
            </div>

            <div className={styles.divider}>
              <span>hoặc</span>
            </div>

            <div className={styles.social_buttons}>
              
        
            </div>

            <div className={styles.form_group} style={{ textAlign: "center" }}>
              <p>
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className={styles.auth_link}
                  onClick={handleRegister}
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AuthenticationShared>
  );
};

export default Login;
