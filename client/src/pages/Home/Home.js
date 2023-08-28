import React, { useEffect, useState } from "react";
import { useGlobalAppContext } from "../../contexts/GlobalAppContext";
import {
  HOME_MOUNTED,
  HOME_UNMOUNTED,
  IS_LOADING,
  ISNT_LOADING,
} from "../../utilities/constants";
import ReactPaginate from "react-paginate";
import { Items } from "../../components";
import("./Home.scss");

const Home = () => {
  const { isSearching, globalDispatch } = useGlobalAppContext();
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(5);

  // fetch items
  const fetchData = async () => {
    globalDispatch({ type: IS_LOADING });
    const response = await fetch("http://localhost:4000/api/goods/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    });
    const currentItems = await response.json();
    setItems(currentItems);
    globalDispatch({ type: ISNT_LOADING });
  };
  // get page count
  const fetchMeta = async () => {
    globalDispatch({ type: IS_LOADING });
    const response = await fetch("http://localhost:4000/api/goods/get_meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const pages = await response.json();
    console.log("total pages = ", pages.length);
    setTotalPages(pages.length);
    globalDispatch({ type: ISNT_LOADING });
  };
  useEffect(() => {
    // this fires when the home page mounted
    globalDispatch({ type: HOME_MOUNTED });
    fetchMeta();
    fetchData();
    // this return function mimiks the componentWillUnmount class function
    return () => {
      globalDispatch({ type: HOME_UNMOUNTED });
    };
  }, []);
  useEffect(() => {
    fetchData();
  }, [page]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return (
    <div className="home_holder">
      {isSearching ? (
        <div></div>
      ) : (
        <div className="main_home">
          <Items items={items} />
          <div className="pagination_holder">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={totalPages}
              previousLabel="<<"
              renderOnZeroPageCount={null}
              className="pagination"
              pageClassName="pagination_li"
              pageLinkClassName="pagination_a"
              activeLinkClassName="pagination_active"
              previousClassName="pagination_previous"
              nextClassName="pagination_next"
              previousLinkClassName="pagination_previous_a"
              nextLinkClassName="pagination_next_a"
              disabledClassName="pagination_disabled"
              disabledLinkClassName="pagination_disabled_a"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
