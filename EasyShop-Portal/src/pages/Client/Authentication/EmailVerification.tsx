import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { HTTP_OK } from "../../../constants/HTTPCode";
import DataLoader from "../../../components/lazyLoadComponent/DataLoader";
import styles from "./Shared/AuthenticationShared.module.css";
import {
  verifyEmailCode,
  resendVerificationCode,
} from "../../../services/EmailVerificationService";


const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const userName = localStorage.getItem("lastSignUpUsername") ?? "";

  useEffect(() => {
    if (!userName) {
      navigate("/register");
      return;
    }
    setCountdown(60);

    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      resendVerificationCode({ userName })
        .then((res) => {
          if (res.status === HTTP_OK) {
            setCountdown(60);
          }
        })
        .catch(() => {
          setVerificationError("Không thể gửi mã xác thực. Vui lòng thử lại.");
        })
        .finally(() => {
          localStorage.removeItem("isLogin");
        });
    } else {
      setCountdown(60);
    }
  }, [userName, navigate]);

  const isVerified = localStorage.getItem("isVerified");
  if (isVerified === "true") {
    navigate("/login");
    return;
  }



  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleLogin = () => {
    localStorage.clear();
    navigate("/login");
  };


  const handleResendCode = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setVerificationError(null);

    try {
      const response = await resendVerificationCode({ userName });
      if (response.status === HTTP_OK) {

        setCountdown(60);
      }
    } catch (error) {
      setVerificationError("Không thể gửi lại mã. Vui lòng thử lại sau.");
    } finally {
      setResendLoading(false);
    }
  };

  const schema = yup.object().shape({
    verificationCode: yup
      .string()
      .required("Mã xác thực là bắt buộc")
      .length(6, "Mã xác thực phải có 6 ký tự"),
  });

  const handleVerifyCode = async (code: string) => {
    setIsLoading(true);
    setVerificationError(null);
    debugger
    try {
      const response = await verifyEmailCode({ userName, code });
      
      if (response.status === HTTP_OK) {
        setVerificationSuccess(true);
        localStorage.removeItem("lastSignUpUsername");
        localStorage.removeItem("lastSignUpEmail");
        localStorage.setItem("isVerified", "true");
      }
    } catch (error: any) {
      const errorType = error?.response?.data?.__type;

      if (errorType === "CodeMismatchException") {
        setVerificationError("Mã xác thực không đúng. Vui lòng kiểm tra lại.");
      } else if (errorType === "ExpiredCodeException") {
        setVerificationError(
          "Mã xác thực đã hết hạn. Vui lòng gửi lại mã mới."
        );
      } else {
        setVerificationError("Xác thực thất bại. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {verificationSuccess && (
        <div className={styles.modal_overlay}>
          <div className={styles.success_modal}>
            <div className={styles.success_icon}>✅</div>
            <h3 className={styles.success_title}>Xác thực thành công!</h3>
            <p className={styles.success_message}>
              Email của bạn đã được xác thực thành công. Bây giờ bạn có thể đăng
              nhập!
            </p>
            <button
              onClick={handleLogin}
              className={`${styles.btn} ${styles.btn_primary}`}
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      )}

      <div className={styles.auth_container}>
        <div className={styles.auth_card}>
          <div className={styles.auth_header}>
            <h2 className={styles.auth_title}>Xác thực Email</h2>
            <p className={styles.auth_subtitle}>
              Chúng tôi đã gửi mã xác thực đến email của bạn
            </p>
          </div>

          <DataLoader isLoading={isLoading} />

          <Formik
            initialValues={{
              verificationCode: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              handleVerifyCode(values.verificationCode);
            }}
            validateOnChange
          >
            {({ touched, errors }) => (
              <Form className={styles.auth_form}>
                {verificationError && (
                  <div className={styles.form_error_message}>
                    {verificationError}
                  </div>
                )}

                <div className={styles.form_group}>
                  <Field
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    className={styles.form_control}
                    placeholder="Nhập mã xác thực 6 số"
                    maxLength={6}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="verificationCode"
                    className={styles.form_label}
                  >
                    Mã xác thực
                  </label>
                  {errors.verificationCode && touched.verificationCode && (
                    <div className={styles.error_message}>
                      {errors.verificationCode}
                    </div>
                  )}
                </div>

                <div className={styles.form_group}>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btn_primary}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xác thực..." : "Xác thực"}
                  </button>
                </div>

                <div
                  className={styles.form_group}
                  style={{ textAlign: "center" }}
                >
                  <p className={styles.auth_text}>
                    Không nhận được mã?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={countdown > 0 || resendLoading}
                      className={styles.auth_link}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: countdown > 0 ? "not-allowed" : "pointer",
                        color: countdown > 0 ? "#999" : "#007bff",
                        textDecoration: "underline",
                      }}
                    >
                      {resendLoading
                        ? "Đang gửi..."
                        : countdown > 0
                          ? `Gửi lại (${countdown}s)`
                          : "Gửi lại mã"}
                    </button>
                  </p>
                </div>

                <div
                  className={styles.form_group}
                  style={{ textAlign: "center" }}
                >
                  <p className={styles.auth_text}>
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={handleLogin}
                      className={styles.auth_link}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#007bff",
                        textDecoration: "underline",
                      }}
                    >
                      Đăng nhập
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
