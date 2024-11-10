export const NAV_LIST = {
  TOURNAMENT: '/tournament',
  BINGO: '/bingo',
  SAVING: '/saving',
  EDITOR: '/editor',
};

export const MENU_LIST = [
  {
    label: '积分赛',
    icon: 'mdi:tournament',
    route: NAV_LIST.TOURNAMENT,
  },
  {
    label: 'Bingo',
    icon: 'mdi:grid-off',
    route: NAV_LIST.BINGO,
  },
  {
    label: '编辑器',
    icon: 'mdi:calendar-edit-outline',
    route: NAV_LIST.EDITOR,
  },
  {
    label: '记录',
    icon: 'mdi:clipboard-list-outline',
    route: NAV_LIST.SAVING,
  },
  {
    label: '帮助',
    icon: 'mdi:information-slab-circle-outline',
    route: '/docs',
  },
];
