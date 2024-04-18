//main entry point for the app
import connectDB from './db/index.js'
import { app } from './app.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
});


connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server is facing some error: ${error}`);
        });

        app.listen(process.env.PORT || 4000, () => {
            console.log(`App is listening on PORT: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`Postgresql connection failed! ${error}`);
    });