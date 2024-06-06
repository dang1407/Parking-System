import { useAxios } from "@/hooks/useAxios";
import { ref, computed } from "vue";
import { useHelperStore } from "@/stores/HelperStore";
import { mergeWith } from "lodash-es";
const helperStore = useHelperStore();
const { request } = useAxios();
const parkingHistoryData = ref([]);
const parkingHistoryPaging = ref({
  page: 1,
  pageSize: 10,
  searchProperty: {
    value: 3,
  },
});
const StatisticalConstances = {
  vi: {
    vehicleOptions: [
      {
        label: "Xe đạp",
      },
      {
        label: "Xe máy",
      },
      {
        label: "Ô tô",
      },
      {
        label: "Tất cả",
      },
    ],
  },
  en: {
    vehicleOptions: [
      {
        label: "Bikecycle",
      },
      {
        label: "Motorbike",
      },
      {
        label: "Car",
      },
      {
        label: "All",
      },
    ],
  },
};
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

const StatisticalConstancesLanguage = computed(() => {
  return StatisticalConstances[helperStore.languageCode];
});

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
