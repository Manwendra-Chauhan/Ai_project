import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from 'openai';

const port=3001;

const openai = new OpenAI({
    apiKey: "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"// This is also the default, can be omitted
});

const app= express();
app.use(bodyParser.json());
app.use(cors());


app.post("/chat", async(req,res)=>{
    const {prompt} = req.body;

    const completion = await openai.completions.create({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt
    });

    res.send(completion.choices[0].text);

})




app.listen(port, (req,res)=>{
    console.log("Server is up and running on port 3001")
})