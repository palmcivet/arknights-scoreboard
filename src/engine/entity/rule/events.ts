export type Events = {
  /**
   * @description 赛事名称
   */
  name: string;
  /**
   * @description 赛事简介
   */
  brief?: string;
  /**
   * @description 赛事描述。支持 Markdown 格式文本
   */
  description?: string;
  /**
   * @description 赛事 URL
   */
  url?: string;
  /**
   * @description 赛事背景图
   */
  background?: string;
  /**
   * @description 赛事主办方
   */
  host?: string;
  /**
   * @Description 赛程
   */
  schedule?: string;
};
