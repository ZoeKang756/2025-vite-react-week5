import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import "../../assets/style.css";
import DeleteConfirmModal from "../../components/deleteConfirmModal";
import ProductModal from "../../components/ProductModal";

import MessageToast from "../../components/MessageToast";
import GetAuthToken from "../../utils/GetAuthToken";
import Pagination from "../../components/Pagination";
import ViewProductModal from "../../components/viewProductModal";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
const PRODUCT_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: 1,
  imageUrl: "",
  imagesUrl: [],
  leadTime: "",
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showMessages, setShowMessages] = useState({ type: "", msgs: [] });
  const [pagination, setPagination] = useState({});

  const [tempProductData, setTempProductData] = useState(PRODUCT_DATA);
  const [delConfirmData, setDelConfirmData] = useState({
    id: "",
    title: "",
  });
  const [modalType, setModalType] = useState("");

  const productModalRef = useRef(null);
  const delProductModalRef = useRef(null);
  const viewProductModalRef = useRef(null);
  const msgToastRef = useRef(null);

  const getProducts = async (page = 1) => {
    const token = GetAuthToken();
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`,
        { headers: { Authorization: token } },
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const deleteCompleted = (messages, isCancel = false) => {
    closeDelProductModal();
    if (!isCancel) {
      getProducts();
      setShowMessages({
        type: "success",
        msgs: [...messages],
      });
      msgToastRef.current.show();
    }
  };

  const deleteFailure = (messages) => {
    setShowMessages({ type: "error", msgs: [...messages] });
    msgToastRef.current.show();
  };

  const updateCompleted = (messages, isCancel = false) => {
    closeProductModal();
    if (!isCancel) {
      getProducts();
      setShowMessages({
        type: "success",
        msgs: [...messages],
      });
      msgToastRef.current.show();
    }
  };

  const updateFailure = (messages) => {
    setShowMessages({ type: "error", msgs: [...messages] });
    msgToastRef.current.show();
  };

  const openProductModal = (product, modelType) => {
    setTempProductData({
      ...PRODUCT_DATA,
      ...product,
    });

    setModalType(modelType);
    productModalRef.current.show();
  };

  const closeProductModal = () => {
    productModalRef.current.hide();
  };

  const openViewProductModal = (e, product) => {
    e.preventDefault();
    setTempProductData({
      ...PRODUCT_DATA,
      ...product,
    });
    viewProductModalRef.current.show();
  };

  const openDelProductModal = (product) => {
    setDelConfirmData({
      id: product.id,
      title: product.title,
    });

    delProductModalRef.current.show();
  };

  const closeDelProductModal = () => {
    delProductModalRef.current.hide();
  };

  useEffect(() => {
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });

    msgToastRef.current = new bootstrap.Toast("#msgToast");

    viewProductModalRef.current = new bootstrap.Modal("#viewProductModal");
    delProductModalRef.current = new bootstrap.Modal("#delProductModal");

    // Modal 關閉時移除焦點
    document
      .querySelector("#productModal")
      .addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    getProducts();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between m-2">
          <div className="fs-3"><i class="bi bi-book"></i> 產品列表</div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => openProductModal(PRODUCT_DATA, "create")}
            > <i class="bi bi-plus-circle me-2"></i>
              建立新的產品
            </button>
          </div>
        </div>

        <div>
          <table className="table mt-4 table-striped ">
            <thead>
              <tr>
                <th className="text-start">產品名稱</th>
                <th>分類</th>
                <th width="120" className="text-end">
                  原價
                </th>
                <th width="120" className="text-end">
                  售價
                </th>
                <th>是否啟用</th>
                <th width="200">編輯</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="text-start">
                    <a
                      href="#"
                      className="text-decoration-none"
                      onClick={(e) => openViewProductModal(e, product)}
                    >
                      {product.title}
                    </a>
                  </td>
                  <td>{product.category}</td>
                  <td className="text-end">{product.origin_price}</td>
                  <td className="text-end">{product.price}</td>
                  <td>
                    {product.is_enabled === 1 ? (
                      <span className="text-success">啟用</span>
                    ) : (
                      <span>未啟用</span>
                    )}
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={() => openProductModal(product, "edit")}
                        className="btn btn-outline-primary btn-sm me-1"
                      ><i class="bi bi-pencil-square me-1"></i>
                        編輯
                      </button>
                      <button
                        type="button"
                        onClick={() => openDelProductModal(product)}
                        className="btn btn-outline-danger btn-sm ms-1"
                      ><i class="bi bi-trash3 me-1"></i>
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pagination={pagination}
            onChangePage={getProducts}
          ></Pagination>
        </div>
      </div>
      <ViewProductModal tempProductData={tempProductData}></ViewProductModal>
      <DeleteConfirmModal
        delConfirmData={delConfirmData}
        deleteCompleted={deleteCompleted}
        deleteFailure={deleteFailure}
      />
      <ProductModal
        modalType={modalType}
        tempProductData={tempProductData}
        updateCompleted={updateCompleted}
        updateFailure={updateFailure}
      />
      <MessageToast showMessages={showMessages} />
    </>
  );
}

export default ProductList;
