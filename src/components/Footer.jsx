import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      color={theme.palette.error.main}
      textAlign="center"
      bgColor={theme.palette.secondary.main}
      sx={{position: 'fixed', width: '100%', height: 30, bottom: 0}}
      >
      <Typography variant="subtitle">Movie App</Typography>
      <Typography variant="subtitle"> Copyright &copy; 2022</Typography>
    </Box>
  )
}

export default Footer
