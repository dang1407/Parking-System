export const SIDEBAR_MENU_ITEMS = [
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
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
];
