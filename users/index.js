const app = require("./app")
const config = require('dotenv').config()
const PORT = process.env.PORT || 3001;

// listening
app.listen(PORT ,()=> {
    console.log("user service running on port :" + PORT);
})

app.on('error',(error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('express main configured  and listening on port:.')
    }
});