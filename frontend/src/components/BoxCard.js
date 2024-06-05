import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Star } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

export default function BoxCard({item}) {
  const theme = useTheme();
  return (
    <Card sx={{ width: '260px', borderRadius: '5px', flexGrow: 1, paddingBottom: '15px' }} className='hoverableElement'>
      <CardMedia
        sx={{ height: '160px' }}
        image={item.img}
        title={item.title}
      />
      <CardContent sx={{padding: '15px', height: '100px'}}>
        <Typography gutterBottom variant="p" component="div">
          {item.title}
        </Typography><br />
        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                {item.rating}
                <Star sx={{height: '15px', width: '15px', transform: 'translateY(2px)'}} />
            </div>
            <p style={{ fontSize: '10px', backgroundColor: theme.palette.background.paper, padding: '5px', borderRadius: '5px' }}>{item.genre}</p>
        </CardActions>
      </CardContent>
    </Card>
  );
}