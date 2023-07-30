// MUI
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AbcIcon from '@mui/icons-material/Abc';

// React
import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';

// Логика
import { IContact } from '../../types/contact';
import { IClinical } from '../../types/clinical';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IUser } from '../../types/user';
import { setElement, updateUserRole } from '../../slices/adminSlice';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';



// Стили для таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

interface TableItemProps {
   dataItem: IClinical | IContact | IUser
   type: string
   deleteItem: (id: number) => void
   setOpenDialog?: Dispatch<SetStateAction<boolean>>
 }

const TableBodyItems: FC<TableItemProps> = ({dataItem, type, deleteItem, setOpenDialog}) => {
   const dispatch = useAppDispatch()
   const [data, setData] = useState<IClinical | IContact | IUser>(dataItem)
   const element = useAppSelector(state => state.admin.element)
   const dataChanger = (data: string) => {
     const day = data.slice(0, 10).split("-").reverse().join("-")
     return day
   }
 
   const [deletId, setDeleteId] = useState<number>(null);
   const [adminId, setAdminId] = useState<number>(null);
   const [adminName, setAdminName] = useState<string>('');
   const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
   const [openSetAdminDialog, setOpenAdminDialog] = useState<boolean>(false);
 
   
   
   const handleClose = () => {
     setOpenDeleteDialog(false);
     setOpenAdminDialog(false)
   };
   
   useEffect(() => {
     if (dataItem.id === element.id) {
       setData(element)
     }
   }, [element])
   
   const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation()
     setOpenDialog(true);
     dispatch(setElement(data))
   } 
   
   const handlerDelete = (id: number) => {
     setOpenDeleteDialog(true);
     setDeleteId(id)
   }
 
   const onDelete = () => {
     deleteItem(deletId)
   }

   const setAdminHandler = (id: number, name: string) => {
    setOpenAdminDialog(true)
    setAdminId(id)
    setAdminName(name)
   }
 
   const setAdmin = () => {
     const data = {
       id: adminId,
       role: 'ADMIN'
     }
     dispatch(updateUserRole(data))
     setOpenAdminDialog(false)
   }
 
 
   return (
     <>
     {type === 'clinical'&&
       <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&>*': {fontSize: '2.125rem'} }}>
         <StyledTableCell align="center" component="th" scope="row">{data.id}</StyledTableCell>
         <StyledTableCell align="center" component="th" scope="row">{data.name}</StyledTableCell>
 
         <StyledTableCell align="center">{(data as IClinical).status ? 'Пройдено' : 'Не пройдено'}</StyledTableCell>
         <StyledTableCell align="center">{dataChanger(data.createdAt)}</StyledTableCell>
         <StyledTableCell align="center">
             <IconButton aria-label="delete" sx={{marginRight: 1}} onClick={(e) => onEdit(e)}>
                 <EditIcon />
             </IconButton>
         </StyledTableCell>
         <StyledTableCell align="center">
             <IconButton aria-label="delete" sx={{marginRight: 1}} onClick={() => handlerDelete(data.id)}>
                 <DeleteIcon />
             </IconButton>
         </StyledTableCell>
       </StyledTableRow>
     }
     {type === 'contact' &&
       <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
         <StyledTableCell align="center" component="th" scope="row">{data.id}</StyledTableCell>
         <StyledTableCell align="center" component="th" scope="row">{data.name}</StyledTableCell>
         <StyledTableCell align="center">{(data as IContact).email}</StyledTableCell>
         <StyledTableCell align="center">{(data as IContact).phoneNumber}</StyledTableCell>
         <StyledTableCell align="center">{dataChanger(data.createdAt)}</StyledTableCell>
         <StyledTableCell align="center">
             <IconButton aria-label="delete" sx={{marginRight: 1}} onClick={(e) => onEdit(e)}>
                 <EditIcon />
             </IconButton>
         </StyledTableCell>
         <StyledTableCell align="center">
             <IconButton aria-label="delete" sx={{marginRight: 1}} onClick={() => handlerDelete(data.id)}>
                 <DeleteIcon />
             </IconButton>
         </StyledTableCell>
       </StyledTableRow>
     }
     {type === 'user' &&
       <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
       <StyledTableCell align="center" component="th" scope="row">{data.id}</StyledTableCell>
       <StyledTableCell align="center" component="th" scope="row">{data.name}</StyledTableCell>
       <StyledTableCell align="center" component="th" scope="row">{(data as IUser).email}</StyledTableCell>
       <StyledTableCell align="center">{(data as IUser).role}</StyledTableCell>
       <StyledTableCell align="center">{dataChanger(data.createdAt)}</StyledTableCell>
       <StyledTableCell align="center">
           <IconButton aria-label="setAdmin" sx={{marginRight: 1}} onClick={() => setAdminHandler(data.id, data.name)}>
               <AbcIcon />
           </IconButton>
       </StyledTableCell>
       <StyledTableCell align="center">
           <IconButton aria-label="delete" sx={{marginRight: 1}} onClick={() => handlerDelete(data.id)}>
               <DeleteIcon />
           </IconButton>
       </StyledTableCell>
     </StyledTableRow>
     }
       <Dialog maxWidth='xs' fullWidth open={openDeleteDialog} onClose={handleClose}>
         <DialogTitle>Вы уверены что хотите удалить элемент?</DialogTitle>
         <DialogActions>
           <Button id='applyDelete' sx={{padding: '15px 20px'}} size='large' onClick={onDelete}>Удалить</Button>
           <Button id='cancelDelete' sx={{padding: '15px 20px'}} size='large' color='error' onClick={handleClose}>Отмена</Button>
         </DialogActions>
       </Dialog>
       <Dialog maxWidth='xs' fullWidth open={openSetAdminDialog} onClose={handleClose}>
         <DialogTitle>{`Вы уверены что хотите сделать пользователя ${adminName} Администратором?`}</DialogTitle>
         <DialogActions>
           <Button id='applyDelete' sx={{padding: '15px 20px'}} size='large' onClick={setAdmin}>Обновить</Button>
           <Button id='cancelDelete' sx={{padding: '15px 20px'}} size='large' color='error' onClick={handleClose}>Отмена</Button>
         </DialogActions>
       </Dialog>
     </>
   )
 }

 export default TableBodyItems