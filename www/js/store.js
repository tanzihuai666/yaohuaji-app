/**
 * 妖画集 · 本地离线数据管理引擎 (v7 架构)
 * 纯本地存储、无网络依赖、双模支持 (Capacitor Filesystem / Web Fallback)
 */

const DATA_FILENAME = 'yaohuaji_data.json';
const SCHEMA_VERSION = 7;

// 默认基础数据
const DEFAULT_DATA = {
  version: SCHEMA_VERSION,
  settings: {
    nickname: '画手小妖',
    slogan: '今天也要开开心心画画呀~',
    avatar: '',
    theme: 'pastel',
    customBg: '',
    customBgOpacity: 0.35,
    lastBackup: null
  },
  types: [
    { id: 't_head', name: '头像', isDefault: true },
    { id: 't_bust', name: '半身', isDefault: true },
    { id: 't_full', name: '全身立绘', isDefault: true },
    { id: 't_q', name: 'Q版插画', isDefault: true },
    { id: 't_scene', name: '场景插画', isDefault: true },
    { id: 't_cg', name: '商业CG', isDefault: true }
  ],
  orders: [
    {
      id: 'ord_demo_1',
      client: '描客',
      type: '单人半身插画',
      status: 'line', // draft, sketch, line, color, done, delivered
      price: 520,
      size: '2000x2000 300dpi',
      purpose: '个人非商用',
      startDate: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      reminderTime: '',
      note: '软萌粉发少女，带着星星发卡，神态自信微红。',
      images: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'ord_demo_2',
      client: '清浪',
      type: '萌系Q版头像',
      status: 'sketch',
      price: 260,
      size: '1500x1500 300dpi',
      purpose: '自用头像',
      startDate: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
      reminderTime: '',
      note: '少年感银灰短发，眼睛戴一副无框眼镜。',
      images: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'ord_demo_3',
      client: '落落',
      type: 'Q版插画',
      status: 'done',
      price: 180,
      size: '1500x1500 300dpi',
      purpose: '个人头像',
      startDate: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
      reminderTime: '',
      note: '猫耳女仆装萌系头像',
      images: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'ord_demo_4',
      client: '初见',
      type: '双人立绘',
      status: 'color',
      price: 880,
      size: '2500x3500 300dpi',
      purpose: '个人立牌',
      startDate: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      reminderTime: '',
      note: '学院制服双人，黄昏光影氛围',
      images: [],
      createdAt: new Date().toISOString()
    }
  ],
  chars: [
    {
      id: 'char_demo_1',
      name: '白桃桃',
      avatar: 'illust_rosette',
      gender: '女',
      height: '162cm',
      age: '18岁',
      birthday: '3月15日 双鱼座',
      anchor: '粉色长卷发，头顶有一对呆毛与粉白大缎带。',
      background: '魔法学院甜点系二年级生',
      story: '最大的愿望是做出一份吃了会让人感到温暖幸福的梦幻草莓芭菲。',
      tags: ['粉毛', '猫耳', '傲娇', '蝴蝶结'],
      groups: [
        {
          id: 'grp_1',
          name: '约稿记录 (共5张 · 累计稿费 ¥2,180)',
          commissions: [
            {
              id: 'comm_1',
              title: '草莓女仆装约稿',
              artist: '小草莓',
              price: 380,
              note: '甜点店打工',
              image: '',
              date: '2026-08-10'
            },
            {
              id: 'comm_2',
              title: '校服立绘',
              artist: '星野',
              price: 650,
              note: '含学院徽章',
              image: '',
              date: '2026-09-02'
            },
            {
              id: 'comm_3',
              title: '黄昏散步插画',
              artist: '清浪',
              price: 520,
              note: '街道枫叶',
              image: '',
              date: '2026-09-12'
            },
            {
              id: 'comm_4',
              title: 'Q版猫咪日常',
              artist: '白小妖',
              price: 150,
              note: '趴在蛋糕上',
              image: '',
              date: '2026-09-18'
            },
            {
              id: 'comm_5',
              title: '梦境大正插画',
              artist: '绘梦',
              price: 480,
              note: '手持油纸伞',
              image: '',
              date: '2026-09-22'
            }
          ]
        }
      ]
    },
    {
      id: 'char_demo_2',
      name: '星野喵',
      avatar: 'illust_cat',
      gender: '男',
      height: '174cm',
      age: '17岁',
      birthday: '8月20日 狮子座',
      anchor: '银灰短发，头顶猫耳，红色铃铛项圈。',
      background: '星夜杂货店见习店员',
      story: '喜欢在屋顶晒太阳看星星。',
      tags: ['银发', '猫耳', '铃铛', '傲娇少年'],
      groups: [
        {
          id: 'grp_2',
          name: '日常稿件',
          commissions: [
            {
              id: 'comm_cat_1',
              title: '猫咪睡衣插画',
              artist: '清浪',
              price: 350,
              note: '抱枕',
              image: '',
              date: '2026-09-05'
            }
          ]
        }
      ]
    },
    {
      id: 'char_demo_3',
      name: '雾雨',
      avatar: 'illust_glasses',
      gender: '女',
      height: '166cm',
      age: '19岁',
      birthday: '11月4日 天蝎座',
      anchor: '深蓝灰短发，戴圆框眼镜，符文风衣。',
      background: '古代符文研习社社长',
      story: '研究失落古代魔导书的学者。',
      tags: ['眼镜', '短发', '知性', '符文法师'],
      groups: [
        {
          id: 'grp_3',
          name: '法师立绘',
          commissions: [
            {
              id: 'comm_rain_1',
              title: '图书馆研究插画',
              artist: '绘梦',
              price: 520,
              note: '魔导书光效',
              image: '',
              date: '2026-09-15'
            }
          ]
        }
      ]
    }
  ],
  folders: [
    { id: 'root', name: '画库根目录', parentId: null, createdAt: new Date().toISOString() },
    { id: 'f_oc', name: '自家设子', parentId: 'root', createdAt: new Date().toISOString() },
    { id: 'f_proj', name: '商插草稿', parentId: 'root', createdAt: new Date().toISOString() }
  ],
  galleryImages: [],
  priceList: {
    title: '画风展示 & 约稿价目表',
    headerNotice: '✦ 约稿前请确认档期，感谢喜爱与支持 ✦',
    footerNotice: '妖画集出品 · 诚信约稿',
    items: [
      {
        id: 'p_01',
        no: '01',
        title: 'Q版头像 / 立绘',
        priceRange: '¥80 起',
        desc: '精细线稿，包含简单背景与表情差分，双人×1.8',
        images: []
      },
      {
        id: 'p_02',
        no: '02',
        title: '角色半身插画',
        priceRange: '¥350 起',
        desc: '包含复杂光影与氛围背景，工期约 7-10 天，商用×2.5',
        images: []
      },
      {
        id: 'p_03',
        no: '03',
        title: '立绘人设立牌',
        priceRange: '¥800 起',
        desc: '含正反三视图与拆分图层，用于Live2D或个人立牌',
        images: []
      }
    ]
  }
};

class DataStore {
  constructor() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.isNative = false;
    this.backStack = [];
    this.lastBackTime = 0;
  }

  // 初始化检查存储环境
  async init() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) {
        this.isNative = true;
        await this.loadFromFilesystem();
      } else {
        this.loadFromLocalStorage();
      }
    } catch (e) {
      console.warn('Filesystem init fallback to localStorage:', e);
      this.loadFromLocalStorage();
    }
    this.applyTheme(this.data.settings.theme);
    this.applyCustomBg(this.data.settings.customBg, this.data.settings.customBgOpacity);
    this.initPhysicalBackHandler();
  }

  // 原生 Filesystem 读取
  async loadFromFilesystem() {
    const { Filesystem, Directory } = window.Capacitor.Plugins;
    try {
      const res = await Filesystem.readFile({
        path: DATA_FILENAME,
        directory: Directory.Data
      });
      const parsed = JSON.parse(res.data);
      this.data = this.migrateSchema(parsed);
    } catch (err) {
      // 文件不存在则写初始数据
      await this.saveToFilesystem();
    }
  }

  // 原生 Filesystem 写入
  async saveToFilesystem() {
    const { Filesystem, Directory } = window.Capacitor.Plugins;
    try {
      await Filesystem.writeFile({
        path: DATA_FILENAME,
        data: JSON.stringify(this.data),
        directory: Directory.Data
      });
    } catch (e) {
      console.error('Error saving to filesystem:', e);
    }
  }

  // Web LocalStorage 存取
  loadFromLocalStorage() {
    const local = localStorage.getItem('yaohuaji_data');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        this.data = this.migrateSchema(parsed);
      } catch (e) {
        console.error('Failed to parse localStorage data:', e);
      }
    } else {
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('yaohuaji_data', JSON.stringify(this.data));
    } catch (e) {
      console.warn('LocalStorage save error (likely quota):', e);
    }
  }

  // 持久化保存
  async persist() {
    if (this.isNative) {
      await this.saveToFilesystem();
    }
    this.saveToLocalStorage();
  }

  // v7 存档升级与补全
  migrateSchema(saved) {
    if (!saved || typeof saved !== 'object') return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const merged = { ...DEFAULT_DATA, ...saved };
    merged.settings = { ...DEFAULT_DATA.settings, ...(saved.settings || {}) };
    merged.types = saved.types && saved.types.length ? saved.types : DEFAULT_DATA.types;
    merged.orders = (saved.orders && saved.orders.length) ? saved.orders : DEFAULT_DATA.orders;
    merged.chars = (saved.chars && saved.chars.length) ? saved.chars : DEFAULT_DATA.chars;
    merged.folders = (saved.folders && saved.folders.length) ? saved.folders : DEFAULT_DATA.folders;
    merged.galleryImages = saved.galleryImages || [];
    merged.priceList = { ...DEFAULT_DATA.priceList, ...(saved.priceList || {}) };
    if (!merged.priceList.items || !merged.priceList.items.length) {
      merged.priceList.items = DEFAULT_DATA.priceList.items;
    }
    merged.version = SCHEMA_VERSION;
    return merged;
  }

  // 主题应用
  applyTheme(themeKey) {
    document.body.className = `theme-${themeKey || 'pastel'}`;
    this.data.settings.theme = themeKey;
  }

  // 自定义背景与透明度
  applyCustomBg(bgData, opacity = 0.35) {
    const bgLayer = document.getElementById('customBgLayer');
    if (!bgLayer) return;
    if (bgData) {
      bgLayer.style.backgroundImage = `url(${bgData})`;
      bgLayer.style.opacity = opacity;
    } else {
      bgLayer.style.backgroundImage = 'none';
      bgLayer.style.opacity = '0';
    }
    this.data.settings.customBg = bgData;
    this.data.settings.customBgOpacity = opacity;
  }

  // ================= 稿单检索与排序 =================

  filterOrders({ keyword = '', status = 'all', type = 'all', sort = 'createdAt', date = null } = {}) {
    let list = [...this.data.orders];

    // 日期联动筛选 (匹配起稿日或截稿日)
    if (date) {
      list = list.filter(o => o.startDate === date || o.endDate === date);
    }

    // 多 Token 检索 (以空格分词，匹配客户名/类型/状态/备注/日期)
    if (keyword && keyword.trim()) {
      const tokens = keyword.trim().toLowerCase().split(/\s+/);
      list = list.filter(order => {
        const fullStr = `${order.client} ${order.type} ${this.getStatusLabel(order.status)} ${order.note || ''} ${order.startDate} ${order.endDate}`.toLowerCase();
        return tokens.every(token => fullStr.includes(token));
      });
    }

    // 状态筛选
    if (status && status !== 'all') {
      list = list.filter(o => o.status === status);
    }

    // 类型筛选
    if (type && type !== 'all') {
      list = list.filter(o => o.type === type);
    }

    // 排序逻辑 (创建时间/接单日期/截单日期/金额/客户名)
    list.sort((a, b) => {
      switch (sort) {
        case 'startDate':
          return (a.startDate || '').localeCompare(b.startDate || '');
        case 'endDate':
          return (a.endDate || '').localeCompare(b.endDate || '');
        case 'price':
          return (b.price || 0) - (a.price || 0);
        case 'client':
          return (a.client || '').localeCompare(b.client || '', 'zh');
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return list;
  }

  getStatusLabel(status) {
    const map = {
      draft: '待接单',
      sketch: '草稿中',
      line: '线稿中',
      color: '上色中',
      done: '成稿待确认',
      delivered: '已交付'
    };
    return map[status] || status;
  }

  // 状态自动推进到下一步
  advanceOrderStatus(orderId) {
    const steps = ['draft', 'sketch', 'line', 'color', 'done', 'delivered'];
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return null;
    const curIdx = steps.indexOf(order.status);
    if (curIdx >= 0 && curIdx < steps.length - 1) {
      order.status = steps[curIdx + 1];
      this.persist();
      return order.status;
    }
    return order.status;
  }

  // 钱包收支计算 (总收入 / 年收入 / 月收入 / 全年逐月明细)
  getWalletStats(targetYear = new Date().getFullYear()) {
    let totalIncome = 0;
    let yearIncome = 0;
    const curMonth = new Date().getMonth();
    let curMonthIncome = 0;
    const monthDetails = Array(12).fill(0);

    this.data.orders.forEach(o => {
      const price = Number(o.price) || 0;
      totalIncome += price;
      if (o.startDate) {
        const d = new Date(o.startDate);
        if (d.getFullYear() === targetYear) {
          yearIncome += price;
          monthDetails[d.getMonth()] += price;
          if (d.getMonth() === curMonth) {
            curMonthIncome += price;
          }
        }
      }
    });

    return {
      totalIncome,
      yearIncome,
      curMonthIncome,
      targetYear,
      monthDetails
    };
  }

  // 角色档案约稿花费累计
  getCharTotalCommissionCost(char) {
    if (!char || !char.groups) return 0;
    let sum = 0;
    char.groups.forEach(g => {
      if (g.commissions) {
        g.commissions.forEach(c => {
          sum += Number(c.price) || 0;
        });
      }
    });
    return sum;
  }

  // ================= 图片高画质统一压缩 =================

  async compressImage(fileOrDataUrl, maxDim = 1600, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // 生成 200px 极速缩略图
        const thumbCanvas = document.createElement('canvas');
        const thumbDim = 200;
        let tw = width;
        let th = height;
        if (tw > th) {
          th = Math.round((th * thumbDim) / tw);
          tw = thumbDim;
        } else {
          tw = Math.round((tw * thumbDim) / th);
          th = thumbDim;
        }
        thumbCanvas.width = tw;
        thumbCanvas.height = th;
        const tctx = thumbCanvas.getContext('2d');
        tctx.drawImage(img, 0, 0, tw, th);
        const thumbDataUrl = thumbCanvas.toDataURL('image/jpeg', 0.6);

        resolve({
          data: compressedDataUrl,
          thumb: thumbDataUrl,
          width,
          height
        });
      };
      img.onerror = reject;

      if (typeof fileOrDataUrl === 'string') {
        img.src = fileOrDataUrl;
      } else {
        const reader = new FileReader();
        reader.onload = e => { img.src = e.target.result; };
        reader.onerror = reject;
        reader.readAsDataURL(fileOrDataUrl);
      }
    });
  }

  // ================= 原生插件桥接 (AppToolsPlugin) =================

  async triggerNotification(title, body, dateTimestamp) {
    if (this.isNative && window.Capacitor.Plugins.AppTools) {
      try {
        await window.Capacitor.Plugins.AppTools.setAlarmClock({
          title,
          body,
          timestamp: dateTimestamp
        });
      } catch (e) {
        console.warn('Native notification error:', e);
      }
    } else {
      console.log('Notification scheduled:', title, body, new Date(dateTimestamp));
    }
  }

  async saveImageToAlbum(base64Data, filename = 'yaohuaji_poster.png') {
    if (this.isNative && window.Capacitor.Plugins.AppTools) {
      return await window.Capacitor.Plugins.AppTools.saveToGallery({
        base64Data,
        filename
      });
    } else {
      // 浏览器环境触发下载
      const link = document.createElement('a');
      link.download = filename;
      link.href = base64Data;
      link.click();
      return { success: true };
    }
  }

  exitApplication() {
    if (this.isNative && window.Capacitor.Plugins.AppTools) {
      window.Capacitor.Plugins.AppTools.exitApp();
    } else {
      console.log('App Exit triggered');
      window.close();
    }
  }

  // ================= Android 物理返回键路由栈 =================

  initPhysicalBackHandler() {
    // 监听 Capacitor 返回键事件
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.addListener('backButton', () => {
        this.handleBackPress();
      });
    }

    // 浏览器环境支持 popstate
    window.addEventListener('popstate', () => {
      this.handleBackPress();
    });
  }

  pushBackHandler(fn) {
    this.backStack.push(fn);
  }

  popBackHandler() {
    return this.backStack.pop();
  }

  handleBackPress() {
    // 1. 若有顶层关闭句柄（大图/模态框/抽屉），先执行关闭
    if (this.backStack.length > 0) {
      const handler = this.backStack.pop();
      if (typeof handler === 'function') {
        handler();
        return;
      }
    }

    // 2. 若在子视图（如详情页、角色页），返回上一层
    if (window.app && window.app.currentSubView) {
      window.app.closeSubView();
      return;
    }

    // 3. 若不在首页主 Tab，切回首页
    if (window.app && window.app.activeTab !== 'home') {
      window.app.switchTab('home');
      return;
    }

    // 4. 在首页：双击防误退检测
    const now = Date.now();
    if (now - this.lastBackTime < 2000) {
      this.exitApplication();
    } else {
      this.lastBackTime = now;
      if (window.app) {
        window.app.showToast('再按一次退出妖画集');
      }
    }
  }
}

window.store = new DataStore();
