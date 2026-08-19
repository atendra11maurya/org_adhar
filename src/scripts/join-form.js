/**
 * Join Application Form Controller
 * Validates prospective member submissions with real-time feedback.
 */

export function initJoinForm() {
  const form = document.getElementById('aadharshila-join-form');
  const successBanner = document.getElementById('join-success-banner');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = form.querySelector('#full-name')?.value.trim();
    const email = form.querySelector('#email-address')?.value.trim();
    const phone = form.querySelector('#phone-number')?.value.trim();
    const rollNo = form.querySelector('#roll-number')?.value.trim();
    const courseYear = form.querySelector('#course-year')?.value;
    const wingPref = form.querySelector('#wing-preference')?.value;
    const statement = form.querySelector('#statement-of-purpose')?.value.trim();

    if (!fullName || !email || !phone || !courseYear || !statement) {
      alert('Please complete all required fields before submitting your application.');
      return;
    }

    // Basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please provide a valid institutional or personal email address.');
      return;
    }

    // Hide form and display celebratory confirmation
    form.style.display = 'none';
    if (successBanner) {
      successBanner.classList.add('is-active');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
