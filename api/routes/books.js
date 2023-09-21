const express = require('express');
const passport = require('passport')
const passportService = require('../services/passport')

const protectedRoute = passport.authenticate('jwt', {session: false })
const router = express.Router();

const Book = require('../models/book')
// RESTFUL Endpoints
// GET, POST, PATCH, DELETE

const getBook = async (req, res, next) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        if( book === null){
            return res.status(404).json({ message: "Book not found"})
        }
    } catch(error) {
        return res.status(500).json({ message: error.message})
    }
    res.book = book;
    next();
}

// GET ALL
router.get('/', protectedRoute, async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

// GET ONE
router.get('/:id', getBook, async (req, res) => {
    res.json(res.book)
})

// POST CREATE
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author
    })
    try {
        const newBook = await book.save();
        res.status(201).json(newBook)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

// PATCH UPDATE
router.patch('/:id', getBook, async (req, res) => {
    if(req.body.name != null){
        res.book.name = req.body.name
    }
    if(req.body.author != null){
        res.book.author = req.body.author
    }
    try {
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch(error){
        res.status(400).json({message: error.message })
    }
})

// DELETE
router.delete('/:id', getBook, async(req, res) => {
    try {
        await res.book.remove();
        res.json({message: "Removed book"})
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;
