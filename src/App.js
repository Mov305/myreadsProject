import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Searchbar from './components/search'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);    //seting the state to the filterd books and the books found on the search
    this.state = {
      books:[],
      searchedBooks:[],
    }  } 
  
  componentDidMount() {
    if(this.state.books){     //to rerendring the page after a change  hanppens in the state and to invoke the filter
      this.wantFilter()
    }
  
  }
  wantFilter = ()=>{   //filtering the books and adding them to a new object to handle them then updating the state
    BooksAPI.getAll()
    .then((oldbooks) => {
    const crArray=oldbooks.filter((book)=>book.shelf==="currentlyReading");
    const wtrArray=oldbooks.filter((book)=>book.shelf==="wantToRead");
    const rArray=oldbooks.filter((book)=>book.shelf==="read");
    const books={currentlyReading:crArray,wantToRead:wtrArray,read:rArray};
    this.setState(
      {books:books}
    );
    });
  }
  searches = (query) => {   //to get all the searched books and putting them into the state
    BooksAPI.search(query)
      .then((books) => {
        this.setState({
          searchedBooks:books
        })
      })
  }
  searchHandler = (e) => {    // dealing with the search errors  
    const value = e.target.value.toLowerCase();
      (value !== ''  ) && (
      this.searches(value)
    )    
  }
  getByID=(shelf,book)=>{    // don't warry about the name it was a whole other funciton but i had to change it 
    BooksAPI.update(book,shelf);  //  taking the values comming from the books cards and updating the shelfs
    this.wantFilter();   
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
         <Searchbar
         searchedBooks={this.state.searchedBooks}
         searchHandler={this.searchHandler}
         changeShelf={this.getByID}
         />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              
              <BookShelf 
              title={'Currently reading'} 
               books={this.state.books.currentlyReading} 
               changeShelf={this.getByID}/>
              <BookShelf
               title={'Want to read'}
                 books={this.state.books.wantToRead}
                 changeShelf={this.getByID} />
              <BookShelf
               title={'Read'}
                 books={this.state.books.read}
                 changeShelf={this.getByID}/>


                 

            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Add a book</Link>
            </div>
          </div>

        )} />
      </div>
    )
  }
}

export default BooksApp
