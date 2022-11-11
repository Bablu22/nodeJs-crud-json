const express = require("express")
const app = express()
const PORT = 5000;
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.json())


// route
const userRoute = require("./routes/user")
app.use('/api/v1/user', userRoute)



app.get("/", (req, res) => {
    res.send("This is random user server")
})

// Error handler
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 404
    err.statusCode = 404
    next(err)
})

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
    console.log('error=>', err);
})


app.listen(PORT, () => {
    console.log(`Server is rinning on port:${PORT}`);
})



