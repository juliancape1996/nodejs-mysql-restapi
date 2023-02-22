import {createPool} from 'mysql2/promise'
import { 
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
 } from "./config.js";

//esto seria como el create conectiion
//ya con este pool lo puedo llamar y realizar consultas sql
export const pool =createPool({
    host: DB_HOST,
    user: DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_DATABASE
})


