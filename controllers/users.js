var users = express.Router();

users.get('/', function (req, res) {
  res.json({ users: null });
});

app.use('/users', users);
