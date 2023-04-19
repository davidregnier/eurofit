const path = require('./route');
const {app, port} = require('./server');
const cors = require('cors');

app.use(cors());
path.abonnementPath(app);
path.membrePath(app);

app.listen(port, ()=> {
    console.log(`🎉server is running on port  ${port}`);
})