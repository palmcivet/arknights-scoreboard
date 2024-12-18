import { defineStore } from 'pinia';

type UserState = {
  /**
   * @description 打开设置弹窗
   */
  openSettings: boolean;
  /**
   * @description 夜间模式
   */
  darkMode: boolean;
  /**
   * @description 紧凑模式
   */
  compactMode: boolean;
  /**
   * @description 显示分数详情
   */
  showScoreDetail: boolean;
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    openSettings: false,
    darkMode: false,
    compactMode: false,
    showScoreDetail: false,
  }),
});
