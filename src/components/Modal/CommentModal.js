const CommentModal = ({saveComment, modalTitle, hideModal, setCommentText, commentModalText, deleteComment, commentModal, updateComment}) => {
    if (commentModalText) {
        return (
             <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control updateComment" rows="5" defaultValue={commentModalText} onChange={(e) => {setCommentText(e.target.value)}}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Fermer</button>
                            <button className='btn btn-primary' onClick={() => {updateComment(commentModal.bookId)}}>Modifier le commentaire</button>
                            <button className='btn btn-danger' onClick={() => {deleteComment(commentModal.bookId)}}>Supprimer le commentaire</button>
    
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" rows="5" onChange={(e) => {setCommentText(e.target.value)}}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={saveComment}>Enregistrer</button>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentModal;