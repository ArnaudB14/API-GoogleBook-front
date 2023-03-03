import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ user }) => {

  const API_URL = "https://www.googleapis.com/books/v1/volumes";

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(() => {
    return JSON.parse(localStorage.getItem('search')) || ''
  });
  const [library, setLibrary] = useState(() => {
    return JSON.parse(localStorage.getItem('library')) || []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearchChange = event => {
    setSearch(event.target.value);
    setStartIndex(0);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (search.length > 0) {
          const response = await axios.get(`${API_URL}?q=${search}&startIndex=${startIndex}`);
          setBooks(response.data.items);
          setTotalItems(response.data.totalItems);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [search, startIndex]);
  

  const addToList = book => {

    const doubleId = [];

    library.forEach(function (item) {
      doubleId.push(item.id);
    });
    if (user) {
      if (library.length > 0) {
        if (doubleId.includes(book.id)) {
          toast.error("Le livre est déjà dans votre liste");
        } else {
          toast.success("Le livre a bien été ajouté à votre liste");
          setLibrary([...library, book]);
        }
      } else {
        toast.success("Le livre a bien été ajouté à votre liste");
        setLibrary([...library, book])
      }
    }
    else {
      toast.error("Vous devez être connecté pour ajouter un livre à votre liste");
    }
  }
  useEffect(() => {
    localStorage.setItem('library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(search));
  }, [search]);

  const handlePrevPage = () => {
    setStartIndex(startIndex - 10);
    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    setStartIndex(startIndex + 10);
    setCurrentPage(currentPage +
       1);
  }
  return (
    <div>
      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnHover={false}
      />
      <h2>Recherchez un livre</h2>
      <form onSubmit={(event) => {event.preventDefault()}} className="mx-auto d-flex align-items-center justify-content-center">
        <input type="text" className="form-control w-25 my-5" placeholder="Search..." id="searchBook" name="searchBook" onChange={handleSearchChange}/>
        <button type="submit" className='btn btn-primary'>Chercher</button>
      </form>
      <ul className='d-flex flex-wrap pagination'>
        {search !== '' ? (
          books.map(book => (
              <div className="card" key={book.id}>
                {book.volumeInfo.imageLinks ? (
                  <img className="card-img-top" src={book.volumeInfo.imageLinks.thumbnail} alt="Card" />
                ) : (
                  <></>
                )}
                <div className="card-body position-relative">
                  <h5 className="card-title"><strong>{book.volumeInfo.title}</strong></h5>
                  {book.volumeInfo.subtitle ? (
                    <h6 className="card-subtitle mb-2 text-muted book-subtitle">{book.volumeInfo.subtitle}</h6>
                  ) : (
                    <></>
                  )}
                  {book.volumeInfo.authors ? (
                    <h6 className="card-subtitle text-muted book-author">Par <strong>{book.volumeInfo.authors}</strong></h6>
                  ) : (
                    <></>
                  )}
                  {book.volumeInfo.description ? (
                    <p className="card-text mt-4 book-description">{book.volumeInfo.description}</p>
                  ) : (
                    <></>
                  )}
                    <button type='submit' className="btn btn-warning mt-4 add-list" onClick={() => { addToList(book) }}>Ajouter a ma liste</button>
                </div>
              </div>
          ))
        ) : (
          <>
            <h3 className="mx-auto mt-5">Pas de livres</h3>

          </>
        )}

      </ul>
      {search !== '' ? (
        <div className='d-flex justify-content-center my-3 mt-5'>
          <button
            className="btn btn-primary"
            onClick={handlePrevPage}
            disabled={startIndex === 0}
            type="button">
            Précédent
          </button>
          <span className="mx-3 d-flex align-items-center">Page n°{currentPage}</span>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={startIndex + 10 >= totalItems}
            type="button">
            Suivant
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
