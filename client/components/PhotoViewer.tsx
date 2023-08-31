// React
import { FC, useState } from 'react';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

// Логика
import { IImages } from '../types/images';


interface PhotoViewerProps {
   data: IImages[]
}

const PhotoViewer: FC<PhotoViewerProps> = ({data}) => {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

  return (
   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Button sx={{mt: 3}} size='large' variant="outlined" onClick={handleClickOpen}>
        Посмотреть все картинки
      </Button>
      <Dialog PaperProps={{sx: {maxHeight: '90%', backgroundColor: 'inherit', boxShadow: 'inherit', maxWidth: '1300px',}}} maxWidth='lg' open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <Swiper autoHeight={true} spaceBetween={30} loop keyboard={{enabled: true}} navigation={true} pagination={{clickable: true,}} modules={[Keyboard, EffectFade, Navigation, Pagination]} className="mySwiper">
            {data.map(item => 
               <SwiperSlide key={item.id}>
                     <img style={{maxHeight: '90vh', objectFit: 'contain'}} src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.img}`} />
               </SwiperSlide>
            )}
         </Swiper>
      </Dialog>
   </div>
  )
}

export default PhotoViewer