import { Client, Databases, Account, ID } from "appwrite";

const client = new Client();
const id = new ID();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65b7a2409b3fbb90afe8");

const account = new Account(client);

const appwriteDatabase = new Databases(client, "65b7a264bdbc83edc4e1");

export { client, appwriteDatabase, account, id };
