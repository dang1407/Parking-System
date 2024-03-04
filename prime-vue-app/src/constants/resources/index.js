export const resources = {
  VN: {
    Toast: {
      Unauthorized: {
        summary: "Phiên đăng nhập hết hạn",
        detail: "Tự động chuyển sang trang đăng nhập trong 3 giây.",
      },
      LoginSuccess: {
        severity: "success",
        summary: "Đăng nhập thành công",
        detail: "Tự động chuyển sang trang chủ trong 3 giây.",
        life: 500,
      },
      NetworkError: {
        severity: "error",
        summary: "Lỗi mạng",
        detail: "Vui lòng kiểm tra lại kết nối mạng.",
        life: 5000,
      },
    },
  },
  EN: {
    Toast: {},
  },
};
