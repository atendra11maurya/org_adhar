import { 
  createIcons, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  ChevronRight, 
  Menu, 
  X, 
  Compass, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Feather, 
  Users, 
  Award, 
  BookOpen, 
  Layers,
  MessageCircle,
  Instagram,
  FileText,
  ExternalLink
} from 'lucide';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initEmblemAnimation } from './emblem.js';
import { initPillarsInteractive } from './pillars.js';
import { initMethodologySequence } from './methodology.js';
import { initEventsModule } from './events.js';
import { initJoinForm } from './join-form.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  createIcons({
    icons: {
      ArrowRight,
      ArrowUpRight,
      Check,
      ChevronRight,
      Menu,
      X,
      Compass,
      ShieldCheck,
      HeartHandshake,
      Sparkles,
      Feather,
      Users,
      Award,
      BookOpen,
      Layers,
      MessageCircle,
      Instagram,
      FileText,
      ExternalLink
    }
  });

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileClose = document.getElementById('mobile-close-btn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === 'index.html') || (currentPath.endsWith(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

  // Initialize Page Modules
  initEmblemAnimation();
  initPillarsInteractive();
  initMethodologySequence();
  initEventsModule();
  initJoinForm();

  // GSAP Cinematic Reveal Animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    gsap.utils.toArray('.reveal-up').forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    });

    // Hero entrance animation
    const heroElements = document.querySelectorAll('.hero-anim-item');
    if (heroElements.length) {
      gsap.from(heroElements, {
        y: 35,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.1
      });
    }
  }
});
