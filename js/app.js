console.log('Conectado!!!')
let carrito = {}
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templatecard = document.getElementById('template-card').content
const templatefooter = document.getElementById('template-footer').content
const templatecarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', e => {
    cargaDatosbd()
})

cards.addEventListener('click', e => {
    //console.log('e', e)
    addCarrito(e)
})

const addCarrito = e => {
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    const producto = {
        id: item.querySelector('button').dataset.id,
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
    //console.log('producto', producto, carrito)
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templatecarrito.querySelector('th').textContent = producto.id
        
        const clone = templatecarrito.cloneNode(true)
        fragment.appendChild(clone)
        
    })
    items.appendChild(fragment)
}



const cargaDatosbd = async () => {
    const res = await fetch('../db/api.json')
    const data = await res.json()
    pintarCards(data)
    //console.log('respuesta', data)
}

const pintarCards = (data) => {
    data.forEach(item => {
        console.log(item)
        templatecard.querySelector('h5').textContent = item.title
        templatecard.querySelector('p').textContent = item.precio
        templatecard.querySelector('button').dataset.id = item.id
        templatecard.querySelector('img').setAttribute("src", item.imageUrl)
        const clone = templatecard.cloneNode(true)
        fragment.appendChild(clone)

    })
    cards.appendChild(fragment)
}