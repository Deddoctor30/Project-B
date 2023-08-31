// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Link } from '@mui/material';

// Логика
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
   name: yup
      .string()
      .max(30, 'Превышен лимит символов')
      .required('Поле обязательно'),
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

export default function Popup({open, closeWindow, registrationHandler}) {
   const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
         registrationHandler(values.name, values.email, values.password)
      },
    });

  return (
      <Dialog fullWidth open={open} onClose={closeWindow}>
         <Box sx={{padding: '30px 40px 15px 40px'}}>
         <DialogTitle  sx={{textAlign: 'center', paddingTop: '20px'}}>Введите данные для регистрации</DialogTitle>
         <DialogContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <form onSubmit={formik.handleSubmit}>
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Имя и фамилия"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
               <TextField
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
               <p style={{marginTop: '10px', color: '#4f5976', fontSize: '0.875rem', lineHeight: '140%'}}>Нажимая «Зарегистрироваться», вы подтверждаете, что прочли и в полной мере осознаете условия <Link sx={{mt: 3, }} underline='hover' target='_blank' href="/agreement">пользовательского соглашения</Link> и положения<Link sx={{mt: 2, }} underline='hover' target='_blank' href="/privacy"> политики обработки персональных данных</Link></p>
               <Button type='submit' size='large' sx={{padding: '15px 40px', mt: 2}}>Зарегистрироваться</Button>
               <Button onClick={closeWindow} color='error' size='large' sx={{padding: '15px 40px', mt: 2}}>Отмена</Button>
            </form>
         </DialogContent>
         </Box>
      </Dialog>
  );
}