const Book = ({ book }) => {
  const { title, author, year } = book;

  return (
    <div className="books__item">
      <p>{title}</p>
      <p>{author}</p>
      <p>{year}</p>
    </div>
  )
}

export default Book;