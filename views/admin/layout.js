module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
  <html>
  <head>
  <script src="index.js"></script>
  </head>
  <body>
  ${content}
  </body>
  </html>
    `;
};
