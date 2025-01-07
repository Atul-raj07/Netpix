
import dotenv from 'dotenv'

dotenv.config()

export const envVars ={
    "MONGO_URI" : process.env.MONGO_URI,
    "PORT" : process.env.PORT || 5001,
    "JWT_SECRET" : process.env.JWT_SECRET,
    "NODE_ENV" : process.env.NODE_ENV,
    "TMDB_API" : process.env.TMDB_API
}
