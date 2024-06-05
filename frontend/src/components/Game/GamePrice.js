import { Button, Card, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import React from 'react'

function GamePrice() {
  return (
    <Card sx={{display: 'flex', flexDirection: 'column', minWidth: '20vw', padding: '25px', borderRadius: '15px', gap: '5px', justifyContent: 'center'}}>
        <Typography component="div" variant="h4">
            $89.99
        </Typography>
        <Button variant="contained">Buy Now</Button>
        <Button variant="contained">Add to Cart</Button>
        <Button variant="text"><Add />Add to Wishlist</Button>
    </Card>
  )
}

export default GamePrice