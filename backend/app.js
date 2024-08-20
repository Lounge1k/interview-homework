var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product API",
            version: "1.0.0",
            description: "A simple Express Product API",
        },
        servers: [
            {
                url: "http://localhost:3000", // Update this to match your server URL
            },
        ],
    },
    apis: ["./routes/api.js"], // Path to the API routes file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', apiRouter);

module.exports = app;
