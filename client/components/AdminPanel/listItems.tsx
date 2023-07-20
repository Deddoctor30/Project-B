// MUI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

// Icons
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// React
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchData, sectionChanger } from '../../slices/adminSlice';



export default function mainListItems () {
  const dispatch = useAppDispatch()

  const [isActive, setIsActive] = useState<number>(null)

  const data = ['События', 'Соревнования', 'Тренеры', 'Диспансеризация', 'Контакты', 'Пользователи'];
  const dataRoot = ['article', 'competition', 'coach', 'clinical', 'contact', 'user'];

  const btnHandler = (i:number) => {
    switch (i) {
      case 0: 
        return <ArticleIcon />
      case 1:
        return <EmojiEventsIcon />
      case 2:
        return <PeopleIcon />
      case 3:
        return <MedicalInformationIcon />
      case 4:
        return <ContactMailIcon />
      case 5:
        return <AccountCircleIcon />
    }
  }

  const clickHandler = (i:number) => {
    setIsActive(i);
    dispatch(fetchData(dataRoot[i]))
    dispatch(sectionChanger(dataRoot[i]))
  }
  
  return (
    <>
      <ListSubheader sx={{fontSize: '1.125rem'}} component="div" inset>
        Категории
      </ListSubheader>
        {data.map((item, i) =>
              <ListItemButton id={i.toString()} sx={isActive === i ? {backgroundColor: 'rgb(21, 101, 192)', color: 'white', "&.MuiButtonBase-root:hover": {
                  bgcolor: "rgb(21, 101, 192)"
                }} : {}} key={i} onClick={():void => clickHandler(i)}>
                  <ListItemIcon >
                    {btnHandler(i)}
                  </ListItemIcon>
                <ListItemText  primary={item} />
            </ListItemButton>
        )}
    </>
  )

};
