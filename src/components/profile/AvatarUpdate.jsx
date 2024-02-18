import { useState } from "react";
import { useSelector } from "react-redux";
// import avatarPlaceholder from "./../../assets/images/profile/avatar-placeholder.png";

export default function AvatarUpdate() {
  const { avatarUrl } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };
  return (
    <>
      <div className="modal fade">
        <div className="col-md-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              width="195"
              height="195"
              className="rounded-circle"
            />
          ) : (
            ""
          )}
        </div>
        <div className="col-md-8">
          <div style={styles.container}>
            <input
              class="form-control"
              accept="image/*"
              type="file"
              onChange={imageChange}
            />

            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                  width="195"
                  height="195"
                  className="rounded-circle"
                />
                <button onClick={removeSelectedImage} style={styles.delete}>
                  Remove This Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
