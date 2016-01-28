// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
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

class TodoInput extends React.Component {

	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		if (!this.input.value) {
			return;
		}
		this.context.store.dispatch({
			type: 'ADD',
			id: uuid.v4(),
			text: this.input.value
		});
		this.input.value = "";
	}

	render() {
		return (
			<div>
	        	<input
	        		type="text"
	        		placeholder="Todo"
	        		ref={ (c) => {
	        			this.input = c;
	        		}}
	        		onKeyPress={ (e) => {
	        			if (e.key === 'Enter') {
	        				this.handleAdd();
	        			}
	        		}}
	        	/>
	        	<button onClick={this.handleAdd}>
	        		Add
	        	</button>
	        </div>
		);
	}
}
TodoInput.contextTypes = {
	store: React.PropTypes.object
};

class TodoList extends React.Component {
	componentDidMount() {
		this.unsubscribe = this.context.store.subscribe( () => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = this.context.store.getState();

		return (
			<div><ul>
        		{state.map( todo =>
        			<li key={todo.id}
        				onClick={ () => {
        					this.context.store.dispatch({
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
        	</ul></div>
	    );
	}
}
TodoList.contextTypes = {
	store: React.PropTypes.object
};

const App = () => (
	<div>
		<TodoInput />
		<TodoList />
	</div>
);

ReactDOM.render(
	<Provider store={createStore(todosReducer)}>
		<App />
	</Provider>,
    document.getElementById('app-root')
);
