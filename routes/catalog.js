var express = require('express');
var router = express.Router();


// Require our controllers.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');
var user_controller = require('../controllers/userController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/',user_controller.isAuthenticated , book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create',user_controller.isAuthenticated , book_controller.book_create_get);

// POST request for creating Book.
router.post('/book/create',user_controller.isAuthenticated, book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete',user_controller.isAuthenticated, book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete',user_controller.isAuthenticated, book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update',user_controller.isAuthenticated, book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:id/update',user_controller.isAuthenticated, book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id',user_controller.isAuthenticated, book_controller.book_detail);

// GET request for list of all Book.
router.get('/books',user_controller.isAuthenticated, book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create',user_controller.isAuthenticated, author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create',user_controller.isAuthenticated, author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete',user_controller.isAuthenticated, author_controller.author_delete_get);

// POST request to delete Author
router.post('/author/:id/delete',user_controller.isAuthenticated, author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update',user_controller.isAuthenticated, author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update',user_controller.isAuthenticated, author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id',user_controller.isAuthenticated, author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors',user_controller.isAuthenticated, author_controller.author_list);


/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create',user_controller.isAuthenticated, genre_controller.genre_create_get);

// POST request for creating Genre.
router.post('/genre/create',user_controller.isAuthenticated, genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete',user_controller.isAuthenticated, genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete',user_controller.isAuthenticated, genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update',user_controller.isAuthenticated, genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update',user_controller.isAuthenticated, genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id',user_controller.isAuthenticated, genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres',user_controller.isAuthenticated, genre_controller.genre_list);


/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create',user_controller.isAuthenticated, book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create',user_controller.isAuthenticated, book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete',user_controller.isAuthenticated, book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete',user_controller.isAuthenticated, book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update',user_controller.isAuthenticated, book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update',user_controller.isAuthenticated, book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id',user_controller.isAuthenticated, book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances',user_controller.isAuthenticated, book_instance_controller.bookinstance_list);


module.exports = router;
