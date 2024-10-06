export type Challenger = {
  /**
   * @description 选手 ID
   */
  id: string;
  /**
   * @description 选手头像
   */
  avatar?: string;
  /**
   * @description 选手描述
   */
  description?: string;
  /**
   * @description 分队
   */
  squad: string;
  /**
   * @description 开局干员
   */
  pickup: Array<string>;
};
