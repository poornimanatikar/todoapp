import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Active.module.scss';
import React, { useContext } from 'react';
import { TodoContext } from '../App';

const Active = () => {
    const todoContext = useContext(TodoContext);

    const [todo, setTodo] = React.useState({ data: '', completed: false });


    const handleToggle = (value) => {

        todoContext.todoItemDispatch({ type: 'COMPLETE_TODO', payload: value.id })
    };
    const handleAddTodo = () => {
        todoContext.todoItemDispatch({ type: 'ADD_TODO', payload: todo });
        setTodo('');
    }

    return <div className={styles.active}>
        <input type="text" value={todo.data} onChange={(e) => setTodo({ data: e.target.value, completed: false })} />
        <button onClick={() => handleAddTodo()}>Add</button>
        <List className={styles.list}>
            {todoContext.todoItemState.filter(value => value.completed === false).map((value, key) => {
                return (
                    <ListItem key={key} button onClick={() => handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={value.completed === true}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText className={value.completed === true ? styles.strikeThrough : null} primary={value.data} />
                    </ListItem>

                )
            })}
        </List>
    </div>

}
export default Active