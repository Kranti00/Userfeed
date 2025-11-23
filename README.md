# Userfeed


A fully responsive social feed web application built with **React**, featuring posts, user cards, likes, comments, and a detailed post page.  
This project demonstrates strong usage of modern React hooks, routing, local storage persistence, API integration, and UI interactions.

---

## 🚀 Live Demo
https://userfeeds.netlify.app/

---

## 📌 Features

### 📝 Posts
- Fetches posts from the JSONPlaceholder API  
- Displays image thumbnail, title, body, likes & views  
- Shows a comments section with add/delete functionality  
- Auto-scroll to newest comment (using **useRef**)  
- Sorted comments (using **useMemo**)  
- Persistent likes & comments with **localStorage**

### 👤 Users
- Displays user cards with profile images  
- Shows email, company, city & PRO/TEAM badge  
- Follow/Unfollow button with state persistence  
- View Posts button that opens the post details page

### 📄 Post Details Page
- Fetches a single post using `GET /posts/:id`
- Displays full post content  
- Fetches post comments using `GET /posts/:id/comments`  
- Clean, responsive UI

### ⚛️ React Hooks Used
This project demonstrates all major hooks:

| Hook | Usage |
|------|--------|
| **useState** | Likes, comments, state handling |
| **useEffect** | Fetching data, loading saved likes/comments |
| **useRef** | Auto scroll to last comment |
| **useMemo** | Memoized sorted comments |
| **useNavigate/useParams** | Navigation & dynamic routing |

### 🧭 Routing
Using **React Router v6**:
- `/` → Home (Users + Posts)
- `/posts/:id` → Post details page

### 💾 Local Storage Sync
- Keeps likes saved even after refresh  
- Keeps user comments saved  
- Remembers follow state of users

### 📱 Fully Responsive UI
- Uses modern card-based layout  
- Bootstrap-based components  
- Consistent height cards for perfect grid layout  

---

## 🛠️ Tech Stack

- **React (CRA)**  
- **React Router v6**  
- **Bootstrap 5**  
- **JSONPlaceholder API**  
- **Netlify Deployment**  
- **ESLint + Prettier**  

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Kranti00/Userfeed.git
cd my-app
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm start

🗂️ Project Structure
src/
│
├── components/
│   ├── PostCard.js
│   └── UserCard.js
│
├── pages/
│   └── PostDetails.js
│
├── App.js
└── index.js


