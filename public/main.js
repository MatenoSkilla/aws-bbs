fetch('/posts')
  .then(res => res.json())
  .then(data => {
    const postsDiv = document.getElementById('posts');
    data.forEach(post => {
      const p = document.createElement('p');
      p.textContent = post.title + ': ' + post.content;
      postsDiv.appendChild(p);
    });
  });
