var admin = require("firebase-admin");

var serviceAccount = require("./your_serviceAccountKey_file_name.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});