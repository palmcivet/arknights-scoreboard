import type { RecordsType, RulesType } from '@/engine/schema';
import type { Challenger, RecordItem, Starting } from '@/engine/entity';
import { parseRules } from './rules-parser';
import {
  useEventsStore,
  INITIAL_STARTING,
  INITIAL_CHALLENGER,
} from './store/events-store';
import { useRecordsStore } from './store/records-store';

/**
 * @description 加载规则
 */
export function changeRules(rules: RulesType): void {
  const eventsStore = useEventsStore();
  eventsStore.rulesJSON = rules;

  const recordsStore = useRecordsStore();
  recordsStore.$reset(); // 重置解析数据和得分记录
  const { rulesForm, rulesSet } = parseRules(rules.items);
  recordsStore.rulesForm = rulesForm;
  recordsStore.rulesSet = rulesSet;
}

/**
 * @description 更新对局信息：选手信息、初始构建
 */
export function updateEvents(events: {
  challenger?: Challenger;
  starting?: Starting;
}): void {
  const eventsStore = useEventsStore();
  eventsStore.challenger = events.challenger ?? eventsStore.challenger;
  eventsStore.starting = events.starting ?? eventsStore.starting;
}

/**
 * @description 开始对局
 */
export function startEvents(): void {
  const eventsStore = useEventsStore();
  eventsStore.isPlaying = true;
  eventsStore.isPaused = false;
  eventsStore.begin = Date.now();
}

/**
 * @description 结束对局
 */
export function endEvents(): void {
  const eventsStore = useEventsStore();
  eventsStore.isPlaying = false;
  eventsStore.end = Date.now();
}

/**
 * @description 暂停/继续对局
 */
export function togglePauseEvents(): void {
  const eventsStore = useEventsStore();
  eventsStore.isPaused = !eventsStore.isPaused;
}

/**
 * @description 导出得分记录
 */
export function saveRecords(): RecordsType {
  const eventsStore = useEventsStore();
  const recordsStore = useRecordsStore();

  if (eventsStore.challenger === null) {
    throw new Error('[AKS] Challenger is not set');
  }

  return {
    rules: eventsStore.rulesJSON.name,
    rulesVersion: eventsStore.rulesJSON.version,
    challenger: eventsStore.challenger ?? INITIAL_CHALLENGER,
    starting: eventsStore.starting ?? INITIAL_STARTING,
    begin: eventsStore.begin,
    end: eventsStore.end,
    score: recordsStore.score,
    items: Object.entries(recordsStore.records).map(([id, item]) => ({
      ...item,
      id,
    })),
  };
}

/**
 * @description 清空得分记录
 */
export function clearRecords(): void {
  const recordsStore = useRecordsStore();
  recordsStore.records = {};
}

/**
 * @description 添加得分记录
 */
export function addRecord(record: RecordItem): void {
  const recordsStore = useRecordsStore();
  recordsStore.records[record.id] = record;
}

/**
 * @description 更新设置
 */
