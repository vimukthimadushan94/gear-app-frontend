import { useEffect, useState } from "react";
import RightBar from "../site/RightBar";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/feed/feedsActions";
import like from "./../../assets/images/feed/thumb-up.png";
import unlike from "./../../assets/images/feed/thumb-up-filled.png";
import comment from "./../../assets/images/feed/comment.png";
import share from "./../../assets/images/feed/share.png";

export default function Feed() {
  const { posts } = useSelector((state) => state.feed);

  const [postList, setPostList] = useState(posts);

  async function handleLike(post) {
    console.log("liked..");
    const response = await fetch(
      `http://localhost:8080/api/posts/like/${post._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const newPost = await response.json();

      const updatedPostList = postList.map((p) =>
        p._id === newPost._id ? { ...p, is_liked: true } : p
      );
      setPostList(updatedPostList);
      console.log(updatedPostList);
    } else {
      throw new Error({ message: "something went wrong" });
    }
  }

  async function handleUnlike(post) {
    console.log("Unliked..");
    const response = await fetch(
      `http://localhost:8080/api/posts/unlike/${post._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const newPost = await response.json();

      const updatedPostList = postList.map((p) =>
        p._id === newPost._id ? { ...p, is_liked: false } : p
      );
      setPostList(updatedPostList);
      console.log(updatedPostList);
    } else {
      throw new Error({ message: "something went wrong" });
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    setPostList(posts);
  }, [dispatch, posts]);

  return (
    <>
      <div className="container-fluid row">
        <div className="card col-md-8">
          <div className="card-body">
            <div className="col-md-12">
              <h5 className="card-title fw-semibold mb-4">Feed</h5>
              {postList.map((post, key) => (
                <div className="card" id={"post_section" + key}>
                  <div className="card-body">
                    <h5 className="card-title">
                      <img
                        src={post.user.avatar}
                        alt=""
                        width="45"
                        height="45"
                        className="rounded-circle"
                        style={{ marginRight: "3%" }}
                      />
                      {post.user.first_name + " " + post.user.last_name}
                    </h5>
                    <small>about an hour ago</small>
                    <p className="card-text">{post.description}</p>
                    <div className="row">
                      {post.medias.map((media, key) => (
                        <div
                          id={"post_media_" + key}
                          className="col-md-6 p-0 m-0"
                          style={{
                            maxHeight: "270px",
                            backgroundSize: "cover",
                          }}
                        >
                          <img
                            src={"http://localhost:8080/" + media.path}
                            className="card-img-top image-container"
                            alt="..."
                            style={{ maxHeight: "inherit" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2">
                    <hr />
                    <div
                      className="container row mx-auto"
                      style={{ maxHeight: "30px" }}
                    >
                      {post.is_liked ? (
                        <div className="col-md-4">
                          <button
                            type="button"
                            className="btn btn-light feed-button"
                            onClick={() => handleUnlike(post)}
                          >
                            <img
                              src={unlike}
                              alt="..."
                              className="img-fluid mx-auto d-block"
                              style={{ maxHeight: "24px" }}
                            />
                          </button>
                        </div>
                      ) : (
                        <div className="col-md-4">
                          <button
                            type="button"
                            className="btn btn-light feed-button"
                            onClick={() => handleLike(post)}
                          >
                            <img
                              src={like}
                              alt="..."
                              className="img-fluid mx-auto d-block"
                              style={{ maxHeight: "24px" }}
                            />
                          </button>
                        </div>
                      )}

                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-light feed-button"
                        >
                          <img
                            src={comment}
                            style={{ maxHeight: "24px" }}
                            alt="..."
                            className="img-fluid mx-auto d-block"
                          />
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-light feed-button"
                        >
                          <img
                            src={share}
                            style={{ maxHeight: "24px" }}
                            alt="..."
                            className="img-fluid mx-auto d-block"
                          />
                        </button>
                      </div>
                    </div>
                    <hr />
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
                      <div className="col-md-9">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    </>
  );
}
