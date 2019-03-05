# Add seed data to `NOTEdb` database
mongoimport --db NOTEdb --collection users --file ./db/seed/users.json --jsonArray
mongoimport --db NOTEdb --collection notes --file ./db/seed/notes.json --jsonArray
