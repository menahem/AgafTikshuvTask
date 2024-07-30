const express = require("express");
const cors = require("cors");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "Aa123456",
  },
});

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

app.get("/test", async (req, res) => {
  try {
    const health = await client.cluster.health();
    console.log(health);
    res.status(201).json(health);
  } catch (error) {
    console.error("Error fetching cluster health:", error);
    res.status(500).json({ error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await client.search({
      index: "orders",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Elasticsearch error:", error);
    res.status(500).json({ error: "Failed to save data1" });
  }
});

app.post("/saveData", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "body are required" });
  }

  try {
    const result = await client.index({
      index: "orders",
      body: req.body,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Elasticsearch error:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
