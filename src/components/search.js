import React from 'react'
import { Link } from 'react-router-dom';
import Bookslist from './books';


const Searchbar = props => {
    const {searchedBooks,searchHandler,changeShelf,chosenBooks} =props;
    const addShelf =(search)=>{
        let carryShelf={};
        chosenBooks.forEach(book => carryShelf[book.id]=book.shelf );
        search.forEach(book =>{
            book.shelf=carryShelf[book.id] || 'none'
        });
        return search
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">

                <Link
                    className="close-search"
                    to="/">back</Link>
                <div className="search-books-input-wrapper">

                    <input type="text" placeholder="Search by title or author" onChange={searchHandler} />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {(searchedBooks.length > 1) && (addShelf(searchedBooks).map((book) => {
                        return (
                            <Bookslist 
                            key={book.id}
                            book={book}
                            changeShelf={changeShelf}
                            />
                        )

                    }))}

                </ol>
            </div>
        </div>

    )
}


export default Searchbar
