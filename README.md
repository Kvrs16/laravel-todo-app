# ✅ Laravel AJAX To-Do App

An interactive and elegant To-Do List app built with **Laravel 9**, powered by **AJAX**, styled using **Tailwind CSS**, and enhanced with a beautiful **Dark Mode**.

> 🚀 Built with ❤️ by Vijaya Rani

---

## ✨ Features

- ✅ Add, edit, delete tasks without page reloads
- ✔️ Mark tasks as completed/incomplete
- ❤️ Favorite tasks and highlight them
- 🌙 Dark Mode toggle support
- ⚡ Fully AJAX-powered (Vanilla JS)
- 🔒 CSRF-secured endpoints

---

## 📸 Screenshots

> Add actual screenshots in the `public/screenshots/` directory and link them below:

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](public/screenshots/light-mode.png) | ![Dark](public/screenshots/dark-mode.png) |

---

## 🛠️ Tech Stack

- **Framework**: Laravel 9
- **Styling**: Tailwind CSS
- **Frontend Logic**: AJAX (Vanilla JavaScript)
- **Templating Engine**: Blade
- **Database**: MySQL or SQLite
- **Version Control**: Git + GitHub

---

## 📦 Installation

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Kvrs16/laravel-todo-app.git
cd laravel-todo-app
```

### 2. Install Dependencies

```bash
composer install
npm install
npm run dev
```

### 3. Create Environment File

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Set Up Your Database

Edit the `.env` file:

```env
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Then run:

```bash
php artisan migrate
```

### 5. Serve the App

```bash
php artisan serve
```

Now visit `http://127.0.0.1:8000` in your browser.

---

## 🗂️ Project Structure

- `routes/web.php`: Web routes
- `app/Http/Controllers/TaskController.php`: Controller handling all logic
- `app/Models/Task.php`: Task model
- `resources/views/`: Blade views (UI)
- `public/js/ajax.js`: Frontend AJAX handlers
- `database/migrations/`: Table definitions

---

## 🔐 Security

- All form and AJAX requests are protected using **Laravel’s CSRF token**
- User inputs are **validated** and **sanitized**

---

## 📁 Example `.env` Configuration

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🧠 Future Improvements

- Add user authentication (Laravel Breeze or Jetstream)
- Multi-user support
- Task due dates and reminders
- Drag-and-drop task sorting
- Tagging and filtering

---

## 👩‍💻 Author

**Vijaya Rani**  
📍 CSE Student | Web & Cloud Enthusiast  
🔗 GitHub: [@Kvrs16](https://github.com/Kvrs16)

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---

> 💫 If you found this helpful, don’t forget to star the repo!
