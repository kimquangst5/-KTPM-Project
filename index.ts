import express from "express";
import "dotenv/config";
import route_admin from "./routers/admin/index.route";
import route_client from "./routers/client/index.route";
import body_parser from "body-parser";
import database_connect from './configs/database.config'
import cookie_parser from "cookie-parser";

const app = express();
const port = 3000;

database_connect();
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

app.use(body_parser.urlencoded());
app.use(body_parser.json());
app.use(express.static(`${__dirname}/public`))

app.use(cookie_parser());

route_admin(app);
route_client(app);


app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});


