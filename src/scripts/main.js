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

  // Mobile Navigation Drawer Controller
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileClose = document.getElementById('mobile-close-btn');

  function openMobileMenu() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.add('is-open');
    document.body.classList.add('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Close Navigation Menu');
    
    // Toggle icons if both are present in toggle
    const menuIcon = mobileToggle.querySelector('[data-lucide="menu"], .lucide-menu');
    const xIcon = mobileToggle.querySelector('[data-lucide="x"], .lucide-x');
    if (menuIcon && xIcon) {
      menuIcon.style.display = 'none';
      xIcon.style.display = 'block';
    }

    // Focus first link in drawer
    const firstLink = mobileDrawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open Navigation Menu');
    
    // Toggle icons back
    const menuIcon = mobileToggle.querySelector('[data-lucide="menu"], .lucide-menu');
    const xIcon = mobileToggle.querySelector('[data-lucide="x"], .lucide-x');
    if (menuIcon && xIcon) {
      menuIcon.style.display = 'block';
      xIcon.style.display = 'none';
    }
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any link inside drawer
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeMobileMenu();
        mobileToggle.focus();
      }
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus();
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
