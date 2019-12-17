const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')


fetch('http://localhost:3000/toys').then(function (response) {return response.json()}).then(function (toys) {
  toys.forEach(function (toy) {
    appendToy(toy)
  })
})

function appendToy(toyObj){
const toyDiv = document.createElement('div')
    toyDiv.innerHTML = `
      <div>
        <h2>${toyObj.name}</h2>
        <img src=${toyObj.image} class="toy-avatar" />
        <p>${toyObj.likes} Likes </p>
        <button class="like-btn" data-id=${toyObj.id}>Like <3</button>
      </div> 
    `
    toyDiv.className = ("card")
    toyCollection.appendChild(toyDiv)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  let likes = 0

  let newToy={
    name: name,
    image: image,
    likes: likes
  }

  function createToy(newToy){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(newToy)
    })
    .then(function(resp){ return resp.json()})
    .then(function(newToy){appendToy(newToy)})
    }


    createToy(newToy)
  })

document.body.addEventListener('click', function (e) {
  if (e.target.className === 'like-btn') {
    e.target.previousElementSibling.innerText = parseInt(e.target.previousElementSibling.innerText) + 1 + ' Likes'
    // console.log(e.target.dataset.id)
    
    let toy = {
      id: e.target.dataset.id,
      likes: parseInt(e.target.previousElementSibling.innerText)
    }

    function updateToy(toy) {
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ "likes": toy.likes })
        }
      )
    }
    updateToy(toy)
  }
})






  