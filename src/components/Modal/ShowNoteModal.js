const ShowNoteModal = ({modalTitle, hideNoteModal, noteModalText, deleteNote, viewNoteModal}) => {

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideNoteModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{noteModalText}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideNoteModal}>Fermer</button>
                        <button className='btn btn-danger mt-2' onClick={() => {deleteNote(viewNoteModal.bookId)}}>Supprimer la note</button>

                    </div>
                </div>
            </div>
        </div>
      );
    }
    
export default ShowNoteModal;