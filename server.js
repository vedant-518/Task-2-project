const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let posts = [];

// login (dummy auth)
app.post("/login", (req, res) => {
  res.json({ success: true });
});

// create post
app.post("/post", (req, res) => {
  const post = {
    id: Date.now(),
    user: req.body.user,
    text: req.body.text,
    likes: 0,
    comments: []
  };
  posts.unshift(post);
  res.json(post);
});

// like post
app.post("/like", (req, res) => {
  const post = posts.find(p => p.id === req.body.id);
  if (post) post.likes++;
  res.json(post);
});

// comment
app.post("/comment", (req, res) => {
  const post = posts.find(p => p.id === req.body.id);
  if (post) post.comments.push(req.body.comment);
  res.json(post);
});

// get posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});