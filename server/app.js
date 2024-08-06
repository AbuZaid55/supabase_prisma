import express from 'express'
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import auth from './prisma/middelware.js'



dotenv.config({ path: './.env', });


const prisam = new PrismaClient()

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 3000;


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ' * ', credentials: true }));
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/create',auth,async(req,res)=>{
    const {title,price,qty,description} = req.body
    try {
      const newUser = await prisam.products.create({
        data:{
          title:title, 
          price:Number(price),
          qty:Number(qty),
          description:description
        }
    })
    res.status(200).json({success:true,message:"Product created successfully"})
    } catch (error) {
      res.status(400).json({success:false, message:error.message})
    }
})
app.get('/read',auth,async(req,res)=>{
    try {
      const data = await prisam.products.findMany({
        orderBy:{
          created_at:"asc"
        }
      })
    res.status(200).json({success:true,data:data})
    } catch (error) {
      res.status(400).json({success:false, message:error.message})
    }
})
app.post('/update',auth,async(req,res)=>{
  const {title,id} = req.body
    try {
    const data = await prisam.products.update({
      where:{
        id:Number(id)
      },
      data:{
        title:title
      }
    })
    res.status(200).json({success:true,message:"Product updated successfully"})
    } catch (error) {
      res.status(400).json({success:false, message:error.message})
    }
})
app.post('/delete',auth,async(req,res)=>{
  const {id} = req.body
    try {
    const data = await prisam.products.delete({
      where:{
        id:Number(id)
      }
    })
    res.status(200).json({success:true,message:"Product deleted successfully"})
    } catch (error) {
      res.status(400).json({success:false, message:error.message})
    }
})

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorMiddleware);


app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));