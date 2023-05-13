const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configuration = new Configuration({
    organization: "org-NorPz6raxQ3DRxOZvqCOdd7w",
    apiKey: " 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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();




// create a simple express api that call the fucntion above

// add body parser add corrs to express const bodyParser == require('bodyparser').

const app = express();

app.use(bodyParser.json());
app.use(cors());
// cna please add cors to express


const port = 3080;
app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    // console.log(response.data.choices[0].text);
    res.json({
        message:response.data.choices[0].text,
    });
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// sk - jMN1vjkttBKilnqfgEaKT3BlbkFJfNkGGXMcWJ2F5l2tAUMU