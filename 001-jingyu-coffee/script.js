const toggle = document.querySelector('.scene-toggle');
const body = document.body;

function setScene(scene) {
  const isNight = scene === 'night';
  body.dataset.scene = scene;
  toggle.setAttribute('aria-pressed', String(isNight));
  toggle.setAttribute('aria-label', isNight ? '切换至白天场景' : '切换至傍晚场景');
  toggle.querySelector('.scene-icon').textContent = isNight ? '☾' : '☼';
  toggle.querySelector('.scene-label').textContent = isNight ? '回到白天' : '进入傍晚';
  document.querySelector('.day-copy').setAttribute('aria-hidden', String(isNight));
  document.querySelector('.night-copy').setAttribute('aria-hidden', String(!isNight));
  localStorage.setItem('jingyu-scene', scene);
}

const savedScene = localStorage.getItem('jingyu-scene');
if (savedScene === 'night') setScene('night');

toggle.addEventListener('click', () => {
  setScene(body.dataset.scene === 'night' ? 'day' : 'night');
});
