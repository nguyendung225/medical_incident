import { useState } from "react";
import { KEY } from "./Constant"

export const removeEventEnter = (e: any) => {
    if(e.key === KEY.ENTER){
      e.preventDefault();
    }
}

export const totalPrice = (data: any, name: string) => {
  const totalPrice = data?.reduce((total: number, item: any) => {
    const totalChildren = item?.items?.reduce((totalChild: number, child: any) => {
      return totalChild + (child[name] || 0)
    }, 0)
    return total + totalChildren
  }, 0)
  return totalPrice || 0
}

export const formatDate = (data: number) => {
  return data < 10 ? `0${data}` : data;
}
export const RomanNumeralsConverter = (number: number) => {
      if (isNaN(number)) {
        return;
      }
  
      const romanNumerals: { value: number; numeral: string }[] = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' },
      ];
  
      let result = '';
      for (let i = 0; i < romanNumerals.length; i++) {
        while (number >= romanNumerals[i].value) {
          result += romanNumerals[i].numeral;
          number -= romanNumerals[i].value;
        }
      }
  
    return result
  };
