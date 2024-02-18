import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../utils/toastSweetAlert";

export default function AddPostMedia() {
  const { postId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);

  const onUploadImages = async (data) => {
    try {
      setLoding(true);
      const formData = new FormData();
      for (const file of data.images) {
        formData.append("images", file);
      }
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/media/upload-media/${postId}`,
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

        Toast.fire({
          icon: "success",
          title: "You have published post with images successfully",
        });
        return navigate("/");
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
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Add media to post</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onUploadImages)}>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      Import your media for the post
                    </label>
                    <input
                      class="form-control"
                      {...register("images", { required: true })}
                      type="file"
                      multiple
                      id="formFile"
                    />
                    {errors.images && (
                      <span style={{ color: "red" }}>
                        Please upload any media files here for the post
                      </span>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {loading === true ? "Please Wait.." : "Publish"}
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
