import React, { useEffect, useState } from "react";
import "./Post.css";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { Card } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postOwner, setPostOwner] = useState();

  useEffect(() => {
    let isMounted = true;

    const fetchPostOwner = async () => {
      const userId = data.userId;
      try {
        const user = await getUser(userId);
        if (isMounted) {
          setPostOwner(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostOwner();

    return () => {
      isMounted = false;
    };
  }, [data]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <Card className="Post">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={
            postOwner?.data.profilePicture
              ? "http://localhost:5001/images/" + postOwner?.data.profilePicture
              : "http://localhost:5001/images/" + "defaultProfile.png"
          }
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />
        <h2>{postOwner?.data.username}</h2>
      </div>

      <img
        src={data.image ? "http://localhost:5001/images/" + data.image : ""}
        alt=""
      />

      <div className="postReact">
        {liked ? (
          <FavoriteIcon sx={{ cursor: "pointer" }} onClick={handleLike} />
        ) : (
          <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={handleLike} />
        )}
        <span style={{ fontSize: "12px" }}>{likes} likes</span>
      </div>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </Card>
  );
};

export default Post;
