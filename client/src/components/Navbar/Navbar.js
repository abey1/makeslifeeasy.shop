import "./Navbar.scss";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGOUT } from "../../utilities/constants";
const Navbar = () => {
  const { email, userDispatch } = useUserContext();
  const handleLogout = () => {
    userDispatch({ type: LOGOUT });
  };
  return (
    <div className="nav">
      <Link className="logo" to="/">
        MLE
      </Link>
      <div className="nav_center">
        <div className="search_input_container">
          <div className="magnifying_glass_holder">
            <i className="fa-solid fa-magnifying-glass magnifying_glass"></i>
          </div>
          <input className="search" type="text" />
        </div>
      </div>
      <div className="nav_right">
        <div className="nav_right_left">
          {email === "" ? (
            <div className="loggedInUser">
              <div className="navlink">
                <Link className="login" to="/login">
                  login
                </Link>
              </div>
              <div className="navlink">
                <Link className="signup" to="signup">
                  signup
                </Link>
              </div>
            </div>
          ) : (
            <div className="nav_email_holder">
              <div className="email">{email}</div>
              <div className="logout" onClick={handleLogout}>
                Logout
              </div>
              <Link className="favorites_heart" to="/favorites">
                <i className="fa-solid fa-heart"></i>
              </Link>
            </div>
          )}
        </div>

        <div className="ellipsis_holder">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className="side_menu">
        <div className="side_menu_close_holder">
          <i class="fa-solid fa-xmark cross"></i>
        </div>
        <div className="side_menu_email_holder">
          <div className="side_menu_email">{email}</div>
        </div>
        <div className="side_menu_button">
          <i class="fa-solid fa-heart side_menu_icon"></i>
          <div className="side_menu_label">Favorite</div>
        </div>
        <div className="side_menu_button side_menu_logout">
          <i class="fa-solid fa-arrow-right-from-bracket side_menu_icon"></i>
          <div className="side_menu_label">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
