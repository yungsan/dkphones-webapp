import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Cloudinary } from "../utils/definitions";

const UploadWidget = ({
  URL,
  setURL,
}: {
  URL: string;
  setURL: Dispatch<SetStateAction<string>>;
}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [src, setSrc] = useState(
    "https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
  );

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: Cloudinary.cloudName,
        uploadPreset: Cloudinary.uploadPreset,
        cropping: true,
      },
      function (error: any, result: any) {
        if (result.event === "success") {
          setURL(result.info.url);
          setSrc(result.info.url);
          console.log(result.info.url);
        }
      }
    );
  }, []);

  return (
    <div>
      <img
        src={URL || src}
        alt="preview"
        className="w-full h-60 object-cover"
        onClick={() => widgetRef.current.open()}
      />
    </div>
  );
};

export default UploadWidget;
