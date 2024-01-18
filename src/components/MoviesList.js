import { Paper, Rating, Stack, Typography } from '@mui/material'
import React from 'react'

export default function MoviesList({movieData}) {
  return (
    <Paper sx={{p:1}}>
      <Stack spacing={2}>
        {(movieData.length > 0) &&
          movieData.map((item)=>{
            return (
              <Stack spacing={0} key={item?.id}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant='subtitle1'> {item?.title} </Typography>
                  <Typography sx={{color:'#888'}} variant='body2'> {item?.category} </Typography>
                </Stack>
                <Rating readOnly size="small" defaultValue={item?.rating} max={10} precision={0.1} />
              </Stack>
            )
          })
        }
        {(movieData.length < 1) &&
          <Typography variant='subtitle1'> No Recored! </Typography>
        }
      </Stack>
    </Paper>
  )
}