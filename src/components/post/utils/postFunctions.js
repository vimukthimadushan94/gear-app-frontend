export async function postLike(post) {
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

  return response;
}

export async function postUnlike(post) {
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

  return response;
}
