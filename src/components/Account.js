import { useState, useEffect } from 'react';
import AccountInformation from './AccountInformation';
import AddNoteModal from './Modal/AddNoteModal';
import ShowNoteModal from './Modal/ShowNoteModal';
import Axios from '../axios';
import { toast } from 'react-toastify';

const Account = ({user, setUser}) => {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  Axios.get('/collection').then(({data}) => {
    setBooks(data);
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    setLoading(false)
  }) 
}, []);

const deleteBooks = async (id) => {
  try {
    await Axios.delete(`/collection/${id}`);
    setBooks(books.filter(book => book.collection.id !== id));
    toast.success("Le livre a bien été supprimé");
  } catch(error) {
    toast.error("Impossible de supprimer le livre");
  }

}

// Gestion des notes
const [noteModalText, setNoteModalText] = useState('');

const [noteText, setNoteText] = useState('');
const [modalTitle, setModalTitle] = useState('');

// MODAL AJOUTER NOTE
const [addNoteModal, setAddNoteModal] = useState({
  show: false,
  bookId: null,
  note: ''
});

const showAddNoteModal = (bookId) => {
  const book = books.find((book) => book.id === bookId);
  const title = book ? book.volumeInfo.title : '';
  setAddNoteModal({
      show: true,
      bookId: bookId,
      note: ''
  });
  setModalTitle(`Ajouter une note pour ${title}`);
};

const hideNoteModal = () => {
    setAddNoteModal({
        show: false,
        bookId: null,
        note: ''
    });
    setViewNoteModal({
      show: false,
      bookId: null,
      note: ''
  });
};

const saveNote = () => {
  const newBooks = [...books];
  const bookIndex = newBooks.findIndex((book) => book.id === addNoteModal.bookId);
  if (bookIndex > -1) {
      newBooks[bookIndex].note = noteText;
      setBooks(newBooks);
      localStorage.setItem("library", JSON.stringify(newBooks));
      hideNoteModal();
  }
};

// MODAL VOIR NOTE

const [viewNoteModal, setViewNoteModal] = useState({
  show: false,
  bookId: null,
  note: ''
});

const showViewNoteModal = (bookId) => {
  const book = books.find((book) => book.id === bookId);
  const title = book ? book.volumeInfo.title : '';
  setNoteModalText(book.note);
  setViewNoteModal({
      show: true,
      bookId: bookId,
      note: ''
  });
  setModalTitle(`Notes pour ${title}`);
};

const deleteNote = (id) => {
  const newBooks = [...books];
  const bookIndex = newBooks.findIndex((book) => book.id === id);
  if (bookIndex > -1) {
    newBooks[bookIndex].note = '';
    setBooks(newBooks);
    localStorage.setItem("library", JSON.stringify(newBooks));
    setViewNoteModal({
      show: false,
      bookId: null,
      note: ''
    });
  }
};

return (
    <div className='mt-5'>
      <AccountInformation user={user} setUser={setUser} />
      <h2>Ma liste de livres</h2>
      { !loading ? ( 
        <ul className='d-flex flex-wrap'>
        {books && books.length > 0 ? (
            books.map(book => (
                <div className="card" key={book.id}>
                    {book.img ? (
                        <img className="card-img-top" src={book.img} alt="Card" />
                    ) : (
                        <></>
                    )}
                    <div className="card-body position-relative">
                        <h5 className="card-title"><strong>{book.title}</strong></h5>
                        {book.subtitle ? (
                        <h6 className="card-subtitle mb-2 text-muted">{book.subtitle}</h6>
                        ) : (
                          <></>
                       )}
                      {book.authors ? (
                    <h6 className="card-subtitle mb-2 text-muted">Par <strong>{book.authors}</strong></h6>
                    ) : (
                      <></>
                    )}
                      {book.description ? (
                        <p className="card-text mt-4 book-description">{book.description}</p>
                        ) : (
                          <></>
                      )}
                        {book.note ? (
                            <button className='btn btn-primary me-2 mt-2' onClick={() => {showViewNoteModal(book.id)}}>Voir la note</button>
                        ) : (
                            <button className='btn btn-success me-2 mt-2' onClick={() => {showAddNoteModal(book.id)}}>Ajouter une note</button>
                        )}
                        <button className='btn btn-danger mt-2' onClick={() => {deleteBooks(book.collection.id)}}>Supprimer de ma liste</button>
                    </div> 

                    {addNoteModal.show && (
                      <AddNoteModal saveNote={saveNote} modalTitle={modalTitle} hideNoteModal={hideNoteModal} setNoteText={setNoteText}/>
                    )}

                    {viewNoteModal.show && (
                       <ShowNoteModal modalTitle={modalTitle} hideNoteModal={hideNoteModal} noteModalText={noteModalText} deleteNote={deleteNote} viewNoteModal={viewNoteModal}/>
                    )}



                  </div>
                ))
            ) : (
              <>
                <h3 className="mx-auto mt-5">Pas de livres dans votre liste</h3>
              </>
            )}
          
        </ul>
        ) : (
          <p>Chargement...</p>
        )}
    </div>
  );
}

export default Account;