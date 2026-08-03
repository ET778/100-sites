const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const closeMenu = () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '打开导航菜单'); };
menuButton.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); menuButton.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
const quantityOutput = document.querySelector('#quantity');
const decrease = document.querySelector('#decrease');
const increase = document.querySelector('#increase');
const addToBag = document.querySelector('#add-to-bag');
const feedback = document.querySelector('#bag-feedback');
let quantity = 1;
const formatPrice = value => `¥${value}`;
function updateQuantity() { quantityOutput.textContent = quantity; decrease.disabled = quantity === 1; const total = 428 * quantity; addToBag.textContent = quantity === 1 ? `加入购物袋 · ${formatPrice(total)}` : `加入购物袋 · ${quantity} 件 · ${formatPrice(total)}`; document.querySelector('#price').textContent = formatPrice(total); feedback.classList.remove('success'); feedback.textContent = '配送与客服信息均为演示内容。'; }
increase.addEventListener('click', () => { quantity += 1; updateQuantity(); });
decrease.addEventListener('click', () => { if (quantity > 1) { quantity -= 1; updateQuantity(); } });
addToBag.addEventListener('click', () => { addToBag.disabled = true; addToBag.textContent = '正在加入…'; window.setTimeout(() => { const message = `已将 ${quantity} 件「雨后图书馆 50ml」加入购物袋。`; addToBag.disabled = false; updateQuantity(); feedback.textContent = message; feedback.classList.add('success'); }, 250); });
