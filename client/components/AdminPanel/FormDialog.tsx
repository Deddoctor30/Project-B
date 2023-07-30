// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextFieldItem from './TextFieldItem';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// React
import { useEffect, useState } from 'react';

// Логика
import FileUploader from './FileUploader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createData, setElement, updateData } from '../../slices/adminSlice';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru'
import { createUsers } from '../../slices/userSlice';
import { IArticle } from '../../types/article';
import { IContact } from '../../types/contact';
import { ICompetition } from '../../types/competition';
import { ICoach } from '../../types/coach';



export default function FormDialog({open, closeWindow}) {
  const status = useAppSelector(state => state.admin.status)
  const dispatch = useAppDispatch()
  const dataItems = useAppSelector(state => state.admin.dataItems)
  const section = useAppSelector(state => state.admin.section)
  const element = useAppSelector(state => state.admin.element)

  // const [dataItems, setDataItems] = useState<any[]>([])
  const [name, setName] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNum, setPhoneNum] = useState<any>(undefined)
  const [files, setFiles] = useState<any>([])
  const [avatar, setAvatar] = useState<any>([])
  const [isClinical, setIsClinical] = useState<any>(false)
  const [isSwiper, setIsSwiper] = useState<boolean>(false)
  const [isCompetition, setIsCompetition] = useState<any>('')
  const [start, setStart] = useState<string>('')
  const [meeting, setMeeting] = useState<string>('')
  const [arrive, setArrive] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dateValueStart, setDateValueStart] = useState<Dayjs | undefined>(undefined);
  const [dateValueEnd, setDateValueEnd] = useState<Dayjs | undefined>(undefined);
  const [time, setTime] = useState<Dayjs | undefined>(undefined);

  // coach
  const [position, setPosition] = useState<string>('')
  const [weapon, setWeapon] = useState<string>('')
  const [teachSince, setTeachSince] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [education, setEducation] = useState<string>('')
  const [contact, setContact] = useState<string>('')


  dayjs.locale('ru') 

  const palette = ['#c9dc87', '#eabf8699', '#eeccee', '#ede6d594', '#9c6d5775', '#b6b5a070', '#a3d1e854', '#819dbe6d', '#c51f2771', '#f6f1e5a0', '#db71938c']
  const randomPalette = () => {
    return palette[Math.floor(Math.random()*palette.length)];
  }

  const setNullState = () => {
    setName('')
    setContent('')
    setEmail('')
    setPhoneNum(undefined)
    setFiles([])
    setIsClinical(false)
    setIsCompetition('')
    setAvatar([])
    setFiles([])
    setStart('')
    setMeeting('')
    setArrive('')
    setPlace('')
    setPassword('')
    setDateValueStart(undefined)
    setDateValueEnd(undefined)
    setTime(undefined)
    setPosition('')
    setWeapon('')
    setTeachSince('')
    setCategory('')
    setEducation('')
    setContact('')
    setIsSwiper(false)
  }
   
  // Обновление данных
  useEffect(() => {
    setName((element as IArticle)?.name)
    setContent((element as IArticle)?.content)
    setEmail((element as IContact)?.email)
    setPhoneNum((element as IContact)?.phoneNumber)
    setIsCompetition((element as ICompetition)?.status)
    setStart((element as ICompetition)?.start)
    setMeeting((element as ICompetition)?.meeting)
    setArrive((element as ICompetition)?.arrive)
    setPlace((element as ICompetition)?.place)
    setDateValueStart(dayjs((element as ICompetition)?.dateStart))
    setDateValueEnd(dayjs((element as ICompetition)?.dateEnd))
    setTime(dayjs((element as ICompetition)?.time))
    setPosition((element as ICoach)?.position)
    setWeapon((element as ICoach)?.weapon)
    setTeachSince((element as ICoach)?.teachSince)
    setCategory((element as ICoach)?.category)
    setEducation((element as ICoach)?.education)
    setContact((element as ICoach)?.contact)
  }, [element])

  useEffect(() => {
    if (open !== true) {
      setNullState()
      dispatch(setElement({}))
    }
  }, [open])


  const uploadData = async (type: string) => {
    const formData = new FormData()
    switch (section) {
      case 'article': 
        formData.append('name', name)
        formData.append('content', content)
        formData.append('swiper', `${isSwiper}`)
        break;
      case 'competition':
        formData.append('name', name)
        formData.append('content', content)
        formData.append('status', isCompetition)
        formData.append('start', start)
        formData.append('meeting', meeting)
        formData.append('arrive', arrive)
        formData.append('place', place)
        const validDateStart = dayjs(dateValueStart).toDate()
        const validDateEnd = dayjs(dateValueEnd).toDate()
        const valideTime = dayjs(time).toDate()
        formData.append('dateStart', `${validDateStart}`)
        formData.append('dateEnd', `${validDateEnd}`)
        formData.append('time', `${valideTime}`)
        formData.append('palette', randomPalette())
        break;
      case 'coach':
        formData.append('name', name)
        formData.append('content', content)
        formData.append('position', position)
        formData.append('weapon', weapon)
        formData.append('teachSince', teachSince)
        formData.append('category', category)
        formData.append('education', education)
        formData.append('contact', contact)
        break;
      case 'clinical':
        formData.append('name', name)
        formData.append('status', isClinical)
        break;
      case 'contact': 
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phoneNumber', `${phoneNum}`)
        break;
      case 'user': 
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('role', content)
        break;
    }
    formData.append('id', element.id)
    if (section === 'coach' && type === 'update') {
      formData.append('currentAvatar', element.avatar)
    }
   
    // Загрузка в галерею
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i])
      }
    
    // Загрузка аватара
      for (let i = 0; i < avatar.length; i++) {
        formData.append('avatar', avatar[i])
      }
    
      console.log(isSwiper);
      

    // Лог FormData
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }


    const data = {
      formData,
      section,
      id: element.id
    }

    if (type === 'create') {
      if (section === 'user') {
        dispatch(createUsers(formData))
      } else {
        dispatch(createData(data))
      }
    }

    if (type === 'update') {
      dispatch(updateData(data))
    }
  }


  const clickHandler = () => {
    uploadData('create')
    closeWindow()
  }

  const updateHandler = () => {
    uploadData('update')
    closeWindow()
  }

  const closeWindowHandler = () => {
    closeWindow()
  }

  const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsClinical(event.target.checked)
  }

  const swiperHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwiper(event.target.checked)
  }

  return (
    <div>
      {status === 'idle' &&
        <>
          <Dialog maxWidth='md' fullWidth open={open} onClose={closeWindow}>
            <DialogTitle>{dataItems.length !== 0 ? 'Создать новую запись' : 'Выберите категорию'}</DialogTitle>
            <DialogContent>
              {section === 'competition' || section === 'article' || section === 'coach'
                ?
                  <>
                    <TextFieldItem id='name' required={true} label={section === 'coach' ? 'Имя тренера' : 'Название события'} type='text' value={name} setValue={setName} autoFocus={true}/>
                    <TextFieldItem id='content' label='Описание' type='text' value={content} setValue={setContent} rows={4}/>
                      {section === 'article' &&
                        <FormControlLabel id='cheker' sx={{marginTop: '15px', display: 'block'}} control={<Checkbox checked={isSwiper} onChange={swiperHandler} size='medium'/>} label="Добавить на слайдер на главной странице" />
                      }
                      {section === 'competition' &&
                        <>
                          <TextFieldItem id='start' label='Отправление' type='text' value={start} setValue={setStart}/>
                          <TextFieldItem id='meeting' label='Встреча' type='text' value={meeting} setValue={setMeeting}/>
                          <TextFieldItem id='arrive' label='Обратно' type='text' value={arrive} setValue={setArrive}/>
                          <TextFieldItem id='place' label='Место проведения' type='text' value={place} setValue={setPlace}/>
                          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
                              <DatePicker sx={{ minWidth: 150}} label="Старт мероприятия" value={dateValueStart} onChange={(newValue) => setDateValueStart(newValue)}/>
                              <TimePicker label="Время начала" value={time} onChange={(newValue) => setTime(newValue)}/>
                              <DatePicker sx={{ minWidth: 150}} label="Конец мероприятия" value={dateValueEnd} onChange={(newValue) => setDateValueEnd(newValue)}/>
                            </LocalizationProvider>
                          </Box>
                        </>
                      }
                      {section === 'coach' &&
                        <>
                          <TextFieldItem id='position' label='Должность' type='text' value={position} setValue={setPosition}/>
                          <TextFieldItem id='weapon' label='Вид оружия' type='text' value={weapon} setValue={setWeapon}/>
                          <TextFieldItem id='teachSince' label='Преподает с' type='text' value={teachSince} setValue={setTeachSince}/>
                          <TextFieldItem id='category' label='Тренерская категория' type='text' value={category} setValue={setCategory}/>
                          <TextFieldItem id='education' label='Образование' type='text' value={education} setValue={setEducation}/>
                          <TextFieldItem id='contact' label='Контакты' type='text' value={contact} setValue={setContact}/>
                          <FileUploader purpose={'Загрузить аватар'} accept='image/*' setFiles={setAvatar} multiple={false}/>
                        </>
                      }
                      <FileUploader purpose={'Загрузить картинки в галерею'} accept='image/*' setFiles={setFiles} multiple={true}/>
                      {Object.entries(element).length !== 0 &&
                        <p style={{marginTop: '10px', color: 'red'}}>Существующие картинки будут удалены</p>
                      }
                  </>
                :
                  null
              }

              {section === 'clinical' &&
                <>
                  <TextFieldItem id='clinicalName' label={'Имя студента'} required={true} type='text' value={name} setValue={setName} autoFocus={true}/>
                  <FormControlLabel id='cheker' sx={{marginTop: '15px'}} control={<Checkbox checked={isClinical} onChange={checkBoxHandler} size='medium'/>} label="Диспансеризация пройдена" />
                </>
              }

              {section === 'contact' &&
                <>
                  <TextFieldItem id='contactName' label={'Имя контакта'} type='text' value={name} setValue={setName} autoFocus={true}/>
                  <TextFieldItem id='contactContent' label='Введите E-mail' type='email' value={email} setValue={setEmail}/>
                  <TextFieldItem helper='Пример номера: x (xxx) xxx-xx-xx' id='tel' label='Введите Номер телефона' type='tel' value={phoneNum} setValue={setPhoneNum}/>
                </>
              }

              {section === 'user' &&
                <>
                  <TextFieldItem id='userName' label={'Имя пользователя'} type='text' value={name} setValue={setName} autoFocus={true}/>
                  <TextFieldItem id='userEmail' label='Введите E-mail' type='email' value={email} setValue={setEmail}/>
                  <TextFieldItem id='userRole' label='Роль' type='text' value={content} setValue={setContent}/>
                  <TextFieldItem id='userPassword' label='Пароль' type='text' value={password} setValue={setPassword}/>
                </>
              }


            </DialogContent>
            <DialogActions>
              {Object.entries(element).length === 0
                ?
                <Button id='apply' sx={{padding: '15px 20px'}} size='large' onClick={clickHandler}>Создать запись</Button>
                :
                <>
                  <Button id='apply' sx={{padding: '15px 20px'}} size='large' onClick={updateHandler}>Обновить информацию</Button>
                </>
              }
              <Button id='cancel' sx={{padding: '15px 20px'}} size='large' color='error' onClick={closeWindowHandler}>Отмена</Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </div>
  );
}