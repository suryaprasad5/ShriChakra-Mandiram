// ============================================
// ShriChakra Mandiram – Main JS
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile nav toggle
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Fade-in observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const acc = header.parentElement;
    const wasOpen = acc.classList.contains('open');
    document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
    if (!wasOpen) acc.classList.add('open');
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    btn.textContent = 'Message Sent! 🙏';
    btn.style.background = 'linear-gradient(135deg,#2d7a2d,#1a4f1a)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3500);
  });
}

// Calendar (events page)
function buildCalendar(year, month, events) {
  const calGrid = document.getElementById('calGrid');
  const calTitle = document.getElementById('calTitle');
  if (!calGrid) return;

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  calTitle.textContent = `${months[month]} ${year}`;

  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  calGrid.innerHTML = dayNames.map(d => `<div class="cal-day-name">${d}</div>`).join('');

  for (let i = 0; i < first; i++) calGrid.innerHTML += `<div class="cal-day empty"></div>`;

  for (let d = 1; d <= days; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEvent = events.some(e => e.date === dateStr);
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    calGrid.innerHTML += `<div class="cal-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
  }
}

// If on events page
const calGrid = document.getElementById('calGrid');
if (calGrid) {
  const events = [
    { date: '2026-03-06', name: 'Shivaratri Special Puja' },
    { date: '2026-03-21', name: 'Ugadi Celebrations' },
    { date: '2026-04-06', name: 'Ram Navami Mahotsav' },
    { date: '2026-04-13', name: 'Vishu & Tamil New Year' },
    { date: '2026-04-14', name: 'Hanuman Jayanti' },
    { date: '2026-04-30', name: 'Monthly Amavasya Puja' },
  ];
  buildCalendar(2026, 2, events);

  document.getElementById('prevMonth')?.addEventListener('click', () => buildCalendar(2026, 1, events));
  document.getElementById('nextMonth')?.addEventListener('click', () => buildCalendar(2026, 3, events));
}
