import NavItem from './nav-item.vue';
import NavList from './nav-list.vue';
import Container from './container.vue';
import FormItemSlot from './form-item-slot.vue';

export { NavItem, NavList, Container, FormItemSlot };

export const logger = {
  info(scope: string, ...args: Array<any>) {
    console.info(`[${scope}]`, ...args);
  },
  error(scope: string, ...args: Array<any>) {
    console.error(`[${scope}]`, ...args);
  },
};
