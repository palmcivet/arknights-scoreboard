import { defineStore } from 'pinia';

import { RecordsType, RulesType } from '@/engine/schema';
import { useEventsStore } from './events-store';
import { useRecordsStore } from './records-store';

export const useApiStore = defineStore('api', () => {
  const eventsStore = useEventsStore();
  const recordsStore = useRecordsStore();

  const triggerLoadRule = (rule: RulesType): void => {
    recordsStore.$reset();
    recordsStore.updateRules(rule.items);
    eventsStore.updateMeta({
      author: rule.author,
      engine: rule.engine,
      engineVersion: rule.engineVersion,
      version: rule.version,
      changelog: rule.changelog,
    });
    eventsStore.updateEvents({
      name: rule.name,
      description: rule.description,
      url: rule.url,
      background: rule.background,
      host: rule.host,
      schedule: rule.schedule,
    });
  };

  const triggerExportRecords = () => {};

  return { triggerLoadRule, triggerExportRecords };
});
