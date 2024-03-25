// import { useConvert } from "../../../src/hooks/useConvert";
// const { convertDateUIToDateDB, getCurrentTimeString } = useConvert();
// console.log(getCurrentTimeString());
// import { useValidate } from "../../hooks/useValidate";
// const { validateByRegex } = useValidate();
const regexE = /^NV-00[0-9]{4}$/;
console.log(regexE.test("NV-002001"));
