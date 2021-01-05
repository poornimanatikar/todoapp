import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './App.module.scss';
import Active from './Active/Active';
import All from './All/All';
import Completed from './Completed/Completed';
import React, { useReducer } from 'react';
import Typography from '@material-ui/core/Typography';

const initialstate = [];
export const TodoContext = React.createContext();
function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': return [...state, { id: nextTodoId(state), ...action.payload }];
      break;
    case 'COMPLETE_TODO': return state.map(todo => {
      if (todo.id !== action.payload) {
        return todo
      }
      return {
        ...todo,
        completed: !todo.completed,
      };
    });
      break;
    case 'DELETE_TODO': return state.filter(todo => todo.id !== action.payload);
      break;
    default: return state;
      break;
  }

}
function App() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [todoItems, dispatch] = useReducer(reducer, initialstate);

  return (
    <TodoContext.Provider value={{ todoItemState: todoItems, todoItemDispatch: dispatch }}
    >
      <div className={styles.main} >
        <div className={styles.header}>
          <Typography variant="h4">#todo</Typography>
        </div>
        <div className={styles.tabContainer}>
          <Tabs value={selectedTab} onChange={handleTabChange}
            variant="fullWidth" aria-label="simple tabs example"
            indicatorColor="primary"
            textColor="primary">
            <Tab label={<span className={styles.tabLabel}>All</span>} />
            <Tab label={<span className={styles.tabLabel}>Active</span>} />
            <Tab label={<span className={styles.tabLabel}>Completed</span>} />
          </Tabs>
          {
            selectedTab === 0 && (<All />)
          }
          {
            selectedTab === 1 && (<Active />)
          }
          {
            selectedTab === 2 && (<Completed />)
          }
        </div>

        <div className={styles.footer}>
          <Typography variant="body2">Poornima Natikar @ DevChallenges.io</Typography>
        </div>
      </div >
    </TodoContext.Provider>
  );
}

export default App;
