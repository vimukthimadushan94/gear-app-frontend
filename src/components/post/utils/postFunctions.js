export async function postLike(post) {
  console.log("liked..");
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `api/posts/like/${post._id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export async function postUnlike(post) {
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `api/posts/unlike/${post._id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export async function createComment(data, post) {
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `api/comment/${post._id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response;
}

export async function getComments(postId) {
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `api/comment/${postId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
