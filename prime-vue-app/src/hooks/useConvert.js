import { useHelperStore } from "@/stores/HelperStore";
import { genderLanguage } from "@/constants/gender";
const language = useHelperStore().language;
/**
 * Chuyển đổi định dạng ngày từ DB yyyy-mm-dd sang dd/mm/yyyy để hiện thị ở datepicker
 * @param {String} dateDB Chuỗi nhận từ CSDL có dạng yyyy-mm-dd
 * @returns Ngày định dạng dd/mm/yyyy
 * Created by: nkmdang (03/10/2023)
 */
function covertDateDBToUIText(dateDB, datePattern) {
  if (!datePattern) {
    datePattern = "dd/MM/yyyy";
  }
  if (dateDB && dateDB !== "") {
    const year = dateDB.substring(0, 4);
    const month = dateDB.substring(5, 7);
    const date = dateDB.substring(8, 10);
    let result = datePattern;
    result = result.replace("dd", date);
    result = result.replace("yyyy", year);
    result = result.replace("MM", month);
    // return `${date}/${month}/${year}`;
    return result;
  } else {
    return "";
  }
}

function convertGenderDBToUIText(gender) {
  // console.log(gender);
  return genderLanguage[language][gender];
}

export function useConvert() {
  return { convertGenderDBToUIText, covertDateDBToUIText };
}
