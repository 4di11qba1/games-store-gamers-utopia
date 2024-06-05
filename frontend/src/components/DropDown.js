import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox } from '@mui/material';
import {FormControlLabel} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Dropdown({text}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {text}
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><FormControlLabel control={<Checkbox defaultChecked />} label="Name" /></MenuItem>
        <MenuItem onClick={handleClose}><FormControlLabel control={<Checkbox />} label="Rating" /></MenuItem>
        <MenuItem onClick={handleClose}><FormControlLabel control={<Checkbox />} label="Date Added" /></MenuItem>
      </Menu>
    </div>
  );
}