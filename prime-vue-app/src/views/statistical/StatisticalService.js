import { useAxios } from "@/hooks/useAxios";
import { ref, computed } from "vue";
import { useHelperStore } from "@/stores/HelperStore";
import { mergeWith } from "lodash-es";
import { StatisticalConstances } from "./StatisticalConstants";
const helperStore = useHelperStore();
const StatisticalConstancesLanguage = computed(() => {
  return StatisticalConstances[helperStore.languageCode];
});
const { request } = useAxios();
const parkingHistoryData = ref([]);
const parkingHistoryPaging = ref({
  page: 1,
  pageSize: 10,
  searchProperty: {
    value: 3,
  },
});

const vehicleOptionEnums = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
];

const vehicleOptions = computed(() => {
  return mergeWith(
    vehicleOptionEnums,
    StatisticalConstancesLanguage.value.vehicleOptions
  );
});
async function getParkingHistoryStatisticalAsync(year, vehicle) {
  try {
    let requestUrl = `ParkingHistory/statistical?year=${year}`;
    if (vehicle) {
      requestUrl += `&vehicle=${vehicle}`;
    }
    const response = await request({
      url: requestUrl,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function StatisticalService() {
  return {
    vehicleOptions,
    parkingHistoryData,
    StatisticalConstances,
    parkingHistoryPaging,
    StatisticalConstancesLanguage,
    getParkingHistoryStatisticalAsync,
  };
}
