const express = require("express")
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/templates/views'))

// OUR MIDDLEWARE
app.use((req, res, next) => {
    console.log('Request made at ' + Date.now())
    next()
})

app.use('/apple', (req, res, next) => {
    console.log('Request apple made at ' + Date.now())
    next()
})

app.get('/', (req, res) => {
    const userData = [
        {
            name: "Derek",
            favoriteColor: "Green"
        },
        {
            name: "Lucas",
            favoriteColor: "Blue"
        }
    ]
    // ALL ROUTE FUNCTIONALITY GOES HERE
    res.render('index')
})

app.get('/apple', (req, res) => {
    res.send('banana')
})

app.get('/mac', (req, res) => {
    res.send('& cheese')
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id
    const userData = [
        {
            id: "asdlk",
            name: "Derek",
            favoriteColor: "Green",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ],
            products: [
                "product 1"
            ]
        },
        {
            id: "asdbc",
            name: "Lucas",
            favoriteColor: "Blue",
            posts: [
                {
                    title: "Hi this is me",
                    content: "This is the post content",
                    hide: false
                },
                {
                    title: "Where am I?",
                    content: "This is the post content 2"
                },
                {
                    title: "Who am I?",
                    content: "This is the post content 3"
                },
                {
                    title: "Who am I again?",
                    content: "This is the post content 4"
                }
            ]
        },
        {
            id: "asdmc",
            name: "Mary",
            favoriteColor: "Brown",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ]
        },
        {
            id: "asdbv",
            name: "John",
            favoriteColor: "Pink",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ]
        }
    ]

    for (const user of userData) {
        if (user.id === userId) {
            res.render('profile', user)
            return
        }
    }
    // ALL ROUTE FUNCTIONALITY GOES HERE
    res.send({
        error: `User with id ${userId} was not found.`
    })
})

app.get('/user/:id/post/:postIndex', (req, res) => {
    const userId = req.params.id
    const postIndex = req.params.postIndex

    const userData = [
        {
            id: "asdlk",
            name: "Derek",
            favoriteColor: "Green",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ],
            products: [
                "product 1"
            ]
        },
        {
            id: "asdbc",
            name: "Lucas",
            favoriteColor: "Blue",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ]
        },
        {
            id: "asdmc",
            name: "Mary",
            favoriteColor: "Brown",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ]
        },
        {
            id: "asdbv",
            name: "John",
            favoriteColor: "Pink",
            posts: [
                {
                    title: "This is a post",
                    content: "This is the post content"
                },
                {
                    title: "This is a post 2",
                    content: "This is the post content 2"
                },
                {
                    title: "This is a post 3",
                    content: "This is the post content 3"
                }
            ]
        }
    ]

    for (const user of userData) {
        if (user.id === userId) {
            // USER FOUND, NOW FIND THE POST
            const post = user.posts[postIndex]

            post.author = {
                name: user.name,
                id: user.id
            }

            res.send(post)
        }
    }
    // ALL ROUTE FUNCTIONALITY GOES HERE
    res.send({
        error: `User with id ${userId} was not found.`
    })
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})