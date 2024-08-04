import React, { FC } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";

interface FileUploadModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  getImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadImage: () => void;
  currentImage: { name: string };
  progress: number;
}

const FileUploadModal: FC<FileUploadModalProps> = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) => {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage.name}</p>
          <label className="upload-btn" htmlFor="image-upload">
            Add an Image
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}

export default FileUploadModal;