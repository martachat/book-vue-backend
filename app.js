require("dotenv").config();
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const morgan = require("morgan");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  // books: 640,
  // "books/:id": 640,
  // "admin/*": 640,
  // comments:644,
  // Other rules
  // '/books/: '/books',
  "/admin/": 640,
  "/admin/create": 640,
  "/admin/:id/edit": 640,
});

//s
server.use(rules);
server.use(auth);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
