// MUI
import { Button } from "@mui/material";

// React
import { FC, useRef, useState } from "react";

interface FileUploaderProps {
  setFiles: (arg0: any) => React.ChangeEvent<HTMLInputElement>
  accept: string
  multiple: boolean
  purpose: string
}

const FileUploader: FC<FileUploaderProps> = ({accept, multiple, setFiles, purpose}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const ref = useRef<HTMLInputElement>()

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    if (e.target.files) {
      setIsEmpty(false)
    }
  }

  return (
    <>
      <input id="file" type='file' multiple={multiple} accept={accept} style={{display: 'none'}} ref={ref} onChange={inputHandler}/>
      <Button id="fileUplod" onClick={() => ref.current.click()} sx={{marginTop: '25px', marginRight: '20px'}} variant='outlined' size='large'>{ isEmpty ? purpose : 'Картинки загружены'}</Button>
    </>
  )
}

export default FileUploader