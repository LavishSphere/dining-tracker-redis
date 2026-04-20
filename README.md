# Dining Tracker — Redis In-Memory Key-Value Database

**By: Ashsmith Khayrul**

Students and community members often struggle to quickly access accurate nutrition information for dining hall menus. This project extends the Dining Tracker by introducing Redis as an in-memory key-value store to support fast access to frequently read or real-time data such as active user sessions, cached menu snapshots, view counts, and daily calorie totals.

---

## Video Walkthrough

[Watch on SharePoint](https://northeastern-my.sharepoint.com/:v:/g/personal/khayrul_a_northeastern_edu/IQBAhYKVeCX-QoFqV8CBBCwkAQxKSuUnNpKAVId7xBWW8W4?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=aM6RYw)

---

## Project Artifacts

- [#1 Requirements](./requirements.pdf) — Problem domain rules with identified nouns and actions.

- [#1 UML Conceptual Model](./uml.png) — Conceptual model of the dining tracker domain.

- [#1 Redis Functionalities](./functionalities.md) — Functionalities selected for in-memory key-value storage.

- [#2 Redis Data Structures](./redis_data_structures.md) — Redis data structures chosen to implement each functionality.

- [#3 Redis Commands](./redis_commands.md) — Full CRUD Redis commands for each use case.

- [#4 Node + Express Application](./app/) — A basic CRUD application for the most viewed menu items sorted set.

---

## Running the Application

**Prerequisites:** Node.js and Redis installed locally.

```bash
# Install dependencies
cd app && npm install

# Add test data
node data.js

# Start the server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.