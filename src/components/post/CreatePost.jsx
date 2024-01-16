import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../utils/toastSweetAlert";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);

  const onCreatePost = async (data) => {
    try {
      setLoding(true);
      const response = await fetch(`http://localhost:8080/api/posts/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoding(false);
        const newPost = await response.json();
        return navigate(`/add-media/${newPost._id}`);
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
            <h5 className="card-title fw-semibold mb-4">Create Post</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onCreatePost)}>
                  <div className="mb-3">
                    <label className="form-label">Whats on your mind..</label>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        {...register("description", { required: true })}
                      ></textarea>
                      {errors.description && (
                        <span style={{ color: "red" }}>
                          Post description is required
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    style={{ "margin-left": "1%" }}
                  >
                    {loading === true ? "Please Wait.." : "Add media"}
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
