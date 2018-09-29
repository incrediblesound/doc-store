doc-store
=========

This is a very simple class that save and reads JSON from disk

Why?
---
When I am working on a small game or personal project, I often want to be able to persist some data to disk
without having to set up a database. To that end I made this dead simple package that manages saving JSON to disk

API
---

`constructor(path: string, key?: string): DocStore`

Creates a document store set to a path. Takes an optional key for if you want to fix this document store to a single key of the JSON at a given path.

```javascript
const DocStore = require('doc-store')

docStore = new DocStore('./data.json', 'people')
```

`docStore.initDB(): void`

Initializes the DB by either reading the current document from disk or creating one if it doesn't exist


`docStore.get(key?: string): Object`

Gets the document stored at the given path. The key can be omitted if it was provided in the constructor

```javascript
const people = docStore.get()

console.log(people) // -> null
```

`docStore.set(key?: string, value: string, options?: object)`

Sets the value at the given key. Key is optional if given in constructor

OPTIONS

overwrite: seting overwrite to false will only set value if current value is null or undefined   
flush: setting flush to false will prevent docStore from saving to disk after call to set()   

```javascript
docStore.set({ name: 'john', age: 31 })

const people = docStore.get() // -> { name: 'john', age: 31 }

```