import React from 'react';
import { Editor, ConvertFromRaw } from 'draft-js';

export default function article(props) {
    const storedState = ConvertFromRaw(JSON.parse(props.storedState));
    return (
        <div className="articleContainer">
            <Editor editorState={storedState} readOnly={true} />
        </div>
    )
}
