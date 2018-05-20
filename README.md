# kodeprojectback

Installation procedure

The backend has been designed used MongoDB and Express server after scaffolding with the express generator. 
1. Clone the repository to a convinient location.
2. This project was designed using Node (version: v6.9.4) and Node package manager (version: 3.10.10). To avoid any code breaks, make sure the same versions are installed. 
2. Install Express generator as a global module (npm install express-generator -g).
3. Run "npm install" to install all the dependencies that are required.
4. Start a mongodb instance. (mongod--dbpath="FOLDERNAME"). The service should start at port 27017 as the code has been given the same port as the access URL. Any changes and the same will have to be updated in the config.js file. 
5. start the project with the command "npm start". Make sure the mongodb service is already running when started.
6. Referring to kodeprojectfront repository, run gulp watch on that repository now for the frontend to work.
7. Note: CORS plugin may be required for Cross Origin Resource Compatibility. Make sure to install the chrome plugin for CORS and enable the same on the chrome browser.
