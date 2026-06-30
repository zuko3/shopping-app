function fetchPostsList() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}

async function fetchPostsListTanstackFn() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

async function fetchPostByIdTanstackFn(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export { fetchPostsList, fetchPostsListTanstackFn, fetchPostByIdTanstackFn };
