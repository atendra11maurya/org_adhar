import { highlightEmblemPillar, resetEmblemPillars } from './emblem.js';

export const PILLARS_DATA = [
  {
    id: 1,
    number: '01',
    name: 'Self-Awareness & Growth Mindset',
    accent: 'green',
    accentColor: 'var(--accent-green)',
    title: 'Knowing Your Foundation Before Building Upward',
    description: 'Personal development begins with clear-eyed self-assessment. Aadharshila trains students to recognize habitual cognitive patterns, unexamined assumptions, and growth opportunities without defensiveness.',
    practices: [
      'Self-Audit & Introspection Journals',
      'Cognitive Habit Analysis',
      'Constructive Peer Feedback Circles',
      'Long-Term Personal Growth Mapping'
    ]
  },
  {
    id: 2,
    number: '02',
    name: 'Confidence & Communication',
    accent: 'orange',
    accentColor: 'var(--accent-orange)',
    title: 'Commanding Space Through Clarity & Precision',
    description: 'Confidence is not loud assertion; it is the composure that arises from preparation, clarity of thought, and the ability to articulate complex ideas concisely under scrutiny.',
    practices: [
      'Extempore & Rhetoric Masterclasses',
      'Debate & Parliamentary Discourse',
      'Body Language & Stage Poise',
      'Interpersonal Negotiation Drills'
    ]
  },
  {
    id: 3,
    number: '03',
    name: 'Empathy & Emotional Intelligence',
    accent: 'magenta',
    accentColor: 'var(--accent-magenta)',
    title: 'The Foundation of Meaningful Human Connection',
    description: 'A leader unable to perceive other viewpoints is fundamentally incomplete. We cultivate emotional maturity, non-reactive listening, and the capacity to build deep, respectful alliances.',
    practices: [
      'Empathetic Listening Labs',
      'Perspective-Switching Roundtables',
      'Conflict Mediation Frameworks',
      'Cross-Functional Team Dynamics'
    ]
  },
  {
    id: 4,
    number: '04',
    name: 'Integrity & Values',
    accent: 'sand',
    accentColor: 'var(--accent-sand)',
    title: 'Alignment Between Principle, Speech & Conduct',
    description: 'Reputation is what people think of you; character is who you are in private. Aadharshila places ethical steadfastness at the core of all student endeavors and institutional decisions.',
    practices: [
      'Ethical Case Study Analysis',
      'Institutional Accountability Reviews',
      'Value-Based Decision Frameworks',
      'Civic Responsibility Dialogues'
    ]
  },
  {
    id: 5,
    number: '05',
    name: 'Courage, Compassion & Leadership',
    accent: 'purple',
    accentColor: 'var(--accent-purple)',
    title: 'Leading Through Service Rather Than Status',
    description: 'True leadership requires the courage to make difficult choices, the compassion to protect and nurture one’s team, and the humility to measure success by the growth of others.',
    practices: [
      'Experiential Leadership Simulations',
      'Campus & Community Action Projects',
      'Peer Mentorship Systems',
      'Crisis Response & Responsibility Roles'
    ]
  }
];

export function initPillarsInteractive() {
  const threadItems = document.querySelectorAll('.thread-item');
  const displayTitle = document.getElementById('pillar-display-title');
  const displayDesc = document.getElementById('pillar-display-desc');
  const displayNum = document.getElementById('pillar-display-num');
  const indicator = document.getElementById('pillar-accent-bar');
  const practicesList = document.getElementById('pillar-practices-container');

  if (!threadItems.length || !displayTitle) return;

  function updatePillar(index) {
    const data = PILLARS_DATA[index];
    if (!data) return;

    // Update active tab styles
    threadItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    // Animate display container content transition
    displayTitle.style.opacity = '0';
    displayDesc.style.opacity = '0';
    if (practicesList) practicesList.style.opacity = '0';

    setTimeout(() => {
      displayTitle.textContent = data.title;
      displayDesc.textContent = data.description;
      if (displayNum) displayNum.textContent = `PILLAR ${data.number}`;
      if (indicator) indicator.style.backgroundColor = data.accentColor;

      if (practicesList) {
        practicesList.innerHTML = data.practices
          .map((p) => `<span class="practice-tag">${p}</span>`)
          .join('');
      }

      displayTitle.style.transition = 'opacity 0.3s ease';
      displayDesc.style.transition = 'opacity 0.3s ease';
      if (practicesList) practicesList.style.transition = 'opacity 0.3s ease';

      displayTitle.style.opacity = '1';
      displayDesc.style.opacity = '1';
      if (practicesList) practicesList.style.opacity = '1';
    }, 150);

    highlightEmblemPillar(index);
  }

  threadItems.forEach((item, index) => {
    item.addEventListener('click', () => updatePillar(index));
    item.addEventListener('mouseenter', () => highlightEmblemPillar(index));
    item.addEventListener('mouseleave', () => {
      const activeIdx = Array.from(threadItems).findIndex((el) => el.classList.contains('active'));
      if (activeIdx !== -1) highlightEmblemPillar(activeIdx);
      else resetEmblemPillars();
    });
  });

  // Initialize with the first pillar
  updatePillar(0);
}
