export const removeChecked = (data: any[]) => {
  return data
    ? data.map((item: any) => {
        let { isChecked, ...dataRemoved } = item;
        return dataRemoved;
      })
    : data;
};
