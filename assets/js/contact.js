// Contact form: pre-fill from screening context, basic validation,
// honeypot, and a static-friendly submission stub.
//
// Backend delivery is intentionally deferred (see website_handoff §8 / §11):
// final lead-routing address and serverless endpoint are PLACEHOLDER.
// To wire up real delivery, set window.APEXSHIELD_FORM_ENDPOINT to a POST
// URL (e.g. a Vercel/Netlify function or Formspree/Basin endpoint).
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const banner = document.getElementById('context-banner');
  const statusEl = document.getElementById('form-status');
  const params = new URLSearchParams(window.location.search);

  // Pre-fill from URL (screening flow / service deep links)
  const service = params.get('service');
  if (service) {
    const sel = document.getElementById('service');
    if (sel && [...sel.options].some(o => o.value === service)) sel.value = service;
  }
  document.getElementById('source').value = params.get('source') || 'direct';
  document.getElementById('qualifies').value = params.get('qualifies') || '';

  // Compact screening answers into a single hidden field
  const screeningKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];
  const screeningPairs = screeningKeys
    .map(k => params.get(k) ? `${k}=${params.get(k)}` : null)
    .filter(Boolean);
  if (screeningPairs.length) {
    document.getElementById('screening_answers').value = screeningPairs.join('; ');
  }

  // Context banner
  if (params.get('source') === 'screening') {
    const qualifies = params.get('qualifies');
    const auditor = params.get('q5');
    let msg = '<strong>We have your screening context.</strong> ';
    if (qualifies === 'yes') {
      msg += 'Your screening suggests you likely need a CPPA/CCPA audit.';
      if (auditor === 'need') msg += ' You also asked for help finding an independent qualified auditor — we\'ll address both when we reach out.';
      else if (auditor === 'have') msg += ' You noted you already have a qualified auditor in place; we\'ll focus on the software side.';
    } else if (qualifies === 'no') {
      msg += 'Your screening suggests CCPA may not require an audit yet. We can still talk through where you are.';
    }
    banner.innerHTML = msg;
    banner.style.display = 'block';
  } else if (service) {
    const labels = { cppa: 'CPPA/CCPA Audit', pentest: 'Penetration Testing', easm: 'External Attack Surface Management' };
    if (labels[service]) {
      banner.innerHTML = `<strong>${labels[service]}.</strong> We'll scope the conversation around this. Add any specifics in the message below.`;
      banner.style.display = 'block';
    }
  }

  // Submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    // Honeypot
    if (form.website.value.trim()) {
      // Silently treat as success to avoid tipping off bots
      success();
      return;
    }

    // Basic validation
    const required = ['name', 'company', 'email'];
    for (const id of required) {
      const el = form.elements[id];
      if (!el.value.trim()) {
        return error(`Please fill in your ${id}.`);
      }
    }
    const emailVal = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      return error('Please enter a valid email address.');
    }

    const data = Object.fromEntries(new FormData(form).entries());

    const endpoint = window.APEXSHIELD_FORM_ENDPOINT;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('bad response');
        return success();
      } catch (err) {
        return error("We couldn't send your message. Please try again, or email leads@apexshield.io directly.");
      }
    }

    // No endpoint configured: fall back to mailto so leads aren't lost
    // before backend delivery is wired up.
    const subject = encodeURIComponent(`ApexShield inquiry — ${data.company}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\n` +
      `Service: ${data.service || '-'}\nSource: ${data.source || 'direct'}\n` +
      `Screening qualifies: ${data.qualifies || '-'}\nScreening answers: ${data.screening_answers || '-'}\n\n` +
      `Message:\n${data.message || '-'}`
    );
    window.location.href = `mailto:leads@apexshield.io?subject=${subject}&body=${body}`;
    success();
  });

  function success() {
    statusEl.className = 'form-status success';
    statusEl.textContent = "Thanks — we'll reach out to you shortly. If your email client just opened, please send the prepared message so we have your details.";
    form.querySelector('button[type="submit"]').disabled = true;
  }
  function error(msg) {
    statusEl.className = 'form-status error';
    statusEl.textContent = msg;
  }
})();
