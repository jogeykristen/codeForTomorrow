import { ConnectionOptions } from "typeorm";
import { User } from "./models/user";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Password123##",
  database: "codeForTomorrow",
  entities: [User],
  synchronize: true,
};

export default connectionOptions;
