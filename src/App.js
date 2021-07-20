import React, { Component } from 'react';
import  EditorComp  from './components/editor';
// import { EditorState, Editor } from 'draft-js';
// import { connect } from 'react-redux';
// import { updateEditor } from './actions'

// import 'draft-js/dist/Draft.css';


// const AppEditor = ({  editorState, onSaveEditorState }) => (
//   <Editor
//     editorState={editorState}
//     onChange={onSaveEditorState}
//   />
// );

// const mapStateToProps = ({ editorState }) => ({ editorState });

// const mapDispatchToProps = (dispatch) => ({
//   onSaveEditorState: (editorState) => dispatch(updateEditor(editorState)),
  
// });

// const ConnectedEditor = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(AppEditor);

class App extends Component {
  render() {
    return (
          <EditorComp/>
       
     
    );
  }
}

export default App;