import React, { useEffect } from "react";
import "./Login.scss";
import loginImage from "../../assets/login_image.png";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { server_url, LOGIN } from "../../utilities/constants";
import { useUserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
import { SET_SEARCHING } from "../../utilities/constants";

const Login = () => {
  const { userDispatch } = useUserContext();
  const { globalDispatch } = useGlobalAppContext();
  useEffect(() => {
    globalDispatch({ type: SET_SEARCHING, payload: false });
  }, []);
  return (
    <div className="login_page">
      <div className="login_left">
        <div>
          <Formik
            initialValues={{ email: "", password: "", error: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              values.error = "";
              try {
                const result = await fetch(`${server_url}/user/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                  }),
                });
                const json = await result.json();
                console.log(json);
                if (result.ok) {
                  const { _id, email, token, favorite } = json;
                  userDispatch({
                    type: LOGIN,
                    payload: { _id, email, favorite },
                  });
                  localStorage.setItem("token", token);
                  console.log("logged in");
                } else {
                  values.error = json.error;
                }
              } catch (error) {
                values.error = error.message;
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="login_card">
                  <div className="login_card_title">login</div>
                  <div className="login_input_holder">
                    <div className="icon_holder">
                      <i class="fa-regular fa-envelope"></i>
                    </div>
                    <input
                      className="login_input"
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => (values.error = "")}
                      value={values.email}
                    />
                  </div>
                  <div className="login_error">
                    {errors.email && touched.email && errors.email}
                  </div>

                  <div className="login_input_holder">
                    <div className="icon_holder">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                    <input
                      className="login_input"
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => (values.error = "")}
                      value={values.password}
                    />
                  </div>
                  <div className="forget_password_holder">
                    <Link className="forgetpassword_link" to="/forgetpassword">
                      forgot password?
                    </Link>
                  </div>
                  <div className="signin_error_holder">{values.error}</div>

                  <div className="signin_btn_loader_holder">
                    {isSubmitting ? (
                      <div className="loader"></div>
                    ) : (
                      <button
                        className="signin_btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        sign in
                      </button>
                    )}
                  </div>

                  <div className="signup_in_login_holder">
                    Don't have an account?{" "}
                    <span className="signup_in_login">
                      <Link className="sign_up_link" to="/signup">
                        sign up
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      {/* <div className="login_right">
        <img src={loginImage} alt="login pic" />
      </div> */}
    </div>
  );
};

export default Login;
