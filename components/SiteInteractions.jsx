'use client';

import { useEffect } from 'react';

export default function SiteInteractions() {
  useEffect(() => {
    const visibleTimers = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const timer = window.setTimeout(() => entry.target.classList.add('visible'), i * 100);
          visibleTimers.push(timer);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    const headers = Array.from(document.querySelectorAll('.accordion-header'));
    const onAccordionClick = (event) => {
      const acc = event.currentTarget.parentElement;
      const wasOpen = acc.classList.contains('open');
      document.querySelectorAll('.accordion').forEach((item) => item.classList.remove('open'));
      if (!wasOpen) acc.classList.add('open');
    };
    headers.forEach((header) => header.addEventListener('click', onAccordionClick));

    const contactForm = document.getElementById('contactForm');
    const onSubmit = (event) => {
      event.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      btn.textContent = 'Message Sent! 🙏';
      btn.style.background = 'linear-gradient(135deg,#2d7a2d,#1a4f1a)';
      window.setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    };
    contactForm?.addEventListener('submit', onSubmit);

    const events = [
      { date: '2026-03-06', name: 'Shivaratri Special Puja' },
      { date: '2026-03-21', name: 'Ugadi Celebrations' },
      { date: '2026-04-06', name: 'Ram Navami Mahotsav' },
      { date: '2026-04-13', name: 'Vishu & Tamil New Year' },
      { date: '2026-04-14', name: 'Hanuman Jayanti' },
      { date: '2026-04-30', name: 'Monthly Amavasya Puja' },
    ];

    const buildCalendar = (year, month) => {
      const calGrid = document.getElementById('calGrid');
      const calTitle = document.getElementById('calTitle');
      if (!calGrid || !calTitle) return;

      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      calTitle.textContent = `${months[month]} ${year}`;

      const first = new Date(year, month, 1).getDay();
      const days = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

      calGrid.innerHTML = dayNames.map((day) => `<div class="cal-day-name">${day}</div>`).join('');
      for (let i = 0; i < first; i++) calGrid.innerHTML += '<div class="cal-day empty"></div>';

      for (let day = 1; day <= days; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = events.some((event) => event.date === dateStr);
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        calGrid.innerHTML += `<div class="cal-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}">${day}</div>`;
      }
    };

    if (document.getElementById('calGrid')) {
      buildCalendar(2026, 2);
      document.getElementById('prevMonth')?.addEventListener('click', () => buildCalendar(2026, 1));
      document.getElementById('nextMonth')?.addEventListener('click', () => buildCalendar(2026, 3));
    }

    return () => {
      observer.disconnect();
      visibleTimers.forEach((timer) => window.clearTimeout(timer));
      headers.forEach((header) => header.removeEventListener('click', onAccordionClick));
      contactForm?.removeEventListener('submit', onSubmit);
    };
  }, []);

  return null;
}
