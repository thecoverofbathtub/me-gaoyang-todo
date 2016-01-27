// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import uuid from 'uuid'

const todoReducer = (item, action) => {
	switch (action.type) {
		case 'ADD':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE':
			if (item.id !== action.id) {
				return item;
			}
			return {
				...item,
				completed: !item.completed
			};
		default:
			return item;
	}
};

const todosReducer = (items = [], action) => {
	switch (action.type) {
		case 'ADD':
			return [...items, todoReducer(undefined, action)];
		case 'TOGGLE':
			return items.map(item => { return todoReducer(item, action); });
		default:
			return items;
	}
};

const store = createStore(todosReducer);

class App extends React.Component {
	setDate(data) {
		this.setSta
	}
    render() {
    	console.log("Called render()");
        return (
        	<div>
	        	<input
	        		type="text"
	        		placeholder="Todo"
	        		ref={ (c) => { this.input = c; }
	        	} />
	        	<button onClick={ () => {
	        		store.dispatch({
	        			type: 'ADD',
	        			id: uuid.v4(),
	        			text: this.input.value
	        		});
	        		this.input.value = "";
	        	}}>
	        		Add
	        	</button>
	        	<ul>
	        		{this.props.data.map( todo =>
	        			<li key={todo.id}
	        				onClick={ () => {
	        					store.dispatch({
	        						type: 'TOGGLE',
	        						id: todo.id
	        					})
	        				}}
	        				style={{
	        					textDecoration:
	        						todo.completed ? 'line-through' : 'none'
	        				}}>
	        				{todo.text}
	        			</li>
	        		)}
	        	</ul>
	        </div>
        );
    }
}

const renderAll = () => {
	ReactDOM.render(
		<App data={store.getState()} />,
	    document.getElementById('app-root')
	);
};

store.subscribe(() => {
	console.log(store.getState());
	renderAll();
});
renderAll();