import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Toast } from "../utils/toastSweetAlert";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../features/auth/authActions";

function AvatarUplodatePopup(props) {
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoding] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageChange = (e) => {
    console.log("cnanging...");
    setUploadedImage(false);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const onUploadImage = async (data) => {
    try {
      setLoding(true);
      const formData = new FormData();
      formData.append("avatar", data.avatar);
      for (const file of data.avatar) {
        formData.append("avatar", file);
      }
      const response = await fetch(
        `http://localhost:8080/api/media/update-avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setLoding(false);
        setUploadedImage(true);
        Toast.fire({
          icon: "success",
          title: "You have update your profile picture successfully",
        });
        //close popup in here
        removeSelectedImage();
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUser());
  }, [uploadedImage]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <form onSubmit={handleSubmit(onUploadImage)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="col-md-12 container pt-3">
              <div>
                <input
                  class="form-control"
                  accept="image/*"
                  type="file"
                  {...register("avatar", {
                    onChange: (e) => {
                      imageChange(e);
                    },
                  })}
                />
                {errors.images && (
                  <span style={{ color: "red" }}>
                    Please upload any media files here for the post
                  </span>
                )}

                {selectedImage && (
                  <div className="container row pt-5">
                    <div className="col-md-8">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                        width="195"
                        height="195"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-md-4 p-4">
                      <button
                        onClick={removeSelectedImage}
                        className="btn btn-danger"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example"></Modal.Body>
        <Modal.Footer>
          <Button type="submit">
            {loading === true ? "Please Wait.." : "Submit"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AvatarUplodatePopup;
