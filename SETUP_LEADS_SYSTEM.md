# הנחיות הגדרה - מערכת ניהול לידים

## שלבים לביצוע:

### 1. הגדרת Supabase

1. עבור ל-[Supabase Console](https://app.supabase.com/)
2. צור project חדש או בחר project קיים
3. עבור ל- **Project Settings > API**
4. העתק את ה-values הבאים:
   - **SUPABASE_URL**: ה-URL של ה-project שלך
   - **SUPABASE_ANON_KEY**: ה-anon key

### 2. הוספת Supabase Credentials ל-.env.local

פתח את הקובץ `.env.local` בשורש הפרויקט והזן:

```
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=Asaf123123
```

### 3. יצירת Leads Table

1. עבור לConsole של Supabase
2. בחר את ה-project שלך
3. לחץ על **SQL Editor** בתפריט הצד
4. לחץ על **New Query**
5. העתק והדבק את ה-SQL מהקובץ `schema.sql`
6. לחץ **Run**

תבנית SQL:
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  ssn VARCHAR(20),
  ssn_date VARCHAR(20),
  page_url TEXT,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  submitted_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_submitted_at ON leads(submitted_at DESC);
```

### 4. התקנת Dependencies

```bash
npm install
```

### 5. בדיקה

1. הפעל את השרת:
   ```bash
   npm run dev
   ```

2. עבור לכתובת: `http://localhost:3000/admin`

3. הזן סיסמה: `Asaf123123`

4. אם כל דבר מוגדר נכון, תראה טבלה ריקה של לידים.

### 6. ייצוא לייצור

כשתערוך את הפרויקט ל-Vercel:
1. עבור לProject Settings ב-Vercel
2. הוסף את ה-Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`

---

## זרימת הנתונים:

1. משתמש מלא טופס בעמוד הבית
2. הטופס שולח נתונים ל-`/api/leadim`
3. ה-API route:
   - שולח ל-Lead.im API (כרגיל)
   - שומר בו-זמנית ל-Supabase בטבלה `leads`
4. שניהם ריצים בהקבלה - אם אחד נכשל, השני ממשיך
5. המשתמש מועבר ל-`/thank-you`
6. Admin יכול להכנס ל-`/admin` ולראות את כל הלידים, להוריד CSV

---

## Troubleshooting

- **אם טבלה ריקה**: בדוק ש-Supabase credentials נכונים ב-.env.local
- **אם סיסמה לא עובדת**: בדוק ש-ADMIN_PASSWORD בדיוק: `Asaf123123`
- **אם נתונים לא משמרים**: בדוק את ה-console בדפדפן (F12) וראה שגיאות

