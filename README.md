# Travel&Live · Backend

The REST API and real-time server for **Travel&Live**, an Airbnb-style booking platform. The React client lives in [Travel-Live-Frontend](https://github.com/moriyaeldar/Travel-Live-Frontend).

## Tech stack

- **Node.js** + **Express**
- **MongoDB** (native driver)
- **Socket.io**, sharing the Express session through `express-socket.io-session`
- **express-session** + **bcrypt** for cookie-based auth
- `AsyncLocalStorage` for per-request context in logs

## Structure

Each domain is split into routes → controller → service:

```
api/
├── auth/     # login, signup, logout
├── stay/     # listings CRUD
├── order/    # bookings CRUD
├── review/   # reviews (auth required to post/delete)
└── user/     # profile + saved stays (wishlist)
middlewares/  # requireAuth / requireAdmin, logging, ALS setup
services/     # db, socket, logger, async-local-storage
```

## API

| Resource | Endpoints |
|---|---|
| Auth | `POST /api/auth/login` · `POST /api/auth/signup` · `POST /api/auth/logout` |
| Stays | `GET /api/stay` · `GET /api/stay/:id` · `POST /api/stay` · `PUT /api/stay` · `DELETE /api/stay/:id` |
| Orders | `GET /api/order` · `GET /api/order/:id` · `POST /api/order` · `PUT /api/order` · `DELETE /api/order/:id` |
| Reviews | `GET /api/review` · `POST /api/review` · `DELETE /api/review/:id` |
| Users | `GET /api/user/:id` · `PUT /api/user/:id` · `POST /api/user` (save stay) |

### Real-time events

Hosts join a room keyed by their user id (`setHost`). New orders and chat messages are pushed to the host instantly (`add order` → `get notification`, `sendMsg` → `setNotification`).

## Getting started

```bash
npm install
cp .env.example .env   # set MONGO_URI and SESSION_SECRET
npx nodemon server.js  # http://localhost:3030
```

Seed data for stays, users, orders and reviews is in `data/`.

In production (`NODE_ENV=production`), the server also serves the built React client from `public/`.
