import dummyImage from "../../assets/images/products/s4.jpg";
import RightBar from "../site/RightBar";
import { useSelector } from "react-redux";

export default function Feed() {
  const { avatarUrl } = useSelector((state) => state.auth);

  return (
    <>
      <div class="container-fluid">
        <div class="card">
          <div class="card-body" style={{ width: "65%" }}>
            <div class="col-md-12">
              <h5 class="card-title fw-semibold mb-4">Feed</h5>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    <img
                      src={avatarUrl}
                      alt=""
                      width="45"
                      height="45"
                      className="rounded-circle"
                      style={{ "margin-right": "3%" }}
                    />
                    Madushan Gangoda
                  </h5>
                  <small>about an hour ago</small>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img src={dummyImage} class="card-img-top" alt="..." />
                  </div>
                  <div className="col-md-6">
                    <img src={dummyImage} class="card-img-top" alt="..." />
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img src={dummyImage} class="card-img-top" alt="..." />
                  </div>
                  <div className="col-md-6">
                    <img src={dummyImage} class="card-img-top" alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RightBar />
    </>
  );
}
