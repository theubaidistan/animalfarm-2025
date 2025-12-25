import express from "express";
import cors from "cors";
import path from "path";
// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from 'public'
app.use(express.static(path.join(process.cwd(), "public")));

// Make some animals
import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// Endpoint to search for animals
app.get("", (req, res) => {
  // Filter results by query
  const q = req.query.q?.toLowerCase() || "";
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );

  res.send(results);
});

// const PORT = process.env.PORT || 8080;

// const BASE_URL = process.env.VERCEL_API_URL
//   ? `https://${process.env.VERCEL_API_URL}`
//   : `http://localhost:${PORT}`;

// app.listen(PORT, () => console.log(`Listening on ${BASE_URL}`));

export default app;
