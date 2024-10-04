import { z } from 'zod';

import { RULE_TYPE, SCORING_ITEM_TYPE } from '@/constants';
import type {
  Rule,
  ScoringItem,
  ScoringItemCheck,
  ScoringItemCount,
  ScoringItemGroup,
  ScoringItemSelect,
  ScoringItemSelectOption,
} from '@/types';

const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

export const ScoringItemSchema: z.ZodType<ScoringItem> = z.lazy(() =>
  z.union([
    ScoringItemSelectSchema,
    ScoringItemCheckSchema,
    ScoringItemCountSchema,
    ScoringItemGroupSchema,
  ])
);

const ScoringItemSelectOptionSchema: z.ZodType<ScoringItemSelectOption> = z.object({
  label: z.string(),
  description: z.string().optional(),
  score: z.number(),
});

export const ScoringItemSelectSchema: z.ZodType<ScoringItemSelect> = z.object({
  type: z.literal(SCORING_ITEM_TYPE.SELECT),
  label: z.string(),
  description: z.string().optional(),
  options: z.array(ScoringItemSelectOptionSchema),
});

export const ScoringItemCheckSchema: z.ZodType<ScoringItemCheck> = z.object({
  type: z.literal(SCORING_ITEM_TYPE.CHECK),
  label: z.string(),
  description: z.string().optional(),
  score: z.number(),
});

export const ScoringItemCountSchema: z.ZodType<ScoringItemCount> = z.object({
  type: z.literal(SCORING_ITEM_TYPE.COUNT),
  label: z.string(),
  description: z.string().optional(),
  score: z.number(),
});

export const ScoringItemGroupSchema: z.ZodType<ScoringItemGroup> = z.object({
  type: z.literal(SCORING_ITEM_TYPE.GROUP),
  label: z.string(),
  description: z.string().optional(),
  items: z.array(ScoringItemSchema),
});

export const RuleSchema: z.ZodType<Rule> = z.object({
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
  scoringItems: z.array(ScoringItemSchema),
});
