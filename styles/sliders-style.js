import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export  const PricesSliders = styled(Slider)({
    color: '#2B363D',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#757575',
      },
  });