// viewLecturesRoute.js

const express = require('express');
const router = express.Router();
const ReactDOMServer = require('react-dom/server');

// Import the ViewLecturesPage component
const ViewLecturesPage = require('../../frontend/src/pages/student/ViewLecturesPage.js');

// Define route to handle GET requests to /view-lectures
router.get('/view-lectures', (req, res) => {
    // Simulated data for demonstration
    const subjects = ['Math', 'Science', 'History'];

    // Render the ViewLecturesPage component with data
    const html = ReactDOMServer.renderToString(<ViewLecturesPage subjects={subjects} />);

    // Send the rendered HTML with data to the client
    res.send(html);
});

module.exports = router;
