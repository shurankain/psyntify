# 🌱 Psyntify

**Psyntify** is an open-source social platform for plant lovers.  
Users can share photos of their plants, discover collections, and optionally tokenize their favorite shots on the Solana blockchain.

> _Photosynthesis meets social media._

---

## 📦 Project Structure

```Bash
psyntify/ 
├── frontend/ # React-based frontend (Vite or Next.js) 
├── backend/ # Java backend with Spring Boot & PostgreSQL 
├── solana/ # Solana smart contract written in Rust (Anchor)
```

---

## 🛠 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Java 21 + Spring Boot + PostgreSQL
- **Blockchain**: Solana + Rust (Anchor)
- [Planned] AI-powered plant recognition
- [Planned] NFT minting & marketplace features

---

## 🚧 Status

This project is in active early development.  
The following parts are working or partially implemented:

- [x] Frontend-backend authentication (JWT login/register)
- [x] User-specific plant creation and deletion
- [x] Responsive UI with Tailwind and themed login page
- [x] State-based logic for plant updates without reloading
- [x] Backend tested via Postman, frontend wired for authenticated fetch
- [ ] Planned: VPS deployment using Docker & GitHub Actions
- [ ] Planned: Solana smart contract + wallet integration

---

## 📋 Roadmap (updated)

### 🧩 Core Functionality

- [x] Setup monorepo with frontend, backend, and Solana program
- [x] Implement user login and registration (JWT)
- [x] Build REST API and basic plant model
- [x] Connect frontend to backend with auth token
- [x] Add user-specific plant creation and deletion
- [ ] Add plant editing and validation logic
- [ ] Display public plants and user profiles

### 🧪 Web3 & Blockchain

- [ ] Design Solana smart contract for tokenizing plant photos
- [ ] Add Phantom wallet connection to frontend
- [ ] Enable SOL payments and NFT minting

### 🐳 Deployment & CI/CD

- [ ] Dockerize backend and frontend
- [ ] Configure GitHub Actions with self-hosted runner (VPS)
- [ ] Auto-deploy containers on push to `master`

### 🛠️ Extras (optional)

- [ ] Add AI-based plant recognition (e.g., LeafSnap API or custom model)
- [ ] Add password recovery flow
- [ ] Enable media uploads (images)

---

## 🤝 Contributing

Contributions are welcome!  
If you're into plants, code, or Web3 — feel free to fork the repo, suggest ideas, or open a PR.

---

## 📄 License

[MIT](LICENSE)

---

## 🪴 About

Psyntify is being built by and for plant enthusiasts who also love technology.  
Think of it as an Instagram-meets-blockchain platform — with a green twist.
