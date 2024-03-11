import { defineStore } from "pinia";
export const useHelperStore = defineStore("helperStore", {
  state: () => ({
    language: "VN",
    languageDictionary: ["VN", "EN"],
  }),
  getters: {},
  actions: {
    setLanguage(language) {
      if (this.languageDictionary.includes(language)) {
        this.language = language;
      } else
        throw "Mã ngôn ngữ không có trong danh sách các ngôn ngữ trang web đang có!";
    },
  },
});
