// npm run dev
// http://127.0.0.1:3000
// taskkill /F /IM node.exe

// https://cse340-lmgn.onrender.com/
// https://github.com/moisesph/CSE340

// To create a new admin use:
// Open pgAdmin and connect to your application database.
// Use the registration page from your website to register a user account with the name admin the email/username admin@example.com and the password cse340! . This will be your dedicated admin testing account. Please note that you need to register this account through the website so that the password is properly hashed and stored in the database. Do not try to create this account directly in the database with an INSERT statement, because you would need to hash the password first.
// Account for Grading Purposes
// It is important to use this username and password ( admin@example.com and cse340! ) because that is what the grader will use to test your application. If you choose a different password, the grader will not be able to test your application.

// In a production environment, you would not publish or require fixed admin credentials like this. But you might do so in a QA/test environment. In a way, the grader in this course fulfills a similar role to a QA testing team, so this approach makes sense and gives the grader a consistent way to test your application.

// Verify that you have the admin user account to update and an admin role in the database.
// You can use a SELECT statement to view all users: SELECT * FROM users;
// You can use a SELECT statement to view all roles: SELECT * FROM roles;
// Run an UPDATE statement to set that account's role_id to the id of the admin role by using a subquery. The statement should look similar to this:
// UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';
// Verify that the update was successful by running the SELECT statements again.



import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';
import session from 'express-session';
import flash from './src/middleware/flash.js';

// Define the application environment

const SESSION_SECRET = process.env.SESSION_SECRET;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



/**
  * Configure Express middleware
  */

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Use flash message middleware
app.use(flash);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.isLoggedIn = false;
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }
    res.locals.user = req.session.user || null;

    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Use the imported router to handle routes
app.use(router);

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
