# rendusReactExpress

PALLEC Julien ,
DURBET Manon, 
MESSINE Matthieu 

--- client => application react
  Pour initialiser, aller dans le dossier client, lancer "npm install" ou "yarn install".
  Pour lancer l'application "npm start" ou "yarn start"
  L'application React se lance sur le port 3000 en localhost.
    - UserList
    - UserDetail
    - AppartementList
    - AppartementDetail
    
  L'application fonctionne avec l'application express lancé sur le port 3001

--- newApp => application express
  our initialiser, aller dans le dossier newapp, lancer "npm install".
  Pour lancer l'application "node app".
  L'application Express se lance sur le port 3001 en localhost.
    - api/Utilisateurs
    - api/Appartements
    - api/reservations
    - api/messaging : cette uri renvoie une page de chat pour chatter avec le bot zambla, le code du bot est des le fichier app.js
                      et coté vue dans src/js/messaging.js. Socket.io a été utilisé pour cette fonctionnalité.
  

