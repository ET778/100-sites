const menuData = {
  拉面: [
    { name: "酱油豚骨拉面", broth: "豚骨汤", description: "慢炖豚骨汤底搭配酱油，浓郁平衡。", price: "¥48", tags: ["招牌", "人气"], peppers: 0, image: "./assets/ramen-shoyu-tonkotsu.png", alt: "盛有叉烧和溏心蛋的酱油豚骨拉面" },
    { name: "柚子盐味拉面", broth: "鸡白汤", description: "清爽柚子香气，鸡骨鲜味柔和。", price: "¥46", tags: ["清爽", "推荐"], peppers: 0, image: "./assets/ramen-yuzu-chicken.png", alt: "盛有柚子和鸡叉烧的鸡白汤拉面" },
    { name: "赤辛味噌拉面", broth: "味噌汤", description: "特制赤味噌酱，微辣开胃，层次丰富。", price: "¥49", tags: ["微辣", "人气"], peppers: 4, image: "./assets/ramen-spicy-miso.png", alt: "带有赤辛辣油和叉烧的味噌汤拉面" },
    { name: "黑蒜油拉面", broth: "昆布清汤", description: "黑蒜油香气浓郁，带来轻微焦香。", price: "¥52", tags: ["浓郁"], peppers: 2, image: "./assets/ramen-black-garlic.png", alt: "黑蒜油点缀的昆布清汤拉面" },
  ],
  小菜: [
    { name: "日式唐扬鸡块", broth: "", description: "鸡腿肉腌制后现炸，外酥里嫩。", price: "¥26", tags: ["人气小菜"], peppers: 0, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=480&q=86", alt: "刚出锅的日式唐扬鸡块小菜" },
    { name: "炙烧叉烧拼盘", broth: "", description: "精选叉烧切片，炙烧后搭配葱丝。", price: "¥28", tags: ["适合分享"], peppers: 0, image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=480&q=86", alt: "炙烧叉烧拼盘与葱丝小菜" },
  ],
  饮品: [
    { name: "柚子苏打", broth: "", description: "柚子果酱搭配苏打水，酸甜清爽。", price: "¥16", tags: ["解腻推荐"], peppers: 0, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=480&q=86", alt: "一杯清爽的柚子苏打饮品" },
    { name: "玄米冷泡茶", broth: "", description: "玄米与绿茶低温冷泡，谷物香气柔和。", price: "¥12", tags: ["无糖"], peppers: 0, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=480&q=86", alt: "玻璃杯装的玄米冷泡茶" },
  ],
  季节限定: [
    { name: "夏日冷拌担担面", broth: "味噌汤", description: "芝麻酱、辣油与冷面搭配时蔬，清爽微辣。", price: "¥45", tags: ["夏季限定"], peppers: 2, image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=480&q=86", alt: "夏日冷拌担担面与新鲜时蔬" },
    { name: "柚香盐味鸡汤拉面", broth: "鸡白汤", description: "清鸡汤搭配柚子皮和海盐，香气轻盈。", price: "¥58", tags: ["每日限量"], peppers: 0, image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=480&q=86", alt: "柚香盐味鸡汤拉面与柚子皮" },
  ],
};

const seasonalTantan = Object.values(menuData).flat().find((item) => item.price === "¥45");
if (seasonalTantan) {
  seasonalTantan.image = "./assets/ramen-cold-tantan.png";
  seasonalTantan.alt = "芝麻酱、辣油、黄瓜与肉酱搭配的夏日冷拌担担面";
}

const menuList = document.querySelector("#menu-list");
const tabs = [...document.querySelectorAll(".category-tab")];
const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const toast = document.querySelector("#toast");

function renderMenu(category = "拉面") {
  menuList.innerHTML = menuData[category].map((item) => `
    <article class="menu-item">
      <img class="zoomable" src="${item.image}" alt="${item.alt}" loading="lazy" />
      <div class="menu-copy">
        <h3>${item.name}</h3>
        ${item.broth ? `<span class="broth-note">${item.broth}</span>` : ""}
        <p>${item.description}</p>
        <div class="pepper-row" aria-label="${item.peppers ? `${item.peppers} 个辣椒，辣度提示` : "不辣"}">${"🌶".repeat(item.peppers)}</div>
      </div>
      <strong class="menu-price">${item.price}</strong>
    </article>`).join("");
}

tabs.forEach((tab) => tab.addEventListener("click", () => {
  tabs.forEach((item) => { item.classList.remove("is-active"); item.setAttribute("aria-selected", "false"); });
  tab.classList.add("is-active"); tab.setAttribute("aria-selected", "true"); renderMenu(tab.dataset.category);
}));

menuToggle.addEventListener("click", () => { const open = nav.classList.toggle("is-open"); menuToggle.setAttribute("aria-expanded", String(open)); menuToggle.textContent = open ? "关闭" : "菜单"; });
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { nav.classList.remove("is-open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.textContent = "菜单"; }));

function showToast(message) { toast.textContent = message; toast.classList.add("is-visible"); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200); }
const menuMore = document.querySelector("#menu-more");
let isFullMenuVisible = false;
menuMore.addEventListener("click", () => {
  isFullMenuVisible = !isFullMenuVisible;
  if (isFullMenuVisible) {
    menuList.innerHTML = Object.values(menuData).flat().map((item) => `
      <article class="menu-item">
        <img class="zoomable" src="${item.image}" alt="${item.alt}" loading="lazy" />
        <div class="menu-copy">
          <h3>${item.name}</h3>
          ${item.broth ? `<span class="broth-note">${item.broth}</span>` : ""}
          <p>${item.description}</p>
          <div class="pepper-row" aria-label="${item.peppers ? `${item.peppers} 个辣椒，辣度提示` : "不辣"}">${"🌶️".repeat(item.peppers)}</div>
        </div>
        <strong class="menu-price">${item.price}</strong>
      </article>`).join("");
    menuMore.innerHTML = "收起完整菜单 <span aria-hidden=\"true\">↑</span>";
    menuMore.setAttribute("aria-expanded", "true");
  } else {
    renderMenu(document.querySelector(".category-tab.is-active").dataset.category);
    menuMore.innerHTML = "查看完整菜单 <span aria-hidden=\"true\">→</span>";
    menuMore.setAttribute("aria-expanded", "false");
  }
});
document.querySelector(".store-detail .button").addEventListener("click", (event) => { event.preventDefault(); showToast("已定位到杭州门店信息，请按地址到店。 "); document.querySelector("#store").scrollIntoView({ behavior: "smooth" }); });

function updateOpenStatus() {
  const now = new Date(); const day = now.getDay(); const minutes = now.getHours() * 60 + now.getMinutes();
  const status = document.querySelector("#open-status"); const line = document.querySelector(".status-line");
  if (!status || !line) return;
  let label = "已打烊"; let className = "is-closed";
  if (day === 1) { if (minutes >= 1020 && minutes < 1350) { label = "营业中"; className = ""; } else if (minutes >= 660 && minutes < 1020) { label = "周一午间休息"; className = "is-break"; } }
  else if (minutes >= 660 && minutes < 840) { label = "营业中"; className = ""; } else if (minutes >= 840 && minutes < 1020) { label = "午间休息"; className = "is-break"; } else if (minutes >= 1020 && minutes < 1350) { label = "营业中"; className = ""; }
  status.textContent = label; line.className = `status-line ${className}`;
}

renderMenu(); updateOpenStatus(); window.setInterval(updateOpenStatus, 60000);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
function openLightbox(image) { lightboxImage.src = image.currentSrc || image.src; lightboxImage.alt = image.alt; lightboxCaption.textContent = image.alt; lightbox.classList.add("is-open"); lightbox.setAttribute("aria-hidden", "false"); document.body.classList.add("is-lightbox-open"); }
function closeLightbox() { lightbox.classList.remove("is-open"); lightbox.setAttribute("aria-hidden", "true"); document.body.classList.remove("is-lightbox-open"); }
document.addEventListener("click", (event) => { if (event.target.matches(".zoomable")) openLightbox(event.target); if (event.target.matches("#lightbox, .lightbox-close")) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

const storeMap = document.querySelector(".store-map");

const rhythmImages = [...document.querySelectorAll(".photo-grid img")];
const rhythmReplacements = [
  ["./assets/gallery-bar-interior.png", "一番町拉面温暖的木质吧台与开放式厨房"],
  ["./assets/gallery-corner-interior.png", "一番町拉面安静的双人座位与纸灯笼"],
  ["./assets/gallery-storefront.png", "夜晚灯光下的一番町拉面门店外立面"],
  ["./assets/gallery-customer-woman.png", "顾客在吧台享用拉面并竖起大拇指"],
  ["./assets/gallery-customer-man.png", "顾客与朋友在店内吃拉面并竖起大拇指"],
];
rhythmImages.slice(4).forEach((image, index) => {
  const replacement = rhythmReplacements[index];
  if (replacement) { image.src = replacement[0]; image.alt = replacement[1]; }
});

const gallery = document.querySelector(".photo-grid");
if (gallery) {
  const photos = [...gallery.children];
  [0, 4, 1, 7, 2, 5, 3, 8, 6].forEach((index) => gallery.append(photos[index]));
}

if (storeMap && window.AMap) {
  const location = [120.1751, 30.2789];
  storeMap.innerHTML = "";
  storeMap.setAttribute("role", "region");
  storeMap.setAttribute("aria-label", "一番町拉面杭州门店高德地图");
  const map = new AMap.Map(storeMap, { center: location, zoom: 16, viewMode: "2D" });
  new AMap.Marker({ position: location, title: "一番町拉面" }).setMap(map);
}
