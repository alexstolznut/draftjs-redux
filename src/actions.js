export const updateEditor = (editorState) => ({
    type: 'UPDATE_EDITOR_STATE',
    payload: editorState,
})

export const highlightEditorText = (highlightEditorState) => ({
    type: 'UPDATE_HIGHLIGHT_STATE',
    payload: highlightEditorState,
});

export const replaceEditorText = (replacementText) => ({
    type: 'REPLACE_TEXT_STATE',
    payload: replacementText,
});

export const updateSearch = (searchState) => ({
    type: 'UPDATE_SEARCH_STATE',
    payload: searchState,
})

export const updateReplace = (replaceState) => ({
    type: 'UPDATE_REPLACE_STATE',
    payload: replaceState
})