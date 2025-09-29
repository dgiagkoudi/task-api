# To-Do List App

Μια εφαρμογή διαχείρισης λίστας εργασιών (To-Do List) με **Node.js / Express** backend και **HTML/CSS/JS** frontend.

## Features
- Προσθήκη νέας εργασίας
- Σήμανση εργασίας ως ολοκληρωμένη
- Διαγραφή εργασίας
- Φιλτράρισμα λίστας (Όλες / Ολοκληρωμένες / Μη ολοκληρωμένες)
- Validation
- Αποθήκευση δεδομένων σε βάση μέσω **Prisma ORM**
- Βελτιωμένο UI/UX

## Τεχνολογίες
- **Backend:** Node.js, Express, Prisma
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Database:** SQLite (default με Prisma, μπορεί εύκολα να αλλαχθεί σε PostgreSQL/MySQL)
- **Deployment:** Render

## Τοπική εκτέλεση
1. Κλωνοποίησε το repo:
  git clone https://github.com/dgiagkoudi/task-api.git
  cd task-api
2. Εγκατάσταση dependencies:
  npm install
3. Δημιουργία και εφαρμογή του schema της βάσης:
  npm run prisma:generate
  npm run prisma:migrate
4. Εκκίνηση server:
  npm start
5.  Άνοιξε τον browser στη διεύθυνση:
  http://localhost:3000

## Δομή φακέλων

task-api/

├─ public/          # Frontend (HTML, CSS, JS)

│    ├─ index.html

│    ├─ style.css

│    └─ main.js 

├─ src/             # Backend

│    ├─ controllers/

│    ├─ middlewares/

│    ├─ models/

│    ├─ routes/

│    └─ index.js

├─ prisma/          # Prisma schema & migrations

│    └─ schema.prisma

├─ package.json

├─ .gitignore

└─ README.md

