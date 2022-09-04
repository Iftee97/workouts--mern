const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hell with the World!')
})

app.listen(4000, () => {
  console.log(`server listening on port 4000`)
})
