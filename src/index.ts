import express, {Request, Response, NextFunction} from 'express'
import {config} from 'dotenv';
import pool, { pgQueryPool } from './database/pg_pool';

config({
  path: './.env',
})
const app = express();

app.get('/',async (_req:Request, res:Response, _next:NextFunction) => {
  const db_client = await pool.connect();
  res.send("Hello World");
})

const port = process.env.SERVER_PORT!;
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`);
})