var posts = [];

function addPost(event) {
  event.preventDefault();
  var titleInput = document.getElementById('titleInput');
  var contentInput = document.getElementById('contentInput');
  var post = {
    title: titleInput.value,
    content: contentInput.value,
    expanded: false
  };

  // Simulate server request delay
  setTimeout(function() {
    posts.push(post);
    displayPosts();
    titleInput.value = '';
    contentInput.value = '';
  }, 500);
}

function togglePost(index) {
  posts[index].expanded = !posts[index].expanded;
  displayPosts();
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

function displayPosts() {
  var postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    var postElement = document.createElement('div');
    postElement.classList.add('post');

    var postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    postElement.appendChild(postTitle);

    var postContent = document.createElement('p');
    var truncatedContent = truncateText(post.content, 100); // Truncate content to 100 characters
    postContent.textContent = truncatedContent;
    postContent.classList.add('post-content');
    if (post.expanded) {
      postContent.textContent = post.content; // Display full content if expanded
    }

    // Add "Read More" button if content is truncated
    if (post.content.length > truncatedContent.length) {
      var readMoreButton = document.createElement('button');
      readMoreButton.textContent = 'Read More';
      readMoreButton.classList.add('read-more');
      postContent.appendChild(readMoreButton);
    }

    postElement.appendChild(postContent);

    postElement.addEventListener('click', function(event) {
      var index = Array.from(postsContainer.children).indexOf(event.currentTarget);
      togglePost(index);
    });

    postsContainer.appendChild(postElement);
  }
}

var postForm = document.getElementById('postForm');
postForm.addEventListener('submit', addPost);

// Initial display of posts
displayPosts();
