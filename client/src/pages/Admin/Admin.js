import React, { useEffect } from "react";
import "./Admin.scss";
import { SET_SEARCHING } from "../../utilities/constants";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
const Admin = () => {
  const { globalDispatch } = useGlobalAppContext();
  useEffect(() => {
    globalDispatch({ type: SET_SEARCHING, payload: false });
  }, []);
  return <div className="admin_holder">admin</div>;
};

export default Admin;
