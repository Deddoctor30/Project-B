// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

// Логика
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
   email: yup
     .string()
     .email('Введите правильный Email')
     .required('Email обязателен'),
   password: yup
     .string()
     .min(3, 'Пароль должен быть не менее 3 символов')
     .max(15, 'Пароль должен быть не более 15 символов')
     .required('Парьль обязателен'),
 });

export default function Popup({open, closeWindow, handleRegOpen, logInHandler}) {
   const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
         // emailHandler(values.email)
         // passHandler(values.password)
         logInHandler(values.email, values.password)
      },
    });

  return (
      <Dialog fullWidth open={open} onClose={closeWindow}>
         <Box sx={{padding: '30px 40px 15px 40px'}}>
         <DialogTitle  sx={{textAlign: 'center', paddingTop: '20px'}}>Войдите в аккаунт или создайте новый</DialogTitle>
         <DialogContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <form onSubmit={formik.handleSubmit}>
               <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="E-mail"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
               />
               <TextField
                  margin="dense"
                  id="password"
                  label="Пароль"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
               />
               <p style={{marginTop: '10px', color: '#4f5976', fontSize: '0.875rem', lineHeight: '140%'}}>Продолжая вы соглашаетесь с условиями <Link sx={{mt: 3, }} underline='hover' target='_blank' href="/agreement">пользовательского соглашения</Link> и положения <Link sx={{mt: 2, }} underline='hover' target='_blank' href="/privacy">политики обработки персональных данных</Link></p>
               <Link onClick={handleRegOpen} sx={{mt: 2, display: 'inline-block',}} underline='hover' href="#">Зарегистрироваться</Link>
               <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button type='submit' size='large' sx={{padding: '15px 40px', mt: 2}}>Войти</Button>
                  <Button onClick={closeWindow} color='error' size='large' sx={{padding: '15px 40px', mt: 2}}>Закрыть</Button>
               </div>
            </form>
         </DialogContent>
         </Box>
      </Dialog>
  );
}