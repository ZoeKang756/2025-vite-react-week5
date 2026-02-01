import pic1 from "/images/622706233_1495709359230857_4968142213626478764_n.jpg";
import carouselPic1 from "/images/photo-1612423284934-2850a4ea6b0f.jpg";
import carouselPic2 from "/images/photo-1441984904996-e0b6ba687e04.jpg";
import carouselPic3 from "/images/premium_photo-1701204056808-22fc818affec.jpg";

function Home() {
  return (
    <>
      <div
        id="carouselExampleRide"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={carouselPic1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carouselPic2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carouselPic3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div style={{ backgroundColor: "#b99cba" }}>
        <ul id="middle_menu" className="d-flex justify-content-center">
          <li>
            <a className="active" aria-current="page" href="#">
              <i className="bi bi-balloon-heart me-2"></i>最新消息
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-balloon me-2"></i>售後服務
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chat-heart me-2"></i>聯絡我們
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-search-heart me-2"></i>搜尋商品
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div
          className="d-flex justify-content-between py-2"
          style={{ color: "#785571" }}
        >
          <h1 className="fs-4">
            <i className="bi bi-balloon-fill"></i>限時優惠活動
          </h1>
          <div className="fw-bold" style={{ color: "#b99cba" }}>
            更多活動 <i className="bi bi-chevron-double-right"></i>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between">
          <div
            className="card mt-1 mb-5"
            style={{ width: "20rem", borderRadius: "0px" }}
          >
            <div style={{ height: "35rem" }}>
              <img
                src={pic1}
                className="card-img-top object-fit-contain"
                style={{ borderRadius: "0px" }}
                alt="..."
              />
            </div>

            <div className="card-body bg-white position-absolute bottom-0">
              <h5 className="card-title">秋冬外套節</h5>
              <p className="card-text text-secondary">
                📣只有3天📣1/28、29、30 任選活動區「自選品大衣」
                全單商品不限金額,每滿3000現折300，超划算機會難得喔！
              </p>
              <a href="#" className="btn mybtn">
                <i className="bi bi-yelp"></i> Go somewhere
              </a>
            </div>
          </div>
          <div
            className="card mt-1 mb-5"
            style={{ width: "20rem", borderRadius: "0px" }}
          >
            <div style={{ height: "25rem" }}>
              <img
                src="https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                className="card-img-top object-fit-contain"
                style={{ borderRadius: "0px" }}
                alt="..."
              />
            </div>

            <div className="card-body bg-white position-absolute bottom-0">
              <h5 className="card-title">春夏新款</h5>
              <p className="card-text text-secondary">
                限時優惠85折，現貨有限，喜歡要快點帶回家喔!慢來就沒有了
              </p>
              <a href="#" className="btn mybtn">
                <i className="bi bi-yelp"></i> Go somewhere
              </a>
            </div>
          </div>
          <div
            className="card mt-1 mb-5"
            style={{ width: "20rem", borderRadius: "0px" }}
          >
            <div style={{ height: "25rem" }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1714226832298-086095850f93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                className="card-img-top object-fit-cover"
                style={{ borderRadius: "0px" }}
                alt="..."
              />
            </div>

            <div className="card-body bg-white position-absolute bottom-0">
              <h5 className="card-title">日本連線快閃</h5>
              <p className="card-text text-secondary">
                限時優惠85折，現貨有限，喜歡要快點帶回家喔!慢來就沒有了
              </p>
              <a href="#" className="btn mybtn">
                <i className="bi bi-yelp"></i> Go somewhere
              </a>
            </div>
          </div>

          <div
            className="card mt-1 mb-5"
            style={{ width: "20rem", borderRadius: "0px" }}
          >
            <div style={{ height: "25rem" }}>
              <img
                src="https://images.unsplash.com/photo-1630932245848-4850ae369ba4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxjbG90aGVzfGVufDB8fDB8fHww"
                className="card-img-top object-fit-cover"
                style={{ borderRadius: "0px" }}
                alt="..."
              />
            </div>

            <div className="card-body bg-white position-absolute bottom-0">
              <h5 className="card-title">秋冬現貨折扣</h5>
              <p className="card-text text-secondary">
                限時優惠85折，現貨有限，喜歡要快點帶回家喔!慢來就沒有了
              </p>
              <a href="#" className="btn mybtn">
                <i className="bi bi-yelp"></i> Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
