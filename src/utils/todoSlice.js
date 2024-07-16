import { createSlice } from "@reduxjs/toolkit";

const storedData = () => {
    try {
        const recevdData = localStorage.getItem("storedTodo");
        if (recevdData === null) {
            return [];
        }
        return JSON.parse(recevdData);
    } catch (err) {
        console.error("Could not load state from local storage", err);
        return [];
    }
};

const storedState = (state) => {
    try {
        const recevdData = JSON.stringify(state);
        localStorage.setItem("storedTodo", recevdData);
    } catch (err) {
        console.error("Could not save state to local storage", err);
    }
};

const initialState = {
    todos: storedData()
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
            storedState(state.todos)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            storedState(state.todos)
        },
        updateTodo: (state, action) => {
            
            const { id, text } = action.payload;

            console.log("slice id : ", id)
            console.log("slice text : ", text)
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
            storedState(state.todos)
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer;