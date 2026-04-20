const express = require('express');
const { createClient } = require('redis');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const client = createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis error:', err));

(async () => {
  await client.connect();
  console.log('Connected to Redis');
})();

const KEY = 'mostViewed:menuItems';

app.post('/items', async (req, res) => {
  const { id, score } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required' });

  const exists = await client.zScore(KEY, id);
  if (exists !== null) return res.status(409).json({ error: 'Item already exists' });

  await client.zAdd(KEY, { score: score ?? 0, value: id });
  res.json({ message: `Added ${id} with score ${score ?? 0}` });
});

app.get('/items', async (_req, res) => {
  const items = await client.zRangeWithScores(KEY, 0, -1, { REV: true });
  res.json(items.map(({ value, score }) => ({ id: value, views: score })));
});

app.get('/items/:id', async (req, res) => {
  const score = await client.zScore(KEY, req.params.id);
  if (score === null) return res.status(404).json({ error: 'Item not found' });
  res.json({ id: req.params.id, views: score });
});

app.patch('/items/:id', async (req, res) => {
  const { increment = 1 } = req.body;
  const exists = await client.zScore(KEY, req.params.id);
  if (exists === null) return res.status(404).json({ error: 'Item not found' });

  const newScore = await client.zIncrBy(KEY, increment, req.params.id);
  res.json({ id: req.params.id, views: newScore });
});

app.delete('/items/:id', async (req, res) => {
  const removed = await client.zRem(KEY, req.params.id);
  if (!removed) return res.status(404).json({ error: 'Item not found' });
  res.json({ message: `Deleted ${req.params.id}` });
});

app.delete('/items', async (_req, res) => {
  await client.del(KEY);
  res.json({ message: 'All items cleared' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// This application was built with the assistance of Claude Code (Anthropic).