import { Todo } from "../classes";
import { todoList } from "../index"




//referencias en HTML


const divTodoList    = document.querySelector('.todo-list');

const newInput       = document.querySelector('.new-todo');

const btnBorrar      = document.querySelector('.clear-completed');

const ulFiltro       = document.querySelector('.filters')

const anchorFiltros  = document.querySelectorAll('.filtro')


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''  }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' :''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;


    
    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

//eventos
newInput.addEventListener('keyup', (event) =>{
    
    if ( event.keyCode === 13 && newInput.value.length > 0 ) {
        
        console.log(newInput.value);
        const nuevoTodo = new Todo( newInput.value );
        
        todoList.nuevoTodo( nuevoTodo );
       
        crearTodoHtml( nuevoTodo );

        newInput.value = '';
        
    }
})

divTodoList.addEventListener('click', (event) =>{

    const nombreElemento = event.target.localName;
    const todoElement    = event.target.parentElement.parentElement;
    const todoID         = todoElement.getAttribute('data-id');



    if ( nombreElemento.includes('input') ){

        todoList.marcarCompletado( todoID);
        
        todoElement.classList.toggle('completed')
    
    }  else if (nombreElemento.includes('button')){
        
        todoList.eliminarTodo( todoID );

        divTodoList.removeChild( todoElement );
    }

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length - 1; i>= 0; i-- ){
        const elemento = divTodoList.children[i];

        if ( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltro.addEventListener('click', (event) =>{
    console.log(event.target.text);

    const filtro = event.target.text;
    if ( !filtro ) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected')  );
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden')
                }
                break;


            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden')
                }
                break;

        }

    }
})