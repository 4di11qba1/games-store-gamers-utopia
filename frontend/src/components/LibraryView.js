import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Dialog, DialogContent, IconButton, ListItemText, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function LibraryView({ item, h, closeView }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedImagePath, setClickedImagePath] = useState(null);

  const handleOpenDialog = (imagePath) => {
    setClickedImagePath(imagePath);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setClickedImagePath(null);
    setOpenDialog(false);
  };

  return (
    <>
      <Card sx={{ width: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: h ? h : '320px', borderRadius: '15px', padding: '10px', gap: '10px' }}>
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 0 15px'}}>
          <Typography component="div" variant="h6">
            Details
          </Typography>
          <IconButton onClick={closeView}><CloseIcon /></IconButton>
        </div>
        <CardMedia
          component="img"
          alt={item.title}
          height="200"
          image={item.img}
          sx={{ borderRadius: '15px', cursor: 'pointer' }}
          onClick={() => handleOpenDialog([item.img])}
        />
        <CardContent>
            <ListItemText
                primary={item.title}
                secondary={item.genre}
            />
            <Typography component="div" variant="p">
                {item.desc}
            </Typography>
            <ListItemText
                secondary={'Screenshots'}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', cursor: 'pointer' }}>
                <img onClick={() => handleOpenDialog('/img/games/ffxv-gameplay.png')} src={'/img/games/ffxv-gameplay.png'} height={'40px'} alt={'ss'} />
                <img onClick={() => handleOpenDialog('/img/games/ffxv-gameplay1.png')} src={'/img/games/ffxv-gameplay1.png'} height={'40px'} alt={'ss'} />
                <img onClick={() => handleOpenDialog('/img/games/ffxv-gameplay2.png')} src={'/img/games/ffxv-gameplay2.png'} height={'40px'} alt={'ss'} />
                <img onClick={() => handleOpenDialog('/img/games/ffxv-gameplay3.png')} src={'/img/games/ffxv-gameplay3.png'} height={'40px'} alt={'ss'} />
                <img onClick={() => handleOpenDialog('/img/games/ffxv-gameplay4.png')} src={'/img/games/ffxv-gameplay4.png'} height={'40px'} alt={'ss'} />
            </div>
        </CardContent>
      </Card>

      {/* Dialog for the lightbox */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
          {/* Display the clicked image in full-screen */}
          {clickedImagePath && <img src={clickedImagePath} alt={'full-screen-ss'} style={{ width: '100%', height: 'auto' }} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LibraryView;
