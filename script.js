
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const file = btn.getAttribute('data-modal');
    modalImg.src = `assets/${file}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Copy WhatsApp message helper
const copyBtn = document.getElementById('copyMsg');
copyBtn?.addEventListener('click', async () => {
  const inputs = document.querySelectorAll('.form input, .form textarea');
  const name = inputs[0].value || '—';
  const phone = inputs[1].value || '—';
  const msg = inputs[2].value || 'Olá! Gostaria de solicitar uma proposta.';

  const composed = `Olá, meu nome é ${name}. Meu WhatsApp é ${phone}.\n\n${msg}\n\n(Enviado pelo mini site do Atelier Arquitetônico)`;
  try {
    await navigator.clipboard.writeText(composed);
  } catch (e) {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = composed;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  const url = 'https://wa.me/5581992831533?text=' + encodeURIComponent(composed);
  window.open(url, '_blank', 'noopener');
});
