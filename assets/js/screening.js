// CPPA/CCPA screening flow
(function () {
  const form = document.getElementById('screening-form');
  if (!form) return;

  const TOTAL_STEPS = 5;
  const progress = document.getElementById('progress');
  const resultArea = document.getElementById('result-area');
  const auditorBlock = document.getElementById('auditor-question');
  const continueBtn = document.getElementById('continue-btn');
  const answers = { q1: null, q2: null, q3: null, q4: null, q5: null };

  // Visually mark selected choice and enable Next
  form.addEventListener('change', (e) => {
    const input = e.target;
    if (input.type !== 'radio') return;
    answers[input.name] = input.value;

    // Highlight selected within group
    const group = input.closest('.choice-group');
    if (group) {
      group.querySelectorAll('.choice').forEach((c) => c.classList.remove('selected'));
      input.closest('.choice').classList.add('selected');
    }

    // Enable the Next/See result button for the current step
    const step = input.closest('.step');
    if (step) {
      const nextBtn = step.querySelector('[data-next]');
      if (nextBtn) nextBtn.disabled = false;
    }
  });

  // Step navigation
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-next], [data-prev]');
    if (!btn) return;

    const isNext = btn.hasAttribute('data-next');
    let target = parseInt(isNext ? btn.dataset.next : btn.dataset.prev, 10);

    // Skip step 4 if step 3 was "no" (under $28M) — they fall through on revenue path only
    if (isNext && target === 4 && answers.q3 === 'no') {
      target = 5;
    }
    if (!isNext && target === 4 && answers.q3 === 'no') {
      target = 3;
    }

    goTo(target);
  });

  function goTo(stepNum) {
    document.querySelectorAll('.step').forEach((s) => s.classList.remove('active'));
    const step = document.querySelector(`.step[data-step="${stepNum}"]`);
    if (!step) return;
    step.classList.add('active');
    if (progress) progress.style.width = `${(stepNum / TOTAL_STEPS) * 100}%`;

    if (stepNum === 5) renderResult();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function qualifies() {
    // Path A: revenue from selling/sharing personal info >= 50%
    const pathA = answers.q2 === 'yes';
    // Path B: revenue > $28M AND (consumers >= 250k OR sensitive >= 50k)
    const pathB = answers.q3 === 'yes' && (answers.q4 === 'consumers' || answers.q4 === 'sensitive' || answers.q4 === 'both');
    return { pathA, pathB, qualified: pathA || pathB };
  }

  function renderResult() {
    // Out-of-scope: not in California at all
    if (answers.q1 === 'no') {
      resultArea.innerHTML = `
        <div class="result-banner not-qualified">
          <h3>CCPA likely doesn't apply to your business.</h3>
          <p>Based on what you told us, you don't operate in California or handle California residents' data, so the CCPA's cybersecurity audit obligation likely isn't triggered. That doesn't mean you don't have security needs — most businesses do. If a penetration test or attack surface review would be useful, we'd be glad to help.</p>
        </div>
        <p>Want to talk through it anyway? Leave your info and we'll reach out.</p>`;
      auditorBlock.style.display = 'none';
      continueBtn.href = buildContactURL({ qualifies: false });
      return;
    }

    const r = qualifies();
    if (r.qualified) {
      const reasonText = r.pathA
        ? 'Half or more of your revenue comes from selling or sharing consumers’ personal information.'
        : 'Your business is over the $28M revenue threshold and processes consumer data at the scale the regulations care about.';
      resultArea.innerHTML = `
        <div class="result-banner qualified">
          <h3>You likely need a CPPA/CCPA cybersecurity audit.</h3>
          <p>${reasonText} Under the draft regulations, that puts your business in scope for the annual audit obligation.</p>
          <p style="margin-bottom: 0;"><strong>What's next:</strong> Our compliance software helps you stand up the controls and documentation an auditor will look for, framed on NIST CSF 2.0. Below, let us know whether you also need an independent qualified auditor — we can introduce you to one if so.</p>
        </div>`;
      auditorBlock.style.display = 'block';
      continueBtn.href = buildContactURL({ qualifies: true });
    } else {
      resultArea.innerHTML = `
        <div class="result-banner not-qualified">
          <h3>You likely fall below the CCPA audit threshold today.</h3>
          <p>Based on your answers, your business probably isn't required to complete the CCPA annual cybersecurity audit yet. That can change quickly as you grow — and good cybersecurity hygiene is worth getting right early.</p>
          <p style="margin-bottom: 0;">If you'd like a lightweight starting point, our <a href="easm.html">External Attack Surface Management</a> service shows you what an attacker can already see about your business, without touching your systems.</p>
        </div>
        <p>Want us to take a closer look? Leave your info and we'll reach out.</p>`;
      auditorBlock.style.display = 'none';
      continueBtn.href = buildContactURL({ qualifies: false });
    }
  }

  function buildContactURL(extra) {
    const params = new URLSearchParams();
    params.set('source', 'screening');
    params.set('service', 'cppa');
    if (extra.qualifies) params.set('qualifies', 'yes'); else params.set('qualifies', 'no');
    Object.keys(answers).forEach((k) => { if (answers[k]) params.set(k, answers[k]); });
    return `contact.html?${params.toString()}`;
  }

  // Update auditor selection into URL whenever it changes
  form.addEventListener('change', (e) => {
    if (e.target.name === 'q5') {
      const r = qualifies();
      continueBtn.href = buildContactURL({ qualifies: r.qualified });
    }
  });
})();
