# Psyntify Frontend

This project is a React + Vite frontend for **Psyntify**, a plant-sharing social platform.  
It includes JWT-based authentication, protected routes, and integration with a Spring Boot backend.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/psyntify.git cd psyntify/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the `frontend/` directory:

```bash
cp .env.example .env
```

Edit it if necessary:

```ini
VITE_BACKEND_URL=http://localhost:8080
```

> ℹ️ Even without a `.env` file, the app will fall back to `http://localhost:8080` by default.

## 💻 Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Production

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Authentication](https://jwt.io/)

## 📂 Environment Variables

|Key|Description|
|---|---|
|`VITE_BACKEND_URL`|Backend API root URL (e.g. [http://localhost:8080](http://localhost:8080))|

## 🤝 Contributing

Feel free to open issues or pull requests if you'd like to contribute!

---

## 📄 License

[MIT](LICENSE)
