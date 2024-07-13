const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({"message": "everything is okay"});
});

let arr = [];

app.get('/all', (req, res) => {
    res.send(arr);
});

app.get('/:id', (req, res) => {
    if(arr) {
        for(let i=0; i<arr.length; i++) {
            console.log(arr[i]);
            console.log(req.params.id);
            if(arr[i].id === Number(req.params.id)) {
                res.send(arr[i]);
            }
        }
    }

    res.send('Data is not exist for given id');
});

app.patch('/:id/:name', (req, res) => {
    if(arr) {
        for(let i=0; i<arr.length; i++) {
            console.log(arr[i]);
            console.log(req.params.id);
            if(arr[i].id === Number(req.params.id)) {
                arr[i].book_name = req.params.name;

                res.send('data updated successfully');
            }
        }
    }
});

app.delete('/:id', (req, res) => {
    if(arr) {
        for(let i=0; i<arr.length; i++) {
            console.log(arr[i]);
            console.log(req.params.id);
            if(arr[i].id === Number(req.params.id)) {
                console.log('Array before slice opeartion ==>>', arr);
                arr.splice(i, i);

                console.log('Array after slice opeartion ==>>', arr);
            }
        }
    }

    res.send('Data deleted successfully');
});


app.post('/', (req, res) => {
    const { id, book_name, book_desc, book_author, released_date} = req.body;

    if(!id || !book_name || !book_desc || !book_author || !released_date) {
        res.status(404).send('You send a missing value');
    }

    const obj = {
        id: id,
        book_name: book_name,
        book_desc: book_desc,
        book_author: book_author,
        released_date: released_date
    }

    for(let i=0; i<arr.length; i++) {
        if(arr[i].id === id) {
            res.send('Data Already Exist!');
        }
    }
    arr.push(obj);

    console.log(arr);
    res.send('Post book data');
}); 

app.listen(3000, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Project is listening at port 3000');
    }
});