import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Completed.module.scss';
import React, { useContext } from 'react';
import { TodoContext } from '../App';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const Completed = () => {
    const todoContext = useContext(TodoContext);

    const handleToggle = (value) => {

        todoContext.todoItemDispatch({ type: 'COMPLETE_TODO', payload: value.id })
    };

    const handleDelete = (value) => {
        todoContext.todoItemDispatch({ type: 'DELETE_TODO', payload: value.id })
    }


    return <div>

        <List className={styles.list}>
            {todoContext.todoItemState.filter(value => value.completed === true).map((value, key) => {
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
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleDelete(value)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                )
            })}
        </List>
    </div>

}
export default Completed