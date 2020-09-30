import React, { useState, useEffect } from 'react';
import { Router } from "director/build/director.js";
import axios from 'axios';
import TodoItem from './TodoItem'
import Footer from './Footer'

// import Utils from '../Utils'

const TodoApp = () => {
	const ALL_TODOS = "all";
    const ACTIVE_TODOS = "active";
    const COMPLETED_TODOS = "completed";
	// const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;
    const [todos, setTodos] = useState([]);
    const [nowShowing, setNowShowing] = useState('all');
    const [editing, setEditing] = useState(null);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const rootRouter = function(){
            setNowShowing(ALL_TODOS);
        }
        const activeRouter = function(){
            setNowShowing(ACTIVE_TODOS);
        }
        const completedRouter = function(){
            setNowShowing(COMPLETED_TODOS)
        }

        const routes = {
          "/": rootRouter,
          "/active": activeRouter,
          "/completed": completedRouter,
        };

        let router = Router(routes);
        router.init();

        axios
        .get('http://localhost:8000/api/items')
        .then(res => {
            console.log(res.data);
            setTodos(res.data);
        })
        .catch(err => {
            console.log(`There was an error in axios get`);
            console.log(err.response);
        })

    }, [])

    const postToApi = (todoContent) => {
        axios
          .post("http://localhost:8000/api/items/", {
            title: todoContent,
          })
          .then((res) => {
            console.log(res.data);
            setTodos((prev) => [...prev, res.data]);
          })
          .catch((err) => console.log(`Err... ${err.response.data}`));
    }

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    const handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const val = newTodo.trim();

        if (val) {
            postToApi(val);
            setNewTodo('');
        }
    }

    const deleteItemApi = (itemId) => {
        axios.delete(`http://localhost:8000/api/items/${itemId}/`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
    }

    const toggleAll = (event) => {
        const checked = event.target.checked;
        console.log(checked)
        // this.props.model.toggleAll(checked);
    }

    const toggle = (todoToToggle) => {
        // this.props.model.toggle(todoToToggle);
    }

    const destroy = (target) => {
        // this.props.model.destroy(todo);
        deleteItemApi(target);
        setTodos(prev => {
            return prev.filter(todo => todo.id !== target);
        })
    }

    const edit = (todo) => {
        setEditing(todo.id);
    }

    const save = (todoToSave) => {

        setEditing(null);
    }
    
    const cancel = () => {
        setEditing(null)
    }

    const clearCompleted = () => {
        todos.filter(todo => {
            return !todo.completed;
        })
    }

	let shownTodos = todos.filter(function (todo) {
        switch (nowShowing) {
          case ACTIVE_TODOS:
            return !todo.done;
          case COMPLETED_TODOS:
            return todo.done;
          default:
            return true;
        }
    });

    let todoItems = shownTodos.map(function (todo) {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggle}
                onDestroy={destroy}
                onEdit={edit}
                editing={editing}
                onSave={save}
                onCancel={cancel}
            />
        );
    });

	var activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    let main, footer;

    var completedCount = todos.length - activeTodoCount;
    if (activeTodoCount || completedCount) {
        footer = (
            <Footer
            count={activeTodoCount}
            completedCount={completedCount}
            nowShowing={nowShowing}
            onClearCompleted={clearCompleted}
            />
        );
    }

    if (todos.length) {
        main = (
            <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={(e)=> toggleAll(e)}
                checked={activeTodoCount === 0}
            />
            <label htmlFor="toggle-all" />
            <ul className="todo-list">{todoItems}</ul>
            </section>
        );
    }



    return (
      <div className='todoapp'>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onKeyDown={(e)=> handleNewTodoKeyDown(e)}
            onChange={(e) => handleChange(e)}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
}

export default TodoApp;