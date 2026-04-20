const { createClient } = require('redis');

const client = createClient({ url: 'redis://localhost:6379' });
const KEY = 'mostViewed:menuItems';

const items = [
  { id: 'm001', views: 42 },
  { id: 'm002', views: 17 },
  { id: 'm003', views: 88 },
  { id: 'm004', views: 5  },
  { id: 'm005', views: 31 },
];

(async () => {
  await client.connect();
  await client.del(KEY);
  for (const item of items) {
    await client.zAdd(KEY, { score: item.views, value: item.id });
    console.log(`Added ${item.id} with ${item.views} views`);
  }
  console.log('Data added');
  await client.disconnect();
})();
