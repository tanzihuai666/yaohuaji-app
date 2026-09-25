/**
 * 妖画集 · 47 个手绘风内联 SVG 贴纸图标
 * 调色板 IK: skin, pink, lip, cream, blue, lav, yellow, white, red
 */
const IK = {
  skin: 'var(--ik-skin, #FFE0BD)',
  pink: 'var(--ik-pink, #FFB5C5)',
  lip: 'var(--ik-lip, #FF8DA1)',
  cream: 'var(--ik-cream, #FFF8EB)',
  blue: 'var(--ik-blue, #BDE0FE)',
  lav: 'var(--ik-lav, #CDB4DB)',
  yellow: 'var(--ik-yellow, #FFE599)',
  white: 'var(--ik-white, #FFFFFF)',
  red: 'var(--ik-red, #FF6B6B)',
  dark: 'var(--ik-dark, #4A3E3D)',
  green: 'var(--ik-green, #9AEBA3)'
};

const ICONS = {
  home: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 22L24 8L40 22V40C40 41.1 39.1 42 38 42H10C8.9 42 8 41.1 8 40V22Z" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 22L24 5L44 22" stroke="${IK.pink}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 42V26C19 24.9 19.9 24 21 24H27C28.1 24 29 24.9 29 26V42" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="24" cy="16" r="3.5" fill="${IK.pink}"/>
  </svg>`,

  orders: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="6" width="30" height="38" rx="6" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M17 14H31" stroke="${IK.pink}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M17 22H31" stroke="${IK.lav}" stroke-width="3" stroke-linecap="round"/>
    <path d="M17 30H27" stroke="${IK.blue}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="34" cy="33" r="7" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="2.5"/>
    <path d="M31.5 33L33.5 35L36.5 31" stroke="${IK.dark}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  calendar: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="11" width="34" height="31" rx="6" fill="${IK.white}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M7 19H41" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M7 11C7 8.8 8.8 7 11 7H37C39.2 7 41 8.8 41 11V19H7V11Z" fill="${IK.pink}"/>
    <circle cx="16" cy="7" r="2.5" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="32" cy="7" r="2.5" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="15" cy="26" r="2.5" fill="${IK.green}"/>
    <circle cx="24" cy="26" r="2.5" fill="${IK.yellow}"/>
    <circle cx="33" cy="26" r="2.5" fill="${IK.blue}"/>
    <circle cx="15" cy="34" r="2.5" fill="${IK.lav}"/>
    <circle cx="24" cy="34" r="2.5" fill="${IK.red}"/>
  </svg>`,

  gallery: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="9" width="34" height="32" rx="6" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="18" cy="20" r="4.5" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="2"/>
    <path d="M8 36L19 25L27 32L34 26L41 34V35C41 37.8 38.8 40 36 40H12C9.2 40 7 37.8 7 35V36H8Z" fill="${IK.lav}" stroke="${IK.dark}" stroke-width="2"/>
    <path d="M19 25L27 32L34 26" stroke="${IK.pink}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  mine: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="18" r="9" fill="${IK.skin}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M10 42C10 34.3 16.3 28 24 28C31.7 28 38 34.3 38 42" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
    <path d="M18 12C20 10 28 10 30 12" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="20" cy="18" r="1.5" fill="${IK.dark}"/>
    <circle cx="28" cy="18" r="1.5" fill="${IK.dark}"/>
    <path d="M22 22C23 23 25 23 26 22" stroke="${IK.lip}" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  wallet: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="11" width="36" height="28" rx="6" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M6 18C6 14.7 8.7 12 12 12H36C39.3 12 42 14.7 42 18" stroke="${IK.dark}" stroke-width="3"/>
    <rect x="28" y="20" width="14" height="12" rx="3" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="34" cy="26" r="2" fill="${IK.cream}"/>
    <circle cx="16" cy="27" r="4" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="2"/>
    <text x="16" y="30" font-size="7" font-weight="900" text-anchor="middle" fill="${IK.dark}">¥</text>
  </svg>`,

  medal: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 6L24 16L31 6L37 18L24 23L11 18L17 6Z" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="24" cy="28" r="13" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="24" cy="28" r="9" fill="${IK.cream}"/>
    <path d="M24 21L26 25.5L31 26L27 29.5L28.5 34.5L24 32L19.5 34.5L21 29.5L17 26L22 25.5L24 21Z" fill="${IK.lip}"/>
  </svg>`,

  brush: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37 7C38.6 5.4 41.2 5.4 42.8 7C44.4 8.6 44.4 11.2 42.8 12.8L25 30.6L17 32.6L19 24.6L37 7Z" fill="${IK.lav}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M17 32.6L7 38.6C5.5 39.5 5.5 41.5 7 42.4C8 43 10.5 43 12 41.5L18.5 35" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="34" cy="14" r="2" fill="${IK.yellow}"/>
  </svg>`,

  star: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L29.5 16.5L43 17.5L32.5 26.5L35.5 40L24 33L12.5 40L15.5 26.5L5 17.5L18.5 16.5L24 4Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="24" cy="22" r="2.5" fill="${IK.cream}"/>
  </svg>`,

  heart: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40C24 40 7 28.5 7 16.5C7 10.5 12 6 17.5 6C20.8 6 23.3 8 24 9.5C24.7 8 27.2 6 30.5 6C36 6 41 10.5 41 16.5C41 28.5 24 40 24 40Z" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M13 14C13 11.5 15.5 9.5 18 9.5" stroke="${IK.white}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  gear: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="8" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M24 6V11M24 37V42M6 24H11M37 24H42M11.3 11.3L14.8 14.8M33.2 33.2L36.7 36.7M11.3 36.7L14.8 33.2M33.2 14.8L36.7 11.3" stroke="${IK.blue}" stroke-width="4.5" stroke-linecap="round"/>
  </svg>`,

  bear: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="14" r="6" fill="${IK.skin}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="36" cy="14" r="6" fill="${IK.skin}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="12" cy="14" r="3" fill="${IK.pink}"/>
    <circle cx="36" cy="14" r="3" fill="${IK.pink}"/>
    <ellipse cx="24" cy="27" rx="16" ry="14" fill="${IK.skin}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="18" cy="24" r="2" fill="${IK.dark}"/>
    <circle cx="30" cy="24" r="2" fill="${IK.dark}"/>
    <ellipse cx="24" cy="30" rx="4.5" ry="3" fill="${IK.cream}"/>
    <path d="M22.5 29C23.5 30 24.5 30 25.5 29" stroke="${IK.dark}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="14" cy="28" r="2.5" fill="${IK.pink}"/>
    <circle cx="34" cy="28" r="2.5" fill="${IK.pink}"/>
  </svg>`,

  check: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill="${IK.green}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M15 24L21 30L33 18" stroke="${IK.dark}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  plus: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M24 15V33M15 24H33" stroke="${IK.dark}" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  trash: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 13H39" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 13L16 39C16.1 40.7 17.5 42 19.2 42H28.8C30.5 42 31.9 40.7 32 39L34 13" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M19 13V8C19 6.9 19.9 6 21 6H27C28.1 6 29 6.9 29 8V13" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M20 20V34M28 20V34" stroke="${IK.red}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  edit: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 8L39 17L17 39H8V30L30 8Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M26 12L35 21" stroke="${IK.dark}" stroke-width="2.5"/>
    <path d="M8 39L13 36" stroke="${IK.dark}" stroke-width="2.5"/>
  </svg>`,

  search: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="13" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M31 31L42 42" stroke="${IK.pink}" stroke-width="5" stroke-linecap="round"/>
    <path d="M16 16C17 15 19 14.5 21 14.5" stroke="${IK.blue}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  filter: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10H41L28 26V38L20 42V26L7 10Z" fill="${IK.lav}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="24" cy="18" r="3" fill="${IK.yellow}"/>
  </svg>`,

  clock: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="17" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M24 13V24L31 28" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="24" cy="24" r="3" fill="${IK.red}"/>
  </svg>`,

  money: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="17" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="24" cy="24" r="12" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="24" y="30" font-size="16" font-weight="900" text-anchor="middle" fill="${IK.dark}">¥</text>
  </svg>`,

  tag: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8H20L40 28L28 40L8 20V8Z" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="16" cy="16" r="3.5" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="2"/>
  </svg>`,

  camera: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="14" width="34" height="26" rx="6" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M16 14L19 8H29L32 14H16Z" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="24" cy="27" r="7.5" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="24" cy="27" r="3.5" fill="${IK.yellow}"/>
    <circle cx="34" cy="20" r="2" fill="${IK.red}"/>
  </svg>`,

  folder: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13C6 10.8 7.8 9 10 9H20L25 15H38C40.2 15 42 16.8 42 19V38C42 40.2 40.2 42 38 42H10C7.8 42 6 40.2 6 38V13Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M6 21H42" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="35" cy="28" r="2" fill="${IK.pink}"/>
  </svg>`,

  folder_add: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13C6 10.8 7.8 9 10 9H20L25 15H38C40.2 15 42 16.8 42 19V38C42 40.2 40.2 42 38 42H10C7.8 42 6 40.2 6 38V13Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="33" cy="30" r="7" fill="${IK.green}" stroke="${IK.dark}" stroke-width="2.5"/>
    <path d="M33 26V34M29 30H37" stroke="${IK.dark}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  image: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="5" fill="${IK.white}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="17" cy="18" r="3.5" fill="${IK.yellow}"/>
    <path d="M9 33L18 24L26 31L32 26L39 33V35C39 37.2 37.2 39 35 39H13C10.8 39 9 37.2 9 35V33Z" fill="${IK.blue}"/>
  </svg>`,

  share: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 6L20 28M42 6L28 42L20 28L6 20L42 6Z" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="41" cy="7" r="2.5" fill="${IK.yellow}"/>
  </svg>`,

  download: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8V32M24 32L14 22M24 32L34 22" stroke="${IK.dark}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 34V38C8 40.2 9.8 42 12 42H36C38.2 42 40 40.2 40 38V34" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  back: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 10L16 24L30 38" stroke="${IK.dark}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  close: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12L36 36M36 12L12 36" stroke="${IK.dark}" stroke-width="4.5" stroke-linecap="round"/>
  </svg>`,

  user: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="8" fill="${IK.skin}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M11 39C11 32 17 26 24 26C31 26 37 32 37 39" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  note: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H38C39.1 6 40 6.9 40 8V32L30 42H10C8.9 42 8 41.1 8 40V8C8 6.9 8.9 6 10 6Z" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M30 32H40L30 42V32Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M16 16H32M16 24H32M16 32H24" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  gift: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="20" width="32" height="22" rx="4" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <rect x="6" y="14" width="36" height="8" rx="2" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M24 14V42" stroke="${IK.red}" stroke-width="3.5"/>
    <path d="M24 14C24 14 18 6 13 8C8 10 11 14 24 14ZM24 14C24 14 30 6 35 8C40 10 37 14 24 14Z" fill="${IK.red}" stroke="${IK.dark}" stroke-width="2.5"/>
  </svg>`,

  sparkles: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L26.5 17.5L40 20L26.5 22.5L24 36L21.5 22.5L8 20L21.5 17.5L24 4Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 30L37.5 36.5L44 38L37.5 39.5L36 46L34.5 39.5L28 38L34.5 36.5L36 30Z" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2"/>
  </svg>`,

  coffee: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="24" height="24" rx="5" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M32 22H36C38.2 22 40 23.8 40 26V30C40 32.2 38.2 34 36 34H32" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 10C14 7 17 7 17 4M21 10C21 7 24 7 24 4" stroke="${IK.pink}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  cat_paw: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="30" rx="10" ry="8" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2.5"/>
    <circle cx="13" cy="18" r="3.5" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2"/>
    <circle cx="20" cy="14" r="4" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2"/>
    <circle cx="28" cy="14" r="4" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2"/>
    <circle cx="35" cy="18" r="3.5" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="2"/>
  </svg>`,

  palette: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6C13 6 5 14 5 25C5 34 11 41 20 41C22 41 24 39.5 24 37.5C24 36.5 23.5 35.5 23.5 34.5C23.5 32.5 25 31 27 31H31C38 31 43 25.5 43 18.5C43 11.5 34.5 6 24 6Z" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="14" cy="17" r="3.5" fill="${IK.red}"/>
    <circle cx="23" cy="13" r="3.5" fill="${IK.yellow}"/>
    <circle cx="33" cy="16" r="3.5" fill="${IK.blue}"/>
    <circle cx="36" cy="24" r="3.5" fill="${IK.green}"/>
  </svg>`,

  backup: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 28C8.7 28 6 25.3 6 22C6 19 8.2 16.5 11.1 16.1C12.1 10.4 17.1 6 23 6C30.2 6 36 11.8 36 19C39.3 19 42 21.7 42 25C42 28.3 39.3 31 36 31H28" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 24V40M24 40L17 33M24 40L31 33" stroke="${IK.dark}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  theme: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 40L28 20M34 8L39 13L32 20L27 15L34 8Z" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 40L28 20" stroke="${IK.yellow}" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="38" cy="28" r="2" fill="${IK.pink}"/>
    <circle cx="20" cy="10" r="2.5" fill="${IK.blue}"/>
    <circle cx="12" cy="22" r="1.5" fill="${IK.lav}"/>
  </svg>`,

  info: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill="${IK.blue}" stroke="${IK.dark}" stroke-width="3"/>
    <circle cx="24" cy="15" r="2.5" fill="${IK.dark}"/>
    <path d="M24 22V33" stroke="${IK.dark}" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  warning: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L42 38H6L24 6Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 18V28" stroke="${IK.dark}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="24" cy="33" r="2" fill="${IK.dark}"/>
  </svg>`,

  batch: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="6" width="26" height="26" rx="5" fill="${IK.cream}" stroke="${IK.dark}" stroke-width="2.5"/>
    <rect x="8" y="14" width="26" height="26" rx="5" fill="${IK.pink}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M14 26L19 31L28 21" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  sort: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10V38M15 10L9 16M15 10L21 16" stroke="${IK.dark}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33 38V10M33 38L27 32M33 38L39 32" stroke="${IK.lip}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  compress: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18L18 8M18 8H10M18 8V16" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 30L30 40M30 40H38M30 40V32" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="14" y="14" width="20" height="20" rx="4" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3"/>
  </svg>`,

  lock: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="28" height="22" rx="5" fill="${IK.green}" stroke="${IK.dark}" stroke-width="3"/>
    <path d="M16 20V14C16 9.6 19.6 6 24 6C28.4 6 32 9.6 32 14V20" stroke="${IK.dark}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="24" cy="30" r="3" fill="${IK.cream}"/>
  </svg>`,

  chevron_right: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 12L30 24L18 36" stroke="${IK.dark}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevron_down: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18L24 30L36 18" stroke="${IK.dark}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  bell: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6C18 6 13 11 13 17V26L8 33H40L35 26V17C35 11 30 6 24 6Z" fill="${IK.yellow}" stroke="${IK.dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 37C20 39.2 21.8 41 24 41C26.2 41 28 39.2 28 37" stroke="${IK.dark}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="34" cy="11" r="5" fill="${IK.red}"/>
  </svg>`
};

// Helper: Get icon SVG
function getIcon(name, size = 24) {
  const svg = ICONS[name] || ICONS['star'];
  return `<span class="svg-icon svg-icon-${name}" style="display:inline-flex;width:${size}px;height:${size}px;">${svg}</span>`;
}
