import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65b7a2409b3fbb90afe8");

const account = new Account(client);

// account.createAnonymousSession().then(
//   function (response) {
//     console.log(response); // Success
//   },
//   function (error) {
//     console.log(error); // Failure
//   }
// );

const appwriteDatabase = new Databases(client, "65b7a264bdbc83edc4e1");

export { client, appwriteDatabase, account };
