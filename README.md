# 🌱 Green Habit Tracker

A simple web app to help people build small eco-friendly habits and actually stay consistent with them.

I built this project for the DEV Weekend Challenge (Earth Day Edition) because I realized something — a lot of people *want* to be more sustainable, but most of the time we don’t know where to start, or we stop after a few days.

So instead of something complex, I wanted to make something that feels:
- simple
- motivating
- a bit fun
- and actually usable daily

---

## ✨ What it does

Green Habit Tracker lets you:

- Choose a few eco habits (like bringing a reusable bottle or avoiding plastic)
- Track them daily
- Earn points and build streaks
- See your impact over time
- Get **AI-generated eco tips** based on what you actually did

The idea is:  
> small habits → consistent actions → real impact

---

## 📱 Main Features

### 📝 Habit Tracking
Pick a few habits and check them off daily.

### 🎯 Points & Streaks
- Earn points for every completed habit  
- Build a daily streak to stay consistent  

### 🎉 Reward Feedback
When you complete a habit:
- you get a **+points popup**
- small animations (card scale, icon bounce, etc.)
- makes it feel less like a task, more like a game

### 🌍 Environmental Impact
- Simple CO₂ reduction estimation  
- Weekly progress chart  
- Helps visualize “small actions actually matter”

### 🤖 AI Eco Tips (Gemini)
This is one of my favourite parts.

Instead of static tips, the app:
- looks at what habits you completed
- sends that to Gemini
- generates a short, encouraging eco tip

So it feels more personal, not generic.

---

## 🛠️ Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Recharts (for charts)
- Google Gemini API
- localStorage (for persistence)

---

## ⚙️ How it works (simple version)

- User selects habits during onboarding
- Daily:
  - mark habits as done
  - points + streak update
- App calculates simple impact values
- Completed habits are sent to Gemini → returns eco tip
- Everything is saved in localStorage

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run locally
npm run dev
```
