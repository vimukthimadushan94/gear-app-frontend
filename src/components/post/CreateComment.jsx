import { useForm } from "react-hook-form";
import { createComment } from "./utils/postFunctions";
import { useState } from "react";

export function CreateComment({ post }) {
  const [loading, setLoding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitComment = async (data) => {
    console.log("Send comment..");
    setLoding(true);
    const response = await createComment(data, post);
    if (response.ok) {
      setLoding(false);
      reset();
    } else {
      setLoding(false);
      throw new Error({ message: "something went wrong" });
    }
  };

  return (
    <div className="p-2 row">
      <div className="col-md-2">
        <img
          src={post.user.avatar}
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
              maxLength: 20,
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
  );
}
