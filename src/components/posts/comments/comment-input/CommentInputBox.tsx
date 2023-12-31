/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import PropTypes from "prop-types";
import "./CommentInputBox.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import Input from "../../../input/Input";
import { Utils } from "../../../../services/utils/utils.service";
import { socketService } from "../../../../services/socket/socket.service";
import { postService } from "../../../../services/api/post/post.service";
import Button from "../../../button/Button";
import { FaPaperPlane } from "react-icons/fa";

const CommentInputBox = ({ post }) => {
  const { profile } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const dispatch = useDispatch();

  const submitComment = async (event) => {
    event.preventDefault();
    try {
      post = cloneDeep(post);
      post.commentsCount += 1;
      const commentBody = {
        userTo: post?.userId,
        postId: post?._id,
        comment: comment.trim(),
        commentsCount: post.commentsCount,
        profilePicture: profile?.profilePicture,
      };
      socketService?.socket?.emit("comment", commentBody);
      await postService.addComment(commentBody);
      setComment("");
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  useEffect(() => {
    if (commentInputRef?.current) {
      commentInputRef.current.focus();
    }
  }, []);

  return (
    <div className="comment-container" data-testid="comment-input">
      <form className="comment-form" onSubmit={submitComment}>
        <Input
          ref={commentInputRef}
          name="comment"
          type="text"
          value={comment}
          labelText=""
          className="comment-input"
          placeholder="Write a comment..."
          handleChange={(event) => setComment(event.target.value)}
        />
      </form>
      <Button
        label={<FaPaperPlane />}
        className="paper"
        handleClick={submitComment}
      />
    </div>
  );
};
CommentInputBox.propTypes = {
  post: PropTypes.object,
};
export default CommentInputBox;
