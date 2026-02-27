
import express from 'express'
import bodyParser from 'body-parser'
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/sendReportData', (req, res) => {
    console.log('进入后台')
  console.log(req.body)
 res.status(200).send('success')
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})