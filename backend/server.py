
from flask import Flask, request, jsonify, render_template
# from io import BytesIO
import google.generativeai as genai
from flask_cors import CORS

# Translator-specific imports
from gtts import gTTS
import tempfile
import os

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyDydWxM_3IoML4ZPSe-YAlBQOZvXGCz8PI")  
model = genai.GenerativeModel("gemini-1.5-flash")

chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": [
            "You are a chatbot for a website focused on Indian heritage and culture. "
            "Only answer questions related to India’s traditions, history, architecture, festivals, art, and this website. "
            "If the user asks anything outside this scope, say: 'I’m here to help with Indian heritage and this website. I can’t answer that.'"
        ]
    }
])
has_greeted = False

@app.route("/api/chat", methods=["POST"])
def chatbot():
    global has_greeted
    user_input = request.json.get("message")

    if not has_greeted:
        has_greeted = True
        return jsonify({
            "reply": "Hey! Do you have any questions about India’s heritage, culture, or our website?"
        })

    try:
        response = chat.send_message(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Sorry, something went wrong."})


@app.route("/generate-itinerary", methods=["POST"])
def generate_itinerary():
    data = request.json
    location = data.get("location")
    days = data.get("days")
    month = data.get("month")

    prompt = f"""
    Generate a {days}-day travel itinerary for {location} in {month}.
    Include specific timings for morning, afternoon, and evening activities, with food suggestions.
    Cover both popular and offbeat spots. Avoid pricing information.
    Format it as bullet points and easy-to-read sections.
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"itinerary": response.text})
    except Exception as e:
        return jsonify({"itinerary": f"⚠️ Error generating itinerary: {str(e)}"})


@app.route("/api/events", methods=["GET"])
def get_events():
    events = [
        {
            "title": "Bharatanatyam Dance Festival",
            "date": "2025-04-20",
            "location": "Chennai, Tamil Nadu",
            "description": "A beautiful celebration of classical Indian dance featuring top performers."
        },
        {
            "title": "Handloom & Textile Expo",
            "date": "2025-04-25",
            "location": "Hyderabad, Telangana",
            "description": "An exhibition showcasing traditional Indian weaves, arts and crafts."
        },
        {
            "title": "Ganga Aarti Mahotsav",
            "date": "2025-04-18",
            "location": "Varanasi, Uttar Pradesh",
            "description": "Experience the spiritual magnificence of the Ganga Aarti."
        }
    ]
    return jsonify(events)

# =============================
# ✅ Translator Feature Starts
# =============================

language_code_map = {
    "Hindi": "hi", "Telugu": "te", "Tamil": "ta", "Kannada": "kn", "Malayalam": "ml",
    "Bengali": "bn", "Gujarati": "gu", "Punjabi": "pa", "Marathi": "mr", "Odia": "or",
    "Assamese": "as", "Urdu": "ur", "Nepali": "ne", "Sanskrit": "sa", "Konkani": "gom",
    "Dogri": "doi", "Bodo": "brx", "Maithili": "mai", "Sindhi": "sd", "Kashmiri": "ks",
    "Manipuri": "mni", "Santali": "sat", "English": "en"
}

@app.route("/translator")
def translator_page():
    return render_template("translator.html")

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "")
    language = data.get("language", "Hindi")
    lang_code = language_code_map.get(language, "hi")

    try:
        prompt = f"Translate this to {language}: {text}. Only give the translation. No explanation."
        response = model.generate_content(prompt)
        translated = response.text.strip()

        tts = gTTS(text=translated, lang=lang_code)
        temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3", dir="static/audio")
        tts.save(temp_audio.name)

        audio_path = f"/static/audio/{os.path.basename(temp_audio.name)}"
        return jsonify({"translated": translated, "audioPath": audio_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =============================
# ✅ Translator Feature Ends
# =============================

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store"
    return response

if __name__ == "__main__":
    if not os.path.exists("static/audio"):
        os.makedirs("static/audio")
    port = int(os.environ.get('PORT', 5000))  # default to 5000 if PORT isn't set
    app.run(host='0.0.0.0', port=port, debug=True)
