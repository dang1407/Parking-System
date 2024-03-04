import { defineStore } from "pinia";
import { useConfirm } from "primevue/useconfirm";
export const useHelperStore = defineStore("helperStore", {
  state: () => ({
    language: "VN",
    languageDictionary: ["VN", "EN"],

    // confirm dialog
    confirm: useConfirm(),
  }),
  getters: {},
  actions: {
    setLanguage(language) {
      if (this.languageDictionary.includes(language)) {
        this.language = language;
      } else
        throw "Mã ngôn ngữ không có trong danh sách các ngôn ngữ trang web đang có!";
    },

    convertGenderDBToGenderUser(gender) {
      // console.log(gender);
      return baseEnum[this.language].Gender[gender];
    },

    /**
     * Chuyển đổi định dạng ngày từ DB yyyy-mm-dd sang dd/mm/yyyy để hiện thị ở datepicker
     * @param {String} dateDB Chuỗi nhận từ CSDL có dạng yyyy-mm-dd
     * @returns Ngày định dạng dd/mm/yyyy
     * Created by: nkmdang (03/10/2023)
     */
    covertDateDBToDatePickerDate(dateDB, datePattern) {
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
    },
  },
});
