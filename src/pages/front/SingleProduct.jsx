import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import * as bootstrap from "bootstrap";
import MessageToast from "../../components/MessageToast";

const { VITE_API_PATH, VITE_BASE_URL } = import.meta.env;

function SingleProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [showMessages, setShowMessages] = useState({ type: "", msgs: [] });
  const msgToastRef = useRef(null);

  const getSingleProduct = async (id) => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/product/${id}`,
      );

      setProduct(response.data.product);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const addToCart = async (e, id) => {
    e.preventDefault();
    const data = { product_id: id, qty: 1 };
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`,
        { data: data },
      );
      setShowMessages({
        type: "success",
        msgs: ["加入購物車成功"],
      });

      msgToastRef.current.show();
    } catch (error) {
      setShowMessages({ type: "error", msgs: ["加入購物車失敗"] });
      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    msgToastRef.current = new bootstrap.Toast("#msgToast");

    getSingleProduct(id);
  }, [id]);

  return (
    <>
      <div className="p-4 ">
        <div
          className="d-flex justify-content-between py-2"
          style={{ color: "#785571" }}
        >
          <h1 className="fs-4 fw-bold">
            <i className="bi bi-bluesky me-2"></i>日本女裝
          </h1>
        </div>
        <div className="m-1 row justify-content-between">
          <div className="col-9 d-flex flex-wrap justify-content-start">
            <div className="images-thumbnails bigger">
              <img src={product.imageUrl} alt="" />
            </div>
            {product.imagesUrl
              ? product.imagesUrl.map((img) => (
                  <div className="images-thumbnails bigger">
                    <img src={img} alt="" />
                  </div>
                ))
              : ""}
          </div>
          <div className="col-3 shadow-sm">
            <div className="py-3 border-bottom">
              <h5
                className="card-title fw-bold fs-4"
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

            <div className="fst-italic my-2">
              <div className="text-secondary text-decoration-line-through py-2">
                原價：{product.origin_price}
              </div>
              <div className="py-2" style={{ color: "#977b91" }}>
                特價：{product.price}
              </div>
            </div>
            <div className="py-2">{product.content}</div>
            <div className="py-2  border-bottom">{product.description}</div>
            <a
              href="#"
              className="btn mybtn my-3"
              onClick={(e) => addToCart(e, product.id)}
            >
              <i class="bi bi-cart-plus"></i>加入購物車
            </a>
          </div>
        </div>
      </div>
      <MessageToast showMessages={showMessages} />
    </>
  );
}
export default SingleProduct;
