import express from 'express'
import { Book } from '../Models/BookModel.js';
const router = express.Router();

// Route for save a Book 
router.post('/', async (requst,response) =>{
    try{
    if(
        !requst.body.title ||
        !requst.body.author ||
        !requst.body.publishyear ||
        !requst.body.workdetails ||
        !requst.body.signintime ||
        !requst.body.signouttime
    ){
        return response.status(400).send({
            message:"Send all required fields: title, author,publishyear",
        });
    }
    const newBook = {
        title: requst.body.title,
        author: requst.body.author,
        publishyear: requst.body.publishyear,
        workdetails: requst.body.workdetails,
        signintime: requst.body.signintime,
        signouttime: requst.body.signouttime,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get All Books From database 
router.get('/', async (request,response) =>{
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
    });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
// Route for Get All Books From database by id
router.get('/:id', async (request,response) =>{
    try{
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for Update a Book 
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishyear",
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'Book Update Successfully' })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a book 
router.delete('/:id', async (request, response) =>{
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: "Book not found"});
        }

        return response.status(200).send({message: 'Book deleted successfully'})


    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


export default router;