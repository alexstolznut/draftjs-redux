import React, {useState} from 'react'
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import { connect } from 'react-redux';
import { updateEditor, highlightEditorText } from '../actions';
import '../App.css';
import 'draft-js/dist/Draft.css';

const mapStateToProps = ({ editorState }) => ({ editorState });
const mapDispatchToProps = (dispatch) => ({
    onSaveEditorState: (editorState) => dispatch(updateEditor(editorState)),
    //I think I have to write the whole function in on onHighlightEditor
    //Need store replace and search in redux
    onHighlightEditor: ( editorState) =>  dispatch(highlightEditorText(editorState))

  });

//   {
//     const search = e.target.value;
//     console.log(e.target.value)
//     dispatch(highlightEditorText(EditorState.set(editorState, {decorator: generateDecorator(search)})))}

  const findWithregex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        end = start + matchArr[0].length;
        callback(start,end);
    }
}
const generateDecorator = (highlightTerm, findWithRegex) => {
    const regex = new RegExp(highlightTerm, 'g');
    return new CompositeDecorator([{
        strategy: (contentBlock, callback) => {
            if (highlightTerm !== '') {
                findWithRegex(regex, contentBlock, callback);
            }
        },
        component: SearchHighlight,
    }])
}



const SearchHighlight = (props) => (
    <span className="search-and-replace-highlight">{props.children}</span>
);



  function EditorComp({editorState, onSaveEditorState, onHighlightEditor}) {

    const [search, setSearch] = useState('');
    const [replace, setReplace] = useState('');

    const onChangeSearch = (e, onHighlightEditor) => {
        console.log(e.target.value)
        const search = e.target.value;
        setSearch(e.target.value);
        onHighlightEditor(editorState, generateDecorator(search));

        
    };
    const onChangeReplace = (e) => {
        setReplace(e.target.value);
    }

    const onReplace = () => {
        console.log(`replace "${search}" with "${replace}"`);
    }

    const findWithregex = (regex, contentBlock, callback) => {
        const text = contentBlock.getText();
        let matchArr, start, end;
        while((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            end = start + matchArr[0].length;
            callback(start,end);
        }
    }
    const generateDecorator = (highlightTerm, findWithRegex) => {
        const regex = new RegExp(highlightTerm, 'g');
        return new CompositeDecorator([{
            strategy: (contentBlock, callback) => {
                if (highlightTerm !== '') {
                    findWithRegex(regex, contentBlock, callback);
                }
            },
            component: SearchHighlight,
        }])
    }

   

    const SearchHighlight = (props) => (
        <span className="search-and-replace-highlight">{props.children}</span>
    );
    return (
        <div className="editorContainer">
            <div className="editors">
                <Editor
                    editorState={editorState}
                    onChange={onSaveEditorState}
                />
            </div>
            <div className="search-and-replace">
                <input 
                    value={search}
                    onChange={onHighlightEditor}
                    placeholder="Search..."
                />
                <input 
                    value={replace}
                    onChange={onChangeReplace}
                    placeholder="Replace..."
                />
                <button onClick={onReplace}>
                    Replace
                </button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorComp);
