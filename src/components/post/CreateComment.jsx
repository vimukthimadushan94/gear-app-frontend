import { useForm } from "react-hook-form";
import { createComment, getComments } from "./utils/postFunctions";
import { useEffect, useState } from "react";
import { Comments } from "./Comments";

export function CreateComment({ post }) {
  const [loading, setLoding] = useState(false);
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitComment = async (data) => {
    setLoding(true);
    const response = await createComment(data, post);
    if (response.ok) {
      setLoding(false);
      const res = await getComments(post._id);
      setComments(res);
      reset();
    } else {
      setLoding(false);
      throw new Error({ message: "something went wrong" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComments(post._id);
        setComments(res);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [post._id]);

  return (
    <>
      <Comments comments={comments} />
      <div className="p-2 row">
        <div className="col-md-2">
          <img
            src={process.env.REACT_APP_BACKEND_URL + post.user.avatar}
            alt=""
            width="45"
            height="45"
            className="rounded-circle"
            style={{ marginRight: "3%" }}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmitComment)}
          className="col-md-10 row"
          id={post._id}
        >
          <div className="col-md-10">
            <input
              type="text"
              {...register("comment", {
                required: true,
                maxLength: 100,
              })}
              className="form-control"
              style={errors.comment ? { borderColor: "crimson" } : {}}
            />
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">
              {loading === true ? "sending.." : "send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
