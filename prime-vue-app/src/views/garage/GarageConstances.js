export const GarageConstances = {
  vi: {
    infor: "Thông tin xe có trong bãi đỗ xe",
    column: "Cột",
    mapTitle: "Bản đồ bãi đỗ xe",
    intervalCallTitle: (time) =>
      `Thông tin bãi đỗ xe được cập nhật ${time} giây một lần`,
    emptyParkingLot: "Bạn chưa thêm bãi đỗ xe nào!",
    state: "Trạng thái",
    formTitle: "Thông tin vị trí để xe",
    missingFieldRequired: "Bạn chưa nhập trường bắt buộc",
    formError: {
      MissingLicensePlate: "Bạn chưa điền thông tin biển số xe",
    },
    formLabel: {
      LicensePlatePredictLabel: "Biển số xe đọc được",
      LicensePlateImageTakedLabel: "Hình ảnh xe đã chụp",
      LicensePlate: "Biển số xe",
      ParkSlotCode: "Mã vị trí gửi xe",
      VehicleLabel: "Loại xe",
      Vehicle: {
        0: "Xe đạp",
        1: "Xe máy",
        2: "Ô tô",
      },
      StateLabel: "Trạng thái",
      State: {
        0: "Chưa có xe",
        1: "Đã được đặt chỗ",
        2: "Đã có xe",
      },

      Order: "Đặt chỗ",
    },
  },
  en: {
    infor: "Vehicle information available in the parking lot",
    column: "Column",
    mapTitle: "Parking lot map",
    intervalCallTitle: (time) =>
      `Parking information is updated every ${time} seconds`,
    emptyParkingLot: "You haven't added any parking lots yet!",
    missingFieldRequired: "You have not entered a required field",
    state: "State",
    formTitle: "Park slot information",
    fromError: {
      MissingLicensePlate:
        "You have not filled in the license plate information",
    },
    formLabel: {
      LicensePlatePredictLabel: "License plate readable",
      LicensePlateImageTakedLabel: "Vehicle image taken",
      LicensePlate: "License plate",
      ParkSlotCode: "Parking location code",
      VehicleLabel: "Vehicle type",
      Vehicle: {
        0: "Bicycle",
        1: "Motorcycle",
        2: "Car",
      },
      StateLabel: "State",
      State: {
        0: "No car yet",
        1: "Reserved for other",
        2: "Vehicle entered",
      },
      Order: "Reserve",
    },
  },
};
