import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function GList({ heading, itemData, h, card, options, handleView }) {
  const nav = useNavigate();

  return (
    <>
      {card ? (
          <Card sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: h ? h : '320px', flexGrow: 1, borderRadius: '15px', padding: '0 8px 0 8px' }}>
            {heading != null && (
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1, padding: '10px' }}>
                <Typography component="div" variant="h6" fontWeight={'bold'} sx={{ marginLeft: '20px' }}>
                  {heading}
                </Typography>
                <IconButton>
                  <ArrowForwardIcon />
                </IconButton>
              </div>
            )}
            <List sx={{ width: '100%', overflowY: 'auto', flex: 1 }}>
              {itemData.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="center" className='hoverableElement' sx={{ borderRadius: '15px' }} onClick={() => handleView(index)}>
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={item.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={item.genre}
                    />
                    {options && <IconButton><Delete /></IconButton>}
                  </ListItem>
                  {index < itemData.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: h ? h : '320px', flexGrow: 1 }}>
          {heading != null && (
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1, padding: '10px' }}>
              <Typography component="div" variant="h6" fontWeight={'bold'} sx={{ marginLeft: '20px' }}>
                {heading}
              </Typography>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          )}
          <List sx={{ width: '100%', overflowY: 'auto', flex: 1 }}>
            {itemData.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" className='hoverableElement' sx={{ borderRadius: '15px' }} onClick={() => nav('/store/game')}>
                  <ListItemAvatar>
                    <Avatar alt={item.title} src={item.img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.genre}
                  />
                </ListItem>
                {index < itemData.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </div>
      )}
    </>
  );
}