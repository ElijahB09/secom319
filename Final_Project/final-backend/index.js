const { createClient } = require('@supabase/supabase-js');
require('dotenv/config');
const express = require('express');
const cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());

app.get("/rooms", async (req, res) => {
    const supabase = createClient('https://onugnjxbswcerfbwsmqb.supabase.co', process.env.SUPABASE_KEY);
    const { data, error } = await supabase.from("room").select();
    console.log(data);
    if (error) {
        res.status(error.code);
        res.send(JSON.stringify(error));
    } else {
        res.status(200);
        res.send(data); 
    }
});

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});