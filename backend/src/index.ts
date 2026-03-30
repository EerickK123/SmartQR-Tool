import app from "./app";

function main() {
  const port = Number(process.env.PORT || 4000);
  app(port);
}

main();