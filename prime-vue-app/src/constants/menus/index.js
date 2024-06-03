export const SIDEBAR_MENU_ITEMS = {
  SIDEBAR_ROUTE: [
    {
      items: [{ icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      items: [
        { icon: "pi pi-fw pi-users", to: "/employee" },
        {
          icon: "pi pi-fw pi-car",
          to: "/garage",
        },
        {
          icon: "pi pi-user",
          to: "/parkmember",
        },
        {
          icon: "pi pi-chart-bar",
          to: "/statistical",
        },
      ],
    },
  ],
  SIDEBAR_LABEL: {
    vi: [
      {
        label: "Trang chủ",
        items: [{ label: "Bảng điều khiển" }],
      },
      {
        label: "Quản lý",
        items: [
          { label: "Nhân viên" },
          {
            label: "Bãi đỗ xe",
          },
          {
            label: "Khách hàng gửi xe",
          },
          {
            label: "Thống kê",
          },
        ],
      },
    ],
    en: [
      {
        label: "Home",
        items: [
          {
            label: "Dashboard",
          },
        ],
      },
      {
        label: "Manage",
        items: [
          { label: "Employee" },
          {
            label: "Park",
          },
          {
            label: "Park Member",
          },
          {
            label: "Statistical",
          },
        ],
      },
    ],
  },
};
