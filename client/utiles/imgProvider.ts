const imgProvider = (data: string) => {
   let img: string;
   if (data !== undefined) {
      img = process.env.NEXT_PUBLIC_API_URL + 'img/' + data
   } else {
      img = process.env.NEXT_PUBLIC_API_URL + 'system/nophoto.png';
   }
   return img
}

export default imgProvider