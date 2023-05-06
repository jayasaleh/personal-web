const testimonialData = [
    {
        name: "Anette Scott",
        comment: "Saya wibu",
        rating: 1,
        image: "https://images.unsplash.com/photo-1544507888-56d73eb6046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlb3BsZSUyMHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Alley Vinicius",
        comment: "Saya suka makan ayam goreng",
        rating: 1,
        image: "https://images.unsplash.com/photo-1482849297070-f4fae2173efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Jaya Saleh",
        comment: "Saya sangat senang ketika coding golang",
        rating: 5,
        image: "./assets/foto/people.jpeg"
    },
    {
        name: "Kevin",
        comment: "Saya bukan patrik",
        rating: 4,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
]
function showTestimonial() {
    let testimonialForHtml = ``

    testimonialData.forEach((item) => {
        testimonialForHtml += `<div class="card">
        <img src="${item.image}" alt="img-card" class="img"/>
        <i><p class="quote">${item.comment}</p></i>
        <p class="nama"> - ${item.name} </p>
        <p class="nama"> ${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>`
    })

    document.getElementById("testimonial").innerHTML += testimonialForHtml
}
showTestimonial()
// function for filtering testimonials
function filterTestimonials(rating) {
    let testimonialForHtml = ''

    const dataFiltered = testimonialData.filter(function (data) {
        return data.rating === rating
    })
    console.log(dataFiltered)

    if(dataFiltered.length === 0) {
        testimonialForHtml = `<h3>Data not found ! </h3>`
    } else {
        dataFiltered.forEach((data) => {
            testimonialForHtml += `<div class="card">
            <img src="${data.image}" alt="img-card" class="img"/>
            <i><p class="quote">${data.comment}</p></i>
            <p class="nama"> - ${data.name} </p>
            <p class="nama"> ${data.rating}</p>
        </div>`
        })
    }

    document.getElementById("testimonial").innerHTML = testimonialForHtml
}