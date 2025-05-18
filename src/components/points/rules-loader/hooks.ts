import { h, onMounted } from 'vue';

import { ToastAction, toast } from '@/components/ui/toast';
import { RulesType } from '@/engine/schema';
import { api, useEventsStore } from '@/engine/core';
import { DEFAULT_PRESET_RULES } from '@/constants';

export function useRulesLoader() {
  const eventsStore = useEventsStore();

  onMounted(async () => {
    const defaultRuleURL = import.meta.env.DEV
      ? DEFAULT_PRESET_RULES.url
      : new URL(DEFAULT_PRESET_RULES.url, window.location.href).toString();

    try {
      const data = await fetch(defaultRuleURL);
      const rules = await data.json();
      api.changeRules(rules);
      eventsStore.rulesURL = defaultRuleURL;
    } catch (error) {
      toast({
        title: '默认规则加载失败',
        description: '请检查网络连接或稍后再试',
        variant: 'destructive',
        action: h(
          ToastAction,
          {
            altText: '刷新页面',
            onClick: () => window.location.reload(),
          },
          { default: () => '刷新页面' }
        ),
      });
    }
  });

  const onLoadRules = (rules: RulesType) => {
    api.changeRules(rules);
    if (!rules.url) {
      rules.url = DEFAULT_PRESET_RULES.url;
    }
    toast({
      title: '规则加载成功',
      description: '已应用新的规则集',
    });
  };

  return {
    onLoadRules,
  };
}
