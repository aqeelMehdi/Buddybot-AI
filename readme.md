# Buddybot

## Overview
Buddybot is a simple AI-powered chatbot interface that allows users to interact with an AI model using text and image inputs. The chatbot utilizes Google's Gemini API for generating AI responses based on user inputs. The UI is designed with HTML, CSS, and JavaScript for an interactive experience.

## Features
- 🗨 **Chat Interface**: Users can send text messages to the AI bot.
- 🖼 **Image Upload**: Users can upload images for processing.
- 🤖 **AI Integration**: Uses the Google Gemini API to generate responses.
- 🎨 **User-Friendly UI**: Responsive and visually appealing chat design.
- 🔄 **Smooth Scrolling**: Auto-scrolls to the latest message.

## Project Structure
Buddybot/
│── index.html    # Main HTML file containing the chat structure
│── style.css     # Styling for the chatbot UI
│── script.js     # JavaScript logic for chatbot interaction
│── ai.png        # AI bot profile image
│── user.png      # User profile image
│── img.svg       # Image upload button icon
│── submit.svg    # Submit button icon
│── loading.webp  # Loading animation image

## API Integration
### Endpoint
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY

### Request Format
{
  "contents": [{
    "role": "user",
    "parts": [
      { "text": "Hello, AI!" },
      { "inline_data": { "mime_type": "image/png", "data": "BASE64_IMAGE_DATA" } }
    ]
  }],
  "generationConfig": { "maxOutputTokens": 100 }
}

## **Usage**
### ✏ **Text Input**
1. Type your message in the **input box** at the bottom of the chat window.
2. Press **Enter** or click the **send button** (📩).
3. Your message will appear in the chat, and the AI will generate a response.

### 📷 **Image Upload**
1. Click on the **image upload button** (📷).
2. Select an image from your device.
3. Once uploaded, the image will be displayed in the chat.
4. If applicable, the AI will process the image along with any accompanying text.

🔹 **Tip:** You can upload images alone or with a text message for better AI context!


## **Clone the Repository**
To set up **Buddybot** on your local machine, follow these steps:

### **1️⃣ Clone the repository using Git**
Open your terminal or command prompt and run:
```sh
git clone https://github.com/your-repository/Buddybot.git
