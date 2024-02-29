import { ChangeEvent, useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useIntl } from "react-intl";
import { imageUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
type IProps = {
  view: boolean;
  url: string;
  handleUploadAvatar?: (url: string) => void | undefined;
  allowFileTypes?: string;
};
function ImageUpload(props: IProps) {
  const { view, handleUploadAvatar, url, allowFileTypes } = props;
  const intl = useIntl();
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if(!url) return;
    setImageURL(url);
  }, [url]);

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      const src = URL.createObjectURL(event.target.files[0]);
      setImageURL(src);
      let files = event.target.files[0];
      try {
        const data = await imageUpload(files);
        handleUploadAvatar && handleUploadAvatar(data?.data?.data?.filePath);
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
  };

  return (
    <>
      <div className="justify-content-center">
        <label className="cursor-pointer relative rect-img-container">
          <Image src={imageURL || "/media/avatars/blank.png"} fluid className="rounded-circle rect-img"/>
          <Form.Control
            disabled={view}
            type="file"
            size="sm"
            id="select-file-inp"
            className="d-none"
            onChange={handleChangeImage}
            accept={allowFileTypes}
          />
          {!view && (
            <i className="bi bi-camera image-upload-icon text-white fs-1"></i>
          )}
        </label>
      </div>
    </>
  );
}

export default ImageUpload;
