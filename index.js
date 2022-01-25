// // make a db.json server with a limit amount of file



const url = `https://api.nasa.gov/planetary/apod?api_key=${angelAPI}`
fetch(url)
    .then(r => r.json())
    .then(console.log)