import express from 'express'

import authRoute from "./routes/auth.route.js"
import moviesRoute from "./routes/movies.route.js"

import { envVars } from './config/envVars.js'
import { connectDB } from './config/dbconnection.js'


const app = express()

app.use(express.json())


app.use("/api/v1/auth", authRoute )
app.use("/api/v1/movies", moviesRoute  )


app.listen(envVars.PORT,()=>{
    console.log("logged in",envVars.PORT)
    connectDB()
})



