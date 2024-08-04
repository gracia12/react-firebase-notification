import { FC, useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "./index.scss";

interface ModalComponentProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  sendStatus: () => void;
  setStatus: (status: string) => void;
  status: string;
  isEdit: boolean;
  updateStatus: () => void;
  uploadPostImage: (file: File, setPostImage: (image: string) => void, setProgress: (progress: number) => void) => void;
  setPostImage: (image: string) => void;
  postImage: string;
  currentPost: { postImage: string };
  setCurrentPost: (post: { postImage: string }) => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState<number>(0);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        visible={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({ postImage: "" });
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({ postImage: "" });
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="Share Something Useful.."
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label htmlFor="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type="file"
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};

export default ModalComponent;