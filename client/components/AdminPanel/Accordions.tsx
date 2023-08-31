/* eslint-disable @next/next/no-img-element */
// React
import * as React from 'react';
import { FC, memo, useEffect, useState } from 'react';

// MUI
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { Button, Chip, DialogActions, DialogTitle, Divider, ImageList, ImageListItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Логика
import Title from './Title';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICompetition } from '../../types/competition';
import { IArticle } from '../../types/article';
import { ICoach } from '../../types/coach';
import BoxContainer from './BoxContainer';
import dayjs from 'dayjs';
import imgProvider from '../../utiles/imgProvider';
import { setElement } from '../../slices/adminSlice';

interface AccordionsProps {
  dataItem: ICompetition | IArticle | ICoach
  deleteItem: (id: number, images: any[]) => void
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const Accordion = styled((props: AccordionProps) => (
   <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        width: "100%",
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
    }));

  const Accordions: FC<AccordionsProps> = memo(({dataItem, deleteItem, setOpenDialog}) => {
  const dispatch = useAppDispatch()
  const section = useAppSelector(state => state.admin.section)
  const status = useAppSelector(state => state.admin.status)
  const element = useAppSelector(state => state.admin.element)
  const [data, setData] = useState(dataItem)
  const [expanded, setExpanded] = useState<string | false>(false);
  const [deletId, setDeleteId] = useState<number>(null);
  const [deletImages, setDeleteImages] = useState<any[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    if (dataItem.id === element?.id) {
      setData(element)
    }
  }, [dataItem.id, element])

  useEffect(() => {
      setData(dataItem)
  }, [dataItem, status])
  

  const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpenDialog(true);
    dispatch(setElement(data))
  }

  const handlerDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number, images: any[]) => {
    e.stopPropagation()
    setOpenDeleteDialog(true);
    setDeleteId(id)
    setDeleteImages(images)
  }

  const onDelete = () => {
    deleteItem(deletId, deletImages)
  }

  const dataChanger = (data: string) => {
   const day = data.slice(0, 10).split("-").reverse().join("-").replaceAll('-', '.')
   return day
  }
 
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  

  return (
    <>
    {status === 'idle'
      ?
        <>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">

              {/* Заголовок */}
              <Typography sx={{ marginRight: '10px', flexShrink: 0, color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                {data.id + '.'}
              </Typography>
              <Typography sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>{data.name}</Typography>
              {/* На главной */}
              {(data as IArticle)?.swiper &&
                <Typography sx={{ flex: '1', display: 'flex', alignItems: 'center'}}>{'На главной'}&nbsp;&nbsp;<CheckCircleOutlineIcon /></Typography>
              }
              <Typography sx={{ color: 'text.secondary', marginRight: 2, display: 'flex', alignItems: 'center' }}>{dataChanger(data.createdAt)}</Typography>

              {/* Кнопка редактирования */}
              <IconButton 
                aria-label="fix"
                sx={{marginRight: 1}}
                onClick={(e) => onEdit(e)}
                >
                <EditIcon />
            </IconButton>
              {/* Кнопка удаления */}
              <IconButton 
                aria-label="delete"
                sx={{marginRight: 1}}
                onClick={(e) => handlerDelete(e, data.id, data.images)}
                >
                <DeleteIcon />
            </IconButton>
            </AccordionSummary>

            <Divider>
              <Chip label="Описание" />
            </Divider>

            <AccordionDetails>
              {section === 'competition' &&
              <>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                  <Box>
                    <Title sx={{display: 'inline-block'}}>
                      Статус соревнования:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).status &&
                          <>
                            {(data as ICompetition).status}
                          </>
                        }
                    </Typography>
                  </Box>

                  <Box sx={{ml: 10}}>
                    <Title sx={{display: 'inline-block'}}>
                      Дата проведения:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).dateStart &&
                          <>
                            {`${dataChanger((data as ICompetition).dateStart)} - ${dataChanger((data as ICompetition).dateEnd)}`}
                          </>
                        }
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{mb: 3}}>
                  <Box>
                    <Title textColor='secondary' sx={{display: 'inline-block'}}>
                      Отправление:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).start &&
                          <>
                            {(data as ICompetition).start}
                          </>
                        }
                    </Typography>
                  </Box>
                  <Box>
                    <Title textColor='secondary' sx={{display: 'inline-block'}}>
                      Встреча:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).meeting &&
                          <>
                            {(data as ICompetition).meeting}
                          </>
                        }
                    </Typography>
                  </Box>
                  <Box>
                    <Title textColor='secondary' sx={{display: 'inline-block'}}>
                      Обратно:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).arrive &&
                          <>
                            {(data as ICompetition).arrive}
                          </>
                        }
                    </Typography>
                  </Box>
                  <Box>
                    <Title textColor='secondary' sx={{display: 'inline-block'}}>
                      Место проведения:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).place &&
                          <>
                            {(data as ICompetition).place}
                          </>
                        }
                    </Typography>
                  </Box>
                  <Box>
                    <Title textColor='secondary' sx={{display: 'inline-block'}}>
                      Время:
                    </Title>
                    <Typography sx={{display: 'inline-block', ml: 1, fontSize: '1.125rem'}}>
                        {(data as ICompetition).time &&
                          <>
                            {dayjs((data as ICompetition).time).format('HH:mm')}
                          </>
                        }
                    </Typography>
                  </Box>
                </Box>
              </>
              }

              {section === 'coach' &&
                <>
                  <BoxContainer data={data}/>
                </>
              }

              {/* Контент */}
              {data.content &&
                <Typography sx={{pb: 2}}>
                    {data.content}
                </Typography>
              }

              {/* Картинки */}
              {data.images &&
              <ImageList sx={{justifyContent: 'center'}} cols={data.images.length > 4 ? 4 : data.images.length} rowHeight={'auto'}>
                  {section === 'coach' &&
                    <>
                      {(data as ICoach).avatar 
                          ?
                          <>
                            <ImageListItem>
                            <Typography sx={{margin: 1}} variant='h6' align='center'>Аватар Пользователя</Typography>
                              <img
                                style={{maxWidth: 600, maxHeight: 500, objectFit: 'contain'}}
                                src={`${imgProvider((data as ICoach).avatar)}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${imgProvider((data as ICoach).avatar)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={data.createdAt}
                                loading="lazy"
                              />
                            </ImageListItem>
                          </>
                        :
                          <Typography>Аватар не загружен</Typography>
                      }
                    </>
                  }
                {data.images.map(item => 
                  <ImageListItem key={item.id} >
                      <img
                        style={{maxWidth: 600, maxHeight: 500, objectFit: 'contain'}}
                        src={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={data.createdAt}
                        loading="lazy"
                      />
                  </ImageListItem>
                  )}
              </ImageList>
              }
            </AccordionDetails>
          </Accordion>
        </>
      :
        null
    }
        <Dialog maxWidth='xs' fullWidth open={openDeleteDialog} onClose={handleClose}>
          <DialogTitle>Вы уверены что хотите удалить элемент?</DialogTitle>
          <DialogActions>
            <Button id='applyDelete' sx={{padding: '15px 20px'}} size='large' onClick={onDelete}>Удалить</Button>
            <Button id='cancelDelete' sx={{padding: '15px 20px'}} size='large' color='error' onClick={handleClose}>Отмена</Button>
          </DialogActions>
        </Dialog>
    </>
  );
})

export default Accordions