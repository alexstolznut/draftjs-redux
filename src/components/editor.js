import React from 'react'
import { Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { updateEditor } from '../actions';
import '../App.css';
import 'draft-js/dist/Draft.css';

const mapStateToProps = ({ editorState }) => ({ editorState });
const mapDispatchToProps = (dispatch) => ({
    onSaveEditorState: (editorState) => dispatch(updateEditor(editorState)),
    
  });

  function EditorComp({editorState, onSaveEditorState}) {
    return (
        <div className="editorContainer">
            <div className="editors">
                <Editor
                    editorState={editorState}
                    onChange={onSaveEditorState}
                />
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorComp);
