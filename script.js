const postsContainer = document.querySelector('.posts-container');

const loader = document.querySelector('.loader');

const filter = document.getElementById('filter');

let limit = 5;
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
  });
}

// Show loader and fetch more posts
function loadPosts() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);

  },1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const postTitle = post.querySelector('.post-title').innerText.toUpperCase();
    const postBody = post.querySelector('.post-body').innerText.toUpperCase();
    
    if (postTitle.indexOf(term) > -1 || postBody.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight -5) {
    loadPosts();
  }
});

filter.addEventListener('input', filterPosts);