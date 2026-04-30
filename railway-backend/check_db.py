import sqlite3

conn = sqlite3.connect('railway.db')
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
print('TABLES:', tables)

for t in tables:
    print(f'\n--- {t[0]} ---')
    cursor.execute(f'SELECT * FROM {t[0]}')
    rows = cursor.fetchall()
    for row in rows:
        print(row)

conn.close()