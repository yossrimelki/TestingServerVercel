import express from 'express'

const app= express()
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})
app.listen(5000,()=>{
    console.log('app is running')
})