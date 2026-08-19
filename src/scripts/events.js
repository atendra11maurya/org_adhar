export const EVENTS_DATA = [
  {
    id: 'abhyudaya-symposium',
    title: 'ABHYUDAYA: National Leadership & Governance Summit',
    category: 'seminars',
    categoryLabel: 'National Seminar',
    date: '18 March 2026',
    location: 'Motilal Nehru College Auditorium, University of Delhi',
    speaker: 'Dr. Sanjeev Chopra (Ex-Director LBSNAA), Ravi Kapoor (Ex-IRS), Dr. Deepak Jaiswal (Ex-Asst. Commissioner)',
    image: '/src/assets/images/event_abhyudaya_leaders.png',
    summary: 'A signature institutional assembly examining public governance, civil administration, and the steadfast ethics required in statecraft.',
    fullStory: 'ABHYUDAYA brought together distinguished administrators and civil servants to engage students in deep discourse on public policy, institutional governance, and personal character. Former LBSNAA Director Dr. Sanjeev Chopra, Former IRS Officer Ravi Kapoor, and Former Asst. Commissioner Dr. Deepak Jaiswal shared first-hand insights on leading under scrutiny and maintaining integrity across public service.',
    takeaways: [
      'Institutional leadership lessons from the former Director of LBSNAA',
      'Balancing policy execution with moral responsibility in public administration',
      'The transition from student idealism to seasoned civil governance'
    ]
  },
  {
    id: 'vijendra-chauhan-seminar',
    title: 'Communication Seminar: Leadership & Decision-Making',
    category: 'personality',
    categoryLabel: 'Personality Development',
    date: '12 February 2026',
    location: 'Motilal Nehru College Auditorium',
    speaker: 'Dr. Vijendra Chauhan (Intelligencia / Associate Professor & Educator)',
    image: '/src/assets/images/event_vijendra_chauhan.png',
    summary: 'An engaging masterclass on articulate communication, career planning, nation-building, and high-stakes interview composure.',
    fullStory: 'In this headline session hosted under the Intelligencia banner, Dr. Vijendra Chauhan engaged a packed auditorium on deconstructing stage hesitation, framing concise arguments, and understanding nation-building through individual competence. Students participated in real-time communication drills and diagnostic Q&A.',
    takeaways: [
      'Core pillars of effective verbal articulation and rhetoric precision',
      'Strategic career planning, goal setting, and self-evaluation',
      'Developing grounded decision-making and composure under evaluation'
    ]
  },
  {
    id: 'sanjeev-kapoor-keynote',
    title: 'Leadership & Moral Courage: The Man Behind the Machine',
    category: 'leadership',
    categoryLabel: 'Leadership Keynote',
    date: '24 January 2026',
    location: 'College Library Conference Atrium',
    speaker: 'Air Marshal (Retd.) Sanjeev Kapoor',
    image: '/src/assets/images/event_sanjeev_kapoor.png',
    summary: '“It is not the equipment but the man behind the machine that matters.” A high-level keynote on military leadership and crisis composure.',
    fullStory: 'Air Marshal (Retd.) Sanjeev Kapoor delivered a powerful address on how inner character, discipline, and emotional fortitude determine leadership outcomes far more than external circumstances or material tools. The session explored real-world strategic decision-making in defense and civic life.',
    takeaways: [
      'Cultivating inner composure during high-stakes operational pressure',
      'The foundational military principle of placing team safety above self',
      'Character steadfastness as the true differentiator of leadership'
    ]
  },
  {
    id: 'science-way-of-life',
    title: 'Science Is the Way to Live: Interdisciplinary Symposium',
    category: 'discussions',
    categoryLabel: 'Scientific & Social Discourse',
    date: '15 November 2025',
    location: 'Academic Seminar Hall 04, MLNC',
    speaker: 'Dr. Alok Kumar Mishra, Dr. Meena Mishra (MBBS, MD), Dr. Shankar G. Aggarwal (Chief Scientist & Prof AcSIR)',
    image: '/src/assets/images/event_science_life.png',
    summary: 'An interdisciplinary dialogue exploring rational thought, scientific temper, medicine, and human well-being as a daily philosophy.',
    fullStory: 'Featuring joint insights from municipal governance leader Dr. Alok Kumar Mishra, medical specialist Dr. Meena Mishra, and AcSIR Chief Scientist Dr. Shankar G. Aggarwal, this seminar bridged empirical inquiry, public health, and rational living for modern undergraduates.',
    takeaways: [
      'Applying scientific temper to everyday problem-solving and life choices',
      'Holistic physical and mental health frameworks for university students',
      'Cross-disciplinary insights linking governance, medicine, and research'
    ]
  },
  {
    id: 'abhishek-mishra-session',
    title: 'Civil Services & Ethical Public Leadership',
    category: 'speakers',
    categoryLabel: 'Speaker Session',
    date: '08 October 2025',
    location: 'South Campus Seminar Hall',
    speaker: 'Abhishek Mishra (Faculty Member, Drishti IAS)',
    image: '/src/assets/images/speaker_abhishek_mishra.png',
    summary: 'A structured orientation and mentorship session on civil services preparation, critical analytical thinking, and ethical public administration.',
    fullStory: 'Drishti IAS faculty member Abhishek Mishra provided practical guidance on developing the intellectual breadth, reading discipline, and articulate expression needed for civil services examinations and public sector leadership.',
    takeaways: [
      'Formulating nuanced perspectives on national and socio-economic affairs',
      'Developing structured writing and argument clarity for civil exams',
      'Maintaining consistency and mental resilience over long-term preparation'
    ]
  }
];

export function initEventsModule() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const archiveCards = document.querySelectorAll('.archive-card, .event-card-lead, .event-card-secondary');
  const modalBackdrop = document.getElementById('event-modal');
  const modalBody = document.getElementById('modal-event-body');
  const modalClose = document.getElementById('modal-close-btn');

  // Filter Buttons
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        archiveCards.forEach((card) => {
          const cat = card.dataset.category;
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Modal Open
  function openEventModal(eventId) {
    const data = EVENTS_DATA.find((e) => e.id === eventId);
    if (!data || !modalBackdrop || !modalBody) return;

    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-navy);">
          <span>${data.categoryLabel}</span>
          <span>·</span>
          <span>${data.date}</span>
        </div>
        <h2 style="font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 300; line-height: 1.15; color: var(--color-text-primary);">${data.title}</h2>
        <div style="font-family: var(--font-sans); font-style: normal; font-weight: 500; font-size: 1.0625rem; color: var(--color-navy);">
          Speaker / Host: ${data.speaker}
        </div>
        <div style="width: 100%; max-height: 520px; overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background-color: var(--color-bg-subtle); display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; max-height: 500px; object-fit: contain; display: block;" />
        </div>
        <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em;">
          Location: ${data.location}
        </div>
        <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-text-secondary);">${data.fullStory}</p>
        
        <div style="border-top: 1px solid var(--color-border); padding-top: 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-text-muted); margin-bottom: 0.75rem;">Core Transformational Takeaways</div>
          <ul style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${data.takeaways.map((t) => `<li style="display: flex; align-items: baseline; gap: 0.5rem; font-size: 0.9375rem; color: var(--color-text-secondary);"><span style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-navy); display: inline-block;"></span>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // Bind clicks
  document.querySelectorAll('[data-event-id]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.dataset.eventId;
      if (id) openEventModal(id);
    });
  });

  // Modal Close
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
}
