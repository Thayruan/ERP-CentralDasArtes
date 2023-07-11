const express = require('express')
const cors = require('cors')
const stripe = require('stripe')("sk_test_51NPcjjJHTbdEHHz7A9Weo0twRpQ0OWXD2MHMIL3iK9nUyAAoDteiIuwznoljQwzVGBz6aQr7Fl36XU9YVt1M5nec00nYKEk3a3")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello")
})
/
app.post('/createStripeSession', async (req, res) => {
    const {priceId, quantity} = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: quantity }],
        mode: 'subscription',
        success_url: 'https://google.com/',
        cancel_url: 'http://localhost:8100/',
    })

    res.status(200).json({id: session.id})
})

port = 5000
app.listen(port, ()=>console.log(`Running on port ${port}`))
