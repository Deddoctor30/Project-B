// React
import { FC, Dispatch, SetStateAction } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


// Логика
import { useAppSelector } from '../../store/hooks';
import TableBodyItems from './TableBodyItems';



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
  data: any[]
  deleteItem: (arg0: number) => any
  setOpenDialog?: Dispatch<SetStateAction<boolean>>
}

const TableItem: FC<TableItemProps> = ({data, deleteItem, setOpenDialog}) => {
  const section = useAppSelector(state => state.admin.section)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="customized table">
          {section === 'clinical' &&
          <>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">Студент</StyledTableCell>
                <StyledTableCell align="center">Статус диспансеризации</StyledTableCell>
                <StyledTableCell align="center">Дата создания</StyledTableCell>
                <StyledTableCell align="center">Редактировать</StyledTableCell>
                <StyledTableCell align="center">Удалить</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(item => 
                <TableBodyItems setOpenDialog={setOpenDialog} key={item.id} dataItem={item} type={section} deleteItem={deleteItem}/>
              )}
            </TableBody>
          </>
          }

          {section === 'contact' &&
          <>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">Контакт</StyledTableCell>
                <StyledTableCell align="center">E-mail</StyledTableCell>
                <StyledTableCell align="center">Номер телефона</StyledTableCell>
                <StyledTableCell align="center">Дата создания</StyledTableCell>
                <StyledTableCell align="center">Редактировать</StyledTableCell>
                <StyledTableCell align="center">Удалить</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(item => 
                <TableBodyItems setOpenDialog={setOpenDialog} key={item.id} dataItem={item} type={section} deleteItem={deleteItem}/>
              )}
            </TableBody>
          </>
          }

          {section === 'user' &&
          <>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">Пользователь</StyledTableCell>
                <StyledTableCell align="center">E-mail</StyledTableCell>
                <StyledTableCell align="center">Роль</StyledTableCell>
                <StyledTableCell align="center">Дата создания</StyledTableCell>
                <StyledTableCell align="center">Сделать Администратором</StyledTableCell>
                <StyledTableCell align="center">Удалить</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(item => 
                <TableBodyItems key={item.id} dataItem={item} type={section} deleteItem={deleteItem}/>
              )}
            </TableBody>
          </>
          }
        </Table>
      </TableContainer>
    </>
  );
}

export default TableItem