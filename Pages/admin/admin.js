const form = document.getElementById('blogForm');
const list = document.getElementById('adminPostList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const idField = document.getElementById('postId');

// 1. READ: Fetch and display posts on load
function loadPosts() {
    fetch('/api/blogs')
        .then(res => res.json())
        .then(posts => {
            list.innerHTML = ''; // Clear current list
            posts.forEach(post => {
                const li = document.createElement('li');
                li.className = 'post-item';
                li.innerHTML = `
                    <span><strong>${post.title}</strong> (${post.date})</span>
                    <div>
                        <button onclick="editPost('${post._id}')" class="edit-btn">Edit</button>
                        <button onclick="deletePost('${post._id}')" class="delete-btn">Delete</button>
                    </div>
                `;
                list.appendChild(li);
            });
        });
}

// 2. CREATE & UPDATE: Handle Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const postData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        date: document.getElementById('date').value,
        image: document.getElementById('image').value,
        excerpt: document.getElementById('excerpt').value
    };

    const id = idField.value;
    
    // If we have an ID, it's an UPDATE (PUT), otherwise it's a CREATE (POST)
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/blogs/${id}` : '/api/blogs';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(() => {
        resetForm();
        loadPosts(); // Refresh the list
    });
});

// 3. DELETE: Delete a post
window.deletePost = (id) => {
    if(confirm('Are you sure you want to delete this?')) {
        fetch(`/api/blogs/${id}`, { method: 'DELETE' })
            .then(() => loadPosts());
    }
};

// 4. PREPARE UPDATE: Fill form with existing data
window.editPost = (id) => {
    fetch(`/api/blogs/${id}`) // You need a route to get ONE blog
        .then(res => res.json())
        .then(post => {
            document.getElementById('title').value = post.title;
            document.getElementById('author').value = post.author;
            document.getElementById('date').value = post.date;
            document.getElementById('image').value = post.image;
            document.getElementById('excerpt').value = post.excerpt;
            document.getElementById('postId').value = post._id; // Store ID

            submitBtn.textContent = "Update Post";
            cancelBtn.style.display = "inline-block";
        });
};

// Helper: Reset form to default
function resetForm() {
    form.reset();
    idField.value = '';
    submitBtn.textContent = "Publish Post";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener('click', resetForm);

// Initial Load
loadPosts();