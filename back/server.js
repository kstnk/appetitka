const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");


dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));