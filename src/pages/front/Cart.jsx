import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import MessageToast from "../../components/MessageToast";
import Loading from "../../components/Loading";

const { VITE_API_PATH, VITE_BASE_URL } = import.meta.env;

function Cart() {
  const [cartData, setCartData] = useState({
    carts: [],
    total: 0,
    final_total: 0,
  });
  const [showMessages, setShowMessages] = useState({ type: "", msgs: [] });
  const [isShowLoading, setIsShowLoading] = useState(true);
  const msgToastRef = useRef(null);

  const getCarts = async () => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`,
      );
      setCartData(response.data.data);
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setIsShowLoading(false);
    }
  };

  const removeFromCarts = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${id}`,
      );
      setShowMessages({
        type: "success",
        msgs: ["購物車更新成功"],
      });

      msgToastRef.current.show();
      getCarts();
    } catch (error) {
      setShowMessages({ type: "error", msgs: ["購物車更新失敗"] });
      console.error(error.response?.data);
    }
  };

  const clearCarts = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`,
      );
      setShowMessages({
        type: "success",
        msgs: ["購物車清空成功"],
      });

      msgToastRef.current.show();
      getCarts();
    } catch (error) {
      setShowMessages({ type: "error", msgs: ["購物車清空失敗"] });
      console.error(error.response?.data);
    }
  };

  const updateCarts = async (e, id, product_id) => {
    e.preventDefault();
    const data = { product_id: product_id, qty: 1 };
    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${id}`,
        { data: data },
      );
      setShowMessages({
        type: "success",
        msgs: ["購物車更新成功"],
      });

      msgToastRef.current.show();
    } catch (error) {
      setShowMessages({ type: "error", msgs: ["購物車更新失敗"] });
      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    msgToastRef.current = new bootstrap.Toast("#msgToast");

    getCarts();
  }, []);

  return (
    <>
      <div className="container p-4">
        <div
          className="d-flex justify-content-between py-2"
          style={{ color: "#785571" }}
        >
          <h1 className="fs-4 fw-bold">
            <i className="bi bi-bluesky me-2"></i>購物車
          </h1>
        </div>
        <div className="container mt-2">
          <div className="text-end">
            <button
              onClick={(e) => clearCarts(e)}
              type="button"
              className="btn mybtn my-2"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-trash"></i> 清空購物車
            </button>
          </div>
          <div className="container" style={{ border: "1px solid #e2cee2" }}>
            <div className="row py-1" style={{ color: "#b99cba" }}>
              <div className="col-md-1"></div>
              <div className="col-md-5">品項</div>
              <div className="col-md-2 text-end">單價</div>
              <div className="col-md-2 text-start">數量</div>
              <div className="col-md-1 text-end">小計</div>
            </div>
            {cartData.carts.map((cart) => (
              <>
                <div
                  className="row py-2"
                  style={{ borderTop: "1px solid #e2cee2" }}
                >
                  <div className="col-md-1 pb-2 text-end">
                    <button
                      type="button"
                      onClick={(e) => removeFromCarts(e, cart.id)}
                      className="btn mybtn btn-sm"
                      style={{ borderRadius: "0px", padding: "3px" }}
                    >
                      <i className="bi bi-x-octagon"></i>刪除
                    </button>
                  </div>
                  <div className="col-md-5">
                    <div className="d-flex justify-content-start">
                      <div className="mx-1">
                        <img
                          src={cart.product.imageUrl}
                          alt={cart.product.title}
                          className="object-fit-cover rounded mx-1"
                          style={{ height: "5rem", width: "8rem" }}
                        />
                      </div>
                      <div>
                        <div className="text-start fw-bold">
                          {cart.product.title}
                        </div>
                        <div className="text-start text-secondary">
                          {cart.product.content}
                        </div>

                        <div className="text-decoration-line-through text-secondary my-1">
                          原價：${cart.product.origin_price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 py-1">
                    <div
                      className="mx-1 fw-bold text-end"
                      style={{ color: "#785571" }}
                    >
                      ${cart.product.price.toLocaleString('en-US')} / {cart.product.unit}
                    </div>
                  </div>
                  <div className="col-md-3 mb-1">
                    <div className="d-flex flex-nowrap justify-content-between">
                      <div>
                        <select className="form-select" defaultValue={cart.qty}>
                          {Array.from(Array(cart.qty + 10), (x, index) => (
                            <option value={index + 1}>
                              {index + 1}
                              {cart.product.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-grow-1 text-end  px-1">
                        ${cart.final_total.toLocaleString('en-US')}
                      </div>
                    </div>
                  </div>
                </div>
                {cart.coupon && (
                  <div className="row" style={{ fontSize: "11pt" }}>
                    <div className="col-md-1"></div>
                    <div className="col-md-8 text-start text-secondary">
                      <i className="bi bi-gift"></i> 使用優惠券:〔
                      {cart.coupon.code}〕–超級特惠價格
                      {100 - cart.coupon.percent}% OFF
                    </div>
                    <div className="col-md-1 text-end text-secondary">
                      省下${(cart.total - cart.final_total).toLocaleString('en-US')}
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                )}
              </>
            ))}
            <Loading isShow={isShowLoading}></Loading>
          </div>

          <div style={{ border: "1px solid #e2cee2" }}>
            <div className="d-flex flex-wrap m-3 justify-content-end">
              <div
                className="text-start py-2 mx-1 fw-bold"
                style={{ color: "#785571" }}
              >
                我要使用優惠券
              </div>
              <div className="input-group mb-3" style={{ width: "400px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入優惠券"
                />
                <button className="btn mybtn" type="button" id="button-addon2">
                  <i className="bi bi-cursor-fill"></i> 確認送出
                </button>
              </div>
            </div>
            <div
              className="p-3 text-end"
              style={{ borderTop: "1px solid #e2cee2" }}
            >
              <div className="d-flex p-2">
                <div
                  className="flex-grow-1 text-end"
                  style={{ color: "#785571" }}
                >
                  售價總計金額 :
                </div>
                <div style={{ width: "200px" }}>${cartData.total.toLocaleString('en-US')}</div>
              </div>

              <div className="d-flex p-2">
                <div
                  className="flex-grow-1 text-end"
                  style={{ color: "#785571" }}
                >
                  結帳總計金額 :
                </div>
                <div style={{ width: "200px" }}>${cartData.final_total.toLocaleString('en-US')}</div>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  className="btn mybtn my-2"
                  style={{ borderRadius: "0px" }}
                >
                  <i className="bi bi-credit-card-2-back-fill"></i> 確認結帳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageToast showMessages={showMessages} />
    </>
  );
}
export default Cart;
