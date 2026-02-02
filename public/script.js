let currentUser = "";

function login() {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Enter username");
    return;
  }

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  })
  .then(() => {
    currentUser = username;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadPosts();
  });
}

function createPost() {
  const text = document.getElementById("postText").value;
  if (!text) return;

  fetch("/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, text })
  })
  .then(res => res.json())
  .then(loadPosts);

  document.getElementById("postText").value = "";
}

function likePost(id) {
  fetch("/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(loadPosts);
}

function commentPost(id) {
  const comment = prompt("Enter comment");
  if (!comment) return;

  fetch("/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, comment })
  })
  .then(res => res.json())
  .then(loadPosts);
}

function loadPosts() {
  fetch("/posts")
    .then(res => res.json())
    .then(data => {
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = "";

      data.forEach(p => {
        postsDiv.innerHTML += `
          <div class="post">
            <b>${p.user}</b>
            <p>${p.text}</p>
            <div class="actions">
              ❤️ ${p.likes}
              <button onclick="likePost(${p.id})">Like</button>
              <button onclick="commentPost(${p.id})">Comment</button>
            </div>
            ${p.comments.map(c => `<div class="comment">💬 ${c}</div>`).join("")}
          </div>
        `;
      });
    });
}