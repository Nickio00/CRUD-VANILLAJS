let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    curso: '',
    dni: '',
    
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const cursoInput = document.querySelector('#curso');
const dniInput = document.querySelector('#dni');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) { /*codigo para validar los campos*/
    e.preventDefault();

    if (nombreInput.value === '' || cursoInput.value === '' || dniInput.value === '') {
        alert('Todos los campos se deben llenar');
        return; 
    }

    if (editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.curso = cursoInput.value;
        objEmpleado.dni = dniInput.value;

        agregarEmpleado();
    }
}

function guardarlocalStorage(listaEmpleados){
    localStorage.setItem('alumnos', JSON.stringify(listaEmpleados))
}

function obtenerlocalStorage(){
    listaEmpleados=JSON.parse(localStorage.getItem('alumnos'))
    mostrarEmpleados()
}

function agregarEmpleado() {  /*agregar a los alumnos*/

    listaEmpleados.push({ ...objEmpleado });

    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {   /*vaciar label una vez presionado el boton*/
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.curso = '';
    objEmpleado.dni = '';
}

function mostrarEmpleados() { /*mostrar datos ingresados*/
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');

    /*validar botones editar y eliminar*/
    listaEmpleados.forEach(empleado => {         
        const { id, nombre, curso, dni } = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${curso} - ${dni} `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) { /*cargar datos empleados*/
    const { id, nombre, curso, dni } = empleado;

    nombreInput.value = nombre;
    cursoInput.value = curso;
    dniInput.value = dni;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() { /*actualizar datos*/

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.curso = cursoInput.value;
    objEmpleado.dni = dniInput.value;

    listaEmpleados.map(empleado => {

        if (empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.curso = objEmpleado.curso;
            empleado.dni = objEmpleado.dni;

        }

    });

    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()
    
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEmpleado(id) { /*eliminar*/

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()
}

function limpiarHTML() { 
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

obtenerlocalStorage()