const fs = require("fs-extra");

// Async with promises:
fs.copy("views", "dist/views")
  .then(() => console.log("success views!"))
  .catch((err) => console.error(err));

fs.copy("public", "dist/public")
  .then(() => console.log("success public!"))
  .catch((err) => console.error(err));

fs.copy("vercel.json", "dist/vercel.json")
  .then(() => console.log("success vercel!"))
  .catch((err) => console.error(err));