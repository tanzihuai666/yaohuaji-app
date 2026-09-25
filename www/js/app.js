/**
 * 妖画集 · 核心业务逻辑与视图路由控制器 (17 视图全量覆盖)
 * 采用「外壳 + 局部重绘」避免失焦闪烁、Q弹物理微动效
 */

class AppController {
  constructor() {
    this.activeTab = 'home';
    this.currentSubView = null; // 'orderDetail', 'charDetail', 'priceList', 'wallet', 'profile', 'themes', 'backup', 'about'
    this.activeOrderId = null;
    this.activeCharId = null;
    this.currentFolderId = 'root';
    this.calendarYear = new Date().getFullYear();
    this.calendarMonth = new Date().getMonth(); // 0-11
    this.selectedCalendarDate = null;
    this.searchKeyword = '';
    this.filterStatus = 'all';
    this.filterType = 'all';
    this.sortField = 'createdAt';
    this.batchMode = false;
    this.selectedImageIds = new Set();
    this.viewerImages = [];
    this.viewerIndex = 0;
  }

  async init() {
    await window.store.init();
    this.renderHeaderDate();
    this.bindGlobalEvents();
    this.initSplash();
    this.switchTab('home');
  }

  // ================= 开屏动画逻辑 (Splash Screen Controller · 1.1s 极速版) =================
  initSplash() {
    const splash = document.getElementById('appSplashOverlay');
    if (!splash) return;

    const video = document.getElementById('splashVideo');
    const skipBtn = document.getElementById('splashSkipBtn');
    let timer = null;

    const dismissSplash = () => {
      if (timer) clearTimeout(timer);
      if (splash.classList.contains('splash-dismiss')) return;
      splash.classList.add('splash-dismiss');
      setTimeout(() => {
        splash.style.display = 'none';
        if (video) video.pause();
      }, 550);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplash();
      });
    }

    if (video) {
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.addEventListener('ended', dismissSplash);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Video autoplay interrupted or waiting interaction:', err);
          setTimeout(dismissSplash, 800);
        });
      }
    }

    // 1.1s 极速视频自动结束兜底，1.8秒后平滑退出
    timer = setTimeout(dismissSplash, 1800);
  }

  // 重播开屏动画
  replaySplash() {
    let splash = document.getElementById('appSplashOverlay');
    if (!splash) return;
    splash.style.display = 'flex';
    splash.classList.remove('splash-dismiss');

    const video = document.getElementById('splashVideo');
    let timer = null;

    const dismissSplash = () => {
      if (timer) clearTimeout(timer);
      if (splash.classList.contains('splash-dismiss')) return;
      splash.classList.add('splash-dismiss');
      setTimeout(() => {
        splash.style.display = 'none';
        if (video) video.pause();
      }, 550);
    };

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      video.onended = dismissSplash;
    }

    const skipBtn = document.getElementById('splashSkipBtn');
    if (skipBtn) {
      skipBtn.onclick = (e) => {
        e.stopPropagation();
        dismissSplash();
      };
    }

    timer = setTimeout(dismissSplash, 1800);
  }

  // 顶部日期与标语
  renderHeaderDate() {
    const now = new Date();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dateStr = `${now.getMonth() + 1}月${now.getDate()}日 ${days[now.getDay()]}`;
    const dateEl = document.getElementById('headerDate');
    if (dateEl) dateEl.textContent = dateStr;
  }

  // 全局事件绑定
  bindGlobalEvents() {
    // 底部导航切换
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        this.switchTab(tab);
      });
    });

    // 顶部通知铃铛图标
    const bellIconEl = document.getElementById('headerBellIcon');
    if (bellIconEl && window.ILLUST) {
      bellIconEl.innerHTML = window.ILLUST.bellIcon;
    }

    // FAB 浮动按钮点击
    const fabBtn = document.getElementById('fabBtn');
    if (fabBtn) {
      if (window.ILLUST) {
        fabBtn.innerHTML = window.ILLUST.candyFab;
      }
      fabBtn.addEventListener('click', () => {
        this.handleFabClick();
      });
    }

    // 模态弹窗关闭与点击遮罩
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) {
          this.closeAllModals();
        }
      });
    });

    // 搜索输入框 (局部重绘订单列表，不整页重载)
    const searchInput = document.getElementById('orderSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        this.searchKeyword = e.target.value;
        this.renderOrdersListOnly();
      });
    }
  }

  // 关闭子视图或模态框
  closeSubView(pushHistory = false) {
    this.closeAllModals();
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // 切换主 Tab
  switchTab(tabName) {
    this.activeTab = tabName;
    this.closeSubView(false);

    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabName);
    });

    const fabBtn = document.getElementById('fabBtn');
    if (fabBtn) {
      // 在首页、稿单、画库展示 FAB
      fabBtn.classList.toggle('fab-hidden', tabName === 'mine');
    }

    document.querySelectorAll('.tab-view').forEach(view => {
      view.style.display = 'none';
    });

    const targetView = document.getElementById(`view-${tabName}`);
    if (targetView) {
      targetView.style.display = 'block';
    }

    // 渲染对应视图内容
    switch (tabName) {
      case 'home':
        this.renderHome();
        break;
      case 'orders':
        this.renderOrders();
        break;
      case 'gallery':
        this.renderGallery();
        break;
      case 'mine':
        this.renderMine();
        break;
    }
  }

  // ================= 1. 首页 Dashboard =================

  // 画手头像 HTML 生成器 (支持自定义上传图片、精美插画与备用矢量)
  getArtistAvatarHtml(s, size = 60) {
    if (s && s.avatar) {
      return `<img src="${s.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
    }
    if (window.ILLUST && window.ILLUST.artistAvatar) {
      return window.ILLUST.artistAvatar;
    }
    return getIcon('bear', size);
  }

  // 渲染带编辑徽标的画手头像
  renderAvatarWithBadge(avatarEl, s) {
    if (!avatarEl) return;
    const innerHtml = this.getArtistAvatarHtml(s, 56);
    avatarEl.innerHTML = `
      <div class="greeting-avatar-inner">${innerHtml}</div>
      <div class="greeting-avatar-badge" title="更换头像">✎</div>
    `;
  }

  renderHome() {
    const s = window.store.data.settings;
    const orders = window.store.data.orders;
    const stats = window.store.getWalletStats();

    // 顶部问候卡
    const avatarEl = document.getElementById('homeAvatar');
    if (avatarEl) {
      this.renderAvatarWithBadge(avatarEl, s);
    }
    const nameEl = document.getElementById('homeNick');
    if (nameEl) nameEl.textContent = s.nickname || '画手小妖';
    const sloganEl = document.getElementById('homeSlogan');
    if (sloganEl) sloganEl.textContent = s.slogan || '今天也要开开心心画画呀~';

    // 2x2 数据卡
    const completedOrders = orders.filter(o => o.status === 'done' || o.status === 'delivered');
    const priceListCount = (window.store.data.priceList.items || []).length;

    const elTotal = document.getElementById('dashTotalOrders');
    if (elTotal) elTotal.textContent = orders.length;

    const elWallet = document.getElementById('dashWalletIncome');
    if (elWallet) elWallet.textContent = `¥${stats.totalIncome.toLocaleString()}`;

    const elDone = document.getElementById('dashDoneOrders');
    if (elDone) elDone.textContent = completedOrders.length;

    const elPriceList = document.getElementById('dashPriceListItems');
    if (elPriceList) elPriceList.textContent = `${priceListCount} 项`;

    // 注入贴纸插画
    if (window.ILLUST) {
      const injectSticker = (cardId, svg) => {
        const c = document.getElementById(cardId);
        if (c && !c.querySelector('.data-card-sticker-wrap')) {
          const wrap = document.createElement('div');
          wrap.className = 'data-card-sticker-wrap';
          wrap.innerHTML = svg;
          c.appendChild(wrap);
        }
      };
      injectSticker('cardDashOrders', window.ILLUST.stickerOrders);
      injectSticker('cardDashWallet', window.ILLUST.stickerWallet);
      injectSticker('cardDashDone', window.ILLUST.stickerDone);
      injectSticker('cardDashPrice', window.ILLUST.stickerFolder);
    }

    // 绑定 2x2 卡片快捷跳转
    const cardOrders = document.getElementById('cardDashOrders');
    if (cardOrders) cardOrders.onclick = () => this.switchTab('orders');

    const cardWallet = document.getElementById('cardDashWallet');
    if (cardWallet) cardWallet.onclick = () => this.openWalletSubView();

    const cardDone = document.getElementById('cardDashDone');
    if (cardDone) cardDone.onclick = () => {
      this.filterStatus = 'done';
      this.switchTab('orders');
    };

    const cardPrice = document.getElementById('cardDashPrice');
    if (cardPrice) cardPrice.onclick = () => this.openPriceListSubView();

    // 手边的稿子快速卡片
    const ongoing = orders.filter(o => o.status !== 'delivered');
    const scrollWrap = document.getElementById('homeQuickOrdersScroll');
    if (scrollWrap) {
      if (ongoing.length === 0) {
        scrollWrap.innerHTML = `
          <div style="padding: 20px; text-align: center; color: var(--subtext); font-weight: 700; width: 100%;">
            暂无进行中的画稿，点击右下角 ＋ 开启新约稿吧~
          </div>`;
      } else {
        scrollWrap.innerHTML = ongoing.map(o => {
          const daysLeft = this.calculateDaysLeft(o.endDate);
          return `
            <div class="quick-order-card" onclick="app.openOrderDetail('${o.id}')">
              <div class="quick-order-thumb">
                ${(o.images && o.images[0]) ? `<img src="${o.images[0]}" style="width:100%;height:100%;object-fit:cover;" />` : (window.ILLUST ? window.ILLUST.foxGirl : getIcon('brush', 32))}
              </div>
              <div class="quick-order-info">
                <div class="quick-order-title-row">
                  <div class="quick-order-client">客户 ${this.escapeHtml(o.client)}</div>
                  <div class="quick-order-price">¥${o.price || 0}</div>
                </div>
                <div style="font-size:12px;font-weight:700;color:var(--subtext);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${this.escapeHtml(o.type)}
                </div>
                <div class="quick-order-meta">
                  <span class="badge-chip ${daysLeft <= 3 ? 'badge-coral' : 'badge-green'}">
                    ${daysLeft <= 0 ? '今日截稿' : `截稿: ${daysLeft}天后`}
                  </span>
                  <span class="badge-chip badge-primary">${window.store.getStatusLabel(o.status)}</span>
                </div>
              </div>
            </div>`;
        }).join('');
      }
    }
  }

  // ================= 2. 稿单页 (日历 + 列表联动) =================

  renderOrders() {
    this.renderOrderFilterChips();
    this.renderOrderCalendar();
    this.renderOrdersListOnly();
  }

  // 状态筛选 Chips
  renderOrderFilterChips() {
    const statuses = [
      { id: 'all', label: '全部' },
      { id: 'draft', label: '待接单' },
      { id: 'sketch', label: '草稿' },
      { id: 'line', label: '线稿' },
      { id: 'color', label: '上色' },
      { id: 'done', label: '成稿' },
      { id: 'delivered', label: '已交付' }
    ];

    const wrap = document.getElementById('orderStatusChips');
    if (!wrap) return;

    wrap.innerHTML = statuses.map(s => `
      <div class="filter-chip chip-${s.id} ${this.filterStatus === s.id ? 'active' : ''}" 
           onclick="app.setOrderStatusFilter('${s.id}')">
        ${s.label}
      </div>
    `).join('');
  }

  setOrderStatusFilter(statusId) {
    this.filterStatus = statusId;
    this.renderOrderFilterChips();
    this.renderOrdersListOnly();
  }

  // 日历渲染 (标注接稿绿点 / 截稿珊瑚点)
  renderOrderCalendar() {
    const wrap = document.getElementById('ordersCalendarWrap');
    if (!wrap) return;

    const y = this.calendarYear;
    const m = this.calendarMonth;
    const firstDay = new Date(y, m, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(y, m + 1, 0).getDate();

    // 收集所有订单的起稿日与截稿日
    const startDates = new Set();
    const endDates = new Set();
    window.store.data.orders.forEach(o => {
      if (o.startDate) startDates.add(o.startDate);
      if (o.endDate) endDates.add(o.endDate);
    });

    let cellsHtml = '';
    // 补齐前面空白
    for (let i = 0; i < firstDay; i++) {
      cellsHtml += `<div class="calendar-day-cell other-month"></div>`;
    }

    // 当月日期
    for (let d = 1; d <= totalDays; d++) {
      const monthStr = String(m + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${y}-${monthStr}-${dayStr}`;
      const isSelected = this.selectedCalendarDate === dateKey;
      const hasStart = startDates.has(dateKey);
      const hasEnd = endDates.has(dateKey);

      cellsHtml += `
        <div class="calendar-day-cell ${isSelected ? 'selected' : ''}" onclick="app.selectCalendarDate('${dateKey}')">
          <span class="calendar-date-pill">${d}</span>
          <div class="calendar-day-dots">
            ${hasStart ? `<div class="dot-indicator dot-start"></div>` : ''}
            ${hasEnd ? `<div class="dot-indicator dot-deadline"></div>` : ''}
          </div>
        </div>`;
    }

    wrap.innerHTML = `
      <div class="calendar-header">
        <div class="calendar-month-title">${y} 年 ${m + 1} 月</div>
        <div style="display:flex;gap:6px;">
          <button class="calendar-nav-btn" onclick="app.prevCalendarMonth()">${getIcon('chevron_down', 18)}</button>
          <button class="calendar-nav-btn" onclick="app.nextCalendarMonth()">${getIcon('chevron_right', 18)}</button>
        </div>
      </div>
      <div class="calendar-weekdays">
        <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
      </div>
      <div class="calendar-days-grid">${cellsHtml}</div>
    `;
  }

  prevCalendarMonth() {
    this.calendarMonth--;
    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    }
    this.renderOrderCalendar();
  }

  nextCalendarMonth() {
    this.calendarMonth++;
    if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }
    this.renderOrderCalendar();
  }

  selectCalendarDate(dateStr) {
    if (this.selectedCalendarDate === dateStr) {
      this.selectedCalendarDate = null;
    } else {
      this.selectedCalendarDate = dateStr;
    }
    this.renderOrderCalendar();
    this.renderOrdersListOnly();
  }

  // 排序模式切换
  toggleOrderSort() {
    const modes = [
      { key: 'createdAt', label: '按创建时间' },
      { key: 'endDate', label: '按截稿日期' },
      { key: 'price', label: '按稿酬金额' },
      { key: 'client', label: '按客户名称' }
    ];
    const curIdx = modes.findIndex(m => m.key === this.sortField);
    const nextIdx = (curIdx + 1) % modes.length;
    this.sortField = modes[nextIdx].key;
    this.showToast(`🎚️ 排序模式：${modes[nextIdx].label}`);
    this.renderOrdersListOnly();
  }

  // 快捷推进订单状态
  quickSetOrderStatus(orderId, newStatus) {
    const o = window.store.data.orders.find(ord => ord.id === orderId);
    if (!o) return;
    o.status = newStatus;
    window.store.persist();
    this.showToast(`✨ 状态已推进至：${window.store.getStatusLabel(newStatus)}`);
    this.renderOrdersListOnly();
    this.renderOrderCalendar();
    this.renderHome();
  }

  // 「外壳 + 局部重绘」仅重绘稿单列表
  renderOrdersListOnly() {
    const listWrap = document.getElementById('ordersListContainer');
    if (!listWrap) return;

    const orders = window.store.filterOrders({
      keyword: this.searchKeyword,
      status: this.filterStatus,
      type: this.filterType,
      sort: this.sortField,
      date: this.selectedCalendarDate
    });

    if (orders.length === 0) {
      listWrap.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--subtext); font-weight: 700;">
          <div style="margin-bottom: 8px;">${getIcon('note', 48)}</div>
          没有找到匹配的稿单~
        </div>`;
      return;
    }

    listWrap.innerHTML = orders.map(o => {
      const daysLeft = this.calculateDaysLeft(o.endDate);
      const steps = ['draft', 'sketch', 'line', 'color', 'done', 'delivered'];
      const curIdx = steps.indexOf(o.status);

      return `
        <div class="order-card card-stagger" onclick="app.openOrderDetail('${o.id}')">
          <div class="order-card-top">
            <div class="order-client-wrap">
              <div class="order-client-avatar">
                ${(o.images && o.images[0]) ? `<img src="${o.images[0]}" style="width:100%;height:100%;object-fit:cover;" />` : (window.ILLUST ? window.ILLUST.foxGirl : getIcon('bear', 24))}
              </div>
              <div>
                <div class="order-title">客户 ${this.escapeHtml(o.client)} · ${this.escapeHtml(o.type)}</div>
                <div style="font-size:12px;color:var(--subtext);font-weight:800;margin-top:2px;">
                  接单: ${o.startDate || '未定'} / 截稿: ${o.endDate || '未定'}
                </div>
              </div>
            </div>
            <div class="order-price-pill">¥${o.price || 0}</div>
          </div>

          <!-- 状态推进卡片行 (直接点击各胶囊即可无缝推进状态) -->
          <div class="order-stepper" onclick="event.stopPropagation()">
            <div class="step-chip ${curIdx >= 0 ? 'active' : ''}" onclick="app.quickSetOrderStatus('${o.id}', 'draft')" title="设为待接单">接单</div>
            <span class="step-arrow">›</span>
            <div class="step-chip ${curIdx >= 1 ? 'active' : ''}" onclick="app.quickSetOrderStatus('${o.id}', 'sketch')" title="设为草稿">草稿</div>
            <span class="step-arrow">›</span>
            <div class="step-chip ${curIdx >= 2 ? 'active' : ''}" onclick="app.quickSetOrderStatus('${o.id}', 'line')" title="设为线稿">线稿</div>
            <span class="step-arrow">›</span>
            <div class="step-chip ${curIdx >= 3 ? 'active' : ''}" onclick="app.quickSetOrderStatus('${o.id}', 'color')" title="设为上色">上色</div>
            <span class="step-arrow">›</span>
            <div class="step-chip ${curIdx >= 4 ? 'active' : ''}" onclick="app.quickSetOrderStatus('${o.id}', 'done')" title="设为成稿">成稿</div>
            <div style="margin-left:auto;">
              <span class="badge-chip ${daysLeft <= 3 ? 'badge-coral' : 'badge-green'}">
                ${daysLeft <= 0 ? '今日截止' : `剩 ${daysLeft} 天截稿`}
              </span>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  // ================= 3. 稿单详情子页 =================

  openOrderDetail(orderId) {
    this.activeOrderId = orderId;
    this.currentSubView = 'orderDetail';
    this.hideBottomNav(true);

    const order = window.store.data.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('orderDetailModal');
    if (!modal) return;

    const body = document.getElementById('orderDetailBody');
    const daysLeft = this.calculateDaysLeft(order.endDate);

    body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div style="font-size:20px;font-weight:900;">${this.escapeHtml(order.client)} · ${this.escapeHtml(order.type)}</div>
        <div style="font-size:22px;font-weight:900;color:var(--primary);">¥${order.price || 0}</div>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:16px;">
        <span class="badge-chip badge-primary">${window.store.getStatusLabel(order.status)}</span>
        <span class="badge-chip ${daysLeft <= 3 ? 'badge-coral' : 'badge-green'}">
          ${daysLeft <= 0 ? '今日截止' : `距离截稿剩 ${daysLeft} 天`}
        </span>
      </div>

      <div class="card" style="padding:14px;margin-bottom:14px;">
        <div style="font-size:13px;font-weight:800;color:var(--subtext);margin-bottom:4px;">约稿规格 & 用途</div>
        <div style="font-weight:800;">${this.escapeHtml(order.size || '默认尺寸')} · ${this.escapeHtml(order.purpose || '个人私稿')}</div>
      </div>

      <div class="card" style="padding:14px;margin-bottom:14px;">
        <div style="font-size:13px;font-weight:800;color:var(--subtext);margin-bottom:4px;">排期时间</div>
        <div style="font-weight:800;">起稿：${order.startDate || '未设置'}</div>
        <div style="font-weight:800;">截稿：${order.endDate || '未设置'}</div>
        ${order.reminderTime ? `<div style="font-weight:800;color:var(--date-dot-coral);margin-top:4px;">提醒：${order.reminderTime.replace('T', ' ')}</div>` : ''}
      </div>

      <div class="card" style="padding:14px;margin-bottom:14px;">
        <div style="font-size:13px;font-weight:800;color:var(--subtext);margin-bottom:4px;">稿件要求与备注</div>
        <div style="font-weight:700;white-space:pre-wrap;">${this.escapeHtml(order.note || '无备注内容')}</div>
      </div>

      <!-- 画稿附图展示 -->
      <div style="margin-bottom:16px;">
        <div style="font-size:14px;font-weight:900;margin-bottom:8px;">画稿参考图 / 过程图 (${(order.images || []).length})</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;">
          ${(order.images || []).map((imgUrl, idx) => `
            <img src="${imgUrl}" class="poster-thumb" onclick="app.openImageViewer([${order.images.map(i => `'${i}'`).join(',')}], ${idx})" />
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeOrderDetail());
  }

  closeOrderDetail() {
    const modal = document.getElementById('orderDetailModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  advanceActiveOrderStatus() {
    if (!this.activeOrderId) return;
    const next = window.store.advanceOrderStatus(this.activeOrderId);
    if (next) {
      this.showToast(`状态已推进到：${window.store.getStatusLabel(next)}`);
      this.openOrderDetail(this.activeOrderId);
      this.renderOrdersListOnly();
      this.renderHome();
    }
  }

  editActiveOrder() {
    const order = window.store.data.orders.find(o => o.id === this.activeOrderId);
    if (!order) return;
    this.closeOrderDetail();
    this.openOrderFormModal(order);
  }

  deleteActiveOrder() {
    if (!confirm('确定要删除这份稿单吗？删除后不可恢复。')) return;
    window.store.data.orders = window.store.data.orders.filter(o => o.id !== this.activeOrderId);
    window.store.persist();
    this.closeOrderDetail();
    this.renderOrdersListOnly();
    this.renderHome();
    this.showToast('稿单已删除');
  }

  // ================= 4. 新建 / 编辑稿单表单 =================

  openOrderFormModal(existingOrder = null) {
    const modal = document.getElementById('orderFormModal');
    if (!modal) return;

    this.editingOrder = existingOrder ? JSON.parse(JSON.stringify(existingOrder)) : {
      id: 'ord_' + Date.now(),
      client: '',
      type: window.store.data.types[0]?.name || '头像',
      status: 'draft',
      price: '',
      size: '2000x2000 300dpi',
      purpose: '个人私稿',
      startDate: this.selectedCalendarDate || new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      reminderTime: '',
      note: '',
      images: [],
      createdAt: new Date().toISOString()
    };

    // 填充表单
    document.getElementById('formClient').value = this.editingOrder.client || '';
    document.getElementById('formPrice').value = this.editingOrder.price || '';
    document.getElementById('formSize').value = this.editingOrder.size || '';
    document.getElementById('formPurpose').value = this.editingOrder.purpose || '';
    document.getElementById('formStartDate').value = this.editingOrder.startDate || '';
    document.getElementById('formEndDate').value = this.editingOrder.endDate || '';
    document.getElementById('formReminder').value = this.editingOrder.reminderTime || '';
    document.getElementById('formNote').value = this.editingOrder.note || '';

    // 渲染类型列表 (支持长按删除自定义类型)
    this.renderFormTypes();
    this.renderFormImages();

    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeOrderFormModal());
  }

  renderFormTypes() {
    const wrap = document.getElementById('formTypesWrap');
    if (!wrap) return;

    wrap.innerHTML = window.store.data.types.map(t => `
      <div class="filter-chip ${this.editingOrder.type === t.name ? 'active' : ''}"
           onclick="app.selectFormType('${t.name}')"
           oncontextmenu="app.handleTypeLongPress(event, '${t.id}', '${t.isDefault}')">
        ${t.name}
      </div>
    `).join('') + `
      <div class="filter-chip" onclick="app.addNewCustomType()">＋ 新增类型</div>
    `;
  }

  selectFormType(name) {
    this.editingOrder.type = name;
    this.renderFormTypes();
  }

  handleTypeLongPress(e, typeId, isDefault) {
    e.preventDefault();
    if (isDefault === 'true') {
      this.showToast('默认分类不支持删除哦');
      return;
    }
    if (confirm('确定要删除这个自定义分类吗？')) {
      window.store.data.types = window.store.data.types.filter(t => t.id !== typeId);
      window.store.persist();
      this.renderFormTypes();
      this.showToast('分类已删除');
    }
  }

  addNewCustomType() {
    const name = prompt('请输入新类型名称 (如：插画条漫、壁纸)：');
    if (name && name.trim()) {
      window.store.data.types.push({
        id: 't_' + Date.now(),
        name: name.trim(),
        isDefault: false
      });
      window.store.persist();
      this.selectFormType(name.trim());
    }
  }

  // 渲染表单图片列表 (实时保持其他表单字段不丢失)
  renderFormImages() {
    const wrap = document.getElementById('formImagesGrid');
    if (!wrap) return;

    wrap.innerHTML = (this.editingOrder.images || []).map((img, idx) => `
      <div style="position:relative;aspect-ratio:1;">
        <img src="${img}" class="poster-thumb" style="width:100%;height:100%;" />
        <div style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.6);color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;"
             onclick="app.removeFormImage(${idx})">×</div>
      </div>
    `).join('') + `
      <div class="poster-thumb" style="display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border:2px dashed var(--primary);"
           onclick="document.getElementById('formImgInput').click()">
        ${getIcon('camera', 24)}
        <span style="font-size:11px;font-weight:800;color:var(--primary);margin-top:4px;">加图</span>
      </div>
    `;
  }

  async handleFormImageUpload(fileList) {
    if (!fileList || fileList.length === 0) return;
    this.showToast('正在压缩处理图片...');
    for (let i = 0; i < fileList.length; i++) {
      const res = await window.store.compressImage(fileList[i], 1600, 0.72);
      this.editingOrder.images.push(res.data);
    }
    this.renderFormImages();
  }

  removeFormImage(idx) {
    this.editingOrder.images.splice(idx, 1);
    this.renderFormImages();
  }

  saveOrderForm() {
    this.editingOrder.client = document.getElementById('formClient').value.trim();
    this.editingOrder.price = Number(document.getElementById('formPrice').value) || 0;
    this.editingOrder.size = document.getElementById('formSize').value.trim();
    this.editingOrder.purpose = document.getElementById('formPurpose').value.trim();
    this.editingOrder.startDate = document.getElementById('formStartDate').value;
    this.editingOrder.endDate = document.getElementById('formEndDate').value;
    this.editingOrder.reminderTime = document.getElementById('formReminder').value;
    this.editingOrder.note = document.getElementById('formNote').value;

    if (!this.editingOrder.client) {
      alert('请填写客户名称');
      return;
    }

    // 设置提醒时间
    if (this.editingOrder.reminderTime) {
      const triggerMs = new Date(this.editingOrder.reminderTime).getTime();
      if (triggerMs > Date.now()) {
        window.store.triggerNotification(
          `妖画集稿单提醒 · ${this.editingOrder.client}`,
          `距离约稿《${this.editingOrder.type}》交付时间快到啦，记得按时推进画稿哦！`,
          triggerMs
        );
      }
    }

    // 更新或新增
    const idx = window.store.data.orders.findIndex(o => o.id === this.editingOrder.id);
    if (idx >= 0) {
      window.store.data.orders[idx] = this.editingOrder;
    } else {
      window.store.data.orders.unshift(this.editingOrder);
    }

    window.store.persist();
    this.closeOrderFormModal();
    this.renderOrders();
    this.renderHome();
    this.showToast('稿单已保存！');
  }

  closeOrderFormModal() {
    const modal = document.getElementById('orderFormModal');
    if (modal) modal.classList.remove('modal-open');
  }

  // ================= 5. 画库 & 角色档案 =================

  renderGallery() {
    this.renderGalleryBreadcrumb();
    this.renderGalleryFolders();
    this.renderGalleryChars();
    this.renderActiveCharDossier();
    this.renderGalleryImages();
  }

  renderGalleryBreadcrumb() {
    const wrap = document.getElementById('galleryBreadcrumb');
    if (!wrap) return;

    const path = this.getFolderPath(this.currentFolderId);
    wrap.innerHTML = path.map((f, idx) => `
      <span class="breadcrumb-item ${idx === path.length - 1 ? 'active' : ''}" 
            onclick="app.navigateToFolder('${f.id}')">
        ${idx === 0 ? getIcon('folder', 16) : ''}
        ${f.name}
      </span>
      ${idx < path.length - 1 ? '<span>›</span>' : ''}
    `).join('');
  }

  getFolderPath(folderId) {
    const folders = window.store.data.folders;
    const path = [];
    let cur = folders.find(f => f.id === folderId);
    while (cur) {
      path.unshift(cur);
      cur = folders.find(f => f.id === cur.parentId);
    }
    return path.length ? path : [{ id: 'root', name: '画库根目录' }];
  }

  navigateToFolder(folderId) {
    this.currentFolderId = folderId;
    this.renderGallery();
  }

  renderGalleryFolders() {
    const wrap = document.getElementById('galleryFoldersGrid');
    if (!wrap) return;

    const subFolders = window.store.data.folders.filter(f => f.parentId === this.currentFolderId);
    wrap.innerHTML = subFolders.map(f => `
      <div class="gallery-folder-card" onclick="app.navigateToFolder('${f.id}')">
        ${getIcon('folder', 36)}
        <div class="gallery-folder-name">${this.escapeHtml(f.name)}</div>
      </div>
    `).join('');
  }

  renderGalleryChars() {
    const wrap = document.getElementById('galleryCharsRow');
    if (!wrap) return;

    const chars = window.store.data.chars || [];
    if (!this.activeCharId && chars.length > 0) {
      this.activeCharId = chars[0].id;
    }

    wrap.innerHTML = chars.map(c => {
      let avSvg = '';
      if (c.avatar === 'illust_rosette' || c.name === '白桃桃') {
        avSvg = window.ILLUST ? window.ILLUST.whitePeachRosette : '';
      } else if (c.avatar === 'illust_cat' || c.name === '星野喵') {
        avSvg = window.ILLUST ? window.ILLUST.catAvatar : '';
      } else if (c.avatar === 'illust_glasses' || c.name === '雾雨') {
        avSvg = window.ILLUST ? window.ILLUST.glassesGirl : '';
      }

      const isSelected = this.activeCharId === c.id;

      return `
        <div style="flex:0 0 74px;text-align:center;cursor:pointer;" onclick="app.selectGalleryChar('${c.id}')">
          <div style="width:62px;height:62px;border-radius:16px;margin:0 auto;border:2.5px solid ${isSelected ? '#FF8DA1' : '#5C4B47'};padding:3px;background:${isSelected ? '#FFF0F3' : '#FFFFFF'};box-shadow:0 3px 8px rgba(92,75,71,${isSelected ? '0.2' : '0.08'});${isSelected ? 'transform:scale(1.06);' : ''}transition:all 0.2s var(--ease-spring);">
            <div style="width:100%;height:100%;border-radius:11px;overflow:hidden;background:#FFF3E8;">
              ${avSvg ? avSvg : (c.avatar ? `<img src="${c.avatar}" style="width:100%;height:100%;object-fit:cover;" />` : getIcon('user', 36))}
            </div>
          </div>
          <div style="font-size:12px;font-weight:900;color:#5C4B47;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${this.escapeHtml(c.name)}
          </div>
        </div>`;
    }).join('') + `
      <div style="flex:0 0 74px;text-align:center;cursor:pointer;" onclick="app.openCharFormModal()">
        <div style="width:62px;height:62px;border-radius:16px;margin:0 auto;border:2px dashed #5C4B47;display:flex;align-items:center;justify-content:center;background:#FFF8F0;transition:all 0.2s var(--ease-spring);">
          ${getIcon('plus', 24)}
        </div>
        <div style="font-size:12px;font-weight:900;margin-top:6px;color:#5C4B47;">＋ 设子</div>
      </div>
    `;
  }

  selectGalleryChar(charId) {
    this.activeCharId = charId;
    this.renderGalleryChars();
    this.renderActiveCharDossier();
  }

  renderActiveCharDossier() {
    const wrap = document.getElementById('galleryCharDossierWrap');
    if (!wrap) return;

    const chars = window.store.data.chars || [];
    const activeChar = chars.find(c => c.id === this.activeCharId) || chars[0];
    if (!activeChar) {
      wrap.innerHTML = '';
      return;
    }

    let avSvg = window.ILLUST ? window.ILLUST.whitePeachRosette : getIcon('user', 48);
    if (activeChar.name === '星野喵' && window.ILLUST) avSvg = window.ILLUST.catAvatar;
    if (activeChar.name === '雾雨' && window.ILLUST) avSvg = window.ILLUST.glassesGirl;

    const tags = activeChar.tags || ['粉毛', '猫耳', '傲娇', '蝴蝶结'];
    const groups = activeChar.groups || [];
    const firstGroup = groups[0] || { name: '约稿记录 (共5张 · 累计稿费 ¥2,180)', commissions: [] };

    wrap.innerHTML = `
      <div class="char-dossier-card card-stagger">
        <div class="char-top-row">
          <div style="width:74px;height:74px;flex-shrink:0;">
            ${avSvg}
          </div>
          <div style="flex:1;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:18px;font-weight:900;color:#5C4B47;">${this.escapeHtml(activeChar.name)} ✏️</span>
              <span class="badge-chip badge-primary" onclick="app.openCharProfile('${activeChar.id}')" style="cursor:pointer;font-weight:900;">设子详情 ›</span>
            </div>
            <div class="char-tags-wrap" style="margin-top:6px;">
              ${tags.map(t => `<span class="badge-chip" style="background:#FFF2B2;color:#5C4B47;border:1.5px solid #5C4B47;font-size:11px;">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="char-group-box">
          <div class="char-group-header">
            <span>${this.escapeHtml(firstGroup.name)}</span>
            <span style="font-size:12px;font-weight:900;">∨</span>
          </div>
          <div class="char-group-content">
            <div class="poster-grid-3">
              ${(firstGroup.commissions || []).slice(0, 6).map((comm, cIdx) => `
                <div class="poster-thumb-wrap" onclick="app.openCharProfile('${activeChar.id}')" style="position:relative;cursor:pointer;">
                  ${window.ILLUST ? (cIdx % 2 === 0 ? window.createChibiAvatarSvg('#FFF1BD', '#8D6E63', '呆毛', '#FFAB91', '#FFE0BD', '#FF8A65') : window.createBustIllustSvg('#FFCDD2', '晚霞', '日落')) : ''}
                  <span style="position:absolute;bottom:4px;right:4px;background:rgba(255,255,255,0.92);border:1.5px solid #5C4B47;border-radius:99px;font-size:10px;font-weight:900;color:#5C4B47;padding:1px 5px;box-shadow:0 1px 3px rgba(92,75,71,0.15);">¥${comm.price || (cIdx % 2 === 0 ? 150 : 380)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderGalleryImages() {
    const wrap = document.getElementById('galleryImagesGrid');
    if (!wrap) return;

    const images = window.store.data.galleryImages.filter(img => img.folderId === this.currentFolderId);
    if (images.length === 0) {
      wrap.innerHTML = `
        <div style="grid-column:1/-1;padding:30px;text-align:center;color:var(--subtext);font-weight:700;">
          当前文件夹暂无图片，点击右上角或 ＋ 导入画作吧~
        </div>`;
      return;
    }

    wrap.innerHTML = images.map((img, idx) => `
      <div class="gallery-img-card ${this.selectedImageIds.has(img.id) ? 'selected' : ''}" 
           onclick="app.handleImageCardClick('${img.id}', ${idx})">
        <img class="gallery-img-thumb" src="${img.thumb || img.data}" />
        <div class="gallery-select-badge">${getIcon('check', 14)}</div>
      </div>
    `).join('');
  }

  handleImageCardClick(imgId, idx) {
    if (this.batchMode) {
      if (this.selectedImageIds.has(imgId)) {
        this.selectedImageIds.delete(imgId);
      } else {
        this.selectedImageIds.add(imgId);
      }
      this.renderGalleryImages();
    } else {
      const images = window.store.data.galleryImages.filter(img => img.folderId === this.currentFolderId);
      const urls = images.map(i => i.data);
      this.openImageViewer(urls, idx);
    }
  }

  toggleBatchMode() {
    this.batchMode = !this.batchMode;
    this.selectedImageIds.clear();
    const btn = document.getElementById('galleryBatchBtn');
    if (btn) btn.classList.toggle('active', this.batchMode);
    const delBtn = document.getElementById('galleryBatchDelBtn');
    if (delBtn) delBtn.style.display = this.batchMode ? 'inline-flex' : 'none';
    document.getElementById('galleryRoot')?.classList.toggle('batch-mode', this.batchMode);
    this.renderGalleryImages();
  }

  deleteSelectedGalleryImages() {
    if (this.selectedImageIds.size === 0) {
      this.showToast('请先选择要删除的图片');
      return;
    }
    if (!confirm(`确定要删除选中的 ${this.selectedImageIds.size} 张图片吗？`)) return;

    window.store.data.galleryImages = window.store.data.galleryImages.filter(
      img => !this.selectedImageIds.has(img.id)
    );
    window.store.persist();
    this.selectedImageIds.clear();
    this.toggleBatchMode();
    this.renderGalleryImages();
    this.showToast('已删除选中图片');
  }

  async handleGalleryImageImport(fileList) {
    if (!fileList || fileList.length === 0) return;
    this.showToast('正在压缩画作导入...');
    for (let i = 0; i < fileList.length; i++) {
      const res = await window.store.compressImage(fileList[i], 1600, 0.72);
      window.store.data.galleryImages.push({
        id: 'img_' + Date.now() + '_' + i,
        folderId: this.currentFolderId,
        name: fileList[i].name || '画作.png',
        data: res.data,
        thumb: res.thumb,
        size: res.data.length,
        createdAt: new Date().toISOString()
      });
    }
    window.store.persist();
    this.renderGalleryImages();
    this.showToast(`成功导入 ${fileList.length} 张画作`);
  }

  createFolderPrompt() {
    const name = prompt('请输入新文件夹名称：');
    if (name && name.trim()) {
      window.store.data.folders.push({
        id: 'f_' + Date.now(),
        name: name.trim(),
        parentId: this.currentFolderId,
        createdAt: new Date().toISOString()
      });
      window.store.persist();
      this.renderGalleryFolders();
      this.showToast('文件夹已创建');
    }
  }

  // ================= 6. 角色档案详情 (点名编辑、约稿累加) =================

  openCharProfile(charId) {
    this.activeCharId = charId;
    this.currentSubView = 'charDetail';
    this.hideBottomNav(true);

    const char = window.store.data.chars.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('charProfileModal');
    if (!modal) return;

    const body = document.getElementById('charProfileBody');
    const totalCost = window.store.getCharTotalCommissionCost(char);

    body.innerHTML = `
      <div class="char-dossier-card">
        <div class="char-top-row">
          <div class="char-avatar-ring" onclick="document.getElementById('charAvatarInput').click()" style="cursor:pointer;" title="点击更换头像">
            ${this.getCharAvatarHtml(char)}
          </div>
          <div style="flex:1;">
            <div class="char-name-editable" onclick="app.editCharNamePrompt('${char.id}')">
              ${this.escapeHtml(char.name)}
              <span style="font-size:14px;color:var(--primary);">${getIcon('edit', 16)}</span>
            </div>
            <div class="char-tags-wrap">
              ${char.gender ? `<span class="badge-chip badge-primary">${char.gender}</span>` : ''}
              ${char.height ? `<span class="badge-chip badge-coral">${char.height}</span>` : ''}
              ${char.age ? `<span class="badge-chip badge-green">${char.age}</span>` : ''}
              ${char.birthday ? `<span class="badge-chip badge-primary">${char.birthday}</span>` : ''}
            </div>
          </div>
        </div>

        ${char.anchor ? `
          <div style="font-size:13px;font-weight:700;margin-bottom:8px;background:var(--bg);padding:8px 12px;border-radius:var(--rs);">
            <span style="color:var(--primary);font-weight:900;">设定锚点：</span>${this.escapeHtml(char.anchor)}
          </div>` : ''}
        ${char.background ? `
          <div style="font-size:13px;font-weight:700;margin-bottom:8px;background:var(--bg);padding:8px 12px;border-radius:var(--rs);">
            <span style="color:var(--primary);font-weight:900;">背景设定：</span>${this.escapeHtml(char.background)}
          </div>` : ''}
      </div>

      <!-- 约稿记录分组与稿费累加 -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="font-size:16px;font-weight:900;">
          约稿记录 · 累计稿费：<span style="color:var(--primary);">¥${totalCost.toLocaleString()}</span>
        </div>
        <button class="btn btn-primary" style="padding:4px 12px;font-size:12px;" onclick="app.openBatchCommissionModal('${char.id}')">
          批量导入约稿
        </button>
      </div>

      ${(char.groups || []).map(grp => `
        <div class="char-group-box">
          <div class="char-group-header" onclick="app.toggleGroupCollapse('${grp.id}')">
            <span style="font-weight:900;">${this.escapeHtml(grp.name)} (${(grp.commissions || []).length}张)</span>
            <span>${getIcon('chevron_down', 16)}</span>
          </div>
          <div class="char-group-content" id="grpContent_${grp.id}">
            <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:10px;">
              ${(grp.commissions || []).map(comm => `
                <div class="card" style="padding:10px;margin-bottom:0;" onclick="app.openCommissionDetail('${comm.id}')">
                  ${comm.image ? `<img src="${comm.image}" class="poster-thumb" style="width:100%;height:120px;margin-bottom:6px;" />` : ''}
                  <div style="font-weight:900;font-size:13px;">${this.escapeHtml(comm.title)}</div>
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:4px;">
                    <span style="color:var(--subtext);">${this.escapeHtml(comm.artist || '佚名')}</span>
                    <span style="color:var(--primary);font-weight:900;">¥${comm.price || 0}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="btn btn-secondary btn-block" style="margin-top:8px;font-size:12px;" onclick="app.openAddCommissionToGroup('${char.id}', '${grp.id}')">
              ＋ 添加约稿到本组
            </button>
          </div>
        </div>
      `).join('')}
    `;

    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeCharProfile());
  }

  editCharNamePrompt(charId) {
    const char = window.store.data.chars.find(c => c.id === charId);
    if (!char) return;
    const newName = prompt('修改角色名称：', char.name);
    if (newName && newName.trim()) {
      char.name = newName.trim();
      window.store.persist();
      this.openCharProfile(charId);
      this.renderGalleryChars();
    }
  }

  async handleCharAvatarUpload(file) {
    if (!file || !this.activeCharId) return;
    const char = window.store.data.chars.find(c => c.id === this.activeCharId);
    if (!char) return;
    const res = await window.store.compressImage(file, 800, 0.72);
    char.avatar = res.data;
    window.store.persist();
    this.openCharProfile(this.activeCharId);
    this.renderGalleryChars();
  }

  closeCharProfile() {
    const modal = document.getElementById('charProfileModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // 获取角色头像 HTML (支持内置矢量插画与自定义图片)
  getCharAvatarHtml(char, extraStyle = '') {
    if (!char) return window.ICONS ? getIcon('user', 36) : '';
    if (char.avatar === 'illust_rosette' || char.name === '白桃桃') {
      return window.ILLUST ? window.ILLUST.whitePeachRosette : (window.ICONS ? getIcon('user', 36) : '');
    }
    if (char.avatar === 'illust_cat' || char.name === '星野喵') {
      return window.ILLUST ? window.ILLUST.catAvatar : (window.ICONS ? getIcon('cat', 36) : '');
    }
    if (char.avatar === 'illust_glasses' || char.name === '雾雨') {
      return window.ILLUST ? window.ILLUST.glassesGirl : (window.ICONS ? getIcon('user', 36) : '');
    }
    if (char.avatar && (char.avatar.startsWith('data:') || char.avatar.startsWith('http') || char.avatar.startsWith('blob:') || char.avatar.startsWith('/'))) {
      return `<img src="${char.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;${extraStyle}" />`;
    }
    return window.ICONS ? getIcon('user', 36) : '';
  }

  // 1. 新建设子档案
  openCharFormModal() {
    const name = prompt('请输入新设子/角色名称：');
    if (!name || !name.trim()) return;
    const tagStr = prompt('请输入特征标签（用空格或逗号分隔，如：猫耳 双马尾 傲娇）：', '可爱 猫耳 甜心');
    const tags = tagStr ? tagStr.split(/[\s,，]+/).filter(Boolean) : ['设子'];
    const newChar = {
      id: 'char_' + Date.now(),
      name: name.trim(),
      avatar: '',
      gender: '女',
      height: '160cm',
      age: '16岁',
      birthday: '1月1日',
      anchor: '初创设定',
      background: '暂无背景',
      story: '',
      tags: tags,
      groups: [
        {
          id: 'grp_' + Date.now(),
          name: '约稿记录 (共0张 · 累计稿费 ¥0)',
          commissions: []
        }
      ]
    };
    window.store.data.chars.push(newChar);
    window.store.persist();
    this.activeCharId = newChar.id;
    this.renderGalleryChars();
    this.renderActiveCharDossier();
    this.showToast(`设子「${newChar.name}」已创建 ✨`);
  }

  // 2. 展开/折叠约稿分组
  toggleGroupCollapse(grpId) {
    const el = document.getElementById(`grpContent_${grpId}`);
    if (el) {
      const isHidden = el.style.display === 'none';
      el.style.display = isHidden ? 'block' : 'none';
    }
  }

  // 3. 批量导入约稿到角色
  openBatchCommissionModal(charId) {
    const char = window.store.data.chars.find(c => c.id === charId);
    if (!char) return;
    const countStr = prompt(`为角色「${char.name}」快速批量导入约稿记录，请输入数量（1-5）：`, '2');
    const count = parseInt(countStr, 10);
    if (!count || count <= 0) return;
    if (!char.groups || char.groups.length === 0) {
      char.groups = [{ id: 'grp_' + Date.now(), name: '约稿记录', commissions: [] }];
    }
    const targetGrp = char.groups[0];
    for (let i = 1; i <= Math.min(count, 5); i++) {
      targetGrp.commissions.push({
        id: 'comm_' + Date.now() + '_' + i,
        title: `${char.name} · 新约稿 ${targetGrp.commissions.length + 1}`,
        artist: '特邀画师',
        price: 300,
        note: '批量导入记录',
        image: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    const totalGroupCost = targetGrp.commissions.reduce((s, c) => s + (c.price || 0), 0);
    targetGrp.name = `约稿记录 (共${targetGrp.commissions.length}张 · 累计稿费 ¥${totalGroupCost.toLocaleString()})`;
    window.store.persist();
    this.openCharProfile(charId);
    this.renderActiveCharDossier();
    this.showToast(`已批量添加 ${count} 笔约稿记录 ✨`);
  }

  // 4. 查看具体某笔约稿详情
  openCommissionDetail(commId) {
    let foundComm = null;
    let foundChar = null;
    for (const c of window.store.data.chars) {
      for (const g of (c.groups || [])) {
        const comm = (g.commissions || []).find(item => item.id === commId);
        if (comm) {
          foundComm = comm;
          foundChar = c;
          break;
        }
      }
      if (foundComm) break;
    }
    if (!foundComm) {
      this.showToast('未找到该约稿记录');
      return;
    }
    alert(`约稿详情：\n标题：${foundComm.title}\n所属角色：${foundChar ? foundChar.name : '-'}\n画师：${foundComm.artist || '佚名'}\n稿酬：¥${foundComm.price || 0}\n备注：${foundComm.note || '无'}\n日期：${foundComm.date || '-'}`);
  }

  // 5. 单独添加一笔约稿到分组
  openAddCommissionToGroup(charId, grpId) {
    const char = window.store.data.chars.find(c => c.id === charId);
    if (!char) return;
    const grp = (char.groups || []).find(g => g.id === grpId);
    if (!grp) return;
    const title = prompt('请输入新约稿作品名称：', `${char.name} · 梦幻立绘`);
    if (!title || !title.trim()) return;
    const artist = prompt('请输入画师名称：', '神秘画师');
    const priceStr = prompt('请输入稿费金额 (元)：', '300');
    const price = parseInt(priceStr, 10) || 0;

    grp.commissions.push({
      id: 'comm_' + Date.now(),
      title: title.trim(),
      artist: artist ? artist.trim() : '佚名',
      price: price,
      note: '新增约稿',
      image: '',
      date: new Date().toISOString().split('T')[0]
    });
    const totalGroupCost = grp.commissions.reduce((s, c) => s + (c.price || 0), 0);
    grp.name = `约稿记录 (共${grp.commissions.length}张 · 累计稿费 ¥${totalGroupCost.toLocaleString()})`;
    window.store.persist();
    this.openCharProfile(charId);
    this.renderActiveCharDossier();
    this.showToast('约稿已成功添加到分组 ✨');
  }

  // ================= 7. 稿条 (海报式价目表) =================

  openPriceListSubView() {
    this.currentSubView = 'priceList';
    this.hideBottomNav(true);
    const modal = document.getElementById('priceListModal');
    if (!modal) return;

    this.renderPriceListPosterContent();
    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closePriceListSubView());
  }

  renderPriceListPosterContent() {
    const wrap = document.getElementById('priceListPosterWrap');
    if (!wrap) return;

    const p = window.store.data.priceList;
    const s = window.store.data.settings;

    wrap.innerHTML = `
      <div class="poster-header">
        <div class="poster-avatar-wrap">
          ${this.getArtistAvatarHtml(s, 48)}
        </div>
        <div class="poster-artist-name">${this.escapeHtml(s.nickname || '画手小妖')}</div>
        <div class="poster-badge">${this.escapeHtml(p.title || '画风展示 & 约稿价目表')}</div>
      </div>

      ${p.headerNotice ? `<div class="poster-notice-box">${this.escapeHtml(p.headerNotice)}</div>` : ''}

      ${(p.items || []).map((item, idx) => {
        let thumbsHtml = '';
        if (item.images && item.images.length > 0) {
          thumbsHtml = item.images.map(img => `<div class="poster-thumb-wrap"><img class="poster-thumb" src="${img}" /></div>`).join('');
        } else if (window.ILLUST) {
          if (idx === 0) {
            thumbsHtml = window.ILLUST.sampleQAvatars.map(av => `
              <div class="poster-thumb-wrap">
                ${window.createChibiAvatarSvg(av.bg, av.hair, av.hat, av.hatColor, av.skin, av.dress)}
              </div>`).join('');
          } else {
            thumbsHtml = window.ILLUST.sampleBustIllustrations.map(b => `
              <div class="poster-thumb-wrap">
                ${window.createBustIllustSvg(b.bg, b.theme, b.tag)}
              </div>`).join('');
          }
        }

        return `
          <div class="poster-item-card">
            <div class="poster-item-top">
              <span class="poster-num-badge">${item.no || '0' + (idx + 1)}</span>
              <span class="poster-item-title">${this.escapeHtml(item.title)}</span>
              <span class="poster-item-price">${this.escapeHtml(item.priceRange)}</span>
            </div>
            <div class="poster-item-desc">${this.escapeHtml(item.desc)}</div>
            <div class="poster-grid-3">
              ${thumbsHtml}
            </div>
          </div>`;
      }).join('')}

      <div class="poster-footer">
        ${window.ILLUST ? window.ILLUST.catPawStamp : getIcon('cat_paw', 20)}
        <span>${this.escapeHtml(p.footerNotice || '妖画集出品 · 诚信约稿')}</span>
      </div>
    `;
  }

  // 离线 Canvas 渲染海报长图并保存至系统相册
  async exportPriceListLongImage() {
    this.showToast('正在离线合成竖长画质海报...');
    const p = window.store.data.priceList;
    const s = window.store.data.settings;

    const width = 1080;
    // 动态计算高度
    const headerHeight = 360;
    const itemHeight = 480;
    const footerHeight = 120;
    const height = headerHeight + (p.items.length * itemHeight) + footerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 绘制奶油暖色底色
    ctx.fillStyle = '#FAF6EE';
    ctx.fillRect(0, 0, width, height);

    // 绘制装饰外边框
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#FFD6DE';
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // 绘制标题与画师昵称
    ctx.fillStyle = '#3C312E';
    ctx.font = 'bold 44px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.nickname || '画手小妖', width / 2, 160);

    ctx.font = 'bold 30px Nunito, sans-serif';
    ctx.fillStyle = '#FF8DA1';
    ctx.fillText(p.title || '画风展示 & 约稿价目表', width / 2, 220);

    if (p.headerNotice) {
      ctx.fillStyle = '#FFF1BD';
      ctx.fillRect(80, 260, width - 160, 60);
      ctx.fillStyle = '#3C312E';
      ctx.font = 'bold 24px Nunito, sans-serif';
      ctx.fillText(p.headerNotice, width / 2, 300);
    }

    // 绘制各品类
    let currentY = 360;
    for (let i = 0; i < p.items.length; i++) {
      const it = p.items[i];
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(60, currentY, width - 120, itemHeight - 40);
      ctx.strokeStyle = '#EAD8CD';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, currentY, width - 120, itemHeight - 40);

      // 序号与分类名
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FF8DA1';
      ctx.font = '900 36px Nunito, sans-serif';
      ctx.fillText(it.no, 90, currentY + 60);

      ctx.fillStyle = '#3C312E';
      ctx.font = 'bold 32px Nunito, sans-serif';
      ctx.fillText(it.title, 160, currentY + 60);

      // 价格
      ctx.textAlign = 'right';
      ctx.fillStyle = '#E65100';
      ctx.font = 'bold 30px Nunito, sans-serif';
      ctx.fillText(it.priceRange, width - 90, currentY + 60);

      // 说明
      ctx.textAlign = 'left';
      ctx.fillStyle = '#8D7B74';
      ctx.font = '22px Nunito, sans-serif';
      ctx.fillText(it.desc, 90, currentY + 110);

      currentY += itemHeight;
    }

    // 底部印章
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8D7B74';
    ctx.font = 'bold 26px Nunito, sans-serif';
    ctx.fillText(p.footerNotice || '妖画集 · 约稿前请确认档期', width / 2, height - 60);

    const base64 = canvas.toDataURL('image/png', 0.95);
    await window.store.saveImageToAlbum(base64, `yaohuaji_pricelist_${Date.now()}.png`);
    this.showToast('海报已保存到系统相册！');
  }

  closePriceListSubView() {
    const modal = document.getElementById('priceListModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // ================= 8. 钱包子页 (全年逐月记账) =================

  openWalletSubView() {
    this.currentSubView = 'wallet';
    this.hideBottomNav(true);
    const modal = document.getElementById('walletModal');
    if (!modal) return;

    this.renderWalletStats();
    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeWalletSubView());
  }

  renderWalletStats(year = new Date().getFullYear()) {
    const stats = window.store.getWalletStats(year);
    const body = document.getElementById('walletBody');
    if (!body) return;

    body.innerHTML = `
      <div class="dashboard-grid" style="margin-bottom:18px;">
        <div class="data-card data-card-2">
          <div class="data-card-title">总累计收入</div>
          <div class="data-card-val">¥${stats.totalIncome.toLocaleString()}</div>
        </div>
        <div class="data-card data-card-1">
          <div class="data-card-title">${year} 年度收入</div>
          <div class="data-card-val">¥${stats.yearIncome.toLocaleString()}</div>
        </div>
      </div>

      <div class="section-title" style="margin-bottom:12px;">
        ${getIcon('calendar', 20)}
        <span>${year} 年 逐月账目明细</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        ${stats.monthDetails.map((amt, idx) => `
          <div class="card" style="padding:12px 16px;margin-bottom:0;display:flex;align-items:center;justify-content:space-between;">
            <div style="font-weight:800;">${idx + 1} 月</div>
            <div style="font-weight:900;color:${amt > 0 ? 'var(--primary)' : 'var(--subtext)'};">
              ¥${amt.toLocaleString()}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  closeWalletSubView() {
    const modal = document.getElementById('walletModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // ================= 9. 我的 (Profile & 9 套主题) =================

  renderMine() {
    const s = window.store.data.settings;
    const avatarEl = document.getElementById('mineAvatar');
    if (avatarEl) {
      this.renderAvatarWithBadge(avatarEl, s);
    }
    const nickEl = document.getElementById('mineNick');
    if (nickEl) nickEl.textContent = s.nickname || '画手小妖';
    const sloganEl = document.getElementById('mineSlogan');
    if (sloganEl) sloganEl.textContent = s.slogan || '今天也要开开心心画画呀~';
  }

  openThemesSubView() {
    this.currentSubView = 'themes';
    this.hideBottomNav(true);
    const modal = document.getElementById('themesModal');
    if (!modal) return;

    const themes = [
      { id: 'pastel', name: '默认粉彩', color: '#FFD6DE' },
      { id: 'darkpink', name: '黑粉夜色', color: '#1B1822' },
      { id: 'hawthorn', name: '山楂果茶煮', color: '#D9453B' },
      { id: 'maple', name: '枫叶天妇罗', color: '#E65100' },
      { id: 'algae', name: '蓝藻奶巧', color: '#36695E' },
      { id: 'seasalt', name: '海盐气泡水', color: '#3A86FF' },
      { id: 'sakura', name: '樱花奶冻卷', color: '#FF758F' },
      { id: 'mint', name: '薄荷气泡水', color: '#2EC4B6' },
      { id: 'paper', name: '纸间手账', color: '#6B8E7D' }
    ];

    const grid = document.getElementById('themesGrid');
    if (grid) {
      grid.innerHTML = themes.map(t => `
        <div class="card" style="padding:14px;text-align:center;cursor:pointer;border:2px solid ${window.store.data.settings.theme === t.id ? 'var(--primary)' : 'transparent'};"
             onclick="app.selectTheme('${t.id}')">
          <div style="width:36px;height:36px;border-radius:50%;background:${t.color};margin:0 auto 8px auto;border:2px solid #fff;box-shadow:var(--shadow-card);"></div>
          <div style="font-size:13px;font-weight:900;">${t.name}</div>
        </div>
      `).join('');
    }

    this.updateSettingsProfileUI();

    const opacitySlider = document.getElementById('customBgOpacity');
    if (opacitySlider) {
      opacitySlider.value = window.store.data.settings.customBgOpacity || 0.35;
    }

    const bgThumb = document.getElementById('customBgThumbWrap');
    if (bgThumb) {
      if (window.store.data.settings.customBg) {
        bgThumb.style.display = 'block';
        bgThumb.style.backgroundImage = `url(${window.store.data.settings.customBg})`;
      } else {
        bgThumb.style.display = 'none';
      }
    }

    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeThemesSubView());
  }

  updateSettingsProfileUI() {
    const s = window.store.data.settings;
    const preview = document.getElementById('settingsAvatarPreview');
    if (preview) {
      preview.innerHTML = this.getArtistAvatarHtml(s, 56);
    }
    const nickInput = document.getElementById('settingsNickInput');
    if (nickInput) nickInput.value = s.nickname || '画手小妖';
    const sloganInput = document.getElementById('settingsSloganInput');
    if (sloganInput) sloganInput.value = s.slogan || '今天也要开开心心画画呀~';
  }

  triggerUserAvatarUpload() {
    const input = document.getElementById('userAvatarFileInput');
    if (input) {
      input.value = '';
      input.click();
    }
  }

  async handleUserAvatarUpload(file) {
    if (!file) return;
    try {
      this.showToast('正在裁剪压缩头像...');
      const res = await window.store.compressImage(file, 400, 0.85);
      window.store.data.settings.avatar = res.data;
      await window.store.persist();
      this.renderHome();
      this.renderMine();
      this.updateSettingsProfileUI();
      this.showToast('头像更新成功！');
    } catch (e) {
      console.error('Avatar upload failed:', e);
      this.showToast('头像更新失败，请重试');
    }
  }

  handleUserNickChange(val) {
    if (!val || !val.trim()) return;
    window.store.data.settings.nickname = val.trim();
    window.store.persist();
    this.renderHome();
    this.renderMine();
  }

  handleUserSloganChange(val) {
    window.store.data.settings.slogan = (val || '').trim();
    window.store.persist();
    this.renderHome();
    this.renderMine();
  }

  selectTheme(themeId) {
    window.store.applyTheme(themeId);
    window.store.persist();
    this.openThemesSubView();
    this.showToast('主题切换成功！');
  }

  async handleCustomBgUpload(file) {
    if (!file) return;
    try {
      this.showToast('正在处理自定义背景图...');
      const res = await window.store.compressImage(file, 1280, 0.75);
      const opacity = Number(document.getElementById('customBgOpacity')?.value || 0.35);
      window.store.applyCustomBg(res.data, opacity);
      await window.store.persist();

      const bgThumb = document.getElementById('customBgThumbWrap');
      if (bgThumb) {
        bgThumb.style.display = 'block';
        bgThumb.style.backgroundImage = `url(${res.data})`;
      }
      this.showToast('自定义背景已更新！');
    } catch (e) {
      console.error('Custom bg upload error:', e);
      this.showToast('背景图上传失败，请重试');
    }
  }

  handleCustomBgOpacityChange(val) {
    window.store.applyCustomBg(window.store.data.settings.customBg, Number(val));
    window.store.persist();
  }

  clearCustomBg() {
    window.store.applyCustomBg('', 0);
    window.store.persist();
    const bgThumb = document.getElementById('customBgThumbWrap');
    if (bgThumb) bgThumb.style.display = 'none';
    this.showToast('已恢复默认背景');
  }

  closeThemesSubView() {
    const modal = document.getElementById('themesModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // ================= 10. 存储与 ZIP 打包备份 =================

  openBackupSubView() {
    this.currentSubView = 'backup';
    this.hideBottomNav(true);
    const modal = document.getElementById('backupModal');
    if (!modal) return;

    const ordersCount = window.store.data.orders.length;
    const charsCount = window.store.data.chars.length;
    const imagesCount = window.store.data.galleryImages.length;
    const jsonStr = JSON.stringify(window.store.data);
    const approxSizeMb = (new Blob([jsonStr]).size / (1024 * 1024)).toFixed(2);

    document.getElementById('backupStats').innerHTML = `
      <div>稿单总数：<b>${ordersCount}</b> 份</div>
      <div>角色档案：<b>${charsCount}</b> 位</div>
      <div>画库画作：<b>${imagesCount}</b> 张</div>
      <div>本地数据占用：<b>${approxSizeMb} MB</b></div>
    `;

    modal.classList.add('modal-open');
    window.store.pushBackHandler(() => this.closeBackupSubView());
  }

  async exportBackupZip() {
    if (typeof JSZip === 'undefined') {
      this.showToast('ZIP 模块加载中，请稍候');
      return;
    }

    this.showToast('正在分块打包 ZIP 存档...');
    const zip = new JSZip();

    // 1. 写入结构 JSON
    const dataClone = JSON.parse(JSON.stringify(window.store.data));
    zip.file('yaohuaji_data.json', JSON.stringify(dataClone));

    // 2. 流式打包图片
    const imgFolder = zip.folder('images');
    dataClone.galleryImages.forEach((img, idx) => {
      if (img.data && img.data.startsWith('data:image')) {
        const base64Data = img.data.split(',')[1];
        imgFolder.file(`gallery_${idx}.jpg`, base64Data, { base64: true });
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const filename = `yaohuaji_backup_${Date.now()}.zip`;

    // 触发下载/原生流式拷贝
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = filename;
    link.click();

    this.showToast(`备份完成！已导出 ${filename} (${(content.size / 1024 / 1024).toFixed(2)} MB)`);
  }

  async importBackupZip(file) {
    if (!file) return;
    if (file.size > 120 * 1024 * 1024) {
      if (!confirm('提示：该备份文件超过 120MB，导入可能需要较多内存，是否继续？')) return;
    }

    this.showToast('正在解析 ZIP 备份文件...');
    const zip = new JSZip();
    const loaded = await zip.loadAsync(file);

    const jsonFile = loaded.file('yaohuaji_data.json');
    if (!jsonFile) {
      alert('备份包中未发现合法的 yaohuaji_data.json 文件！');
      return;
    }

    const text = await jsonFile.async('text');
    const importedData = JSON.parse(text);

    // ID 不覆盖合并策略
    const curOrders = new Map(window.store.data.orders.map(o => [o.id, o]));
    (importedData.orders || []).forEach(o => {
      if (!curOrders.has(o.id)) window.store.data.orders.push(o);
    });

    const curChars = new Map(window.store.data.chars.map(c => [c.id, c]));
    (importedData.chars || []).forEach(c => {
      if (!curChars.has(c.id)) window.store.data.chars.push(c);
    });

    const curImgs = new Map(window.store.data.galleryImages.map(i => [i.id, i]));
    (importedData.galleryImages || []).forEach(i => {
      if (!curImgs.has(i.id)) window.store.data.galleryImages.push(i);
    });

    await window.store.persist();
    this.closeBackupSubView();
    this.switchTab('home');
    this.showToast('备份导入并安全合并完成！');
  }

  clearAllDataConfirm() {
    if (prompt('警告：清空后无法找回！请输入 "清空数据" 确认：') === '清空数据') {
      localStorage.clear();
      window.store.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      window.store.persist();
      location.reload();
    }
  }

  closeBackupSubView() {
    const modal = document.getElementById('backupModal');
    if (modal) modal.classList.remove('modal-open');
    this.currentSubView = null;
    this.hideBottomNav(false);
  }

  // ================= 11. 全屏大图查看器 =================

  openImageViewer(images, startIndex = 0) {
    if (!images || images.length === 0) return;
    this.viewerImages = images;
    this.viewerIndex = startIndex;

    const modal = document.getElementById('imageViewerModal');
    const imgEl = document.getElementById('viewerImg');
    const counterEl = document.getElementById('viewerCounter');

    imgEl.src = images[startIndex];
    counterEl.textContent = `${startIndex + 1} / ${images.length}`;

    modal.classList.add('viewer-open');
    window.store.pushBackHandler(() => this.closeImageViewer());
  }

  viewerNext() {
    if (this.viewerIndex < this.viewerImages.length - 1) {
      this.viewerIndex++;
      this.updateViewerImage();
    }
  }

  viewerPrev() {
    if (this.viewerIndex > 0) {
      this.viewerIndex--;
      this.updateViewerImage();
    }
  }

  updateViewerImage() {
    const imgEl = document.getElementById('viewerImg');
    const counterEl = document.getElementById('viewerCounter');
    imgEl.src = this.viewerImages[this.viewerIndex];
    counterEl.textContent = `${this.viewerIndex + 1} / ${this.viewerImages.length}`;
  }

  saveCurrentViewerImage() {
    const current = this.viewerImages[this.viewerIndex];
    window.store.saveImageToAlbum(current, `yaohuaji_img_${Date.now()}.jpg`);
    this.showToast('画作已保存到系统相册！');
  }

  closeImageViewer() {
    const modal = document.getElementById('imageViewerModal');
    if (modal) modal.classList.remove('viewer-open');
  }

  // ================= 辅助函数 =================

  handleFabClick() {
    if (this.activeTab === 'home' || this.activeTab === 'orders') {
      this.openOrderFormModal();
    } else if (this.activeTab === 'gallery') {
      document.getElementById('galleryImgUploadInput').click();
    }
  }

  hideBottomNav(hide) {
    const nav = document.getElementById('appBottomNav');
    if (nav) nav.classList.toggle('nav-hidden', hide);
  }

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('modal-open'));
    this.hideBottomNav(false);
  }

  calculateDaysLeft(endDateStr) {
    if (!endDateStr) return 99;
    const end = new Date(endDateStr).getTime();
    const now = new Date().setHours(0, 0, 0, 0);
    return Math.ceil((end - now) / 86400000);
  }

  showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => {
      div.style.opacity = '0';
      setTimeout(() => div.remove(), 300);
    }, 2200);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.app = new AppController();

function startApp() {
  if (window.app) {
    window.app.init();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
