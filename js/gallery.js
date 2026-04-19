document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const videoCards = document.querySelectorAll('.video-card');

  function applyFilter(filter) {
    // Add loading animation
    const galleryGrid = document.querySelector('.gallery-grid');
    const videosSection = document.querySelector('.gallery-section');

    if (galleryGrid) galleryGrid.style.opacity = '0.5';
    if (videosSection) videosSection.style.opacity = '0.5';

    setTimeout(() => {
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        item.style.display = shouldShow ? 'block' : 'none';

        // Add fade animation
        if (shouldShow) {
          item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }
      });

      videoCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || filter === 'videos' || category === filter;
        card.style.display = shouldShow ? 'flex' : 'none';

        if (shouldShow) {
          card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }
      });

      const photosGrid = document.querySelector('.gallery-grid');
      const videosSection = document.querySelector('.gallery-section');

      const hasVisiblePhotos = Array.from(galleryItems).some(item => item.style.display !== 'none');
      const hasVisibleVideos = Array.from(videoCards).some(card => card.style.display !== 'none');

      if (photosGrid) {
        photosGrid.style.display = hasVisiblePhotos ? 'grid' : 'none';
        photosGrid.style.opacity = '1';
      }
      if (videosSection) {
        videosSection.style.display = hasVisibleVideos ? 'block' : 'none';
        videosSection.style.opacity = '1';
      }
    }, 200);
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilter(button.dataset.filter || button.textContent.toLowerCase());
    });
  });

  const defaultButton = document.querySelector('.filter-pill.active') || filterButtons[0];
  if (defaultButton) {
    applyFilter(defaultButton.dataset.filter || defaultButton.textContent.toLowerCase());
  }
});

