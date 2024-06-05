import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js'
import { Card } from '@mui/material'
const TrendCard = () => {
  return (
   <Card className="TrendCard">
       <h3>Trends for your</h3>


       {TrendData.map((trend, id)=>{
            return(
                <div className="trend" key={id}>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            )
       })}
   </Card>
  )
}

export default TrendCard