import AvatarUpdate from "./AvatarUpdate";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import AvatarUplodatePopup from "./AvatarUplodatePopup";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const { avatarUrl } = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(false);
  }, [avatarUrl]);

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Profile Update</h5>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt=""
                        width="195"
                        height="195"
                        className="rounded-circle"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Update Profile Picture
                    </Button>
                  </div>
                  <AvatarUplodatePopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <AvatarUpdate />
                </div>

                <form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" />
                    <div className="form-text">First name is required</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" />
                    <div className="form-text">Last name is required</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" />
                    <div className="form-text">Age is required</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
