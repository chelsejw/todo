import React from 'react';
import classNames from 'classnames';
import Utils from '../Utils';


const Footer = (props) => {

    let activeTodoWord = Utils.pluralize(props.count, 'item');
    let clearButton = null;

    if (props.completedCount > 0) {
	    clearButton = (
          <button
            className="clear-completed"
            onClick={props.onClearCompleted}
          >
            Clear completed
          </button>
        );
    }
    const nowShowing = props.nowShowing

	return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{props.count}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: nowShowing === 'all',
                })}
              >
                All
              </a>
            </li>{" "}
            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: nowShowing === 'active',
                })}
              >
                Active
              </a>
            </li>{" "}
            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: nowShowing === 'completed',
                })}
              >
                Completed
              </a>
            </li>
          </ul>
          {clearButton}
        </footer>
      );
}

export default Footer