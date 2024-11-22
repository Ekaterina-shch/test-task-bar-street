// скролл хедер
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 100);
});

// Переключение темы
const themeToggleButtons = [
  document.getElementById('theme-toggle'),
  document.getElementById('theme-toggle-mobile'),
];

const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark-theme');

  themeToggleButtons.forEach((button) => (button.checked = isDark));
};

themeToggleButtons.forEach((button) =>
  button.addEventListener('click', toggleTheme)
);

// mobile burger menu
const burgerBtn = document.getElementById('burger-btn');
const menuOverlay = document.getElementById('menu-overlay');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('menu-close-btn');

const toggleMenu = (isOpen) => {
  mobileMenu.classList.toggle('active', isOpen);
  menuOverlay.classList.toggle('active', isOpen);
};

burgerBtn.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));
menuOverlay.addEventListener('click', () => toggleMenu(false));

// Логика для дропдауна
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.menu__item--dropdown');
  const toggleButton = dropdown.querySelector('.menu__button');
  const tabs = dropdown.querySelectorAll('.dropdown__tab[data-content]');
  const panels = dropdown.querySelectorAll('.dropdown__panel');

  // Открытие/закрытие дропдауна
  toggleButton.addEventListener('click', () =>
    dropdown.classList.toggle('menu__item--open')
  );

  // Функция для обновления классов вкладок
  const updateTabStyles = () => {
    tabs.forEach((tab, index) => {
      // Проверить, есть ли у следующего элемента класс .dropdown__tab--active
      if (tabs[index + 1]?.classList.contains('dropdown__tab--active')) {
        tab.classList.add('dropdown__tab--before-active');
      } else {
        tab.classList.remove('dropdown__tab--before-active');
      }
    });
  };

  // Обработчик переключения вкладок
  const handleTabClick = (tab) => {
    tabs.forEach((t) => t.classList.remove('dropdown__tab--active'));
    panels.forEach((panel) =>
      panel.classList.remove('dropdown__panel--active')
    );

    tab.classList.add('dropdown__tab--active');
    const contentId = tab.getAttribute('data-content');
    const activePanel = dropdown.querySelector(`#${contentId}`);
    activePanel?.classList.add('dropdown__panel--active');

    updateTabStyles();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => handleTabClick(tab));
  });

  updateTabStyles();

  // Закрытие дропдауна при клике вне области меню
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target))
      dropdown.classList.remove('menu__item--open');
  });
});
