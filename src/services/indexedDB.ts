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