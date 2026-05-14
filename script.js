const menu = [
  { id: 1, category: "飯類", name: "白飯", price: 15 },
  { id: 2, category: "飯類", name: "雞肉飯", price: 45 },
  { id: 3, category: "飯類", name: "魚鬆飯", price: 45 },
  { id: 4, category: "飯類", name: "肉燥飯", price: 40 },
  { id: 5, category: "飯類", name: "菜飯便當", price: 70 },
  { id: 6, category: "飯類", name: "肉燥便當", price: 80 },
  { id: 7, category: "飯類", name: "雞肉便當", price: 95 },
  { id: 8, category: "飯類", name: "魚鬆便當", price: 95 },
  { id: 9, category: "飯類", name: "炸雞腿便當", price: 135 },
  { id: 10, category: "飯類", name: "滷雞腿便當", price: 135 },
  { id: 11, category: "飯類", name: "炸排骨便當", price: 125 },
  { id: 12, category: "飯類", name: "滷排骨便當", price: 125 },
  { id: 13, category: "飯類", name: "豬腳便當", price: 120 },
  { id: 14, category: "飯類", name: "控肉便當", price: 120 },
  { id: 15, category: "飯類", name: "蝦捲便當", price: 125 },
  { id: 16, category: "湯類", name: "虱目魚肚綜合湯", price: 165 },
  { id: 17, category: "湯類", name: "無刺虱目魚肚湯", price: 150 },
  { id: 18, category: "湯類", name: "蝦仔湯", price: 75 },
  { id: 19, category: "湯類", name: "虱目魚皮湯", price: 80 },
  { id: 20, category: "湯類", name: "虱目魚丸湯", price: 40 },
  { id: 21, category: "湯類", name: "虱目魚肉湯", price: 65 },
  { id: 22, category: "湯類", name: "蛤仔湯", price: 60 },
  { id: 23, category: "湯類", name: "排骨湯", price: 45 },
  { id: 24, category: "湯類", name: "豬肝湯", price: 55 },
  { id: 25, category: "粥類", name: "無刺虱目魚肚粥", price: 170 },
  { id: 26, category: "粥類", name: "虱目魚肉粥", price: 85 },
  { id: 27, category: "小菜", name: "煎魚肚", price: 150 },
  { id: 28, category: "小菜", name: "煎魚肚飯", price: 200 },
  { id: 29, category: "小菜", name: "魯魚頭(3個)", price: 60 },
  { id: 30, category: "小菜", name: "魯魚頭(1個)", price: 25 },
  { id: 31, category: "小菜", name: "魯魚肚飯", price: 200 },
  { id: 32, category: "小菜", name: "魯魚肚", price: 150 },
  { id: 33, category: "小菜", name: "燙虱目魚腸", price: 70 },
  { id: 34, category: "小菜", name: "炸雞腿", price: 85 },
  { id: 35, category: "小菜", name: "滷雞腿", price: 85 },
  { id: 36, category: "小菜", name: "炸排骨", price: 80 },
  { id: 37, category: "小菜", name: "滷排骨", price: 80 },
  { id: 38, category: "小菜", name: "豬腳(1段)", price: 80 },
  { id: 39, category: "小菜", name: "控肉片(1片)", price: 80 },
  { id: 40, category: "小菜", name: "白菜滷", price: 45 },
  { id: 41, category: "小菜", name: "筍絲", price: 40 },
  { id: 42, category: "小菜", name: "滷蛋", price: 15 },
  { id: 43, category: "小菜", name: "荷包蛋", price: 15 },
  { id: 44, category: "小菜", name: "滷豆腐", price: 15 },
  { id: 45, category: "小菜", name: "小菜(炒)", price: 40 },
];

const order = new Map();
const menuList = document.getElementById("menuList");
const orderSummary = document.getElementById("orderSummary");
const totalAmount = document.getElementById("totalAmount");
const clearOrderBtn = document.getElementById("clearOrderBtn");
const submitOrderBtn = document.getElementById("submitOrderBtn");
const categoryTabs = document.getElementById("categoryTabs");
const customizeModal = document.getElementById("customizeModal");
const sideOptionsContainer = document.getElementById("sideOptions");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const confirmSidesBtn = document.getElementById("confirmSidesBtn");

let activeCategory = "";
let currentBento = null;
let selectedSides = new Set();

const bentoSideOptions = [
  { name: "豆輪", health: "植物蛋白與纖維，適合補充飽足感。" },
  { name: "甜不辣", health: "魚漿蛋白質較高，口感Q彈。" },
  { name: "三角豆腐", health: "低熱量豆製品，含鈣與植物蛋白。" },
  { name: "炒臘腸", health: "香味十足，但脂肪較高，適量食用。" },
  { name: "蔥蛋", health: "蛋白質與蔥香，提供維生素K與鋅。" },
  { name: "茄子", health: "含纖維與鉀，有助於消化與代謝。" },
  { name: "荷包蛋", health: "高品質蛋白質與維生素D來源。" },
  { name: "白菜滷", health: "低卡高纖，適合搭配主餐平衡飲食。" },
  { name: "空心菜", health: "富含維生素A、C與鐵質。" },
  { name: "高麗菜", health: "高纖維、維生素K與葉酸，對腸胃友善。" },
  { name: "大陸妹", health: "多種維生素與礦物質，清爽又營養。" },
  { name: "a菜", health: "高纖維蔬菜，含維生素C與鉀。" },
  { name: "雪裡紅", health: "富含鈣與葉綠素，對骨骼與血液有益。" },
  { name: "南瓜", health: "含β-胡蘿蔔素與維生素A，對視力有幫助。" },
  { name: "小白菜", health: "維生素C與鈣質豐富，低熱量易消化。" },
  { name: "大白菜", health: "高水分與纖維，適合清爽配菜。" },
  { name: "菠菜", health: "含鐵質與葉酸，對補血有幫助。" },
  { name: "番茄炒蛋", health: "番茄維生素C與蛋白質並存，營養均衡。" },
  { name: "菜波能", health: "蔬菜搭配香料，富含纖維與風味。" },
  { name: "咖哩", health: "香料有助食慾，搭配蔬菜可達均衡。" },
  { name: "三色豆", health: "蛋白質與纖維兼具，色彩豐富好吸收。" },
  { name: "土豆絲", health: "馬鈴薯澱粉與鉀質，補充能量不過份油膩。" },
  { name: "韭菜炒蛋", health: "韭菜鐵質搭配蛋白，具有溫補效果。" },
  { name: "香腸", health: "風味強烈，建議少量搭配。" },
  { name: "炒豆芽", health: "低卡高纖，富含維生素B群。" },
  { name: "青江菜", health: "含維生素A與C，口感清爽。" },
  { name: "炒竹筍", health: "竹筍低脂高纖，是健康蔬菜選擇。" },
  { name: "哇哇菜", health: "清爽高纖，適合搭配油膩主餐。" },
  { name: "小魚豆干", health: "鈣質與蛋白質來源，口感香Q。" },
  { name: "蒸蛋", health: "嫩蛋白質，易消化且營養溫和。" },
];

function getCategories() {
  return menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

function renderCategoryTabs() {
  const categories = Object.keys(getCategories());
  if (!activeCategory && categories.length) {
    activeCategory = categories[0];
  }

  categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `category-tab ${category === activeCategory ? "active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => setActiveCategory(category));
    categoryTabs.appendChild(button);
  });
}

function setActiveCategory(category) {
  activeCategory = category;
  renderCategoryTabs();
  renderMenu();
}

function renderMenu() {
  menuList.innerHTML = "";
  const categories = getCategories();
  const items = activeCategory ? categories[activeCategory] : menu;

  if (!items || items.length === 0) {
    menuList.innerHTML = '<p class="empty">此分類目前沒有餐點。</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-item";
    const isBento = item.category === "飯類" && item.name.includes("便當");
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>價格：NT$ ${item.price}</p>
      <div class="item-bottom">
        <span>單筆價格</span>
        <button data-id="${item.id}">${isBento ? "自訂配菜加入" : "加入訂單"}</button>
      </div>
    `;

    const addButton = card.querySelector("button");
    addButton.addEventListener("click", () => {
      if (isBento) openBentoCustomizer(item);
      else addToOrder(item);
    });
    menuList.appendChild(card);
  });
}

function addToOrder(item) {
  const orderKey = item.orderKey || getOrderKey(item);
  const existing = order.get(orderKey) || { ...item, quantity: 0, sides: item.sides || [], extraCharge: item.extraCharge || 0, orderKey };
  existing.quantity += 1;
  order.set(orderKey, existing);
  renderOrder();
}

function getOrderKey(item) {
  if (item.sides && item.sides.length) {
    return `${item.id}|${item.sides.slice().sort().join(",")}|${item.extraCharge || 0}`;
  }
  return `${item.id}`;
}

function openBentoCustomizer(item) {
  currentBento = item;
  selectedSides = new Set();
  renderSideOptions();
  customizeModal.classList.remove("hidden");
}

function closeCustomizer() {
  customizeModal.classList.add("hidden");
  currentBento = null;
  selectedSides = new Set();
}

function renderSideOptions() {
  sideOptionsContainer.innerHTML = "";
  bentoSideOptions.forEach((side) => {
    const option = document.createElement("label");
    option.className = "side-option";
    option.innerHTML = `
      <input type="checkbox" value="${side.name}" />
      <div class="side-label">
        <span class="side-name">${side.name}</span>
        <small class="side-health">${side.health}</small>
      </div>
    `;

    const checkbox = option.querySelector("input");
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked && selectedSides.size >= 4) {
        event.target.checked = false;
        return;
      }
      if (event.target.checked) selectedSides.add(side.name);
      else selectedSides.delete(side.name);
    });
    sideOptionsContainer.appendChild(option);
  });
}

function confirmBentoSides() {
  if (!currentBento) return;
  const sides = Array.from(selectedSides);
  const extraCharge = Math.max(0, sides.length - 3) * 15;
  const customizedItem = {
    ...currentBento,
    quantity: 1,
    sides,
    extraCharge,
    orderKey: getOrderKey({ ...currentBento, sides, extraCharge }),
    name: `${currentBento.name}${sides.length ? ` (${sides.join("、")})` : ""}`,
  };
  addToOrder(customizedItem);
  closeCustomizer();
}

function removeFromOrder(itemId) {
  order.delete(itemId);
  renderOrder();
}

function updateOrderQuantity(orderKey, delta) {
  const item = order.get(orderKey);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    order.delete(orderKey);
  } else {
    order.set(orderKey, item);
  }

  renderOrder();
}

function renderOrder() {
  orderSummary.innerHTML = "";
  const entries = Array.from(order.values());

  if (entries.length === 0) {
    orderSummary.innerHTML = '<p class="empty">目前尚未點餐。</p>';
    totalAmount.textContent = "NT$ 0";
    return;
  }

  let total = 0;
  entries.forEach((item) => {
    const itemTotal = (item.price + (item.extraCharge || 0)) * item.quantity;
    total += itemTotal;

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
      <div class="order-info">
        <span class="item-name">${item.name}</span>
        <span class="item-total">NT$ ${itemTotal}</span>
        ${item.extraCharge ? `<small class="extra-note">含加價 NT$ ${item.extraCharge} (第 4 樣配菜)</small>` : ""}
      </div>
      <div class="item-actions">
        <button class="qty-btn minus" aria-label="減少一份" data-id="${item.id}">－</button>
        <span class="item-qty">${item.quantity}</span>
        <button class="qty-btn plus" aria-label="增加一份" data-id="${item.id}">＋</button>
      </div>
    `;

    const minusButton = orderItem.querySelector(".qty-btn.minus");
    const plusButton = orderItem.querySelector(".qty-btn.plus");
    const orderKey = item.orderKey || getOrderKey(item);

    minusButton.addEventListener("click", () => updateOrderQuantity(orderKey, -1));
    plusButton.addEventListener("click", () => updateOrderQuantity(orderKey, 1));

    orderSummary.appendChild(orderItem);
  });

  totalAmount.textContent = `NT$ ${total}`;
}

function clearOrder() {
  order.clear();
  renderOrder();
}

function submitOrder() {
  if (order.size === 0) {
    alert("請先加入餐點後再提交訂單。");
    return;
  }

  const orderText = Array.from(order.values())
    .map((item) => `${item.name} x${item.quantity}`)
    .join("\n");
  const total = Array.from(order.values()).reduce((sum, item) => sum + (item.price + (item.extraCharge || 0)) * item.quantity, 0);

  alert(`訂單已提交：\n${orderText}\n\n總計：NT$ ${total}`);
  clearOrder();
}

clearOrderBtn.addEventListener("click", clearOrder);
submitOrderBtn.addEventListener("click", submitOrder);
closeModalBtn.addEventListener("click", closeCustomizer);
cancelModalBtn.addEventListener("click", closeCustomizer);
confirmSidesBtn.addEventListener("click", confirmBentoSides);
customizeModal.addEventListener("click", (event) => {
  if (event.target === customizeModal || event.target.classList.contains("modal-backdrop")) {
    closeCustomizer();
  }
});

renderCategoryTabs();
renderMenu();
renderOrder();
