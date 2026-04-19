# Redis Commands

## Currently Logged-In Users

I will keep a hash for each active user session. Therefore I need:

Initialize:
FLUSHALL

Create a session when user u001 logs in:
HSET session:abc123 user_id u001 email "user@northeastern.edu" display_name "Alex"
EXPIRE session:abc123 1800

Get session data for token abc123:
HGETALL session:abc123

Check if a specific field exists (e.g. user_id):
HEXISTS session:abc123 user_id

Update the display name for session abc123:
HSET session:abc123 display_name "Alex B."

Reset the TTL on activity (sliding expiry):
EXPIRE session:abc123 1800

Delete session when user logs out:
DEL session:abc123

---

## Daily Menu Snapshot Cache

I will keep a string storing JSON menu data per location, meal period, and date. Therefore I need:

Initialize:
FLUSHALL

Create a cache entry for location loc1, meal period mp1, on 2026-04-19:
SET menu_snapshot:loc1:mp1:2026-04-19 "{...json...}" EX 86400

Get the cached menu snapshot:
GET menu_snapshot:loc1:mp1:2026-04-19

Check if the cache entry exists:
EXISTS menu_snapshot:loc1:mp1:2026-04-19

Update the cache when a new snapshot is fetched:
SET menu_snapshot:loc1:mp1:2026-04-19 "{...updated json...}" EX 86400

Delete the cache entry manually (e.g. after a forced refresh):
DEL menu_snapshot:loc1:mp1:2026-04-19

---

## Most Viewed Menu Items

I will keep a sorted set tracking view counts for all menu items. Therefore I need:

Initialize:
FLUSHALL

Add a menu item m001 with an initial view count of 1:
ZADD mostViewed:menuItems 1 m001

When menu item m001 is viewed one more time:
ZINCRBY mostViewed:menuItems 1 m001

Get the top 10 most viewed items (highest score first):
ZREVRANGE mostViewed:menuItems 0 9 WITHSCORES

Get the view count for a specific item m001:
ZSCORE mostViewed:menuItems m001

Get the rank of item m001 (0 = most viewed):
ZREVRANK mostViewed:menuItems m001

Remove a menu item from the set (e.g. item removed from system):
ZREM mostViewed:menuItems m001

Reset all view counts at midnight:
DEL mostViewed:menuItems

---

## User Daily Calorie Total

I will keep a string storing the running calorie integer per user per day. Therefore I need:

Initialize:
FLUSHALL

Create a calorie total for user u001 on 2026-04-19:
SET calories:u001:2026-04-19 0 EX 172800

When user u001 logs a consumption entry of 450 calories:
INCRBY calories:u001:2026-04-19 450

Get the current calorie total for user u001 today:
GET calories:u001:2026-04-19

Subtract calories when user u001 deletes a consumption entry of 450:
DECRBY calories:u001:2026-04-19 450

Manually reset the total for user u001 today:
SET calories:u001:2026-04-19 0 EX 172800

Delete the entry:
DEL calories:u001:2026-04-19

---

## User Filter Preset Cache

I will keep a hash storing the active filter preset per user. Therefore I need:

Initialize:
FLUSHALL

Cache the filter preset for user u001:
HSET filterPreset:u001 min_calories 200 max_calories 800 min_serving_size 1.0
EXPIRE filterPreset:u001 900

Get the full filter preset for user u001:
HGETALL filterPreset:u001

Get a single filter field for user u001:
HGET filterPreset:u001 max_calories

Update a single field when the user changes their max calories:
HSET filterPreset:u001 max_calories 600
EXPIRE filterPreset:u001 900

Delete the cache when the user saves a new preset (invalidate):
DEL filterPreset:u001

---

*Claude Code was used to assist in this decision-making process.*
