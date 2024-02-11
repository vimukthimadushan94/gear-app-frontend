export function Comments({ comments }) {
  return (
    <>
      {comments &&
        comments.map((comment, index) => (
          <>
            <div key={index} className="p-2 row">
              <div className="col-md-2">
                {comment.user && (
                  <img
                    src={comment.user.avatar}
                    alt=""
                    width="45"
                    height="45"
                    className="rounded-circle"
                  />
                )}
              </div>
              <div className="col-md-10">
                <textarea className="form-control" disabled>
                  {comment.comment}
                </textarea>
              </div>
            </div>
          </>
        ))}
      <hr></hr>
    </>
  );
}
