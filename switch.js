
const h11       = document.getElementById('h1')
const switche   = document.getElementById('onoff')
const inputE    = document.querySelectorAll('.subtask-label')

const tareas    = document.querySelectorAll('.form__tarea')
const deleteBs  = document.querySelectorAll('.toDo__btn2')
const cardFooter= document.querySelectorAll('.card-footer')

const luz1 = document.getElementById('luz1');
const luz2 = document.getElementById('luz2');
const luz3 = document.getElementById('luz3');
const luz4 = document.getElementById('luz4');
const luz5 = document.getElementById('luz5');
document.getElementById('onoff').addEventListener('change', cambio);      
 //funcion para cambiar el modo 
function cambio() {
const elementToHide    = document.getElementById('light-on');
const elementToHide2   = document.getElementById('light-off');
const luces            = [luz1, luz2, luz3, luz4, luz5];

if (this.checked) {
    elementToHide.style.display   = 'none';
    elementToHide2.style.display  = 'block';
    elementToHide2.style.color    = 'yellow';
    elementToHide2.style.filter   = 'drop-shadow(40px 40px 100px yellow)';
    switche.classList.add('on');
    h11.style.color="black";
  
    
        // Cambia el color de fondo de todos los elementos con la clase "mi-elemento"
        inputE.forEach((elemento)       => {
            elemento.style.color = 'black';
        });
    tareas.forEach((elemento)       => {
        elemento.style.color = 'black';
    });
    // deleteBs.forEach((elemento)     => {
    //     elemento.style.color = 'black';
    // });
    cardFooter.forEach((elemento)   => {
        elemento.style.color = 'black';
    });
    luces.forEach(luz               => {
        luz.style.display = 'block';
        luz.classList.remove('slide-out');

        void luz.offsetWidth;
        luz.classList.add('slide-in');
    });
} else {
    elementToHide.style.display   = 'block';
    elementToHide2.style.display  = 'none';
    elementToHide2.style.color    = 'black';
    switche.classList.remove('on');
    h11.style.color="white";
    
    inputE.forEach((elemento)       => {
        elemento.style.color = 'white';
    });
    
    tareas.forEach((elemento)       => {
        elemento.style.color = 'white';
    });
    // deleteBs.forEach((elemento)     => {
    //     elemento.style.color = 'white';
    // });
    cardFooter.forEach((elemento)   => {
        elemento.style.color = 'white';
    });

    luces.forEach(luz               => {
        luz.classList.remove('slide-in');
        // Forzar reflujo para reiniciar la animación
        void luz.offsetWidth;
        luz.classList.add('slide-out');
        luz.addEventListener('animationend', () => {
            luz.style.display = 'none';
        }, { once: true });
    });
}
};