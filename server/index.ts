import express from 'express';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
  res.json({ message: 'Travel Genie API is running!' });
});

// Mount routes
// Import with explicit extension to satisfy ESM resolution in ts-node ESM mode
// Dynamically import routes so runtime resolution works across common ts-node setups
(async () => {
  try {
    const mod = await import('./routes/flights.routes');
    const flightsRouter = mod.default;
    app.use('/api/flights', flightsRouter);
  } catch (e) {
    console.warn('Could not load flights routes:', e);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});