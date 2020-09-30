import React, { useEffect, useState } from "react";
import classNames from 'classnames'

const TodoItem = (props) => {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    const [editText, setEditText] = useState('')

    const handleSubmit = () => {
        const val = editText.trim();
        if (val) {
            props.onSave(props.todo, val);
            setEditText(val);
        } else {
            props.onDestroy();
        }        
    }

    const handleEdit = (todo) => {
        props.onEdit(todo);
        setEditText(props.todo.title);
    }

    const handleKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            setEditText(props.todo.title)
            props.onCancel(event);
        } else if (event.which === ENTER_KEY) {
            handleSubmit(event);
        }        
    }

    const handleChange = (event) => {
        if (props.editing) setEditText(event.target.value);
        console.log(`triggerd handle change`)
    }

    useEffect(()=> {
        if (props.todo.title) setEditText(props.todo.title);
    }, []);
  
    return (
      <li
        className={classNames({
          completed: props.todo.completed,
          editing: props.editing,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={props.todo.completed}
            onChange={props.onToggle}
          />
          <label onDoubleClick={() => handleEdit(props.todo)}>{props.todo.title}</label>
          <button className="destroy" onClick={() => props.onDestroy(props.todo.id)} />
        </div>
        <input
        //   ref="editField"
          className="edit"
          value={editText}
          onBlur={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </li>
    );

};

export default TodoItem;
