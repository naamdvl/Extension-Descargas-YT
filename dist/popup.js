const API_BASE = "http://127.0.0.1:5000";

const urlInput = document.getElementById("urlInput");
const checkBtn = document.getElementById("checkBtn");
const downloadBtn = document.getElementById("downloadBtn");
const preview = document.getElementById("preview");
const formatSelect = document.getElementById("formatSelect");
const message = document.getElementById("message");

let currentUrl = "";

checkBtn.addEventListener("click", async () => {
  currentUrl = urlInput.value.trim();
  if (!currentUrl) return alert("Ingresa una URL válida")

    message.textContent = "Obteniendo Informacion..."
    formatSelect.innerHTML = "";

    try {
      const res = await fetch(`${API_BASE}/api/formats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl})
      });
      const data = await res.json();

      if(!data.ok) throw new Error(data.error);

      preview.innerHTML = `
        <img src="${data.thumbnail}" alt="Thumbnail">
        <p><strong>${data.title}<strong></p>
      `;

      data.formats.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f.format_id;
        const sizeMB = f.filesize ? (f.filesize / (1024*1024)).toFixed(1) + "MB" : "Tamaño desconocido";
        opt.textContent = `${f.height || "Audio"}p ${f.ext} — ${sizeMB}`;
        formatSelect.appendChild(opt);
      });
      message.textContent = "Selecciona una calidad y presiona Descargar"
    } catch (err) {
      message.textContent = "Error: " + err.message;
    }
});

downloadBtn.addEventListener("click", async () => {
  const formatId = formatSelect.value;
  if (!formatId || !currentUrl) return alert("Selecciona un Formato Primero.");

  message.textContent = "Descargando..."

  try {
    const res = await fetch(`${API_BASE}/api/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ url: currentUrl, format_id: formatId })
    });
    const data = await res.json();

    if (!data.ok) throw new Error(data.error);

    message.innerHTML = `"Descarga lista: <a href="${API_BASE}${data.download_url}" target="_blank">Haz Click Aqui</a>`;
  } catch (err) {
    message.textContent = "Error en la descarga: " + err.message;
  }
});