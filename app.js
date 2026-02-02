const express = require('express'); //import express lib
const app = express(); //create express app
const port = 3000; //set port

//middleware for JSON parsing
app.use(express.json());
app.use(express.static('public')); //serve static files from public folder
app.use(express.urlencoded({ extended: true })); //allow express to read form data

//navigation bar
function NavBar(title, body) {
    const serverTime = new Date().toLocaleString(); //get server time, CHATGPT
    return `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<title>${title}</title>
</head>
<body>
<!-- navigation bar -->
<nav class="navbar navbar-expand-lg navbar-light justify-content-between" style="background-color: #e3f2fd;">
    <div class="container-fluid">
    <div class="align-items-center">
    <a class="navbar-brand"><b>Kaelynn Fong</b></a>
    <img src="/kaepic.png" alt="Pic" style="width:40px;" class="rounded-pill">
    </div>
    <ul class="navbar-nav">   
        <li class="nav-item">
        <a class="nav-link btn btn-outline-light" href="/">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link btn btn-outline-light" href="/about">About</a>
        </li>
        <li class="nav-item">
        <a class="nav-link btn btn-outline-light" href="/contact">Contact me</a>
        </li>
        <li class="nav-item">
        <a class="nav-link btn btn-outline-light" href="/travelList">All my Travels</a>
        </li>
        <li class="nav-item">
        <a class="nav-link btn btn-outline-light" href="/comment">Comments</a>
        </li>
    </ul>
    <form class="form-inline d-flex" role="search" action="/search" method="GET">
    <input class="form-control me-2" type="search" name="a" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-secondary" type="submit">Search</button>
        </form>
    </div>
</nav>
${body}</body>
<div class="container">
    <footer class="text-center py-3 my-4 border-top">
    <div class="d-flex justify-content-center">
    <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">kae</a>
    <span class="text-muted">© 2025 Fong Kai Yun Kaelynn</span>
    </div>
    <div class="text-muted small">Last updated: ${serverTime}</div></footer></div>
</html>
`
} //to easily call navbar for every route

//search route
app.get('/search', (req, res) => {
    const searchs = (req.query.a || '').toLowerCase(); //converts search termto lowercase, if nothing is entered then defaults to ''
    const foundTravel = travelList.find(travel => travel.title.toLowerCase().includes(searchs)); //searches travel list and converts to lowercase

    // Redirect to matching route if keyword matches one that exists
    if (searchs === 'home') return res.redirect('/'); //redirects to home
    if (searchs === 'about') return res.redirect('/about'); //redirects to about
    if (searchs === 'contact') return res.redirect('/contact'); //redirects to contact
    if (searchs === 'travels' || searchs === 'travel') return res.redirect('/travelList'); //redirects to travel
    if (searchs === 'addtravel' || searchs === 'add') return res.redirect('/addtravel'); //redirects to addtravel
    if (foundTravel) return res.redirect('/travelList'); //redirects to travel if any keyword is found

    res.send(`<h1>No page found for "${searchs}"</h1><a href="/">Back to Home</a>`);

});     //redirects to home page if nothing is found


//home route
app.get('/', (req, res) => {
    res.send( //css styling
        `
    <style>
    h1 {text-align: center;
    font-family: 'arial';
    }
    .card {width: 500px;
    text-align: center;
    margin: auto;
    padding: 20px;
    }
    </style> 
    ${NavBar("Home",
            `<style>
        h1, h4 {font-family: 'arial'; text-center;}
        .homepage {background-image: url(homepage.jpg); background-size: contain; height: 100vh;}
        </style>
        <div class="homepage d-flex justify-content-center align-items-center">
        <div class="card">
        <h1 class="card-title">Kaelynn Fong's Travel Blog</h1><br><br>
        <h4 class="card-text">Welcome to my travel blog! This is a blog of my favorite travel destinations from 2024 onwards. It is still ongoing, but most of these trips are trips with friends, which I appreciate. So shoutout to the friends I trust enough to go on long trips with, to more years of friendship!</h4>
</div></div>
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/51v7yO07BdGgP6hv0OaDe2?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        `)}
    `
    );
});

//about route
app.get('/about', (req, res) => {
    res.send(
        `
    ${NavBar('About', `
    <style>
    .card{width: 500px;
    text-center;
    }
    .aboutpage{
    margin-top: 50px;
    background-image: url(aboutpage.jpg);
    height: 100vh;
    }
    </style>
    <div class="aboutpage d-flex justify-content-center align-items-center" >
        <div class="card">
            <div class="card-body">
        <h1 class="card-title ">About Me</h1>
        <h4 class="card-text mt-4">I am a student studying at Republic Polytechnic, and my course is the Diploma in Digital Design and Development.</h4>
        </div></div></div>`)}
    `
    );
});

//contact route, with mailto email link
app.get('/contact', (req, res) => {
    res.send(
        `
    ${NavBar('Contact', `
    <style>
    .card{width: 500px;
    text-align: center;
    background-color: lightblue;
    }
    .contactpage{
    margin-top: 50px;
    background-image: url(contactpage.jpg);
    height: 100%;
    }
    </style>
    <div class="contactpage d-flex justify-content-center align-items-center">
        <div class="card">
            <div class="card-body">
        <h1 class="card-title">Reach out to me</h1>
        <h4 class="card-text mt-4 mb-4">You can contact me <a href="mailto:24041225@myrp.edu.sg"onclick="return confirm('This will bring you to my email. Continue?')"">here</a></h4>
    </div></div></div>`)}`
    );
})

let allcomments = []; //array to store "all" comments
let allcomments2 = {}; //array to store comments for each travel
//comment route
app.get('/comment', (req, res) => {
    let comments = ''; //variable to store comments
    for (let i = 0; i < allcomments.length; i++) { //generates bootstrap cards
        comments += `
        <style>
        .card-text{
        text-align: center;
        background-color: lightblue;
        }
    }</style>
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-12">
                        <div class="card-body">
                            <p class="card-text">${allcomments[i]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    res.send(`
        ${NavBar('Comment', `
            <style>
            h1, h5 {font-family: 'arial'; text-align: center;}
            .card{text-align: center; font-family: 'arial';}
            </style>
            <h1><b>All Comments</b></h1>
            ${comments} <br><br><br>
            <h5>Add a comment here!</h5> <!--comment form-->
    <div class="card h-100">
        <div class="card-body">
            <form action="/comment" method="POST">
            <input type="text" name="comment" placeholder="Add a comment">
            <button type="submit">Submit</button><br><br>
            </form></div></div>
            `)}
            `)
})

app.post('/comment', (req, res) => {
    let comment = req.body.comment;
    if (comment) {
        allcomments.push(comment)
    }
    res.redirect('/comment')
})

app.get('/addcomments/:id', (req, res) => {
    const travelId = parseInt(req.params.id);
    let comments = '';
    if (!allcomments2[travelId]) {
        allcomments2[travelId] = []; // Initialize it as an empty array if undefined
    }
    for (let i = 0; i < allcomments2[travelId].length; i++) {
        comments += `
        <style>
        .card-text{
        text-align: center;
        background-color: lightblue;
    }</style>
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-12">
                        <div class="card-body">
                            <p class="card-text">${allcomments2[travelId][i]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    res.send(`
        ${NavBar('Comment', `
            <style>
            h1, h5 {font-family: 'arial'; text-align: center;}
            .card{text-align: center; font-family: 'arial';}
            </style>
            <h5>Add a comment here!</h5>
    <div class="card h-100">
        <div class="card-body">
            <form action="/addcomments/${travelId}" method="POST">
            <input type="text" name="addcomment" placeholder="Add a comment">
            <button type="submit">Submit</button>
            </form><div class="view comments text-center">
            ${comments}</div>
            <div><br><br>
            <a href="/viewtravel/${travelId}" class="d-flex btn btn-outline-secondary" style="color:black; text-align: center; justify-content: center;">Back to Travel List</a></div>
            `)}
            `);
});

app.post('/addcomments/:id', (req, res) => {
    const travelId = parseInt(req.params.id);
    let addcomment = req.body.addcomment;

    if (addcomment.trim() !== "") {
        allcomments2[travelId].push(addcomment)
    }
    res.redirect(`/addcomments/${travelId}`)
})

//shows travel entries on page
let travelList = [
    { id: 1, title: 'Japan', area: "Osaka, Kyoto, Nara, Kobe", year: '2024', with: "Friends", description: "This was the first time I went to Japan, or any other country without my parents or an adult. I loved it! <br><br>I was on a mission to find pokemon manhole lids (pokelids).", image: "/japanday1.jpg", comment: "" },
    { id: 2, title: 'Korea', area: "Seoul, Nami Island", year: '2024', with: "Family", description: "I went to Korea for the second time with my parents. <br><br>The first time I saw snow and tried skiing.", image: "/koreaday1.jpg", comment: "" },
    { id: 3, title: 'Malaysia ', area: "Genting Highlands, Johor Bahru", year: '2025', with: "Friends", description: "I went to Genting Skyworld for the first time, after looking at it from afar since young.", image: "/genting.jpg", comment: "" },
    { id: 4, title: 'Bangkok', area: "Bangkok", year: '2025', with: "Friends", description: "I went to Bangkok for the first time with my friends. It was a fun trip! <br><br>I got food poisoning from oysters though..", image: "/bkk1.jpg", comment: "" },
];

//id counter
let count = 1;
for (let i = 0; i < travelList.length; i++) {
    if (travelList[i].id >= count) {
        count = travelList[i].id + 1;
    }
}

//travel list
app.get('/travelList', (req, res) => {
    //generates booststrap cards for each entry
    let list = '';
    for (let i = 0; i < travelList.length; i++) {
        list +=
            `
        <style>
        .card-img-top {
        height: 250px;
        object-fit: cover;
        }
        .card{
        text-align: center;
        margin: auto;
        padding: 20px;
        }
        .routebuttons{
        background-color: white; height: 100px;
        }
        </style>
        <div class="col-md-3 mb-3">
        <div class="card h-100">
            <img src="${travelList[i].image}" alt="${travelList[i].title}: ${travelList[i].area}" class="card-img-top" style="align-items: center;">
        <div class="btn-group btn-group-lg" role="group" aria-label="Travel actions">
        <div class="card-title">
        <h4>${travelList[i].title}</h4><br><h5>${travelList[i].area} - (${travelList[i].year}) <br>with ${travelList[i].with}<br><br></h5>
        <div class="card-body">
        <div class="routebuttons d-flex justify-content-center align-items-center">
            <a href="/edittravel/${travelList[i].id}" class="active btn btn-outline-secondary me-2">Edit</a>
            <form action="/deletetravel/${travelList[i].id}" method="POST">
                <button type="submit" class="active btn btn-outline-secondary">Delete</button>
            </form><br><br></div>
            <div class="view-travel text-center">
            <a href="/viewtravel/${travelList[i].id}" class="active btn btn-outline-secondary btn-sm">View Travel Details</a>
        </div><br><br>
        </div></div></div></div></div><br><br>
        `;
    } //edit, delete, view
    //separated from the rest, add button is here
    list += `

<div class="d-grid gap-2">
    <h4>Add new Travel</h4>
    <a href="/addtravel" class="btn btn-success mt-3" button class="btn btn-primary" type="button">Add</a>
    </div>
</div>
</div>
</div>
`;
    res.send(`
        ${NavBar('Travel List', ` 
        <style>
    .card-img-top {
    height: 250px;
    object-fit: cover;
    }
    h1 {
    align-items: center;}
    </style>

    <div class="container mt-4">
        <h1 style="margin-left: 10px;">Travel List</h1><div class="row">${list}</div><br></div>
        `)}
    
    `);
});

//view details route
app.get('/viewtravel/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const travel = travelList.find(travel => travel.id === id);

    //if not found, shows this error
    if (!travel) {
        return res.send(`<p>Travel journey not found. </p><a href="/travelList">Back to Travel List</a>`);
    }
    let commentsA = ''; //stores html for comments
    if (allcomments2[id] && allcomments2[id].length > 0) { //check if there are any comments, and the comment list is not empty
        for (let i = 0; i < allcomments2[id].length; i++) { //loop through allcomments2 for this travel id
            commentsA += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="card-body">
                    <p class="card-text" style="text-align: center; background-color: lightblue">${allcomments2[id][i]}</p> <!--loops through allcomments2 for current travel id and creates bootstrap cards based on each comment-->
                        </div>
                    </div>`;
        }
    } else {
        commentsA = 'No comments yet';
    }

    res.send(`
        ${NavBar('View Travel Details', `
            <style>
            h1{
            font-family: 'arial'; font-size: 40px; text-align: center;
            }
            </style>
            <h1>Description</h1>
            <div class="card h-100" style="text-align: center; font-family: 'arial';"> <!--card for travel details, h-100 on all cards below-->
                <div class="card-body">
            <img src="${travel.image}" alt="${travel.title}: ${travel.area}" width="200"><br><br>
            <h6>${travel.description}</h6><br><br>
        <h4>Comments: ${commentsA}</h4>
        <div class="view comments text-center">
            <a href="/addcomments/${travel.id}" class="active btn btn-outline-secondary btn-sm">Add Comment</a><br><br>
            <a href="/travelList" class="d-flex btn btn-outline-secondary" style="color:black; text-align: center; justify-content: center;">Back to Travel List</a></div></div>
        `)}
    `);
});

//add travel form
app.get('/addtravel', (req, res) => {
    //form for user to add details for a new trip
    res.send( //image field has file input, but does not work due to no file handling/database
        `${NavBar('Add Travel', `
    <h1 style="font-family: 'arial'; font-size: 40px; text-align: center;">Add a travel country</h1>
    <div class="card h-100" style="text-align: center; font-family: 'arial';>
        <div class="card-body">
    <form action="/addtravel" method="POST">
        Image: <input type="file" name="image"><br><br>
        Travel Title: <input name="title" placeholder="Travel Country" required/> <br><br>
        Area: <input name="area" placeholder="Area" required/> <br><br>
        Year: <input name="year" placeholder="Year of Travel" required/> <br><br>
        With: <input name="with" placeholder="Who" required/> <br><br>
        Description: <input name="description" placeholder="Description" required/> <br><br>
        <button type="submit">Add Travel</button><br><br>
    </form>
    <a href="/travelList" class="d-flex btn btn-outline-secondary" style="color:black; text-align: center; justify-content: center;">Back to Travel List</a></div></div>`)}
    
`);
})


//add travel post route
app.post('/addtravel', (req, res) => {
    //creates new travel entry from form
    const newId = {
        id: count++, //keeps incrementing
        title: req.body.title,
        area: req.body.area,
        year: req.body.year,
        with: req.body.with,
        description: req.body.description,
        image: req.body.image
    }
    travelList.push(newId); //pushing all new info into newId
    res.redirect('/travelList'); //redirects to travelList
});

//delete travel post route
app.post('/deletetravel/:id', (req, res) => {
    const id = parseInt(req.params.id); //id from url then changes to int
    travelList = travelList.filter(t => t.id !== id);//finds for matching id from travelList, then uses filter() to return new array excluding the one to delete
    delete allcomments2[id]; //CHATGPT, so that comments can get deleted along with travel entry
    res.redirect('/travelList'); //redirects to travelList
});

//edit travel form page
app.get('/edittravel/:id', (req, res) => {
    const id = parseInt(req.params.id); //id from url then changes to int
    const travel = travelList.find(travel => travel.id === id); //looks through travelList for the id, stores that object in the variable travel

    //if route not found, shows this error
    if (!travel) {
        return res.send(`<p>Travel journey not found. </p><a href="/travelList">Back to Travel List</a>`);
    }
    //pre-filled form for user to edit details
    res.send(//image field has file input, but does not work due to no file handling/database  
        `${NavBar("Edit Travel", `
    <h1 style="font-family: 'arial'; font-size: 40px">Edit Travel</h1>
    <div class="card h-100" style="text-align: center; font-family: 'arial';>
        <div class="card-body">
            <form action="/edittravel/${travel.id}" method="POST">
            <img src="${travel.image}" alt="Current Image" width="200"><br><br>
            New image: <input type="file" name="image"><br><br>
            Travel Title: <input name="title" value="${travel.title}" required/> <br><br>
            Area: <input name="area" value="${travel.area}" required/> <br><br>
            Year: <input name="year" value="${travel.year}" required/> <br><br>
            With: <input name="with" value="${travel.with}" required/> <br><br>
            Description: <input name="description" value="${travel.description}" required/> <br><br>
            <button type="submit">Update Travel</button>
    </form><br><br>
    <a href="/travelList" class="d-flex btn btn-outline-secondary" style="color:black; text-align: center; justify-content: center;">Back to Travel List</a></div></div>
    </div></div>
    `)}
    `);
});

//edit travel POST route
app.post('/edittravel/:id', (req, res) => {
    const id = parseInt(req.params.id); //id from url
    const { title, image } = req.body;


    for (let i = 0; i < travelList.length; i++) {
        if (travelList[i].id === id) {
            travelList[i].title = req.body.title;
            travelList[i].area = req.body.area;
            travelList[i].year = req.body.year;
            travelList[i].with = req.body.with;
            travelList[i].description = req.body.description;

            //only updates image if there is one
            if (image) {
                travelList[i].image = image;
            }
            break;
        }
    }
    res.redirect('/travelList');
})

//starts web server on localhost:3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); //confirmation in terminal
});

module.exports = app;