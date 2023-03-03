const NoteModal = ({saveNote, modalTitle, hideNoteModal, setNoteText}) => {

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
                    <textarea className="form-control" rows="5" onChange={(e) => {setNoteText(e.target.value)}}></textarea>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideNoteModal}>Annuler</button>
                    <button type="button" className="btn btn-primary" onClick={saveNote}>Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NoteModal;