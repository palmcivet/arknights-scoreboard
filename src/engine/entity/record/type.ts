export type Challenger = {
  /**
   * @description 选手 ID
   */
  id: string;
  /**
   * @description 选手头像。URL 或 Base64
   */
  avatar: string;
  /**
   * @description 选手描述
   */
  description: string;
};

export type Operator = string;

export type Starting = {
  /**
   * @description 分队
   */
  squad: string;
  /**
   * @description 开局干员
   */
  pickup: Array<Operator>;
  /**
   * @description 备注
   */
  remark: string;
};
