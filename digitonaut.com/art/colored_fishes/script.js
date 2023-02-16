const doodle = document.querySelector('css-doodle');
if (doodle && window.matchMedia('screen and (max-width: 768px)').matches) {
  doodle.grid = 10;
}