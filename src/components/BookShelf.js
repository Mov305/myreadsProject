import React from 'react'
import Bookslist from './books'


const BookShelf = (props) => {
    return (
    <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { (props.books &&  props.books.map((book) => {
                            return (
                                <Bookslist 
                                key={book.id}
                                book={book}
                                changeShelf={props.changeShelf}
                                />
                                  )
                        }))
                      
                    }
                </ol>
            </div>
        </div>


    </div>
)
}



export default BookShelf
