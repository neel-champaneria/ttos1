import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMenuAction } from "./../src/actions/MenuAction";
import { setQrInfoAction } from "./../src/actions/QrActions";
import SearchedItemCompoent from "../src/components/menuComponents/SearchedItemComponent";

import { Carousel, Button, Offcanvas, Navbar } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  let qrInfo;

  const [menuRows, setMenuRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allItemsName, setAllItemsName] = useState([]);
  const [searchMatchItem, setSearchMatchItem] = useState([]);
  const [searchMatchItemRow, setSearchMatchItemRow] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    dispatch(fetchMenuAction());
    if (Object.keys(query).length !== 0) {
      dispatch(setQrInfoAction({ tableId: query.tableId, qrId: query.qrId }));
    }
  }, [query, qrInfo, dispatch]);

  const menu = useSelector((state) => state.menuReducer) || [];
  qrInfo = useSelector((state) => state.QrReducer);
  const restaurant = useSelector((state) => state.resReducer);

  useEffect(() => {
    if (menu.length > 0) {
      let clonedMenu = [...menu];
      let rows = [];
      for (let i = 0; i < clonedMenu.length; i += 2) {
        rows.push([
          clonedMenu[i],
          i + 1 < clonedMenu.length ? clonedMenu[i + 1] : null,
        ]);
      }
      setMenuRows(rows);
      const allNames = [];
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].items.length; j++) {
          allNames.push(menu[i].items[j].name);
        }
      }
      setAllItemsName(allNames);
    }
  }, [menu]);

  const onSearch = () => {
    if (searchText === "") {
      return;
    }
    const pattern = RegExp(searchText, "i");

    const items = [];
    for (let i = 0; i < menu.length; i++) {
      for (let j = 0; j < menu[i].items.length; j++) {
        if (pattern.test(menu[i].items[j].name))
          items.push({ item: menu[i].items[j], category: menu[i] });
      }
    }
    setSearchMatchItem(items);
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push([items[i], i + 1 < items.length ? items[i + 1] : null]);
    }
    setSearchMatchItemRow(rows);
    setShowSearchResult(true);
  };

  useEffect(() => {
    if (searchText === "") {
      setShowSearchResult(false);
    }
  }, [searchText]);

  const clickSearchIcon = () => {
    setShowSearchbar(!showSearchbar);
    setSearchText("");
    setShowSearchResult(false);
  };

  return (
    <>
      {/* Table Number */}
      <div className="mb-2">
        <div className="text-center text-white table_strip">
          TABLE {qrInfo.tableId}
        </div>
      </div>

      {/* Restaurant Logo, Name and Search Button */}
      <div className="container mb-2">
        <div className="header">
          <Navbar>
            <Navbar.Brand>
              <img
                src="/eatery_logo.png"
                className="logo-height d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand className="header_title">
              {restaurant.name}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <img
                  src="/search.svg"
                  alt="search icon"
                  onClick={() => {
                    clickSearchIcon();
                  }}
                />
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      {/* Search Bar */}
      {showSearchbar ? (
        <div className="container mb-2 d-flex">
          <input
            type="text"
            className="form-control border-radius-5"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => onSearch()} className="btn red-btn search-btn">
            Search
          </button>
        </div>
      ) : null}

      {menu && menuRows && !showSearchResult && (
        /* Carousel */
        <div>
          <div className="container">
            <Carousel fade controls={false} className="mt-3">
              <Carousel.Item>
                <img
                  className="d-block w-100 img-rounded"
                  src="/pizza.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-rounded"
                  src="/pizza.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-rounded"
                  src="/pizza.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>

          {/* Category Title */}
          <div className="pt-4">
            <h1 className="text-center fw-bold mb-3">Categories</h1>
          </div>

          {/* Category List */}
          <div className="container">
            {menuRows.map((row, idx) => {
              return (
                <div
                  className="row justify-content-md-center pb-2 mb-5"
                  key={idx}
                >
                  {row[0] && (
                    <div className="col-6" key={row[0].id}>
                      <Link href={`/category/${row[0].id}`}>
                        <div>
                          <img
                            className="d-block img-fluid cover-img img-top-rounded"
                            src={row[0].image ? row[0].image : "/pizza.jpg"}
                          />
                          <h2 className="text-center color-white p-3 img-bottom-rounded text-uppercase fw-bold">
                            {row[0].name}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  )}
                  {row[1] && (
                    <div className="col-6" key={row[1].id}>
                      <Link href={`/category/${row[1].id}`}>
                        <div>
                          <img
                            className="d-block img-fluid cover-img img-top-rounded"
                            src={row[1].image ? row[1].image : "/pizza.jpg"}
                          />
                          <h2 className="text-center color-white p-3 img-bottom-rounded text-uppercase fw-bold">
                            {row[1].name}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 
          Search Component
          This loads when search keyword is entered in serach bar and search button is pressed.
          If search keyword matches any item name then SearchedItemCompoent will load,
          otherwise it will show "No items found" and button to see all categories.
      */}
      {showSearchResult && (
        <>
          {searchMatchItem.length > 0 ? (
            <>
              <SearchedItemCompoent searchMatchItemRow={searchMatchItemRow} />
            </>
          ) : (
            <>
              <div className="container text-center mt-5">
                <h2 className="">No items found</h2>
                <Button
                  className="red-btn"
                  variant="danger"
                  onClick={() => clickSearchIcon()}
                >
                  See All Category
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
