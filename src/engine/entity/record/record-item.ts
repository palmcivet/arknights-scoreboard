import { SCORING_ITEM_TYPE } from '@/engine/entity';

/**
 * @description 记录项的索引
 */
export type RecordId = string;

/**
 * @description 记录项
 */
export type RecordItem = { id: RecordId; score: number } & (
  | { [SCORING_ITEM_TYPE.CHECK]: boolean }
  | { [SCORING_ITEM_TYPE.COUNT]: number }
  | { [SCORING_ITEM_TYPE.SELECT]: string }
);
