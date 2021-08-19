import React from 'react'

const Bookslist = props => {
    const book=props.book;
    const url =(book.imageLinks)?`url(${book.imageLinks.smallThumbnail})`:('');
    const authors =(book.authors)?(book.authors.join(' & ')):('');
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193, backgroundImage:url                          
                    }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => { props.changeShelf(e.target.value, book)}}>
                            <option value="move" >Move to...</option>
                            <optgroup>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </optgroup>

                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}




export default Bookslist
