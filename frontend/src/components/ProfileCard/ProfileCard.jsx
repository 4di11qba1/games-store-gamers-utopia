import React from "react";
import "./ProfileCard.css";
import { Card, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = "http://localhost:5001/images/";

  return (
    <Card className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span style={{ fontWeight: "lighter" }}>{user.username}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        {/* <hr /> */}
        <Divider />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <Divider orientation="vertical" />
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <Divider orientation="vertical" />
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <Divider sx={{ marginBottom: "15px" }} />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Button variant="contained">
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              My Profile
            </Link>
          </Button>
        </span>
      )}
    </Card>
  );
};

export default ProfileCard;
