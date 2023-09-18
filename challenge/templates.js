// sanitise function
function sanitize(string) {
  return string.replace(/</g, "&lt;");
}

function home(posts, errors = {}, values = {}) {
  const title = "All posts";
  const { nickname = "", message = "" } = values;
  const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
      <p>
        <label for="nickname">Nickname</label>
        <input id="nickname" name="nickname" value="${sanitize(nickname)}">
        ${
          errors.nickname
            ? `<span style="color: red">${errors.nickname}</span>`
            : ""
        }
      </p>
      <p>
        <label for="message">Message</label>
        <textarea id="message" name="message">${sanitize(message)}</textarea>
        ${
          errors.message
            ? `<span style="color: red">${errors.message}</span>`
            : ""
        }
      </p>
      <button>Send</button>
    </form>
    <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join("")}
    </ul>
  `;
  return layout(title, content);
}

function postItem(post) {
  const date = new Date(post.created);
  const prettyDate = date.toLocaleString("en-GB");

  return /*html*/ `
    <li>
      <p>${sanitize(post.message)}</p>
      <p>—${sanitize(post.nickname)} | ${prettyDate}</p>
    </li>
  `;
}

function layout(title, content) {
  return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home };
