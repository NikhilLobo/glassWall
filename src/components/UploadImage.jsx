import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_KEY, API_URL } from "../api/config";

const UploadImage = ({ setUploadNumber, setActiveTab }) => {
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = async (info) => {
    const { file, onSuccess } = info;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sub_id", Math.random().toString(16).substr(2, 8));
    const imageUpload = await fetch(`${API_URL}/images/upload`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
      },
      body: formData,
    });
    if (imageUpload.ok) {
      onSuccess(true);
      setUploadNumber((uploloadNumber) => uploloadNumber + 1);
      setTimeout(() => {
        setActiveTab("1");
      }, 1000);
    }
  };
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        progress={true}
        customRequest={handleChange}
        onRemove={false}
      >
        {uploadButton}
      </Upload>
    </>
  );
};

export default UploadImage;
