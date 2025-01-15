//main entry point for the app
import {connectDB} from './db/index.js'
import { app } from './app.js'

const PORT = 4000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server is facing some error: ${error}`);
        });

        app.listen(PORT, () => {
            console.log(`App is listening on PORT: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(`Postgresql connection failed! ${error}`);
    });