import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../features/auth/authActions";

export default function FileUploader() {
  const options = {
    apiKey: "public_12a1ykrDGEWzTFSzLc4prEZuoB2y",
    maxFileCount: 1,
    showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };

  const dispatch = useDispatch();

  function onUpdateAvatar(url) {
    console.log("dispatching");
    console.log(url);
    dispatch(updateAvatar(url));
  }

  return (
    <UploadDropzone
      options={options}
      onComplete={(files) => {
        console.log("onComplete");
        files.map((x) => onUpdateAvatar(x.fileUrl));
      }}
      width="500px"
      height="300px"
    />
  );
}
