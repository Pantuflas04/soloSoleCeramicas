function popUp (){
const popup = document.getElementById('popup');

document.getElementById('openPopup').addEventListener('click', function () {

    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';

        popup.classList.add('fadeInTop');
    }
});

document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});
}

const productos = [
    {
        "id": 1,
        "nombre": "Maceta Frida 1",
        "precio": 19.99,
        "imagen": "../img/menu/Fridas_sola__1_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 1"
    },
    {
        "id": 2,
        "nombre": "Maceta Frida 2",
        "precio": 24.99,
        "imagen": "../img/menu/Fridas_sola__2_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 2"
    },
    {
        "id": 3,
        "nombre": "Maceta Frida 3",
        "precio": 29.99,
        "imagen": "../img/menu/Fridas_sola__4_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 3"
    },
    {
        "id": 4,
        "nombre": "Maceta Frida 4",
        "precio": 22.99,
        "imagen": "../img/menu/Fridas_sola__5_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 4"
    },
    {
        "id": 5,
        "nombre": "Maceta Frida 5",
        "precio": 27.99,
        "imagen": "../img/menu/Fridas_sola__6_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 5"
    },
    {
        "id": 6,
        "nombre": "Maceta Frida 6",
        "precio": 32.99,
        "imagen": "../img/menu/Fridas_sola__7_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 6"
    }
]

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;

    }
}

const productosInstancias = productos.map(({ id, nombre, precio, imagen }) => new Producto(id, nombre, precio, imagen));

const contenedorProductos = document.getElementById('contenedor-productos');

productosInstancias.map(producto => {
    contenedorProductos.innerHTML += `
    <div class="producto card">
    <img src="${producto.img}" alt="${producto.nombre}" class="card-img-top img-fluid">
    <div class="card-body">
        <h3>${producto.nombre}</h3>
        <p>${'$' + producto.precio.toFixed(2)}</p>
        <button class="btn btn-light" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>
</div>

    `;
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const agregarAlCarrito = (idProducto) => {

    let producto = encontrarProductoPorId(idProducto);

    if (producto) {

        let productoExistente = carrito.find(item => item.id === idProducto);

        if (productoExistente) {

            productoExistente.cantidad++;
        } else {

            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }


        actualizarCarritoUI();

        guardarCarritoEnLocalStorage();
    } else {
        console.error("Producto no encontrado");
    }
};

const encontrarProductoPorId = (idProducto) => {
    return productosInstancias.find(producto => producto.id === idProducto);
};

 

const actualizarCarritoUI = () => {
    const popupContent = document.querySelector('.popup-content');


    popupContent.innerHTML = '';


    if (carrito.length === 0) {
        popupContent.innerHTML = '<p>El carrito está vacío</p>';
    } else {

        totalPrecio = 0;
        carrito.forEach((item, index) => {
            const productoHTML = `
                <div class="carrito-item">
                    <div>
                        <span>${item.nombre}</span>
                        <span><strong>Cantidad:</strong> ${item.cantidad}</span>
                        <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            popupContent.innerHTML += productoHTML;


            totalPrecio += item.precio * item.cantidad;
        });


        document.getElementById('totalValue').textContent = totalPrecio.toFixed(2);
    }
};

// Inicializar totalPrecio desde localStorage o 0 si no existe
let totalPrecio = parseInt(localStorage.getItem('totalPrecio')) || 0;

// Función para eliminar un producto del carrito
// Función para eliminar un producto del carrito
const eliminarDelCarrito = (index) => {
    const producto = carrito[index];
    const precioEliminado = producto.precio;

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    totalPrecio -= precioEliminado;

    // Guardar totalPrecio en localStorage utilizando .setItem
    localStorage.setItem('totalPrecio', totalPrecio.toString());

    // Eliminar totalPrecio del localStorage si es 0
    if (totalPrecio === 0) {
        localStorage.removeItem('totalPrecio');
    }

    actualizarCarritoUI();
    guardarCarritoEnLocalStorage();

    document.getElementById('totalValue').textContent = totalPrecio >= 0 ? totalPrecio.toFixed(2) : '0.00';
};

const borrarCarrito = () => {
    // Vaciar el array del carrito
    carrito = [];

    // Reiniciar el totalPrecio a cero
    totalPrecio = 0;

    // Actualizar la interfaz de usuario y guardar el carrito actualizado en localStorage
    actualizarCarritoUI();
    guardarCarritoEnLocalStorage();

    // Utilizar .clear() para borrar todo el contenido del localStorage
    localStorage.clear();

    // Actualizar la suma de precios en el frontend
    document.getElementById('totalValue').textContent = '0.00';
};

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

popUp();
agregarAlCarrito(1);
actualizarCarritoUI();