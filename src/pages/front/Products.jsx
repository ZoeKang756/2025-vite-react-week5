import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import * as bootstrap from "bootstrap";
import MessageToast from "../../components/MessageToast";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

const { VITE_API_PATH, VITE_BASE_URL } = import.meta.env;

function Products() {
  const [products, setProducts] = useState([]);
  const [showMessages, setShowMessages] = useState({ type: "", msgs: [] });
  const [isShowLoading, setIsShowLoading] = useState(true);
  const msgToastRef = useRef(null);
  const [pagination, setPagination] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products`,
        { params: searchParams },
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setIsShowLoading(false);
    }
  };

  const onChangePage = (page = 1) => {
    setSearchParams(() => {
      let param = {};
      if (category) param.category = category;
      if (page) param.page = page;
      return param;
    });
  };

  useEffect(() => {
    msgToastRef.current = new bootstrap.Toast("#msgToast");

    setSearchParams(() => {
      let param = {};
      if (category) param.category = category;
      if (page) param.page = page;
      return param;
    });

    getProducts();
  }, [searchParams]);

  return (
    <>
      <div className="p-4">
        <div
          className="d-flex justify-content-between py-2"
          style={{ color: "#785571" }}
        >
          <h1 className="fs-4">
            <i className="bi bi-bluesky me-2"></i>
            {category ? category : "所有商品"}
          </h1>
        </div>
        {!isShowLoading && (
          <div>
            {!products.length ? (
              <div
                className="fs-3"
                style={{
                  padding: "200px",
                  border: "1px solid #e2cee2",
                  color: "#e2cee2",
                }}
              >
                相關資料正在努力建置中，敬請期待!
              </div>
            ) : (
              <>
                <div
                  id="product_container"
                  className="d-flex flex-wrap justify-content-start mx-aoto"
                >
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      className="m-1 text-decoration-none"
                    >
                      <div
                        className="productlist card m-2"
                        style={{ width: "18rem", borderColor: "#e2cee2" }}
                        key={product.id}
                      >
                        <img
                          src={product.imageUrl}
                          className="card-img-to object-fit-cover"
                          style={{
                            borderRadius: "0px",
                            height: "300px",
                            width: "300px",
                          }}
                          alt={product.title}
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-center">
                            <h5
                              className="card-title fw-bold fs-6"
                              style={{ color: "#785571" }}
                            >
                              <span
                                class="badge me-1 mb-1"
                                style={{
                                  backgroundColor: "#785571",
                                  borderRadius: "0px",
                                }}
                              >
                                {product.category}
                              </span>
                              {product.title}
                            </h5>
                          </div>

                          <div className="fst-italic mb-2">
                            <div className="text-secondary text-decoration-line-through">
                              原價：{product.origin_price}
                            </div>
                            <div style={{ color: "#977b91" }}>
                              特價：{product.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  onChangePage={onChangePage}
                ></Pagination>
              </>
            )}
          </div>
        )}
      </div>
      <Loading isShow={isShowLoading}></Loading>
      <MessageToast showMessages={showMessages} />
    </>
  );
}
export default Products;
