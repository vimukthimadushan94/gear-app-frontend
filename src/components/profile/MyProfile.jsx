import AvatarUpdate from "./AvatarUpdate";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import AvatarUplodatePopup from "./AvatarUplodatePopup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Toast } from "../utils/toastSweetAlert";

export default function MyProfile() {
  const { avatarUrl } = useSelector((state) => state.auth);

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoding] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setModalShow(false);
  }, [avatarUrl]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      });
  }, []);

  const onUpdatePfrofile = async (data) => {
    console.log(data);
    try {
      setLoding(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/user/profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        await response.json();
        Toast.fire({
          icon: "success",
          title: "You have updated defails successfully",
        });
        setLoding(false);
      } else {
        throw new Error({ message: "something went wrong" });
      }
    } catch (e) {
      setLoding(false);
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again",
      });
    }
  };

  return (
    <>
      {userInfo && (
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

                    <form
                      className="container mt-5"
                      onSubmit={handleSubmit(onUpdatePfrofile)}
                    >
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className={
                            "form-control" +
                            (errors.first_name ? " is-invalid" : "")
                          }
                          defaultValue={userInfo.first_name}
                          {...register("first_name", { required: true })}
                        />
                        {errors.first_name && (
                          <div class="invalid-feedback">
                            Please provide a valid first name.
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          defaultValue={userInfo.last_name}
                          {...register("last_name")}
                        />
                        {errors.last_name && (
                          <div class="invalid-feedback">
                            Please provide a valid last name.
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          className={
                            "form-control" + (errors.age ? " is-invalid" : "")
                          }
                          defaultValue={userInfo.age}
                          {...register("age", { required: true })}
                        />
                        {errors.age && (
                          <div class="invalid-feedback">
                            Please provide a valid age.
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {loading === true ? "Please Wait.." : "Update"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
