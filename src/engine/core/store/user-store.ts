import { ref } from 'vue';
import type { Ref } from 'vue';
import { useDark, useStorage } from '@vueuse/core';
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

type RefState<T> = {
  [K in keyof T]: Ref<T[K]>;
};

export const useUserStore = defineStore('user', () => {
  const openSettings = ref<boolean>(false);
  const darkMode = useDark({ storageKey: 'aks:dark-mode' });
  const compactMode = useStorage<boolean>('aks:compact-mode', false);
  const showScoreDetail = useStorage<boolean>('aks:show-score-detail', false);

  return {
    openSettings,
    darkMode,
    compactMode,
    showScoreDetail,
  } satisfies RefState<UserState>;
});
