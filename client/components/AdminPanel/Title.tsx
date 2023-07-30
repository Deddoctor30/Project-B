// React
import { FC } from 'react';

// MUI
import Typography from '@mui/material/Typography';


interface TitleProps {
  children?: React.ReactNode;
  variatn?: string
  sx?: object
  textColor?: string
}

const Title: FC<TitleProps> = ({children, sx, textColor = 'primary'}) => {
  return (
    <Typography sx={sx} component="h2" variant="h6" color={textColor}>
      {children}
    </Typography>
  );
}

export default Title