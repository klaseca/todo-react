import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.css";
import { Provider } from "../../Context";
import MainForm from "../MainForm";
import TrashForm from "../TrashForm";

export default class App extends Component {
	addListItem = () => {
		this.setState(({ todos }) => {
			const uuid = ([1e7] + -1e3).replace(/[018]/g, c =>
				(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] / 4)).toString(16)
			);
			const newTodo = {
				id: uuid,
				text: this.state.value,
				isCompleted: false,
				isEditable: false
			};

			const newTodos = [...todos, newTodo];

			localStorage.todos = JSON.stringify(newTodos);

			return { todos: newTodos, value: "" };
		});
	};

	setValue = ({ target: { value } }) => {
		this.setState(() => {
			return { value };
		});
	};

	setEditValue = ({ target: { value } }) => {
		this.setState(() => {
			return { editValue: value };
		});
	};

	removeListItem = id => {
		this.setState(({ todos, trash }) => {
			const newTodos = todos.filter(elem => {
				return elem.id !== id;
			});

			const removeItem = todos.find(elem => {
				return elem.id === id;
			});

			const newTrash = [...trash, removeItem];

			localStorage.todos = JSON.stringify(newTodos);
			localStorage.trash = JSON.stringify(newTrash);

			return { todos: newTodos, trash: newTrash };
		});
	};

	editListItem = id => {
		this.setState(({ todos }) => {
			const newTodos = [...todos];
			const todoIndex = todos.findIndex(elem => {
				return elem.id === id;
			});

			newTodos[todoIndex].isEditable = true;

			return { todos: newTodos, editValue: todos[todoIndex].text };
		});
	};

	saveEditItem = id => {
		this.setState(({ todos, editValue }) => {
			const newTodos = [...todos];
			const todoIndex = todos.findIndex(elem => {
				return elem.id === id;
			});

			newTodos[todoIndex].text = editValue;
			newTodos[todoIndex].isEditable = false;

			localStorage.todos = JSON.stringify(newTodos);

			return { todos: newTodos, editValue: "" };
		});
	};

	notSaveEditItem = id => {
		this.setState(({ todos }) => {
			const newTodos = [...todos];
			const todoIndex = todos.findIndex(elem => {
				return elem.id === id;
			});

			newTodos[todoIndex].isEditable = false;

			return { todos: newTodos, editValue: "" };
		});
	};

	setComplete = id => {
		this.setState(({ todos }) => {
			const newTodos = [...todos];
			const todoIndex = todos.findIndex(elem => {
				return elem.id === id;
			});

			newTodos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;

			localStorage.todos = JSON.stringify(newTodos);

			return { todos: newTodos };
		});
	};

	sortChange = ({ target: { value } }) => {
		this.setState(() => {
			return { sortBy: value };
		});
	};

	removeTrashItem = id => {
		this.setState(({ trash }) => {
			const newTrash = trash.filter(elem => {
				return elem.id !== id;
			});

			localStorage.trash = JSON.stringify(newTrash);

			return { trash: newTrash };
		});
	};

	removeTrashAll = () => {
		this.setState(() => {
			delete localStorage.trash;
			return { trash: [] };
		});
	};

	restoreTrashItem = id => {
		this.setState(({ todos, trash }) => {
			const newTrash = trash.filter(elem => {
				return elem.id !== id;
			});

			const restoreItem = trash.find(elem => {
				return elem.id === id;
			});

			const newTodos = [...todos, restoreItem];

			localStorage.todos = JSON.stringify(newTodos);
			localStorage.trash = JSON.stringify(newTrash);

			return { todos: newTodos, trash: newTrash };
		});
	};

	state = {
		todos: [],
		trash: [],
		sortBy: "date",
		value: "",
		editValue: "",
		addListItem: this.addListItem,
		setValue: this.setValue,
		setEditValue: this.setEditValue,
		removeListItem: this.removeListItem,
		editListItem: this.editListItem,
		saveEditItem: this.saveEditItem,
		notSaveEditItem: this.notSaveEditItem,
		setComplete: this.setComplete,
		sortChange: this.sortChange,
		removeTrashItem: this.removeTrashItem,
		restoreTrashItem: this.restoreTrashItem,
		removeTrashAll: this.removeTrashAll
	};

	componentDidMount() {
		const todos = localStorage.todos;
		const trash = localStorage.trash;
		if (todos && trash) {
			this.setState(() => {
				return { todos: JSON.parse(todos), trash: JSON.parse(trash) };
			});
		} else if (todos) {
			this.setState(() => {
				return { todos: JSON.parse(todos) };
			});
		} else {
			this.setState(() => {
				return { trash: JSON.parse(todos) };
			});
		}
	}

	render() {
		return (
			<div className="main">
				<Provider value={this.state}>
					<BrowserRouter>
						<Switch>
							<Route path="/" exact component={MainForm} />
							<Route path="/trashcan" component={TrashForm} />
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}
