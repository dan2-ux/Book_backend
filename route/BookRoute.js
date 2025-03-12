import express from "express";
import { Book } from "../modules/bookModel.js";

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json(books)
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({message: 'ERROR'});
    }
})

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    }
    catch(e){
        res.status(404).json({message: "ERROR"})
    }
})

router.post('/' , async (req,res) => {
    try{
        if  (!req.body.title ||
            !req.body.author || 
            !req.body.yearPublish){
                return res.status(400).json({message: "PLEASE FILL IN"});
            }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            yearPublish: req.body.yearPublish
        }
        const book = await Book.create(newBook)
        return res.status(200).json(book);
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

router.put('/:id' , async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send("Failed to update");
        }
        res.status(200).json(await Book.findById(id))
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const doDelete = await Book.findByIdAndDelete(id);
        if(!doDelete){
            return res.status(400).json({message: "ERROR"});
        }
        res.status(200).send("Successful")
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

export default router