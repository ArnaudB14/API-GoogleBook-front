import { useState, useEffect } from 'react';
import AccountInformation from './AccountInformation';
import CommentModal from './Modal/CommentModal';
import Axios from '../axios';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

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


// SUPPRIMER UN LIVRE DE SA BIBLIOTHEQUE
const deleteBooks = async (id) => {
  try {
    await Axios.delete(`/collection/${id}`);
    setBooks(books.filter(book => book.id !== id));
    toast.success("Le livre a bien été supprimé");
  } catch(error) {
    console.log(error);
    toast.error("Impossible de supprimer le livre");
  }

}

// Gestion des notes
const [commentModalText, setCommentModalText] = useState('');
const [commentText, setCommentText] = useState('');
const [modalTitle, setModalTitle] = useState('');

console.log(books);

const showModal = (bookId) => {
  const book = books.find((book) => book.id === bookId);
  const title = book ? book.book.title : '';
  if (!book.commentaire) {
    setCommentModalText('');
    setCommentModal({
      show: true,
      bookId: bookId,
    });
    setModalTitle(`Ajouter un commentaire pour ${title}`);
  } else {
    setCommentModalText(book.commentaire.content);
    setCommentModal({
        show: true,
        bookId: bookId,
        commentaire: book.commentaire.content
    });
    setModalTitle(`Commentaires pour ${title}`);
  }
};

const hideModal = () => {
  setCommentModal({
      show: false,
      bookId: null,
  });
};

// MODAL AJOUTER NOTE
const [commentModal, setCommentModal] = useState({
  show: false,
  bookId: null,
  commentaire: ''
});


const saveComment = async () => {
  const newBooks = [...books];
  const bookIndex = newBooks.findIndex((book) => book.id === commentModal.bookId);
  if (bookIndex > -1) {
    try {  
      const {data} = await Axios.post('/commentaire', {
        collection_id : commentModal.bookId, 
        content :  commentText
      });
      newBooks[bookIndex].commentaire = data;
      setBooks(newBooks);
      hideModal();
    } catch(error) {
      console.log(error);
    }
  }
};

const saveNotes = async () => {
  const newBooks = [...books];
  const bookIndex = newBooks.findIndex((book) => book.id );
  console.log(bookIndex)
  if (bookIndex > -1) {
    try {
      const {data} = await Axios.post('/commentaire', {
        collection_id : newBooks.bookId,
        
        
      });
      newBooks[bookIndex].note = data;
      setBooks(newBooks);
      hideModal();
    } catch(error) {
      console.log(error);
    }
  }
};


// MODAL VOIR NOTE
const deleteComment = async (id) => {
  const newBooks = [...books];
  const book = books.find((book) => book.id === id);
  const bookIndex = newBooks.findIndex((book) => book.id === id);
  if (bookIndex > -1) {
    try {
      console.log('id:'+ book.commentaire.id)
      await Axios.delete(`/commentaire/${book.commentaire.id}`);
      book.commentaire = null
      setCommentText('')
      hideModal();
    } catch(error) {
      console.log(error);
    }
  }
};

const updateComment = async (id) => {
  const newBooks = [...books];
  const book = books.find((book) => book.id === id);
  const bookIndex = newBooks.findIndex((book) => book.id === id);
  if (bookIndex > -1) {
    try {
      console.log('id:'+ book.note.id)
      await Axios.put(`/note/${book.note.id}`);
      hideModal();
    } catch(error) {
      console.log(error);
    }
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
                    {book.book.img ? (
                        <img className="card-img-top" src={book.book.img} alt="Card" />
                    ) : (
                        <></>
                    )}
                    <div className="card-body position-relative">
                        <h5 className="card-title"><strong>{book.book.title}</strong></h5>
                        {book.book.subtitle ? (
                        <h6 className="card-subtitle mb-2 text-muted">{book.book.subtitle}</h6>
                        ) : (
                          <></>
                       )}
                    {book.book.author ? (
                      <h6 className="card-subtitle mb-2 text-muted">Par <strong>{book.book.author.replaceAll(/[\[\]"]/g, '')}</strong></h6>
                    ) : (
                      <></>
                    )}
                      {book.book.description ? (
                        <p className="card-text mt-4 book-description">{book.book.description}</p>
                        ) : (
                          <></>
                      )}
                        {book.note ? (
                          <p className="mt-4 w-25 p-2 bg-success rounded text-light d-flex justify-content-center">{book.note.content}/5</p>
                        ) : (
                          <></>
                      )}
                        {book.commentaire != null ? (
                            <button className='btn btn-primary me-2 mt-2' onClick={() => {showModal(book.id)}}>Voir le commentaire</button>
                        ) : (
                            <button className='btn btn-success me-2 mt-2' onClick={() => {showModal(book.id)}}>Ajouter un commentaire</button>
                        )}
                        <button className='btn btn-danger mt-2' onClick={() => {deleteBooks(book.id)}}>Supprimer de ma liste</button>
                    </div> 
                    <Formik>
                      <form className="rating">
                        <button onClick={saveNotes} title="Donner 5 étoiles" value={5}>☆</button>
                        <button onClick={saveNotes} title="Donner 4 étoiles" value={4}>☆</button>
                        <button onClick={saveNotes} title="Donner 3 étoiles" value={3}>☆</button>
                        <button onClick={saveNotes} title="Donner 2 étoiles" value={2}>☆</button>
                        <button onClick={saveNotes} title="Donner 1 étoile" value={1}>☆</button>
                      </form>
                    </Formik>
                    {commentModal.show && (
                      <CommentModal updateComment={updateComment} saveComment={saveComment} modalTitle={modalTitle} hideModal={hideModal} setCommentText={setCommentText} commentModalText={commentModalText} deleteComment={deleteComment} commentModal={commentModal}/>
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
          <div className="d-flex justify-content-center mt-5 flex-column">
            <div className="spinner-border" role="status"></div>
            <p>Chargement...</p>
        </div>
        )}
    </div>
  );
}

export default Account;