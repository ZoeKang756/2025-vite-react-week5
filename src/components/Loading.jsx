import { useState, useEffect } from "react";
function Loading({ isShow }) {
  const [isShowLoading, setIsShowLoading] = useState(isShow);

  useEffect(() => {
    setIsShowLoading(isShow);
  }, [isShow]);

  return (
    <>
      {isShowLoading && (
        <div
          className="d-flex justify-content-center align-items-center bg-white"
          style={{ height: "100%", minHeight: "500px", width: "100%" }}
        >
          <div>
            <img src="./images/Spinner@1x-1.0s-200px-200px.gif" />
          </div>
        </div>
      )}
    </>
  );
}
export default Loading;
