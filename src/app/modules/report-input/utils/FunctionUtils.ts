export const getCodeFromOptionList = (optionList: any[], text: string) => {
  const code = optionList.find((item) => item?.name?.toLowerCase() === text?.trim().toLowerCase())?.code;
  return code != null || code !== undefined ? code : { name: text };
};
