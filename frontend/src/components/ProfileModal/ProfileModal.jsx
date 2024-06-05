import React, { useState } from "react";
import { Modal } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";
import { 
  FormControl,
  FormHelperText, 
  Input, 
  InputLabel, 
  Card, 
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material';

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.palette.background.default
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <Card className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          {/* <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          /> */}
          <FormControl sx={{width: '100%'}}>
              <InputLabel htmlFor="my-first">First Name</InputLabel>
              <Input 
                id="my-first" 
                aria-describedby="my-helper-text" 
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your firstname</FormHelperText>
          </FormControl>
          {/* <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          /> */}
          <FormControl sx={{width: '100%'}}>
              <InputLabel htmlFor="my-last">Last Name</InputLabel>
              <Input 
                id="my-last" 
                aria-describedby="my-helper-text" 
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your lastname</FormHelperText>
          </FormControl>
        </div>

        <div>
          {/* <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          /> */}
          <FormControl sx={{width: '100%', marginTop: '25px'}}>
              <InputLabel htmlFor="my-work">Works At</InputLabel>
              <Input 
                id="my-work" 
                aria-describedby="my-helper-text" 
                name="worksAt"
                value={formData.worksAt}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your workplace</FormHelperText>
          </FormControl>
        </div>

        <div>
          {/* <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          /> */}
          <FormControl sx={{width: '100%', marginTop: '55px'}}>
              <InputLabel htmlFor="my-live">Lives In</InputLabel>
              <Input 
                id="my-live" 
                aria-describedby="my-helper-text" 
                name="livesIn"
                value={formData.livesIn}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your city</FormHelperText>
          </FormControl>
          {/* <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          /> */}
          <FormControl sx={{width: '100%', marginTop: '55px'}}>
              <InputLabel htmlFor="my-country">Country</InputLabel>
              <Input 
                id="my-country" 
                aria-describedby="my-helper-text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your country</FormHelperText>
          </FormControl>
        </div>

        <div>
          {/* <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          /> */}
          <FormControl sx={{width: '100%', marginTop: '85px'}}>
              <InputLabel htmlFor="my-relationship">Relationship</InputLabel>
              <Input 
                id="my-relationship" 
                aria-describedby="my-helper-text" 
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">Enter your relationship status</FormHelperText>
          </FormControl>
        </div>

        <div style={{marginTop: '110px'}}>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Card>
    </Modal>
  );
};

export default ProfileModal;
