https://project-insight-v0.vercel.app/
# 🧠 Sentiment Analyzer

An interactive web app built with **React** and **Material UI**, that analyzes the sentiment of a given text using **Azure Cognitive Services (Text Analytics)**.  
This project demonstrates how to integrate AI-powered sentiment analysis into a modern frontend application — ideal for showcasing frontend and API integration skills in a professional portfolio.

---

## 🚀 Key Features

- 🔍 **Real-time sentiment detection** via Azure Text Analytics API  
- ⚡ **Debounced input** to optimize performance and reduce API calls  
- 🎨 **Dark-mode UI** built with Material UI components  
- 🧩 **Modular structure** with reusable custom hooks  
- 📊 Displays **sentiment labels** and **confidence scores** with color-coded feedback  

---

## 🧠 Technologies Used

| Category | Stack |
|-----------|--------|
| Frontend | React 18, Vite |
| UI | Material UI (MUI v5) |
| State Management | React Query / TanStack Query |
| AI Integration | Azure Cognitive Services (Text Analytics) |
| Custom Hooks | `useSentimentAnalysis`, `useDebounce` |

---

## 🧩 Project Structure

```
src/
├── components/
│   └── SentimentAnalyzer/
│       └── SentimentAnalyzer.jsx
├── hooks/
│   ├── useSentimentAnalysis.js
│   └── useDebounce.js
├── utils/
│   └── getSentimentColor.js
└── App.jsx
```

---

## ⚙️ Installation & Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/sentiment-analyzer.git
   cd sentiment-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your Azure credentials**  
   Create a `.env` file in the root folder and include:
   ```bash
   VITE_AZURE_API_KEY=your_azure_key_here
   VITE_AZURE_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com/
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```
   The app will be live at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Example Output

| Input | Sentiment | Score |
|--------|------------|--------|
| “I love this project!” | 🟢 Positive | 0.92 |
| “This is terrible.” | 🔴 Negative | 0.88 |
| “It’s okay, not great.” | 🟡 Neutral | 0.65 |

---

## 🌟 Why This Project

This app is ideal to include in a **frontend developer portfolio** because it:
- Demonstrates **integration with real-world APIs**
- Uses **modern React hooks and query management**
- Shows strong **UI/UX sensibility**
- Highlights understanding of **asynchronous behavior** and **performance optimization** (debouncing)

---

## 🤝 Contributing

Contributions, ideas, and improvements are always welcome.  
Please open an issue or submit a pull request if you’d like to collaborate.

---

## 📄 License

Licensed under the **MIT License**.  
© 2025 — Developed with ❤️ by Gabriel Benavidez
