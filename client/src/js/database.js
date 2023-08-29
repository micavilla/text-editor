import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// export a function we use to update the database with added text
export const putDb = async (content) => {
  // create connection to the database and version 1
  const jateDb = await openDB('jate', 1);
  // create new transaction and specify jate dabase and data writing privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open up desired object store
  const store = tx.objectStore('jate');
  // use the .put() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });
  // get confirmation of request
  const result = await request;
  console.log('Data saved to the database', result);
};

// export a function we use to GET database information
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // use the .getAll() method to get all data in the database
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
