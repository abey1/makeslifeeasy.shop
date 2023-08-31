import "./Navbar.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGOUT } from "../../utilities/constants";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
import {
  MENU_OPEN,
  MENU_CLOSE,
  SET_SEARCHING,
  SET_SEARCHED_ITEMS,
  FAVORITE_UNMOUNTED,
  ADMIN_UNMOUNTED,
} from "../../utilities/constants";
import mle_logo_pic from "../../assets/mle_logo.png";

const Navbar = () => {
  const {
    menu_is_open,
    home_page_mounted,
    all_items,
    isSearching,
    globalDispatch,
    admin_page_mounted,
    favorite_page_mounted,
  } = useGlobalAppContext();
  const { email, userDispatch } = useUserContext();
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    userDispatch({ type: LOGOUT });
  };

  const handleSearch = () => {
    const foundItems = all_items.filter((item, index) => {
      return item.title.toLowerCase().includes(searchTxt.toLowerCase());
    });
    globalDispatch({ type: SET_SEARCHING, payload: true });
    globalDispatch({ type: SET_SEARCHED_ITEMS, payload: foundItems });
  };
  return (
    <div className="nav_container">
      <div className="nav">
        {isSearching || admin_page_mounted || favorite_page_mounted ? (
          <i
            className="fa-solid fa-arrow-left nav-back"
            onClick={() => {
              setSearchTxt("");
              globalDispatch({ type: SET_SEARCHING, payload: false });
              navigate("/");
              console.log(
                "isSearching = ",
                isSearching,
                " admin = ",
                admin_page_mounted,
                " favorite = ",
                favorite_page_mounted
              );
            }}
          ></i>
        ) : (
          <Link className="logo" to="/">
            <i class="fa-solid fa-bag-shopping"></i>
          </Link>
        )}

        {home_page_mounted && (
          <div className="nav_center">
            <div className="search_input_container">
              <div className="magnifying_glass_holder">
                <i className="fa-solid fa-magnifying-glass magnifying_glass"></i>
              </div>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  className="search"
                  type="text"
                  value={searchTxt}
                  onChange={(e) => {
                    setSearchTxt(e.target.value);
                  }}
                />
                <button className="search_btn" type="submit">
                  search
                </button>
              </form>
            </div>
          </div>
        )}

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
                  <Link className="signup" to="/signup">
                    signup
                  </Link>
                </div>
              </div>
            ) : email === "bruckabey@gmail.com" ? (
              <div className="nav_email_holder">
                <div className="email">{email}</div>
                <Link className="favorites_heart" to="/favorites">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <Link className="favorites_heart" to="/admin">
                  <i class="fa-solid fa-hammer"></i>
                </Link>
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            ) : (
              <div className="nav_email_holder">
                <div className="email">{email}</div>
                <Link className="favorites_heart" to="/favorites">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>

          <div className="ellipsis_holder">
            <i
              class="fa-solid fa-ellipsis-vertical"
              onClick={() => {
                globalDispatch({ type: MENU_OPEN });
                console.log(
                  "ellipsis clicked",
                  menu_is_open ? "open" : "close"
                );
              }}
            ></i>
          </div>
        </div>
        <div
          className="side_menu"
          style={
            menu_is_open
              ? { right: "0", display: "block" }
              : { right: "-100vw", display: "none" }
          }
        >
          <div className="side_menu_container">
            <div
              className="side_menu_left"
              onClick={() => {
                console.log("left side menu clicked");
                globalDispatch({ type: MENU_CLOSE });
              }}
            ></div>
            <div className="side_menu_right">
              <div className="side_menu_close_holder">
                <i
                  class="fa-solid fa-xmark cross"
                  onClick={() => {
                    globalDispatch({ type: MENU_CLOSE });
                  }}
                ></i>
              </div>
              {email === "" ? (
                <div className="logged_out">
                  <div className="side_menu_email_holder">
                    <div className="side_menu_email">{}</div>
                  </div>
                  <div className="side_menu_button">
                    <i class="fa-solid fa-right-to-bracket side_menu_icon"></i>

                    <Link
                      className="side_menu_label"
                      to="/login"
                      onClick={() => {
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Login
                    </Link>
                  </div>
                  <div className="side_menu_button side_menu_logout">
                    <i class="fa-solid fa-user-plus side_menu_icon"></i>

                    <Link
                      className="side_menu_label"
                      to="/signup"
                      onClick={() => {
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              ) : email === "bruckabey@gmail.com" ? (
                <div className="logged_in">
                  <div className="side_menu_email_holder">
                    <div className="side_menu_email">{email}</div>
                  </div>
                  <div className="side_menu_button">
                    <i class="fa-solid fa-heart side_menu_icon"></i>
                    <Link
                      className="side_menu_label"
                      to="/favorites"
                      onClick={() => {
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Favorite
                    </Link>
                  </div>
                  <div className="side_menu_button">
                    <i class="fa-solid fa-hammer side_menu_icon"></i>

                    <Link
                      className="side_menu_label"
                      to="/admin"
                      onClick={() => {
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Admin
                    </Link>
                  </div>
                  <div className="side_menu_button side_menu_logout">
                    <i class="fa-solid fa-arrow-right-from-bracket side_menu_icon"></i>
                    <div
                      className="side_menu_label"
                      onClick={() => {
                        handleLogout();
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                <div className="logged_in">
                  <div className="side_menu_email_holder">
                    <div className="side_menu_email">{email}</div>
                  </div>
                  <div className="side_menu_button">
                    <i class="fa-solid fa-heart side_menu_icon"></i>
                    <Link
                      className="side_menu_label"
                      to="/favorites"
                      onClick={() => {
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Favorite
                    </Link>
                  </div>
                  <div className="side_menu_button side_menu_logout">
                    <i class="fa-solid fa-arrow-right-from-bracket side_menu_icon"></i>
                    <div
                      className="side_menu_label"
                      onClick={() => {
                        handleLogout();
                        globalDispatch({ type: MENU_CLOSE });
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
