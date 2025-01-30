import { repository } from '../../package.json';

export const GITHUB_URL = repository.url;

export const MENU_LIST = [
  {
    label: '首页',
    route: '/home',
  },
  {
    label: '积分赛',
    route: '/points',
  },
  // {
  //   // @todo
  //   label: 'Bingo',
  //   route: '/bingo',
  // },
  {
    label: '编辑器',
    route: '/editor',
  },
  {
    label: '下载',
    route: '/download',
  },
  {
    label: '文档',
    route: '/docs',
  },
];
