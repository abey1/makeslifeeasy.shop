import React, { useEffect } from "react";
import { Formik } from "formik";
import "./Admin.scss";
import {
  SET_SEARCHING,
  ADMIN_MOUNTED,
  ADMIN_UNMOUNTED,
  server_url,
} from "../../utilities/constants";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
const Admin = () => {
  const { globalDispatch } = useGlobalAppContext();
  useEffect(() => {
    globalDispatch({ type: SET_SEARCHING, payload: false });
    globalDispatch({ type: ADMIN_MOUNTED });
    return () => {
      globalDispatch({ type: ADMIN_UNMOUNTED });
    };
  }, []);
  return (
    <div className="admin_holder">
      <Formik
        initialValues={{ title: "", item_url: "", image_url: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await fetch(`${server_url}/goods/insert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: values.title,
              item_url: values.item_url,
              image_url: values.image_url,
            }),
          });
          const json = await response.json();
          console.log(json);
          alert(JSON.stringify(json));
          values.title = "";
          values.item_url = "";
          values.image_url = "";
          setSubmitting(false);
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
          <form className="admin_form" onSubmit={handleSubmit}>
            <div className="input_holder">
              title :
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>
            <div className="input_holder">
              item url :
              <input
                type="text"
                name="item_url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.item_url}
              />
            </div>

            <div className="input_holder">
              image url :
              <input
                type="text"
                name="image_url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image_url}
              />
            </div>

            {isSubmitting ? (
              <div className="loader"></div>
            ) : (
              <button
                className="admin_submit_btn"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Admin;
