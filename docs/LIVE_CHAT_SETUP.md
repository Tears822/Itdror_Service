# Live Chat Setup Guide

This project uses **Pusher** for real-time chat between customers and admins. Pusher is a hosted service that provides WebSocket connections—you don’t run your own WebSocket server.

---

## 1. Get Pusher credentials (free tier)

1. Go to **[https://dashboard.pusher.com](https://dashboard.pusher.com)** and sign up (or log in).
2. Click **Create app** (or **Channels apps** → **Create app**).
3. Fill in:
   - **App name:** e.g. `IT Dor Chat`
   - **Cluster:** choose one close to you (e.g. `us2`, `eu`, `ap1`)
   - **Frontend:** React
   - **Backend:** Node.js
4. Click **Create app**.
5. Open the app and go to **App Keys**. You’ll see:
   - **app_id**
   - **key** (this is the “client key”)
   - **secret** (keep this private)
   - **cluster** (e.g. `us2`)

---

## 2. Add credentials to your app

In your project root, create or edit `.env` and add:

```env
# Live chat (Pusher)
NEXT_PUBLIC_PUSHER_KEY=your_key_here
NEXT_PUBLIC_PUSHER_CLUSTER=us2
PUSHER_APP_ID=your_app_id_here
PUSHER_SECRET=your_secret_here

# Admin chat – choose a strong password (only you should know this)
ADMIN_CHAT_PASSWORD=your-secure-password
```

- Replace `your_key_here`, `your_app_id_here`, and `your_secret_here` with the values from the Pusher dashboard.
- Replace `us2` with your app’s cluster if different.
- Set `ADMIN_CHAT_PASSWORD` to a strong password you’ll use to log in to the admin chat.

Restart the dev server after changing `.env`:

```bash
npm run dev
```

---

## 3. How the chat works

- **Customer:** Clicks the blue chat button (bottom-right on any page) → enters email → sends messages. Messages are sent and received in real time via Pusher.
- **Admin:** Logs in at `/admin/chat` with the password above → sees a list of customers who have opened chat → clicks a customer to open the conversation and reply in real time.

Without Pusher credentials, the app still runs, but chat won’t be real-time (messages won’t update live until you add a fallback like polling).

---

## 4. How to access the admin panel

1. **URL:** Open your site and go to:
   ```
   https://your-domain.com/admin/chat
   ```
   For local development:
   ```
   http://localhost:3000/admin/chat
   ```

2. **Login:** On the admin page, enter the **same password** you set in `ADMIN_CHAT_PASSWORD` in `.env`, then click **Access dashboard**.

3. **Sessions list:** After login you’ll see **Chat sessions**—one row per customer who has opened the chat widget and entered their email.

4. **Open a conversation:** Click a row (customer email) to open that conversation. You can type and send messages; the customer sees them in real time in the chat widget (and vice versa).

5. **Log out:** Use **Log out** on the sessions page. You’ll need to enter the password again next time you visit `/admin/chat`.

---

## 5. Quick checklist

| Step | What to do |
|------|------------|
| 1 | Sign up at [pusher.com](https://dashboard.pusher.com) and create a Channels app |
| 2 | Copy **key**, **cluster**, **app_id**, and **secret** from App Keys |
| 3 | Put them in `.env` as `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`, `PUSHER_APP_ID`, `PUSHER_SECRET` |
| 4 | Set `ADMIN_CHAT_PASSWORD` in `.env` to a strong password |
| 5 | Restart `npm run dev` |
| 6 | Open `/admin/chat` in the browser and log in with that password |

If you run into issues, check that all four Pusher variables and `ADMIN_CHAT_PASSWORD` are set in `.env` and that you’ve restarted the dev server.
