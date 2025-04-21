import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // or your self-hosted endpoint
  .setProject('6805c7020038a97d0251'); // Replace with your actual project ID

const databases = new Databases(client);

export { client, databases, ID };
