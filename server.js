const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.use(cors());
app.use(morgan('dev'));
// app.use(
//     express.json({
//         limit: '5000mb',
//     }),
// );
// app.use(
//     express.urlencoded({
//         limit: '5000mb',
//     }),
// );

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.all('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //...
   });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));