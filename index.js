const app = require("./app");

const cluster = require("cluster");
const os = require("os");
const PORT = 3000;

const numCpu = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server ${process.pid} - listening on port: ${PORT}`);
  });
}
