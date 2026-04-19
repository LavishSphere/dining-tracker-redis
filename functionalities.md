# In-Memory Key-Value Storage Functionalities

The following functionalities were selected to be stored in Redis as in-memory key-value data.

## Selected Functionalities

**Currently Logged-In Users**
The system stores active user sessions so that login state can be checked quickly without querying the database on every request.

**Daily Menu Snapshot Cache**
The system caches the menu data for each dining location and meal period so that the same data does not need to be fetched or recomputed repeatedly throughout the day.

**Most Viewed Menu Items**
The system tracks how many times each menu item has been viewed so that popular items can be displayed without running aggregation queries on the database.

**User Daily Calorie Total**
The system keeps a running total of calories consumed by each user for the current day so that users can see their daily intake update in real time.

**User Filter Preset Cache**
The system caches each user's saved filter preferences so that menu browsing does not require a database lookup on every page load.

---
*Claude Code was used to assist in this decision-making process.*
