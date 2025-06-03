function signUp() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  if (!username || !password) return alert("Fill all fields");
  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Sign up successful!");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.username === username && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Wrong credentials");
  }
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "login.html";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

window.onload = function () {
  if (location.pathname.includes("index.html")) {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) window.location.href = "login.html";

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    savedPosts.forEach(post => displayPost(post));
  }
};

function addPost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const image = document.getElementById("postImage").files[0];
  const audio = document.getElementById("postAudio").files[0];

  if (!title || !content) return alert("Please fill in both title and content!");

  const post = { title, content, imageURL: "", audioURL: "" };

  if (image) post.imageURL = URL.createObjectURL(image);
  if (audio) post.audioURL = URL.createObjectURL(audio);

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  displayPost(post);
  showToast("🎉 Post added!");

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
  document.getElementById("postAudio").value = "";
}

function displayPost(post) {
  const container = document.getElementById("postsContainer");
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
  if (post.imageURL) div.innerHTML += `<img src="${post.imageURL}" style="max-width:100%; border-radius:10px; margin-top:10px;" />`;
  if (post.audioURL) div.innerHTML += `<audio controls src="${post.audioURL}" style="margin-top:10px;"></audio>`;
  container.prepend(div);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2000);
}
