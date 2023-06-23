import express from "express"
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors())

const usernames = []
const tweets = []
const tweetsget = []

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body
    const newUsername = { username, avatar }
    usernames.push(newUsername)
    console.log(usernames)
    res.send("OK")

})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body

    if (!usernames.some( usuario => usuario.username == username )) {
        res.send("UNAUTHORIZED")
    } else {

        const newTweet = { username, tweet }
        tweets.push(newTweet)
        res.send("OK")
    }
})

app.get("/tweets", (req, res) => {

    const { username, avatar } = usernames

    tweets.forEach((tweeteach) => {

        const tweetcorreto = usernames.find((tw) => tw.username === tweeteach.username)
        const novoget = {username: tweeteach.username, avatar: tweetcorreto.avatar, tweet: tweeteach.tweet }
        tweetsget.push(novoget)

    })

    res.send(tweetsget)
})



const PORT = 5000

app.listen(PORT, () => console.log("Servidor rodando"))
