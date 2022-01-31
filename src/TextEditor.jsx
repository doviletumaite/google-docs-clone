import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useCallback, useEffect, useRef } from "react"

const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']     
]

export default function TextEditor() {
    
   const wrapperRef = useCallback(wrapper=> {
       if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        new Quill(editor, {theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS}})
    },[])
  return(
      <div className="container" ref={wrapperRef}>
          text editor
      </div>
  )
}
