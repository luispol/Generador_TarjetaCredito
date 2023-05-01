//Creación variables que indican a que elemento queremos acceder desde JavaScript hacia el codigo HTML
const tarjeta = document.querySelector('#tarjeta'),
    btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
    formulario = document.querySelector('#formulario-tarjeta'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre'),
    firma = document.querySelector('#tarjeta .firma p'),
    mesExpiracion = document.querySelector('#tarjeta .mes'),
    yearExpiracion = document.querySelector('#tarjeta .year'),
    ccv = document.querySelector('#tarjeta .ccv');

// Volteamos la tarjeta para mostrar el frente, en un dado caso el usuario tenga de vista la parte trasera de la tarjeta de crédito
const mostrarFrente = () =>{//Es una función tipo flecha
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

//Rotación de la tarjeta, por medio de la asignación de la clase active
tarjeta.addEventListener('click', () => {
    /**Le decimos en este apartado que haga una lista de las clases que tiene y que por medio de toggle
    si ya la tiene se la va a quitar, pero si no la tiene se la va a poner*/
    tarjeta.classList.toggle('active');
});

//Botón de abrir formulario
btnAbrirFormulario.addEventListener('click',() =>{
    //Agregamos la clase active al botón
    btnAbrirFormulario.classList.toggle('active');
    //Agregamos la clase active al formulario
    formulario.classList.toggle('active');
    //Quitamos por medio de toggle la clase ¨sombrio¨ creada en el html
    tarjeta.classList.toggle('sombrio');
    
})

//Ciclo for para el select del mes generado dinamicamente
for (let i=1; i <= 12; i++){
    //La siguiente de codigo nos permite crear un elemento, como si fuera una etiqueta, en este caso creamos la etiqueta de ¨option¨
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i; //Este innerText nos ayuda a trabajar con texto para trabajar en nuestro select
    formulario.selectMes.appendChild(opcion);//con el appndChild nos permite ponerle dentro del select nuesta opcion
}


//Ciclo for para el select del año generado dinamicamente
//Generamos una variable para sacar el año actual por medio de métodos de JavaScript
const yearActual = new Date().getFullYear();
for(let i=yearActual; i <= yearActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}


/*Bloque para poder realizar la funcion de generar un numero aletorio.
Se crea una función para poder generar un numero aleatorio para la tarjeta de crédito*/
function generarNumeroTarjeta() {
    // Generar los 16 dígitos aleatorios
    let numero = "";
    for (let i = 0; i < 16; i++) {
      numero += Math.floor(Math.random() * 10);
    }
  
    // Dividir los dígitos en grupos de 4
    numero = numero.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
    return numero;
  }

//Generacion de variables para mostrar y poder generar el número aleatorio 
  const btnGenerar = document.querySelector("#formulario-tarjeta button");
  const inputNumero = document.querySelector("#inputNumero");
  const numeroTarjeta = document.querySelector(".numero");

//Ejecución del btnGenerar para mostar el número aleatorio de la tarjeta de crédito
  btnGenerar.addEventListener("click", function() {
    event.preventDefault();
    mostrarFrente();
    const numeroGenerado = generarNumeroTarjeta();
    inputNumero.value = numeroGenerado;
    numeroTarjeta.textContent = numeroGenerado;
  });


//Input nombre de tarjeta, el valor de ¨e¨ nos permite acceder al valor del input
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    //Se recibe una expresión regular para poder eliminar los números y en caso que se encuentre un número lo va a reemplazar por nada.
    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    //Hacemos una condición para verificar si el nombre de la tarjeta esta vació
    if(valorInput == ''){
        nombreTarjeta.textContent = '-- --';
    }

    mostrarFrente();
});


//Código para el select del mes, el change sirve cada vez que haya un cambio en nuestro select
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

//Código para el select del año, el change sirve cada vez que haya un cambio en nuestro select
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2); //El único cambio es el método slice(2), que nos permite abreviar el año en solo dos dígitos
    mostrarFrente();
});

//Bloque de código para el ccv
formulario.inputCCV.addEventListener('keyup', () =>{
  /*Creamos una condición para verificar si la caja del ccv esta activa, en todo caso no este activa
  se le aggregará con el toggle y mostrará esta vez la parte de atrás*/
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }
    //El replace nos va a funcionar ejecutar una expresion regular para reemplazar lo que nosotros no queramos
    formulario.inputCCV.value = formulario.inputCCV.value
    //Elimina los espacios en blanco
    .replace(/\s/g,'')
    //Elimina las letras
    .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;
});

//Bloque de código para la Verificación si los campos estan vacios
const btnEnviar = document.getElementById('btnEnviar');
btnEnviar.addEventListener('click', validarFormulario);

function validarFormulario(evento) {
    evento.preventDefault(); // Detener el envío del formulario por defecto, para poder validar los datos
  
    const inputNombre = document.getElementById('inputNombre');
    const inputNumero = document.getElementById('inputNumero');
    const selectMes = document.getElementById('selectMes');
    const selectYear = document.getElementById('selectYear');
    const inputCCV = document.getElementById('inputCCV');
  
    /*Creación de condición para poder verificar si las caja de texto tengan contenido
    en el caso de las cajas del mes y el año, la misma condición verifica si es numero el input o si es letra*/
    if (inputNombre.value === '' || inputNumero.value === '' || isNaN(selectMes.value) || isNaN(selectYear.value) || inputCCV.value === '') {
      //Uso de la libreria Sweet Alert, para darle un estilo personalizado de un mensaje de advertencia
      swal({ 
        title: '¡Cuidado!',
        text: 'Completa todos los campos para generar la tarjeta',
        icon:'warning',
        button: 'Aceptar',
      });
      /*En caso los campos esten con contenidos y el año y el mes esten con números, se ejecutará un mensaje diciendo,
      que la tarjeta fue generada con exitó*/ 
    } else {
      //Uso de la librerira Sweet Alert, para darle un estilo dinamico y personalizado de un mesaje de exito
      swal({
        title: '¡Tarjeta creada exitosamente!',
        text: 'Registro enviado a base de datos',
        timer: 2100, // Especifica el tiempo que deseas que se muestre la alerta en milisegundos
        buttons: false, // Oculta los botones 'Aceptar' y 'Cancelar'
        icon: 'success'
        //Luego en este caso no se cumpla la condición, el siguiente proceso será de enviar el formulario
      }).then(function() {
        document.getElementById('formulario-tarjeta').submit();
      });
      
    }
  }