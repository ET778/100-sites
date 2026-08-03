const heroZoom = document.querySelector('.hero-zoom');

if (heroZoom) {
  const openHeroZoom = () => {
    const image = heroZoom.querySelector('img');
    const dialog = document.createElement('dialog');
    const zoomedImage = document.createElement('img');
    const closeButton = document.createElement('button');

    dialog.className = 'image-zoom-dialog';
    zoomedImage.src = image.currentSrc || image.src;
    zoomedImage.alt = image.alt;
    closeButton.type = 'button';
    closeButton.textContent = '关闭大图';

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      dialog.remove();
      heroZoom.focus();
    });

    dialog.append(zoomedImage, closeButton);
    document.body.append(dialog);
    dialog.showModal();
  };

  heroZoom.addEventListener('click', event => {
    if (event.target.closest('a, button')) return;
    openHeroZoom();
  });
  heroZoom.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openHeroZoom();
    }
  });
}
