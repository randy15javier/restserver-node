process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// Base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/ProHealth';
} else {
    urlDB = 'mongodb+srv://randy15:realmadrid@cluster0.jiwcd.mongodb.net/<dbname>?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;

