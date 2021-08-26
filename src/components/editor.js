import React, {useState} from 'react'
import { Editor, EditorState, CompositeDecorator, SelectionState, Modifier } from 'draft-js';
import { connect } from 'react-redux';
import { updateEditor, highlightEditorText, replaceEditorText, updateSearch, updateReplace } from '../actions';
import '../App.css';
import 'draft-js/dist/Draft.css';

const mapStateToProps = ({ editorState, searchState, replaceState }) => ({ editorState, searchState, replaceState });
const mapDispatchToProps = (dispatch) => ({
    onSaveEditorState: (editorState) => dispatch(updateEditor(editorState)),
    //I think I have to write the whole function in on onHighlightEditor
    //Need store replace and search in redux
    onSaveSearchState: (searchValue) => dispatch(updateSearch(searchValue)),
    onSaveReplaceState: (e) => dispatch(updateReplace(e.target.value)),
    onHighlightEditor: ( highlightEditorState) =>  dispatch(highlightEditorText(highlightEditorState)),
    onReplaceEditor: (replacementText) => dispatch(replaceEditorText(replacementText)),

  });




  function EditorComp({editorState, searchState, replaceState, onSaveEditorState,  onHighlightEditor, onReplaceEditor, onSaveSearchState, onSaveReplaceState}) {



    const onChangeSearch = (e) => {
        console.log(e.target.value)
        const search = e.target.value;
        onSaveSearchState(search);
        const editorStateHighlight = EditorState.set(editorState, { decorator: generateDecorator(search) });
        console.log(editorStateHighlight);
        onHighlightEditor(EditorState.set(editorState, { decorator: generateDecorator(search) }));
    

        
    };
    const onChangeReplace = (e) => {
        const replace = e.target.value;
        onSaveReplaceState(replace);
        
        //Implement Replace Code
    }

    const onReplace = (replaceValue) => {
        const regex = new RegExp(searchState, 'g');
        //Already have editor state deconstructed 
        const selectionsToReplace = [];
        const blockMap = editorState.getCurrentContent().getBlockMap();

        blockMap.forEach((contentBlock) => (
            findWithRegex(regex, contentBlock, (start,end) => {
                const blockKey = contentBlock.getKey();
                const blockSelection = SelectionState
                .createEmpty(blockKey)
                .merge({
                    anchorOffset: start,
                    focusOffset: end,
                });

                selectionsToReplace.push(blockSelection);
            })
        ));

        let contentState = editorState.getCurrentContent();
        console.log('selectionState', selectionsToReplace);
        selectionsToReplace.forEach(selectionState => {
            contentState = Modifier.replaceText(
                contentState,
                selectionState,
                replaceState,
            )
        });

        onReplaceEditor(
            EditorState.push(
                editorState,
                contentState,
            )
        );



    }

    const findWithRegex = (regex, contentBlock, callback) => {
        const text = contentBlock.getText();
        let matchArr, start, end;
        while((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            end = start + matchArr[0].length;
            callback(start,end);
        }
    };
    const generateDecorator = (highlightTerm) => {
        const regex = new RegExp(highlightTerm, 'g');
        return new CompositeDecorator([{
            strategy: (contentBlock, callback) => {
                if (highlightTerm !== '') {
                    findWithRegex(regex, contentBlock, callback);
                }
            },
            component: SearchHighlight,
        }])
    };

    const saveContent

   

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
                    value={searchState}
                    onChange={onChangeSearch}
                    placeholder="Search..."
                />
                <input 
                    value={replaceState}
                    onChange={onSaveReplaceState}
                    placeholder="Replace..."
                />
                <button onClick={onReplace}>
                    Replace
                </button>
            </div>
            <div>{searchState}  {replaceState}</div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorComp);
