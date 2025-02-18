# 🎉 Telegram Birthday Bot

Бот для Telegram, созданный на **Grammy**, который позволяет отслеживать количество дней до дня рождения пользователей. Аналог [@birthdaycountbot](https://t.me/birthdaycountbot).

---

## 📌 Возможности
✅ Отслеживание дней до дня рождения пользователей  
✅ Поддержка базы данных **MongoDB**  
✅ Удобное управление через кнопки  

---

## 📥 Установка

### 1️⃣ Установка пакетов
Установите все необходимые пакеты:
```sh
npm install
```

---

### 2️⃣ Настройка конфигурации
Создайте файл `config.json` и добавьте в него необходимые параметры:
```json
{
  "token": "YOUR_TELEGRAM_BOT_TOKEN",
  "mongoURL": "YOUR_MONGODB_URI",
  "developers": [
    "YOUR_TELEGRAM_USER_ID"
  ]
}
```
🔹 **`token`** – Токен вашего Telegram-бота, полученный у [@BotFather](https://t.me/BotFather)  
🔹 **`mongoURL`** – Ссылка на вашу базу данных MongoDB  
🔹 **`developers`** – Массив ID разработчиков бота  

---

### 3️⃣ Запуск бота
Для запуска выполните команду:
```sh
node index.js
```

---

## 🚀 Команды
🔹 `/start` – Запуск бота  
🔹 `/ping` – Проверка работы бота  

---

## 📚 Полезные ссылки
- 📑 **Документация Grammy** – [Перейти](https://grammy.dev/)
- 📥 **BotFather (создание бота)** – [Перейти](https://t.me/BotFather)
- 🗄️ **MongoDB Atlas** – [Перейти](https://www.mongodb.com/atlas/database)

---

## 👨‍💻 Контакты
📩 **Telegram:** [@s0bakennn](https://t.me/s0bakennn)
🌀 **Discord:** [va1les](https://discord.com/users/550336142160035840)

---

P.S. Это мой первый бот в Telegram, так что могут быть недоработки!