export const SIDEBAR_MENU_ITEMS = {
  SIDEBAR_ROUTE: [
    {
      label: "Home",
      items: [{ icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Manage",
      items: [
        { label: "Nhân viên", icon: "pi pi-fw pi-users", to: "/employee" },
        {
          label: "Bãi đỗ xe",
          icon: "pi pi-fw pi-car",
          to: "/garage",
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
        ],
      },
    ],
  },
};
