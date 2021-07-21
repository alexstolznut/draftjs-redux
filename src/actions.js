export const updateEditor = (editorState) => ({
    type: 'UPDATE_EDITOR_STATE',
    payload: editorState,
})

export const highlightEditorText = ({editorState}) => ({
    type: 'HIGHLIGHT_EDITOR_STATE',
    payload: {editorState}
})