document.getElementById("downloadBtn").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value.trim();  
  const message = document.getElementById("message");
  const preview = document.getElementById("preview");

  if (!url) {
    message.textContent = "⚠️ Ingresa una URL.";
    message.style.color = "red";
    return;
  }

  const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!match) {
    message.textContent = "⚠️ No parece un link válido de YouTube.";
    message.style.color = "red";
    return;
  }

  const videoId = match[1]; // 
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      preview.innerHTML = `
        <img src="${thumbnailUrl}" alt="Miniatura del video" width="100%" />
        <p><strong>${data.title}</strong></p>
      `;
      message.textContent = "✅ Video detectado correctamente.";
      message.style.color = "green";
    })
    .catch(() => {
      preview.innerHTML = `<img src="${thumbnailUrl}" alt="Miniatura del video" width="100%" />`;
      message.textContent = "⚠️ Miniatura mostrada, pero no se pudo obtener el título.";
      message.style.color = "orange";
    });
});
