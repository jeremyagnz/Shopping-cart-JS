
const carClicked = ()=>{
    document.getElementById('subm').classList.toggle('show-content');
}

document.getElementById('car').addEventListener('click', carClicked);



/* Variables */

const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



cargarEventListener();
function cargarEventListener(){
    /* Agregar curso, presionando "Agregar al carrito" */
    listaCursos.addEventListener('click', agregarCurso);

    /* Elimina cursos del carrito */
    carrito.addEventListener('click', eliminarCurso);

    /* Vaciar El carrito */
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];

        limpiarHTML();
    })
}

/* Funciones */
function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}


/* Eliminar curso del carrito */
function eliminarCurso(e){
   if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        /* Eliminar del arreglo articulosCarrito por el ID */
        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId);

        carritoHTML();
   }

}

/* Lee el contenido del HTML y extraee */
function leerDatosCursos(curso){
   /*  console.log(curso) */

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio p').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1,

    }

    /* Revisa si un elemento ya existe en el carrito */
    const existe = articulosCarrito.some(curso => curso.id ===  infoCurso.id);
    if(existe){
        /* Actualizamnos cantidad */
        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===  infoCurso.id){
                curso.cantidad++;    
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
         

    }else{
        /* Agregar elemntos al Aarray carrito */
        articulosCarrito = [...articulosCarrito,  infoCurso];
        
    }


  
   console.log(articulosCarrito);

   carritoHTML();
}

/* Muestra el objetos en el carrito  */
function carritoHTML(){

    /* limpiar html */
    limpiarHTML();

    /* Recorre carrito y genere el HTML */
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" with="50" height="50">
            </td>
            <td> ${titulo}</td>
            <td> ${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X  </a>
            </td>
        `;

        /* ADD HTML DEL CARRITO EN EL TBODY */
        contenedorCarrito.appendChild(row);
    })
}

/* delete curse from tbody */
function limpiarHTML(){
   /*  contenedorCarrito.innerHTML = ''; */

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}