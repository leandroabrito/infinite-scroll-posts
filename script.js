const postsContainer = document.querySelector('.posts-container');

const loader = document.querySelector('.loader');

const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`

  const res = await fetch(url);

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElem = document.createElement('div');

    postElem.classList.add('post');
    
    postElem.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postElem);
    console.log(postElem);
  });
}

// Show initial posts
showPosts();