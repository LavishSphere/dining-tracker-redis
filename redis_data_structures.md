# Redis Data Structures

To implement the currently logged-in users I will use a Redis hash with key "session:{session_token}", the user fields (user_id, email, display_name) as the fields and their values as the field values, with a TTL of 30 minutes.

To implement the daily menu snapshot cache I will use a Redis string with key "menu_snapshot:{location_id}:{meal_period_id}:{date}", storing the menu data as a JSON string, with a TTL of 24 hours.

To implement the most viewed menu items I will use a Redis sorted set with key "mostViewed:menuItems", menu item ids as the members and a score of the number of times each item has been viewed.

To implement the user daily calorie total I will use a Redis string with key "calories:{user_id}:{date}", storing the running calorie total as an integer that is incremented each time a consumption entry is recorded, with a TTL of 48 hours.

To implement the user filter preset cache I will use a Redis hash with key "filterPreset:{user_id}", the filter fields (min_calories, max_calories, min_serving_size) as the fields and their values as the field values, with a TTL of 15 minutes.

---
*Claude Code was used to assist in this decision-making process.*
