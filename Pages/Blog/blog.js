class BlogPost {
  constructor(title, author, date, image, excerpt) {
    this.title = title;
    this.author = author;
    this.date = date;
    this.image = image;
    this.excerpt = excerpt;
  }

  // Method to render one blog card
  render() {
    return `
      <article class="blog-post">
        <div class="post-image-container">
          <img src="${this.image}" alt="${this.title}" class="post-image">
        </div>
        <div class="post-content">
          <h2 class="post-title"><a href="#">${this.title}</a></h2>
          <p class="post-excerpt">${this.excerpt}</p>
          <div class="post-meta">
            <img src="/assessts/Blog/PFP 1.png" alt="Author" class="author-avatar">
            <span class="author-name">${this.author}</span>
            <span class="meta-separator">|</span>
            <span class="post-date">${this.date}</span>
          </div>
        </div>
      </article>`;
  }
}

const blogList = document.querySelector(".blog-list");

// Fetch blog data from JSON 
fetch("blogs.json")
  .then(res => res.json())
  .then(data => {
    let posts = data.map(
      item => new BlogPost(item.title, item.author, item.date, item.image, item.excerpt)
    );
    displayPosts(posts);

    // attach search after posts loaded
    document.querySelector(".search-button").addEventListener("click", () => {
      const term = document.querySelector(".search-input").value.toLowerCase();
      const filtered = posts.filter(p => p.title.toLowerCase().includes(term));
      displayPosts(filtered);
    });
  })
  .catch(err => console.error("Error loading blogs:", err));

// helper function to update page content
function displayPosts(posts) {
  blogList.innerHTML =
    posts.length > 0
      ? posts.map(p => p.render()).join("")
      : "<p>No blog posts found.</p>";
}
