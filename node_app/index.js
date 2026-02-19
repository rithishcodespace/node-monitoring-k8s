const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3001;

app.use(express.json());

client.collectDefaultMetrics({ timeout: 5000 });

app.get("/", (req, res) => {
    res.send("Node.js monitoring in k8s using grafana and prometheus!");
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
