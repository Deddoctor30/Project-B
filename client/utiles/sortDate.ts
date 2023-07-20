const sortDate = (data: any[]): any[] => {
   let newData = [...data]
   const sorted = newData.sort((user1, user2) => Date.parse(user1.dateStart) > Date.parse(user2.dateStart) ? -1 : 1);
  return sorted;
}

export default sortDate