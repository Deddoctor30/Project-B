// MUI
import { Button, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddIcon from '@mui/icons-material/Add';

// React
import { FC, useRef, useState } from "react";
import { $authHost } from "../../http";

// Логика
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadAvatar, uploadGalery } from "../../slices/userSlice";

interface UserFileUploaderProps {
  setAvatar?: Function
  setFiles?: Function
  type: string
  accept?: string
  multiple?: boolean
  purpose?: string
  id?: number
  avatar?: string
  onClose?(arg0: boolean): void
}

const UserFileUploader: FC<UserFileUploaderProps> = ({accept, setAvatar, multiple, onClose, setFiles, purpose, id, type, avatar}) => {
  const dispatch = useAppDispatch()
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const ref = useRef<HTMLInputElement>()

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileUpload(e.target.files);
      if (e.target.files) {
        setIsEmpty(false)
    }
   }

   
   const fileUpload = async (files: any) => {
    const formData = new FormData()
    if (type === 'galery') {
      for (let i = 0; i < files.length; i++) {
         formData.append('images', files[i])
      }
      // for (var pair of formData.entries()) {
      //    console.log(pair[0]+ ', ' + pair[1]); 
      // }
      let data = {
        id,
        files: formData,
      }
      dispatch(uploadGalery(data))
    }

    if (type === 'avatar') {
      for (let i = 0; i < files.length; i++) {
         formData.append('avatar', files[i])
        }
      formData.append('currentAvatar', avatar)

      let data = {
        id,
        avatar: formData,
      }
      dispatch(uploadAvatar(data))
      onClose(false)
    }

    if (type === 'achievements') {
      formData.append('achievements', files)
    }
  }


  return (
    <>
      <input id="file" type='file' multiple={multiple} accept={accept} style={{display: 'none'}} ref={ref} onChange={inputHandler}/>
      {type === 'galery' &&
        <Button id="fileUplod" onClick={() => ref.current.click()} sx={{marginTop: '25px', marginRight: '20px'}} variant='outlined' size='large'>{ isEmpty ? purpose : 'Картинки загружены'}</Button>
      }
      {type === 'avatar' &&
        <IconButton 
            aria-label="delete"
            size='large'
            sx={{width: '60px', backgroundColor: '#ffffff5f',  mt: 3, '&:hover': {backgroundColor: '#ffffffc0', color: 'black'}}}
            onClick={() => ref.current.click()}
            >
            <FileUploadOutlinedIcon fontSize='large'/>
        </IconButton>
      }
    </>
  )
}

export default UserFileUploader