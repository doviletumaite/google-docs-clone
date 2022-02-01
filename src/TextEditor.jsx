import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"

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
     const [socket, setSocket] = useState()
     const [quill, setQuill] = useState()
   const wrapperRef = useCallback(wrapper=> {
       if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
      const q =  new Quill(editor, {theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS}})
      setQuill(q)
    },[])

   
    useEffect(() => {
      setSocket(io("http://localhost:3001")) 
      return () => {
          socket.disconnect()
      }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return
      const handler = (delta, oldDelta, source) => {
          if (source !== "user") return
          socket.emit("send-changes", delta)
      }
      quill.on("text-change", handler)
      return () => {
          quill.off("text-change",handler )
      }
    }, [socket, quill])
    useEffect(() => {
        setSocket(io("http://localhost:3001")) 
        return () => {
            socket.disconnect()
        }
      }, [])
  
      useEffect(() => {
          if (socket == null || quill == null) return
        const handler = (delta) => {
           quill.updateContents(delta)
        }
       socket.on("receive-changes", handler)
        return () => {
            socket.off("receive-changes",handler )
        }
      }, [socket, quill])
  return(
      <div className="container" ref={wrapperRef}>
          text editor
      </div>
  )
}
