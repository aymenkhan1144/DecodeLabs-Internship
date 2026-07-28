
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


const loadMoreBtn = document.getElementById('loadMoreBtn');
const cardGrid = document.getElementById('cardGrid');

const extraCards = [
  { title: 'Typography Systems', text: 'Pairing geometric headlines with readable body text.' },
  { title: 'Empathy Mapping', text: 'Says, thinks, does, feels — research before wireframes.' }
];

let loaded = false;

loadMoreBtn.addEventListener('click', () => {
  if (!loaded) {
    extraCards.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-thumb" aria-hidden="true"></div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      `;
      cardGrid.appendChild(card);
    });
    loadMoreBtn.textContent = 'Show Less';
    loaded = true;
  } else {
    document.querySelectorAll('.card').forEach((card, i) => {
      if (i >= 4) card.remove();
    });
    loadMoreBtn.textContent = 'View All';
    loaded = false;
  }
});