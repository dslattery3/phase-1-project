let apiDemo = 'DEMO_KEY'
const url = `https://api.nasa.gov/planetary/apod?api_key=`

const subForm = document.getElementById('submit-section')
subForm.addEventListener('submit', e => {
    e.preventDefault()
    const apiKey = document.getElementById('apiKey').value
//fetch 10 photos from NASA API
    fetch(url+`${apiKey}`+'&count=1' //{
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
    )
    .then(r => r.json())
    .then(arr => arr.forEach(renderPhoto))
})

function renderPhoto(obj){
    if (obj.media_type = 'image'){
        console.log(obj)
        const newImg = document.createElement('img')
        const gallery = document.getElementById('gallery-section')
        //check for hdurl or url
        newImg.src = obj.hdurl
        newImg.alt = obj.title
        newImg.addEventListener('click', e => {
            console.log(e.target)
            showPhoto(obj)

        })
        gallery.appendChild(newImg)
    }
}

function showPhoto(obj){
    //info needed:
    //explanation, date, hdurl, title, 
    const photoDate = obj.date
    const photoExplanation = obj.explanation
    const photoHDUrl = obj.hdurl
    const photoTitle = obj.title
    const imageCard = document.getElementById('image-section')
    console.log(obj)    
    
}


//Important
//Img

// {date: '1995-07-08', explanation: 'July 8, 1995   Damage to Apollo 13  Picture Credit…ghted to Robert J. Nemiroff and Jerry T. Bonnell.', hdurl: 'https://apod.nasa.gov/apod/image/a13_servicemod.gif', media_type: 'image', service_version: 'v1', …}
// date: "1995-07-08"
// explanation: "July 8, 1995   Damage to Apollo 13  Picture Credit: NASA, Crew of Apollo 13 Explanation:  In April of 1970, after an oxygen tank exploded and damaged their service module, the Apollo 13 astronauts were forced to abandon their plans to make the third manned lunar landing. The extent of the damage is revealed in this photo, taken as the crippled module was drifting away - jettisoned prior to their reentry and eventual safe splashdown. An entire panel on the right side of the module is seen to have been blown away and damage to internal structures is apparent.  For more information about the picture see the NASA photo caption.  We keep an archive of Astronomy Pictures of the Day.   Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert J. Nemiroff and Jerry T. Bonnell."
// hdurl: "https://apod.nasa.gov/apod/image/a13_servicemod.gif"
// media_type: "image"
// service_version: "v1"
// title: "Damage to Apollo 13"
// url: "https://apod.nasa.gov/apod/image/a13_servicemod.gif"