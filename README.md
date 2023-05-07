# Package viewer

The project consists of two separate projects: the frontend and the backend. There is a shared top level package.json, but it is there only to enable deployment of two projects under single Heroku app.

**The backend** is a Node.js application that reads packages from /var/lib/dpkg/status (or mock data) and exposes them through an API.

**The frontend** is a minimal Vue.js project that consumes the API.

## How it works
The core component is the reader.js. It reads through the packages file line by line using a readable stream and the readline module. Given package name, it checks every package's depends -field for reverse dependency and once reaching the section of the searched package, reads the relevant fields before continuing to the end of the file looking for more reverse dependencies.

As the dependencies may include alternative dependencies that are not known, i.e. not listed in the file, the package dependencies are compared to a list of all package names in the file and marked known or not known.

## Testing locally
By default, the backend reads mock data. To read actual Debian/Ubuntu packages, change the filepath under backend/config.js.
```js
cd backend
npm install
npm start
```
```js
cd frontend
npm install
npm run dev
```
