import {UnControlled as CodeMirror} from 'react-codemirror2'
import React from "react"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'

function CodeMirrorEditor (props){
    return (
        <CodeMirror
            options={{
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true
            }}
            onChange={(editor, data, value) => {
            }}
            {...props}
        />
    )
}

export default CodeMirrorEditor;