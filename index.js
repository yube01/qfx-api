import axios from "axios"
import cheerio from "cheerio"
import express from "express"

const PORT = process.env.PORT || 5000
const app = express()

const URL = 'https://www.bbc.com/'

axios(URL)
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('div.media__content', htmlData).each((index, element) => {
            const title = $(element).find("h3.media__title").text().trim()
            const titleURL = $(element).find("h3.media__title").find("a.media__link").attr('href')
            //const title = $(element).text()
            // const title = $(element).text()
            // const titleURL = $(element).children('.headline').attr('href')
            articles.push({
                title,
                titleURL
            })
        })
        console.log(articles)
    }).catch(err => console.error(err))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))