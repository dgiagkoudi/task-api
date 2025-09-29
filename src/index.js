const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});