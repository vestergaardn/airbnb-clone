# Airbnb Clone Demo Setup
## One-time setup to demo Lingua Code

---

## What This Is

A fork of https://github.com/rahul4019/airbnb-clone — a full MERN stack Airbnb clone — configured to run inside a Lingua Code E2B sandbox. No code changes to the app itself. Just accounts, credentials, and a script tag.

---

## Step 1: Fork the Repo

Fork https://github.com/rahul4019/airbnb-clone into your own GitHub account. This is the repo you will connect to Lingua Code. The sandbox will clone it on every user session.

---

## Step 2: Create MongoDB Atlas Account

1. Go to https://cloud.mongodb.com and create a free account
2. Create a new Project called `airbnb-demo`
3. Create a free **M0** cluster (any region)
4. Under **Database Access**: create a user with username `airbnb` and a strong password. Grant **Read and Write to any database**
5. Under **Network Access**: add IP `0.0.0.0/0` — this allows E2B sandbox IPs to connect (they are dynamic and cannot be whitelisted individually)
6. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://airbnb:<password>@cluster0.xxxxx.mongodb.net/airbnb
   ```
   Replace `<password>` with your actual password. Keep this string — you will need it in Step 5.

---

## Step 3: Create Cloudinary Account

1. Go to https://cloudinary.com and create a free account
2. From the dashboard home page, copy three values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Keep these — you will need them in Step 5.

---

## Step 4: Add the Lingua Code Script Tag

In your forked repo, open `client/index.html`. Add the following line before the closing `</body>` tag:

```html
<script src="https://linguacode.dev/widget.js" data-project-id="YOUR_PROJECT_ID"></script>
```

You will get `YOUR_PROJECT_ID` from the Lingua Code dashboard after connecting this repo in Step 6. You can commit a placeholder now and update it after.

---

## Step 5: Add Credentials to Lingua Code

In your Lingua Code dashboard, when you connect the forked repo as a project, you will be asked to provide demo credentials. Enter the following:

| Key | Value |
|---|---|
| `DEMO_MONGODB_URL` | The full Atlas connection string from Step 2 |
| `DEMO_JWT_SECRET` | Any long random string e.g. `airbnb_demo_jwt_2024_xkq92` |
| `DEMO_SESSION_SECRET` | Any different long random string |
| `DEMO_CLOUDINARY_NAME` | Cloud Name from Step 3 |
| `DEMO_CLOUDINARY_API_KEY` | API Key from Step 3 |
| `DEMO_CLOUDINARY_API_SECRET` | API Secret from Step 3 |

These are injected into the sandbox at runtime. They are never exposed to the user.

---

## Step 6: Connect Repo in Lingua Code Dashboard

1. Sign in to your Lingua Code dashboard
2. Create a new project
3. Set repo URL to your fork: `https://github.com/YOUR_USERNAME/airbnb-clone`
4. Set the following project config:

| Field | Value |
|---|---|
| Default branch | `main` |
| Install command | (leave blank — handled by sandbox startup) |
| Dev command | (leave blank — handled by sandbox startup) |
| Dev port | `5173` |

5. Copy the generated `script_tag_id` and update `client/index.html` from Step 4

---

## Step 7: Seed Demo Data (Optional but Recommended)

The app starts with an empty database. For a good demo, seed it with a few listings so the home page looks populated on first load.

After the app is running locally once with your Atlas credentials, you can use MongoDB Compass or Atlas Data Explorer to insert a few listing documents directly into the `listings` collection.

Alternatively, run the app locally first, register a user, and create listings through the UI — they will persist in Atlas for all future sandbox sessions.

---

## Expected Sandbox Cold Start Time

| Step | Time |
|---|---|
| git clone | ~5s |
| yarn install (api + client, parallel) | ~60–90s |
| API boot + MongoDB connect | ~3s |
| Vite boot | ~5s |
| **Total** | **~90–100s** |

Show users a loading message: *"Starting the app — usually about 90 seconds."*

---

## Demo Prompts to Test Before Going Live

Run through these in the sandbox before any live demo to confirm they work end-to-end.

**Full-stack (most impressive):**
- "Add a `discount` field to the listing schema and show a discount badge on the listing card"
- "Add an endpoint that returns the 3 most recently added listings and show them in a 'New arrivals' section on the home page"
- "Add a `superhost` boolean to the user model and display a Superhost badge on their listings"
- "Make the booking endpoint return the total price including a 10% service fee and show it in the booking summary"

**Frontend only (visually satisfying):**
- "Add a dark mode toggle to the navbar"
- "Show the number of reviews next to the star rating on listing cards"
- "Add a price range filter to the home page"
