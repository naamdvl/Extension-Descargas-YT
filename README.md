<p aling="center">
<img src="/dist/icon.png" alt="Vista Previa De El Icono De La Extension">
</p>

# Extension Descargador de Videos de YouTube 🎬

Esta es una extensión de navegador con backend en Flask que permite descargar videos de YouTube en diferentes calidades directamente desde una interfaz sencilla.

## Características

- Selecciona la calidad del video antes de descargar.
- Descarga videos en formato MP4.
- Interfaz simple y fácil de usar.
- Backend en Python (Flask) usando [yt-dlp](https://github.com/yt-dlp/yt-dlp).

## Requisitos

- Python 3.7+
- Node.js (opcional, si quieres modificar el frontend)
- Navegador Chrome o compatible

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/Extension-Descargas-YT.git
   cd Extension-Descargas-YT/dist/backend
   ```

2. **Instala las dependencias de Python:**
   ```sh
   pip install flask flask-cors yt-dlp
   ```

3. **Ejecuta el backend:**
   ```sh
   python dist/backend/app.py
   ```
   El backend estará disponible en `http://127.0.0.1:5000`.

4. **Carga la extensión en tu navegador:**
   - Ve a `chrome://extensions/`
   - Activa "Modo desarrollador"
   - Haz clic en "Cargar descomprimida" y selecciona la carpeta `dist`

## Uso

1. Ingresa la URL de un video de YouTube.
2. Haz clic en "Elegir Calidad".
3. Selecciona el formato deseado.
4. Haz clic en "Descargar" para obtener el video.

## Créditos

- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [Flask](https://flask.palletsprojects.com/)
- Inspirado por la necesidad de aprender y automatizar descargas para uso personal y educativo.

## Licencia

MIT

---

> Proyecto creado para fines educativos y personales. No fomenta la descarga de contenido protegido por derechos de autor.
