
# React App with Typescript exercise

Develop the web frontend to get Users from Github.


## Features

- Get users from Github with rest api
- Render user list
- View detail when click on any item
- Store in indexedDB

 
## Create React project with Typescript template


Create React App
```bash
npx create-react-app react-typescript-exercise --template typescript
```
Run project
```bash
cd react-typescript-exercise
npm start
```

Install Material UI Core
```bash
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```
Install Material Icon
```bash
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

Install IndexedDB
```bash
npm install idb
```

Install Axios
```bash
npm install axios
```

## Generate api key or token

- Go to Github website and Sign in with your account
- Click on profile icon, then **Settings/Developer Settings/Personal access tokens/Generate new token**
- Put the name, and select to **Scopes**, then click Generate
- Copy the token for you project

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/task-force-45e4e.appspot.com/o/Screen%20Shot%202021-07-20%20at%2012.04.03%20AM.png?alt=media&token=9aa7eff4-1846-4bb2-a20a-c4cd5b20efa9)

## Configure **HTTP Request**
Create **Axios** configuration `/service/apiClient.ts`
```javascript
import axios, { AxiosInstance } from "axios";
import config from "../utils/config";
const apiClient: AxiosInstance = axios.create({
  baseURL: config.url,
  headers: {
    "Content-type": "application/json",
    "Authorization":"token "+config.token
  },
});

export default apiClient;
```

Create **Api** configuration `/service/Apis.ts`
```javascript
import http from "./apiClient";
class Apis {
  getAll(): Promise<any> {
    return http.get("/users?per_page=20");
  }
  get(uri: string): Promise<any> {
    return http.get(uri);
  }
}
export default new Apis();
```

## Configure IndexedDB

Create **Mothods** to do operation with DB `/service/indexedDB.ts`
```javascript
import { openDB } from 'idb';
const dbPromise = openDB('user-store', 1, {
  upgrade(db) {
    db.createObjectStore('users');
  },
});
class indexedDB {
    async get(key: string): Promise<any> {
        return (await dbPromise).get('users', key);
    }
    async set(key: string,val: any): Promise<any> {
        return (await dbPromise).put('users', val, key);
    }
    async delete(key: string): Promise<any> {
        return (await dbPromise).get('users', key);
    }
    async clear(key: string): Promise<any> {
        return (await dbPromise).get('users', key);
    }
  }
  export default new indexedDB();
```

## Screenshots

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/task-force-45e4e.appspot.com/o/screens%2FScreen%20Shot%202021-07-28%20at%2010.24.10%20AM.png?alt=media&token=e6298b46-0a9a-4039-b0d4-b8d3ce26dfac)




![App Screenshot](https://firebasestorage.googleapis.com/v0/b/task-force-45e4e.appspot.com/o/screens%2FScreen%20Shot%202021-07-28%20at%2010.24.22%20AM.png?alt=media&token=5f84e7b7-5031-4a48-83f5-2073ec7e05b2)

  ## Run the existing project

Clone the project from Github
```bash
git clone https://github.com/many-pichr/React-Typescript-Exercise.git
```

Run React project
```bash
npm install

npm start
```
## Authors

- [@many-pichr](https://github.com/many-pichr)

  
