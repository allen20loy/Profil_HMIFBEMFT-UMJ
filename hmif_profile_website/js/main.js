const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = themeToggle?.querySelector('.theme-label');

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Mode terang' : 'Mode gelap';
  themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
  try { localStorage.setItem('hmif-theme', theme); } catch (error) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('hmif-theme'); } catch (error) {}
applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));

const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
menuBtn?.addEventListener('click', () => navlinks?.classList.toggle('open'));
navlinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navlinks.classList.remove('open')));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
