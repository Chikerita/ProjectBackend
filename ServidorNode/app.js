const express = require('express');
const appServer = express();
appServer.use(express.json());

appServer.listen (3000, () => {
    console.log('SERVER IS RUNING IN PORT 3000');
});

appServer.get ('/get', 
    (req, res) => {
        res.send ('HOLA MUNDO');
    }
);

appServer.post ('/post', 
    (req, res) => {
        console.log(req.body);
        res.send('POST Recibido');
    }
);

appServer.put ('/put', 
    (req, res) => {
        console.log(req.body);
        res.send('PUT Recibido');
    }
);