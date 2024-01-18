import { useEffect } from "react";
import RightBar from "../site/RightBar";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/feed/feedsActions";

export default function Feed() {
  const { posts } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(posts);

  return (
    <>
      <div class="container-fluid row">
        <div class="card col-md-8">
          <div class="card-body">
            <div class="col-md-12">
              <h5 class="card-title fw-semibold mb-4">Feed</h5>
              {posts.map((post, key) => (
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      <img
                        src={post.user.avatar}
                        alt=""
                        width="45"
                        height="45"
                        className="rounded-circle"
                        style={{ "margin-right": "3%" }}
                      />
                      {post.user.first_name + " " + post.user.last_name}
                    </h5>
                    <small>about an hour ago</small>
                    <p class="card-text">{post.description}</p>
                    <div className="row">
                      {post.medias.map((media, key) => (
                        <div
                          className="col-md-6 p-0 m-0"
                          style={{
                            "max-height": "270px",
                            "background-size": "cover",
                          }}
                        >
                          <img
                            src={"http://localhost:8080/" + media.path}
                            class="card-img-top image-container"
                            alt="..."
                            style={{ maxHeight: "inherit" }}
                          />
                        </div>
                      ))}
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
