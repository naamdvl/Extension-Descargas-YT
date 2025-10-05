from flask import Flask, request, jsonify, send_from_directory
import yt_dlp, os, uuid

app = Flask(__name__)

DOWNLOAD_DIR = "downloads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

@app.route("/api/formats", methods=["POST"])
def list_formats():
    data = request.get.json()
    url = data.get("url")
    if not url:
        return jsonify({"ok": False, "error": "No URL"}), 400
    
    try:
        ydl_opts = {"quiet": True, "skip_download": True}
        with ydl_opts.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        
        formats = []
        for f in info.get("formats", []):
            if f.get("vcodec") != "none":
                formats.append({
                    "format_id": f.get("format_id"),
                    "ext": f.get("ext"),
                    "height": f.get("height"),
                    "filesize": f.get("filesize") or f.get("filesize_approx"),
                    "vcodec": f.get("vcodec"),
                    "acodec": f.get("acodec"),
                    "format_note": f.get("format_note")
                })

        formats = sorted(formats, key=lambda x: (x["height"] or 0), reverse=True)
        return jsonify({
            "ok": True,
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "formats": formats
        })
    
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

app.route("/api/download", methods = ["POST"]) 
def download_video():
    data = request.get_json()
    url = data.get("url")
    format_id = data.get("format_id")

    if not url or not format_id:
        return jsonify({"ok": False, "error": "Faltan parámetros"}), 400
    
    job_id = str(uuid.uuid4())
    out_template = os.path.join(DOWNLOAD_DIR, f"{job_id}.%(ext)s")
    ydl_opts = {
        "format": format_id,
        "outtmpl": out_template,
        "quiet": True,
        "merge_output_format": "mp4"
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
        filename = f"{job_id}.{info.get('ext', 'mp4')}"
        return jsonify({
            "ok": True,
            "download_url": f"/downloads/{filename}",
            "title": info.get("title")
        })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500
    
@app.route("/downloads/<path:filename>")
def serve_file(filename):
    return send_from_directory(DOWNLOAD_DIR, filename, as_attachment = True)

if __name__ == "__main__":
    app.run(debug=True)