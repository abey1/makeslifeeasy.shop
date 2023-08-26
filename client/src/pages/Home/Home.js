import React, { useEffect } from "react";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
import { HOME_MOUNTED, HOME_UNMOUNTED } from "../../utilities/constants";
import("./Home.scss");

const Home = () => {
  const { globalDispatch } = useGlobalAppContext();
  useEffect(() => {
    // this fires when the home page mounted
    globalDispatch({ type: HOME_MOUNTED });
    // this return function mimiks the componentWillUnmount class function
    return () => {
      globalDispatch({ type: HOME_UNMOUNTED });
    };
  }, []);
  return <div className="home_holder">home</div>;
};

export default Home;
