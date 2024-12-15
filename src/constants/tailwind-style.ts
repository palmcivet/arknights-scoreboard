export const MOBILE_BREAKPOINT = '(max-width: 768px)';

const CENTRALIZE_STYLE = 'mx-auto';
const SIZE_LIMIT_STYLE = 'min-w-sm max-w-screen-2xl';
const TRANSITION_STYLE = 'transition-[padding] duration-300';

export const CONTAINER_STYLE = [
  'px-sm sm:px-sm md:px-md lg:px-lg xl:px-xl',
  SIZE_LIMIT_STYLE,
  CENTRALIZE_STYLE,
  TRANSITION_STYLE,
].join(' ');

export const MAIN_CONTAINER_STYLE = [
  'px-sm sm:pl-sm sm:pr-0 md:pl-md lg:pl-lg xl:pl-xl',
  SIZE_LIMIT_STYLE,
  CENTRALIZE_STYLE,
  TRANSITION_STYLE,
].join(' ');
