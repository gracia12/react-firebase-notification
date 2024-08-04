import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

interface LikeButtonProps {
  userId: string;
  postId: string;
  recipientUserId: string;
  postData: any;
  currentUser: any;
}

export default function LikeButton({ userId, postId, recipientUserId, postData, currentUser }: LikeButtonProps) {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  
  const handleLike = () => {
    likePost(userId, recipientUserId, postData, postId, liked);
  };
  
  const getComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(recipientUserId, postData, userId, postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };
  
  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);
  
  return (
    <div className="like-container">
      <p>{likesCount} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>

                  <p className="timestamp">{comment.timeStamp}</p>
                  {/*
                  <p>•</p>
                   */}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}