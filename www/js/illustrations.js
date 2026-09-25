/**
 * 妖画集 · 高保真手绘插画与贴纸矢量库 (Illustrations & Sticker Graphics)
 * 1:1 对标 UI 设计提案图中的二次元粉彩手账插画与贴纸
 */

const ILLUST = {
  // 1. 画手小妖头像 (棕发粉贝雷帽双马尾萌妹)
  artistAvatar: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <!-- 浅米色底圆 -->
    <circle cx="50" cy="50" r="48" fill="#FFF3E8" stroke="#5C4B47" stroke-width="3"/>
    <!-- 双马尾底发 -->
    <path d="M22 55C14 62 16 78 24 82C30 84 32 75 30 68" fill="#8C5E47" stroke="#5C4B47" stroke-width="3" stroke-linecap="round"/>
    <path d="M78 55C86 62 84 78 76 82C70 84 68 75 70 68" fill="#8C5E47" stroke="#5C4B47" stroke-width="3" stroke-linecap="round"/>
    <!-- 身体/衣服 -->
    <path d="M34 85C34 76 40 72 50 72C60 72 66 76 66 85V96H34V85Z" fill="#FFAAA6" stroke="#5C4B47" stroke-width="3"/>
    <path d="M44 72L50 80L56 72" stroke="#5C4B47" stroke-width="2.5" fill="#FFF"/>
    <!-- 脸部 -->
    <ellipse cx="50" cy="52" rx="22" ry="20" fill="#FFE0BD" stroke="#5C4B47" stroke-width="3"/>
    <!-- 腮红 -->
    <ellipse cx="36" cy="56" rx="4" ry="2.5" fill="#FF8DA1" opacity="0.6"/>
    <ellipse cx="64" cy="56" rx="4" ry="2.5" fill="#FF8DA1" opacity="0.6"/>
    <!-- 眼睛 -->
    <ellipse cx="40" cy="50" rx="2.5" ry="3.5" fill="#3C2A26"/>
    <ellipse cx="60" cy="50" rx="2.5" ry="3.5" fill="#3C2A26"/>
    <circle cx="39" cy="48.5" r="1" fill="#FFF"/>
    <circle cx="59" cy="48.5" r="1" fill="#FFF"/>
    <!-- 微笑 -->
    <path d="M47 56C49 58 51 58 53 56" stroke="#3C2A26" stroke-width="2" stroke-linecap="round"/>
    <!-- 刘海 -->
    <path d="M28 48C30 38 40 36 50 36C60 36 70 38 72 48C67 43 62 45 57 44C52 43 48 45 43 44C38 43 33 46 28 48Z" fill="#8C5E47" stroke="#5C4B47" stroke-width="3"/>
    <!-- 粉色贝雷帽 -->
    <path d="M24 38C22 24 38 16 54 18C70 20 78 30 76 38C70 32 40 32 24 38Z" fill="#FF8DA1" stroke="#5C4B47" stroke-width="3"/>
    <!-- 贝雷帽小啾啾 -->
    <path d="M50 16V10" stroke="#5C4B47" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  // 2. 铃铛通知图标 (Notification Bell - 纯净铃铛，红点通过独立 badge 控制)
  bellIcon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:26px;height:26px;">
    <path d="M24 8C17.4 8 12 13.4 12 20V29L8 35H40L36 29V20C36 13.4 30.6 8 24 8Z" fill="#FFE082" stroke="#5C4B47" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 38C20 40.2 21.8 42 24 42C26.2 42 28 40.2 28 38" stroke="#5C4B47" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // 3. 数据卡贴纸图标 1: 总接单 (带爱心与铅笔的便签纸)
  stickerOrders: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:46px;height:46px;">
    <rect x="10" y="8" width="36" height="46" rx="6" fill="#FFFFFF" stroke="#5C4B47" stroke-width="3"/>
    <!-- 爱心印章 -->
    <path d="M28 20C26 17 21 18 21 21C21 24 28 28 28 28C28 28 35 24 35 21C35 18 30 17 28 20Z" fill="#FF8DA1"/>
    <!-- 横线 -->
    <path d="M18 34H38" stroke="#5C4B47" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M18 42H32" stroke="#5C4B47" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 铅笔 -->
    <g transform="rotate(35 48 38)">
      <rect x="42" y="16" width="8" height="24" rx="2" fill="#FFD54F" stroke="#5C4B47" stroke-width="2"/>
      <path d="M42 40L46 48L50 40H42Z" fill="#FFE082" stroke="#5C4B47" stroke-width="2"/>
      <path d="M45 46L46 48L47 46" fill="#5C4B47"/>
      <rect x="42" y="12" width="8" height="4" fill="#FF8DA1" stroke="#5C4B47" stroke-width="2"/>
    </g>
  </svg>`,

  // 4. 数据卡贴纸图标 2: 钱包收入 (暖黄束口钱袋带 ¥)
  stickerWallet: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:46px;height:46px;">
    <!-- 钱袋主体 -->
    <path d="M32 20C20 20 12 30 12 44C12 52 20 56 32 56C44 56 52 52 52 44C52 30 44 20 32 20Z" fill="#FFD54F" stroke="#5C4B47" stroke-width="3"/>
    <!-- 束口与褶皱 -->
    <path d="M22 20L20 12H44L42 20" fill="#FFCA28" stroke="#5C4B47" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 20C26 22 38 22 44 20" stroke="#FF8DA1" stroke-width="4" stroke-linecap="round"/>
    <!-- 金币符号 ¥ -->
    <circle cx="32" cy="40" r="10" fill="#FFF8E1" stroke="#5C4B47" stroke-width="2"/>
    <text x="32" y="44" font-family="Nunito, sans-serif" font-weight="900" font-size="12" text-anchor="middle" fill="#5C4B47">¥</text>
  </svg>`,

  // 5. 数据卡贴纸图标 3: 已完成 (木质调色盘带绿对勾)
  stickerDone: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:46px;height:46px;">
    <!-- 调色盘 -->
    <path d="M32 10C18 10 10 20 10 34C10 46 22 54 36 54C42 54 48 50 48 44C48 40 44 38 46 32C48 26 54 28 54 22C54 14 44 10 32 10Z" fill="#FFE0B2" stroke="#5C4B47" stroke-width="3"/>
    <!-- 颜料点 -->
    <circle cx="22" cy="22" r="3.5" fill="#FF8DA1"/>
    <circle cx="34" cy="18" r="3.5" fill="#FFE082"/>
    <circle cx="44" cy="24" r="3.5" fill="#81D4FA"/>
    <circle cx="22" cy="34" r="3.5" fill="#CE93D8"/>
    <!-- 完成对勾圆徽章 -->
    <circle cx="42" cy="42" r="10" fill="#81C784" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M37 42L40.5 45.5L47 38" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // 6. 数据卡贴纸图标 4: 稿条分类 (可爱立体文件夹)
  stickerFolder: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:46px;height:46px;">
    <path d="M8 20C8 16 11 14 15 14H26L31 20H49C53 20 56 23 56 27V48C56 52 53 55 49 55H15C11 55 8 52 8 48V20Z" fill="#FFF9C4" stroke="#5C4B47" stroke-width="3"/>
    <!-- 前盖板 -->
    <path d="M8 26L14 52C14.5 54 16.5 55 18.5 55H53.5C55.5 55 57 53.5 57.5 51.5L62 30C62.5 27.5 60.5 25 58 25H12C9.5 25 8 26 8 26Z" fill="#FFE082" stroke="#5C4B47" stroke-width="3"/>
    <!-- 纸张露出 -->
    <path d="M18 16V22H46V16" stroke="#5C4B47" stroke-width="2.5" fill="#FFFFFF"/>
  </svg>`,

  // 7. 手边的稿子 - 萌狐少女头像 (用于手边稿单缩略图)
  foxGirl: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;border-radius:12px;">
    <rect width="80" height="80" rx="14" fill="#FFE6D6"/>
    <!-- 狐狸大耳朵 -->
    <path d="M16 26L28 8L36 28" fill="#FF8A65" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M22 24L28 14L32 25" fill="#FFF3E0"/>
    <path d="M64 26L52 8L44 28" fill="#FF8A65" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M58 24L52 14L48 25" fill="#FFF3E0"/>
    <!-- 蓬松尾巴露出 -->
    <path d="M56 56C68 52 74 60 70 70C66 76 56 74 54 66" fill="#FF8A65" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M66 66C70 64 68 70 66 72" fill="#FFFFFF"/>
    <!-- 身体/红白裙 -->
    <path d="M28 58C28 50 34 48 40 48C46 48 52 50 52 58V76H28V58Z" fill="#FF5252" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M35 48L40 54L45 48" stroke="#5C4B47" stroke-width="2" fill="#FFFFFF"/>
    <!-- 脸部 -->
    <ellipse cx="40" cy="40" rx="18" ry="16" fill="#FFE0BD" stroke="#5C4B47" stroke-width="2.5"/>
    <ellipse cx="28" cy="44" rx="3" ry="2" fill="#FF8A65" opacity="0.6"/>
    <ellipse cx="52" cy="44" rx="3" ry="2" fill="#FF8A65" opacity="0.6"/>
    <!-- 眼睛 -->
    <circle cx="34" cy="38" r="2.5" fill="#3C2A26"/>
    <circle cx="46" cy="38" r="2.5" fill="#3C2A26"/>
    <circle cx="33" cy="37" r="0.8" fill="#FFFFFF"/>
    <circle cx="45" cy="37" r="0.8" fill="#FFFFFF"/>
    <!-- 橙色卷发刘海 -->
    <path d="M22 36C26 28 32 26 40 26C48 26 54 28 58 36C54 32 48 33 40 33C32 33 26 32 22 36Z" fill="#FF8A65" stroke="#5C4B47" stroke-width="2.5"/>
  </svg>`,

  // 8. 糖果悬浮按钮 (Candy FAB)
  candyFab: `<svg viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:72px;height:46px;">
    <!-- 左糖纸褶皱 -->
    <path d="M24 28L4 14C2 22 2 34 4 42L24 28Z" fill="#FF8DA1" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M9 22L19 28L9 34" stroke="#5C4B47" stroke-width="2" stroke-linecap="round"/>
    <!-- 右糖纸褶皱 -->
    <path d="M64 28L84 14C86 22 86 34 84 42L64 28Z" fill="#FF8DA1" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M79 22L69 28L79 34" stroke="#5C4B47" stroke-width="2" stroke-linecap="round"/>
    <!-- 中间大糖果圆心 -->
    <circle cx="44" cy="28" r="24" fill="#FFE082" stroke="#5C4B47" stroke-width="3"/>
    <circle cx="44" cy="28" r="19" fill="#FFD54F"/>
    <!-- 加号 ＋ -->
    <path d="M44 18V38M34 28H54" stroke="#5C4B47" stroke-width="4.5" stroke-linecap="round"/>
  </svg>`,

  // 9. 白桃桃勋章大头像 (Rosette Ribbon Medallion Avatar)
  whitePeachRosette: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <!-- 背后大缎带尾巴 -->
    <path d="M30 68L16 94L32 88L40 76" fill="#FFB5C5" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70 68L84 94L68 88L60 76" fill="#FFB5C5" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- 勋章大花边圆盘 -->
    <circle cx="50" cy="46" r="38" fill="#FFB5C5" stroke="#5C4B47" stroke-width="3"/>
    <circle cx="50" cy="46" r="32" fill="#FFF3E8" stroke="#5C4B47" stroke-width="2"/>
    <!-- 头顶蝴蝶结 -->
    <path d="M36 18C30 10 40 8 46 16L50 20L54 16C60 8 70 10 64 18C58 24 50 22 50 22C50 22 42 24 36 18Z" fill="#FF8DA1" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 白桃桃粉发与脸 -->
    <path d="M32 50C28 62 34 70 42 70C50 70 52 64 50 56" fill="#FFAAA6"/>
    <ellipse cx="50" cy="48" rx="18" ry="16" fill="#FFE0BD" stroke="#5C4B47" stroke-width="2"/>
    <!-- 粉色长卷发 -->
    <path d="M30 42C34 30 44 28 50 28C56 28 66 30 70 42C66 38 60 40 50 40C40 40 34 38 30 42Z" fill="#FFAAA6" stroke="#5C4B47" stroke-width="2.5"/>
    <circle cx="43" cy="47" r="2.2" fill="#3C2A26"/>
    <circle cx="57" cy="47" r="2.2" fill="#3C2A26"/>
    <ellipse cx="38" cy="51" rx="3" ry="1.8" fill="#FF8DA1" opacity="0.6"/>
    <ellipse cx="62" cy="51" rx="3" ry="1.8" fill="#FF8DA1" opacity="0.6"/>
  </svg>`,

  // 10. 星野喵头像 (星野猫猫)
  catAvatar: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <circle cx="40" cy="40" r="38" fill="#E8EAF6" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 猫耳 -->
    <path d="M22 28L28 12L40 24" fill="#FFCC80" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M26 24L30 16L36 22" fill="#FFAB91"/>
    <path d="M58 28L52 12L40 24" fill="#FFCC80" stroke="#5C4B47" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M54 24L50 16L44 22" fill="#FFAB91"/>
    <!-- 猫脸圆圈 -->
    <circle cx="40" cy="44" r="24" fill="#FFF8E1" stroke="#5C4B47" stroke-width="2.5"/>
    <ellipse cx="32" cy="40" rx="3" ry="3.5" fill="#3C2A26"/>
    <ellipse cx="48" cy="40" rx="3" ry="3.5" fill="#3C2A26"/>
    <!-- 鼻子 & 嘴 -->
    <path d="M38 46L42 46L40 48Z" fill="#FF8A65"/>
    <path d="M36 49C38 51 40 51 40 49C40 51 42 51 44 49" stroke="#5C4B47" stroke-width="2" stroke-linecap="round"/>
    <!-- 红色小铃铛项圈 -->
    <path d="M26 62C34 66 46 66 54 62" stroke="#FF5252" stroke-width="4" stroke-linecap="round"/>
    <circle cx="40" cy="65" r="4" fill="#FFD54F" stroke="#5C4B47" stroke-width="1.5"/>
  </svg>`,

  // 11. 雾雨头像 (短发眼镜少女)
  glassesGirl: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <circle cx="40" cy="40" r="38" fill="#ECEFF1" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 脸 -->
    <ellipse cx="40" cy="44" rx="20" ry="18" fill="#FFE0BD" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 蓝灰短发 -->
    <path d="M18 42C16 24 30 18 40 18C50 18 64 24 62 42C58 34 52 34 40 34C28 34 22 34 18 42Z" fill="#78909C" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M18 42V56C18 60 22 62 26 58" fill="#78909C" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M62 42V56C62 60 58 62 54 58" fill="#78909C" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 圆眼镜 -->
    <circle cx="32" cy="44" r="6" stroke="#5C4B47" stroke-width="2" fill="none"/>
    <circle cx="48" cy="44" r="6" stroke="#5C4B47" stroke-width="2" fill="none"/>
    <path d="M38 44H42" stroke="#5C4B47" stroke-width="2"/>
    <circle cx="32" cy="44" r="2" fill="#3C2A26"/>
    <circle cx="48" cy="44" r="2" fill="#3C2A26"/>
  </svg>`,

  // 12. 价目表底部猫爪印章贴纸 (Cat Paw Stamp)
  catPawStamp: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:52px;height:52px;">
    <!-- 肉球大掌心 -->
    <path d="M40 36C26 36 22 48 24 58C26 68 34 70 40 70C46 70 54 68 56 58C58 48 54 36 40 36Z" fill="#FFCDD2" stroke="#5C4B47" stroke-width="3"/>
    <!-- 四个趾垫 -->
    <ellipse cx="22" cy="30" rx="6" ry="8" fill="#FFCDD2" stroke="#5C4B47" stroke-width="2.5"/>
    <ellipse cx="34" cy="20" rx="6.5" ry="8.5" fill="#FFCDD2" stroke="#5C4B47" stroke-width="2.5"/>
    <ellipse cx="46" cy="20" rx="6.5" ry="8.5" fill="#FFCDD2" stroke="#5C4B47" stroke-width="2.5"/>
    <ellipse cx="58" cy="30" rx="6" ry="8" fill="#FFCDD2" stroke="#5C4B47" stroke-width="2.5"/>
  </svg>`,

  // 13. 示例约稿图 6 张 (Q版头像，生成为可爱马卡龙色块插画)
  sampleQAvatars: [
    { bg: '#FFF1BD', hair: '#8D6E63', hat: '猫耳', hatColor: '#FFAB91', skin: '#FFE0BD', dress: '#FF8A65' },
    { bg: '#FFD1DC', hair: '#4E342E', hat: '呆毛', hatColor: '#81D4FA', skin: '#FFE0BD', dress: '#64B5F6' },
    { bg: '#D8ECFF', hair: '#D7CCC8', hat: '贝雷帽', hatColor: '#81D4FA', skin: '#FFE0BD', dress: '#BA68C8' },
    { bg: '#E6DBFF', hair: '#5D4037', hat: '兔耳', hatColor: '#CE93D8', skin: '#FFE0BD', dress: '#E1BEE7' },
    { bg: '#D3F4DF', hair: '#A1887F', hat: '画家帽', hatColor: '#FFD54F', skin: '#FFE0BD', dress: '#FFD54F' },
    { bg: '#FFE0B2', hair: '#FFE082', hat: '双马尾', hatColor: '#FF8A65', skin: '#FFE0BD', dress: '#FF7043' }
  ],

  // 14. 示例约稿图 6 张 (精致半身插画，氛围光影)
  sampleBustIllustrations: [
    { bg: '#FFE0B2', theme: '暖阳微风', tag: '黄昏' },
    { bg: '#FFCDD2', theme: '日落晚霞', tag: '晚霞' },
    { bg: '#C5CAE9', theme: '星空学长', tag: '星夜' },
    { bg: '#BBDEFB', theme: '水手服晨光', tag: '晴空' },
    { bg: '#D1C4E9', theme: '花房少女', tag: '花见' },
    { bg: '#FFF9C4', theme: '金秋制服', tag: '枫叶' }
  ]
};

// 动态生成 Q 版头像 SVG
function createChibiAvatarSvg(bg, hair, hat, hatColor, skin, dress) {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:14px;">
    <rect width="100" height="100" rx="14" fill="${bg}"/>
    <!-- 发型后部 -->
    <circle cx="50" cy="52" r="30" fill="${hair}"/>
    <!-- 身体衣服 -->
    <path d="M32 78C32 68 40 66 50 66C60 66 68 68 68 78V98H32V78Z" fill="${dress}" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M44 66L50 74L56 66" fill="#FFF" stroke="#5C4B47" stroke-width="2"/>
    <!-- 脸部 -->
    <ellipse cx="50" cy="50" rx="24" ry="20" fill="${skin}" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 腮红 -->
    <circle cx="34" cy="54" r="4" fill="#FF8A65" opacity="0.5"/>
    <circle cx="66" cy="54" r="4" fill="#FF8A65" opacity="0.5"/>
    <!-- 眼睛 -->
    <circle cx="38" cy="48" r="3" fill="#3C2A26"/>
    <circle cx="62" cy="48" r="3" fill="#3C2A26"/>
    <circle cx="37" cy="46.5" r="1.2" fill="#FFF"/>
    <circle cx="61" cy="46.5" r="1.2" fill="#FFF"/>
    <!-- 微笑 -->
    <path d="M46 54C48 57 52 57 54 54" stroke="#3C2A26" stroke-width="2" stroke-linecap="round"/>
    <!-- 刘海 -->
    <path d="M26 46C30 34 40 32 50 32C60 32 70 34 74 46C68 40 62 42 50 42C38 42 32 40 26 46Z" fill="${hair}" stroke="#5C4B47" stroke-width="2.5"/>
    <!-- 头饰 -->
    <circle cx="50" cy="24" r="8" fill="${hatColor}" stroke="#5C4B47" stroke-width="2"/>
  </svg>`;
}

// 动态生成半身氛围插画 SVG
function createBustIllustSvg(bg, theme, tag) {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:14px;">
    <rect width="100" height="100" rx="14" fill="${bg}"/>
    <!-- 窗框/背景光斑 -->
    <path d="M10 20H90M50 10V90" stroke="rgba(255,255,255,0.4)" stroke-width="4"/>
    <circle cx="78" cy="24" r="12" fill="rgba(255,255,255,0.5)"/>
    <!-- 人物肩膀 -->
    <path d="M22 85C24 66 36 62 50 62C64 62 76 66 78 85V100H22V85Z" fill="#FFFFFF" stroke="#5C4B47" stroke-width="2.5"/>
    <path d="M42 62L50 72L58 62" fill="#FF8DA1"/>
    <!-- 头部和秀发 -->
    <ellipse cx="50" cy="46" rx="18" ry="17" fill="#FFE0BD" stroke="#5C4B47" stroke-width="2"/>
    <path d="M30 46C32 26 42 22 50 22C58 22 68 26 70 46C74 64 68 76 66 80M30 46C26 64 32 76 34 80" stroke="#5C4B47" stroke-width="2.5" fill="none"/>
    <path d="M32 40C38 32 44 32 50 32C56 32 62 32 68 40" stroke="#5C4B47" stroke-width="2"/>
    <!-- 眼睛深情光芒 -->
    <ellipse cx="43" cy="44" rx="2.5" ry="3.5" fill="#3C2A26"/>
    <ellipse cx="57" cy="44" rx="2.5" ry="3.5" fill="#3C2A26"/>
    <circle cx="42" cy="42" r="1" fill="#FFF"/>
    <circle cx="56" cy="42" r="1" fill="#FFF"/>
  </svg>`;
}

// 导出全局供 app.js 使用
window.ILLUST = ILLUST;
window.createChibiAvatarSvg = createChibiAvatarSvg;
window.createBustIllustSvg = createBustIllustSvg;
