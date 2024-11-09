import { z } from 'zod';

import { RULE_TYPE, SCORING_ITEM_TYPE } from '@/engine/entity';
import type { ScoringItemSelectOption } from '@/engine/entity';
import type {
  RulesType,
  ScoringItemType,
  ScoringItemCheckType,
  ScoringItemCountType,
  ScoringItemInputType,
  ScoringItemSelectType,
  ScoringItemGroupType,
} from './type';

const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

const ScoringItemSelectOptionSchema: z.ZodType<ScoringItemSelectOption> =
  z.object({
    label: z.string(),
    description: z.string().optional(),
    score: z.number(),
  });

export const ScoringItemSchema: z.ZodType<ScoringItemType> = z.lazy(() =>
  z.union([
    ScoringItemCheckSchema,
    ScoringItemCountSchema,
    ScoringItemSelectSchema,
    ScoringItemGroupSchema,
  ])
);

export const ScoringItemCheckSchema: z.ZodType<ScoringItemCheckType> = z.object(
  {
    type: z.literal(SCORING_ITEM_TYPE.CHECK),
    label: z.string(),
    description: z.string().optional(),
    score: z.number(),
  }
);

export const ScoringItemCountSchema: z.ZodType<ScoringItemCountType> = z.object(
  {
    type: z.literal(SCORING_ITEM_TYPE.COUNT),
    label: z.string(),
    description: z.string().optional(),
    score: z.number(),
  }
);

export const ScoringItemInputSchema: z.ZodType<ScoringItemInputType> = z.object(
  {
    type: z.literal(SCORING_ITEM_TYPE.INPUT),
    label: z.string(),
    description: z.string().optional(),
    score: z.number(),
  }
);

export const ScoringItemSelectSchema: z.ZodType<ScoringItemSelectType> =
  z.object({
    type: z.literal(SCORING_ITEM_TYPE.SELECT),
    label: z.string(),
    description: z.string().optional(),
    options: z.array(ScoringItemSelectOptionSchema),
  });

export const ScoringItemGroupSchema: z.ZodType<ScoringItemGroupType> = z.object(
  {
    type: z.literal(SCORING_ITEM_TYPE.GROUP),
    label: z.string(),
    description: z.string().optional(),
    children: z.array(ScoringItemSchema),
  }
);

export const RulesSchema: z.ZodType<RulesType> = z.object({
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  background: z.string().optional(),
  host: z.string().optional(),
  schedule: z.string().optional(),
  author: z.string().optional(),
  engine: z.enum([RULE_TYPE.TOURNMENT, RULE_TYPE.BINGO]),
  version: z.string().regex(VERSION_PATTERN),
  engineVersion: z.string().regex(VERSION_PATTERN),
  items: z.array(ScoringItemSchema),
});
