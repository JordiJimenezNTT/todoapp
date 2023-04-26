import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del Capitán América')
];

initialState[0].completado = true;
initialState[1].completado = true;
initialState[2].completado = true;
initialState[3].completado = true;
initialState[0].id += 1;
initialState[1].id += 2;
initialState[2].id += 3;
initialState[3].id += 4;

const _todoReducer = createReducer(initialState,
  on(actions.crear, (state, {texto}) => [...state, new Todo(texto)]), // Spread operator para no trabajar por referencia con el nuevo estado
  on(actions.borrar, (state, {id}) => state.filter( todo => todo.id !== id )),
  on(actions.toggle, (state, {id}) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {...todo, completado: !todo.completado};
      }
      return todo;
    });
  }),
  on(actions.toggleAll, (state, {completado}) => state.map(
    todo => {
      return {...todo, completado: completado};
    }
  )),
  on(actions.editar, (state, {id, texto}) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {...todo, texto: texto};
      }
      return todo;
    });
  }),
  on(actions.borrarCompletados, (state) => state.filter(todo => !todo.completado)),
);

export function todoReducer(state:any, action:any) {
  return _todoReducer(state, action);
}

