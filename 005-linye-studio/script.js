const works = [
  ['人像','午后肖像','https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85'],['婚礼','林间誓言','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85'],['品牌','静物与光','https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85'],['人像','黑色礼服','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85'],['婚礼','婚礼瞬间','https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85'],['品牌','时间的质感','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'],['人像','自然引导','https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85'],['婚礼','无声靠近','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85'],['品牌','日常之物','https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85'],['人像','留白','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85'],['婚礼','仪式之前','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85'],['品牌','品牌细节','https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85']
].map(([type,title,src]) => ({type,title,src}));

const grid = document.querySelector('#work-grid');
const emptyWorks = document.querySelector('#work-empty');
const workLoading = document.querySelector('#work-loading');
const dialog = document.querySelector('#lightbox');
let shownWorks = works;
let currentIndex = 0;
let filterTimer;

function renderWorks(filter = '全部') {
  shownWorks = filter === '全部' ? works : works.filter(work => work.type === filter);
  grid.innerHTML = shownWorks.map((work, index) => `<button class="work-card" data-index="${index}"><img src="${work.src}" alt="${work.type}摄影作品：${work.title}" loading="lazy"><span>${work.title}<small>${work.type}</small></span></button>`).join('');
  grid.hidden = shownWorks.length === 0;
  emptyWorks.hidden = filter === '全部' || shownWorks.length !== 0;
}
function showWork(index) { currentIndex = (index + shownWorks.length) % shownWorks.length; const work = shownWorks[currentIndex]; dialog.querySelector('img').src = work.src; dialog.querySelector('img').alt = work.title; dialog.querySelector('figcaption').textContent = `${currentIndex + 1} / ${shownWorks.length}　${work.title}`; dialog.showModal(); }
document.querySelector('.filters').addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; const filter = button.dataset.filter; document.querySelectorAll('.filters button').forEach(item => item.classList.toggle('active', item === button)); clearTimeout(filterTimer); if (filter === '全部') { workLoading.hidden = true; renderWorks(filter); return; } grid.hidden = true; emptyWorks.hidden = true; workLoading.hidden = false; filterTimer = setTimeout(() => { workLoading.hidden = true; renderWorks(filter); }, 650); });
document.querySelector('#reset-filter').addEventListener('click', () => document.querySelector('.filters button[data-filter="全部"]').click());
grid.addEventListener('click', event => { const card = event.target.closest('.work-card'); if (card) showWork(Number(card.dataset.index)); });
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.previous').addEventListener('click', () => showWork(currentIndex - 1));
dialog.querySelector('.next').addEventListener('click', () => showWork(currentIndex + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => { if (!dialog.open) return; if (event.key === 'ArrowLeft') showWork(currentIndex - 1); if (event.key === 'ArrowRight') showWork(currentIndex + 1); });

const menuButton = document.querySelector('.menu-button'); const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', isOpen); menuButton.textContent = isOpen ? '关闭' : '菜单'; });
nav.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '菜单'; });
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { document.querySelector('[name="type"]').value = button.dataset.service; document.querySelector('#booking').scrollIntoView({behavior:'smooth'}); }));
document.querySelector('#booking-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; const required = [...form.querySelectorAll('[required]')]; required.forEach(field => field.setAttribute('aria-invalid', !field.value.trim())); const message = document.querySelector('#form-message'); if (required.some(field => !field.value.trim())) { message.textContent = '请填写姓名、联系方式和拍摄类型。'; message.className = 'form-message error'; return; } message.textContent = '预约需求已提交，我们会尽快与你联系。'; message.className = 'form-message success'; form.reset(); });
const processSection = document.querySelector('.reveal');
if (processSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) new IntersectionObserver(([entry], observer) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }, { threshold: .18 }).observe(processSection);
else processSection?.classList.add('is-visible');
renderWorks();
