import { Outlet, Link, useSearchParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/images/1769653446695-1.jpg";

const { VITE_API_PATH, VITE_BASE_URL } = import.meta.env;

function FrontendLayout() {
  const [cartsCount, setCartsCount] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const location = useLocation();

  const getCart = async () => {
    try {
      const res = await axios.get(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`,
      );

      setCartsCount(res.data.data.carts.length);
    } catch (error) {
      console.error(error.response?.data);
    }
  };
  useEffect(() => {
    getCart();
  }, [cartsCount]);

  return (
    <>
      <div className="container">
        <header>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand" to="/">
                <img
                  src={logo}
                  className="logo"
                  alt="inod 日本精品服飾"
                />
              </Link>

              <div id="topNavbar" className="collapse navbar-collapse">
                <div className="navbar-nav">
                  <Link
                    className={`nav-link ${location.pathname === "/" && "active"}`}
                    to="/"
                  >
                    首頁
                  </Link>
                  <Link
                    className={`nav-link ${location.pathname === "/product" && !category && "active"}`}
                    to="/product"
                  >
                    所有商品
                  </Link>
                  <Link
                    className={`nav-link ${location.pathname === "/product" && category === "日本女裝" && "active"}`}
                    to="/product?category=日本女裝"
                  >
                    日本女裝
                  </Link>
                  <Link
                    className={`nav-link ${location.pathname === "/product" && category === "連線商品" && "active"}`}
                    to="/product?category=連線商品"
                  >
                    連線商品
                  </Link>
                  <Link
                    className={`nav-link ${location.pathname === "/product" && category === "鞋包配件" && "active"}`}
                    to="/product?category=鞋包配件"
                  >
                    鞋包配件
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-nowrap">
                <div>
                  <Link
                    className="text-secondary mx-2 text-decoration-none"
                    to="/cart"
                  >
                    <i className="bi bi-cart fs-5 me-1"></i>
                    <span className="badge bg-secondary">{cartsCount}</span>
                  </Link>
                </div>
                <div>
                  <a
                    className="text-secondary mx-2 text-decoration-none px-3 rounded-pill py-1"
                    style={{ backgroundColor: "#EEE" }}
                  >
                    <span>
                      <i className="bi bi-person fs-5"></i>登入/註冊
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer className="p-4 text-secondary">
          <div className="d-flex justify-content-between">
            <ul className="nav ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  聯絡Inod
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  購物說明
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  最新消息
                </Link>
              </li>
            </ul>
            <div className="mt-2"> © 2026 inod</div>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  網站使用條款
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  隱私權政策
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  免責聲明
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
export default FrontendLayout;
