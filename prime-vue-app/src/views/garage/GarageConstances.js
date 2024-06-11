export const GarageConstances = {
  vi: {
    accept: "Đồng ý",
    cancel: "Không",
    takePhotoAgain: "Chụp biển số xe lại",
    updateCustomerLicensePlate: "Sửa biển số xe đã đặt",
    update: "Sửa",
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
      LicensePlateNotMatch: "Biển số xe không khớp với biển đã đăng ký!",
    },
    formLabel: {
      enterVehilceToGarage: "Đưa xe vào bãi",
      enterVehicleOutGarage: "Đưa xe ra khỏi bãi",
      caculateBill: "Xuất hóa đơn",
      LicensePlatePredictLabel: "Biển số xe đọc được",
      LicensePlateImageTakedLabel: "Hình ảnh xe đã chụp",
      LicensePlate: "Biển số xe",
      ParkSlotCode: "Mã vị trí gửi xe",
      VehicleLabel: "Loại xe",
      VehicleInDateLabel: "Thời gian vào",
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
    accept: "Accept",
    cancel: "Cancel",
    update: "Update",
    takePhotoAgain: "Take license plate photo again",
    updateCustomerLicensePlate: "Edit the booked license plate",
    infor: "Vehicle information available in the parking lot",
    column: "Column",
    mapTitle: "Parking lot map",
    intervalCallTitle: (time) =>
      `Parking information is updated every ${time} seconds`,
    emptyParkingLot: "You haven't added any parking lots yet!",
    missingFieldRequired: "You have not entered a required field",

    state: "State",
    formTitle: "Park slot information",
    formError: {
      MissingLicensePlate:
        "You have not filled in the license plate information",
      LicensePlateNotMatch:
        "The license plate number does not match the registered license plate!",
    },
    formLabel: {
      enterVehilceToGarage: "Enter vehicle to parking lot",
      enterVehicleOutGarage: "Take the vehicle out of the yard",
      caculateBill: "Export invoice",
      LicensePlatePredictLabel: "License plate readable",
      LicensePlateImageTakedLabel: "Vehicle image taken",
      LicensePlate: "License plate",
      ParkSlotCode: "Parking location code",
      VehicleLabel: "Vehicle type",
      VehicleInDateLabel: "Time in",
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
