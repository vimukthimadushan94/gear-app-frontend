import { useEffect, useState } from "react";
import RightBar from "../site/RightBar";
import { useDispatch } from "react-redux";
import like from "./../../assets/images/feed/thumb-up.png";
import unlike from "./../../assets/images/feed/thumb-up-filled.png";
import comment from "./../../assets/images/feed/comment.png";
import share from "./../../assets/images/feed/share.png";
import { postLike, postUnlike } from "./utils/postFunctions";
import { CreateComment } from "./CreateComment";
import { formatDistanceToNow } from "date-fns";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [postList, setPostList] = useState(posts);

  async function handleLike(post) {
    console.log("liked..");
    const response = await postLike(post);

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
    const response = await postUnlike(post);

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

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}api/posts?page=${currentPage}&limit=${itemsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, ...data]);
      });
  }, [currentPage]);

  return (
    <>
      <div className="container-fluid row">
        <div className="card col-md-8">
          <div className="card-body">
            <div className="col-md-12">
              <h5 className="card-title fw-semibold mb-4">Feed</h5>
              {posts.map((post, key) => (
                <div className="card" id={"post_section" + key}>
                  <div className="card-body">
                    <h5 className="card-title">
                      <img
                        src={
                          process.env.REACT_APP_BACKEND_URL + post.user.avatar
                        }
                        alt=""
                        width="45"
                        height="45"
                        className="rounded-circle"
                        style={{ marginRight: "3%" }}
                      />
                      {post.user.first_name + " " + post.user.last_name}
                    </h5>
                    <small>{`${formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}`}</small>
                    <p className="card-text">{post.description}</p>
                    <div className="row">
                      {post.medias.map((media, key) => (
                        <div
                          id={"post_media_" + key}
                          className={`col-md-6 p-0 m-0 ${
                            post.medias.length === 1 ? "col-md-12" : "col-md-6"
                          }`}
                          style={{
                            maxHeight:
                              post.medias.length === 1 ? "540px" : "270px",
                            backgroundSize: "cover",
                          }}
                        >
                          <img
                            src={process.env.REACT_APP_BACKEND_URL + media.path}
                            className="card-img-top image-container"
                            alt="..."
                            style={{
                              maxHeight: "300px",
                              maxWidth: "fit-content",
                              padding: "2%",
                            }}
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
                    <CreateComment post={post} />
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
