// React
import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';

// MUI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainListItems from '../components/AdminPanel/listItems';
import { Button, DialogActions, DialogTitle, Fab, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Skeleton } from "@mui/material";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';


// Next
import { GetServerSideProps } from 'next';
import LinkNext from 'next/link';
import Head from 'next/head';


// Стили
import styles from '../styles/Error404.module.scss';

//Interface
import { IUser } from '../types/user';

// Логика
import { navData } from '../components/Navigation';
import FormDialog from '../components/AdminPanel/FormDialog';
import Accordions from '../components/AdminPanel/Accordions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { wrapper } from '../store/store';
import { deleteDataItem, deleteStateItems, fetchData } from '../slices/adminSlice';
import TableItem from '../components/AdminPanel/TableItem';
import jwt_decode from "jwt-decode";
import nookies from 'nookies'

// Константы
const drawerWidth: number = 300;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();


interface DashboardProps {
  user: IUser
}

const Dashboard: FC<DashboardProps> = ({user}) => {
  const dispatch = useAppDispatch()
  const section = useAppSelector(state => state.admin.section)
  const [isLoading, setIsLoading] = useState(false)
  
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [refreshRole, setRefreshRole] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [select, setSelect] = useState<string>('Название')
  let data = useAppSelector(state => 
    {
      let sortedData = [...state.admin.dataItems]
      let sorted = sortedData.sort((user1, user2) => user1.id > user2.id ? 1 : -1);
      return sortFunc(filter, sorted)
    })


    // Фильтр
    function sortFunc (word:string, array: any[]) {
      return array.filter(item => {
        const regex = new RegExp(word, 'gi')
        if (select === 'Название') {
          return item.name?.match(regex)
        }
        if (select === 'Содержание') {
          return item.content?.match(regex)
        }
        if (select === 'Почта') {
          return item.email?.match(regex)
        }
      })
    }
    

    useEffect(() => {
      setSelect('Название')
    }, [section])
        
    useEffect(() => {
      if (user){
        setRefreshRole(user.role)
        setIsLoading(true)
      } else {
        setRefreshRole('USER')
        setIsLoading(true)
      }
    }, [])


  const deleteItem = (id:number, images: any) => {
    const data = {
      id,
      section,
      images
    }
    dispatch(deleteDataItem(data))
    dispatch(deleteStateItems(id))
  }
  
  const clickHandler = (id:number, images?: any[]) => {
    deleteItem(id, images)
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Head>
         <title>Панель администратора</title>
         <link rel="icon" href="/favicon.ico" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <meta name="description" content="Фехтовальный клуб Санкт-Петербурга Project A принимает набор студентов в свои ряды для обучения фехтовальному искуству"></meta>

         <link type="image/png" sizes="16x16" rel="icon" href="/img/favicon/icon16.png"/>
         <link type="image/png" sizes="32x32" rel="icon" href="/img/favicon/icon32.png"/>
         <link type="image/png" sizes="96x96" rel="icon" href="/img/favicon/icon96.png"/>
      </Head>
      {isLoading
        ?
          <>
            {refreshRole !== 'ADMIN'
              ?
                <div className={styles['Error-404']}>
                  <h1 className={styles['Error-404__title']}>У Вас нет доступа</h1>
                  <LinkNext href={`/`}><button className={'button'}>Покормить Хомяка на Главной</button></LinkNext>
                </div>
              :
                <ThemeProvider theme={defaultTheme}>
                  <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    {/* Хедер */}
                    <AppBar position="absolute" open={open}>
                      <Toolbar sx={{pr: '24px'}}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{marginRight: '36px', ...(open && { display: 'none' })}}>
                          <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, '@media (max-width: 1782px)': {display: 'none'} }}>
                            Панель Администратора
                        </Typography>

                        <Box sx={{display: { xs: 'none', sm: 'block' }}}>
                          {navData.map((item) => (
                            <Button key={item.url} sx={{ color: '#fff' }}>
                              <LinkNext href={item.url}>{item.name}</LinkNext>
                            </Button>
                          ))}
                        </Box>  

                        {/* <IconButton color="inherit">
                          <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton> */}
                      </Toolbar>
                    </AppBar>

                    {/* Левый бар */}
                    <Drawer variant="permanent" open={open}>
                      <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1]}}>
                        <IconButton onClick={toggleDrawer}>
                          <ChevronLeftIcon />
                        </IconButton>
                      </Toolbar>
                      <Divider />
                      <List component="nav">
                        {<MainListItems/>}
                        <Divider sx={{ my: 1 }} />
                        {/* {secondaryListItems} */}
                      </List>
                    </Drawer>

                    {/* Блок контента */}
                    <Box component="main" sx={{backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto'}}>
                    <Toolbar />

                    {/* Фильтр */}
                    <Box sx={{maxWidth: '1536px', padding: '0 20px', margin: '0 auto', marginTop: '40px', marginBottom: '20px', '@media (max-width: 1005px)': {marginTop: '100px'}}}>
                      <Paper sx={{padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TextField sx={{width: '100%'}} label="Введите запрос" id="filterInput" value={filter} onChange={(e) => setFilter(e.target.value)} />
                        <FormControl variant="standard" sx={{ ml: 3, minWidth: 160 }}>
                        <Select sx={{height: '50px'}} defaultValue='Название' id="filterSelect" value={select} onChange={(e) => setSelect(e.target.value)} label="Название">
                          <MenuItem value='Название'>Название</MenuItem>
                          {section === 'competition' || section === 'article' || section === 'coach'
                            ?
                              <MenuItem value='Содержание'>Содержание</MenuItem>
                            :
                              null
                          }
                          {section === 'contact' || section === 'user'
                            ?
                              <MenuItem value='Почта'>Почта</MenuItem>
                            :
                              null
                          }
                        </Select>
                      </FormControl>
                      </Paper>
                    </Box>

                    <Container maxWidth="xl" sx={{ mb: 4, display: 'flex'}}>
                      <Grid container spacing={1} sx={{justifyContent: 'end'}}>
                        {section === 'article' || section === 'competition' || section === 'coach'
                          ?
                            data.map(item => 
                              <Accordions setOpenDialog={setOpenDialog} key={item.id} dataItem={item} deleteItem={clickHandler}/>
                            ) 
                          :
                          null
                        }
                        {section === 'clinical' || section === 'contact' || section === 'user'
                          ?
                            <TableItem setOpenDialog={setOpenDialog} data={data} deleteItem={clickHandler}/>
                          :
                            null
                        }

                        <FormDialog open={openDialog} closeWindow={handleClose}/>

                        <Fab sx={{position: 'absolute', bottom: "50px", right: "50px"}} color="primary" aria-label="add" onClick={handleClickOpen}>
                          <AddIcon />
                        </Fab>

                      </Grid>
                    </Container>

                    </Box>
                  </Box>
                </ThemeProvider>
            }
          </>
        :
          <Stack spacing={2} sx={{justifyContent: 'center', alignItems: 'center', mt: 6}}>
             <Stack direction={'row'} width={1170} sx={{justifyContent: 'space-between', mb: 5, alignItems: 'end'}}>
              <Skeleton variant="rectangular" width={1050} height={60} />
              <Skeleton variant="circular" width={100} height={100} sx={{alignSelf: 'flex-start'}} />
             </Stack>
            <Skeleton variant="rectangular" width={1170} height={160} />
            <Skeleton variant="rounded" width={1170} height={40} />
            <Skeleton variant="rounded" width={1170} height={40} />
            <Skeleton variant="rounded" width={1170} height={40} />
          </Stack>
      }
    </>
  );
}

export default Dashboard



export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  try {
    // Header/Footer
    const cookies = nookies.get(ctx)
    let user: any = {}
    if (cookies.token !== undefined) {
      const decodedToken = jwt_decode(cookies.token)
      user = decodedToken
    }
    return { props: {user} };
  } catch (error) {
    console.log(error);

    return { props: {} };
  }
});
