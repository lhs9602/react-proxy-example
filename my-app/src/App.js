import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import DisplayTodo from './components/DisplayTodo';
import CreateTodo from './components/CreateTodo';
import TodoTable from './components/TodoTable';

import { getAllBooks, createBook} from './services/BookService';
import {getAlltodos,createtodo} from './services/TodoSerivice';

import Footer from './components/Footer';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);
  const [todoList, setTodoList] = useState({});
  const [todos, setTodos] = useState([]);
  const [numberOfTodos, setNumberTodos] = useState(0);


  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }

  
  const handleTodoSubmit = () => {
    createtodo(todoList)
      .then(() => {
        setNumberTodos(numberOfTodos+1);
    });
}

const getAllTodo = () => {
  getAlltodos()
    .then(data => {
      setTodos(data);
      setNumberTodos(data.length);
    });
}

const handleOnChangeTodoForm = (e) => {
    let inputData = todoList;
    if (e.target.name === 'todo') {
      todoList.todo = e.target.value;
    } else if (e.target.name === 'category') {
      bookShelf.category = e.target.value;
    } else if (e.target.name === 'isComplete') {
      todoList.isComplete = e.target.value;
    }
    setTodoList(inputData);
}

  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <CreateBook 
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />
        <DisplayBoard 
          numberOfBooks={numberOfBooks} 
          getAllBook={getAllBook} 
        />
         <BookTable books={books} />
        <CreateTodo
          todoList={todoList}
          onChangeForm={handleOnChangeTodoForm}
          handleSubmit={handleTodoSubmit}
        />
        <DisplayTodo
          numberOfTodos={numberOfTodos} 
          getAllTodo={getAllTodo} 
        />
        <TodoTable todos={todos} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
