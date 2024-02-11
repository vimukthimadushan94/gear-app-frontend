import logo from "../../assets/images/logos/logo.png";
export function Comments({ comments }) {
  return (
    <>
      {comments &&
        comments.map((comment, index) => (
          <>
            <div key={index} className="p-2 row">
              <div className="col-md-2">
                <img
                  src={logo}
                  alt=""
                  width="45"
                  height="45"
                  className="rounded-circle"
                />
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  value={comment.comment}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
          </>
        ))}
      <hr></hr>
    </>
  );
}
