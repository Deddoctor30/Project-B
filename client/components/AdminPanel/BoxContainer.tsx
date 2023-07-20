// React
import React from 'react'

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ICoach } from '../../types/coach';

// Логика
import Title from './Title';

const BoxContainer = ({data}) => {
  return (
   <>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Должность
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).position &&
            <>
               {(data as ICoach).position}
            </>
            }
      </Typography>
      </Box>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Вид оружия
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).weapon &&
            <>
               {(data as ICoach).weapon}
            </>
            }
      </Typography>
      </Box>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Преподает с
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).teachSince &&
            <>
               {(data as ICoach).teachSince}
            </>
            }
      </Typography>
      </Box>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Тренерская категория
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).category &&
            <>
               {(data as ICoach).category}
            </>
            }
      </Typography>
      </Box>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Образование
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).education &&
            <>
               {(data as ICoach).education}
            </>
            }
      </Typography>
      </Box>
      <Box>
      <Title textColor='secondary' sx={{display: 'inline-block'}}>
         Контакты
      </Title>
      <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
            {(data as ICoach).contact &&
            <>
               {(data as ICoach).contact}
            </>
            }
      </Typography>
      </Box>
   </>
  )
}

export default BoxContainer