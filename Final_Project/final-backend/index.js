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

app.get("/rooms/:id", async (req, res) => {
    const roomId = Number(req.params.id);
    const supabase = createClient('https://onugnjxbswcerfbwsmqb.supabase.co', process.env.SUPABASE_KEY);
    const { data, error } = await supabase.from("room").select().eq("id", roomId);
    console.log(data);
    if (error) {
        res.status(error.code);
        res.send(JSON.stringify(error));
    } else {
        res.status(200);
        res.send(data); 
    }
});

app.get("/patients", async (req, res) => {
    const supabase = createClient('https://onugnjxbswcerfbwsmqb.supabase.co', process.env.SUPABASE_KEY);
    const { data, error } = await supabase.from("patient").select();
    console.log(data);
    if (error) {
        res.status(error.code);
        res.send(JSON.stringify(error));
    } else {
        res.status(200);
        res.send(data); 
    }
});

app.get("/patients/:id", async (req, res) => {
    const patientId = Number(req.params.id);
    const supabase = createClient('https://onugnjxbswcerfbwsmqb.supabase.co', process.env.SUPABASE_KEY);
    const { data, error } = await supabase.from("patient").select().eq("id", patientId);
    console.log(data);
    if (error) {
        res.status(error.code);
        res.send(JSON.stringify(error));
    } else {
        res.status(200);
        res.send(data); 
    }
});

app.post("/patients", async (req, res) => {
    const supabase = createClient('https://onugnjxbswcerfbwsmqb.supabase.co', process.env.SUPABASE_KEY);
    const { data, error } = await supabase
        .from("patient")
        .insert([req.body])
        .select();
    if (error) {
        console.log(error);
        res.status(error.code);
        res.send(error);
    }
    const { data: roomData, roomError } = await supabase
        .from('room')
        .select('*')
        .is('patient', null)
        .limit(1);
    if (roomError) {
        console.log(roomError);
        res.status(roomError.code);
        res.send(roomError);
    }
    const { data: putData, putError } = await supabase
        .from("room")
        .update({ patient: data[0].id })
        .eq("id", roomData[0].id)
        .select();
    if (putError) {
        console.log(putError);
        res.status(putError.code);
        res.send(putError);
    }
    res.status(200);
    res.send(putData);
});

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});