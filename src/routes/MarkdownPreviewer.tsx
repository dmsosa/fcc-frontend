import { useState, type ChangeEvent } from "react";
import { FaFreeCodeCamp } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import LayoutHandlers from "../components/MarkdownPreviewer/LayoutHandlers";
import { initialText, markedInstance } from "../service/markdownService";



export default function MarkdownPreviewer() {
  const [ markdownState, setMarkdownState ] = useState(
    { 
      editor: initialText, 
      preview: markedInstance.parse(initialText, { breaks: true }),
      inputFullscreen: false,
      previewFullscreen: false,
    });

  const { editor, preview, inputFullscreen, previewFullscreen } = markdownState;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setMarkdownState((prev) =>( {...prev, editor: value, preview: markedInstance.parse(value, { breaks: true }) }));
  }


  const toggleFullscreen = (target: string) => {
    if (target === 'input') {
      setMarkdownState(prevState => ({
        ...prevState,
        inputFullscreen: !inputFullscreen,
        previewFullscreen: false
      }));
    } else if (target === 'preview') {
      setMarkdownState(prevState => ({
        ...prevState,
        inputFullscreen: false,
        previewFullscreen: !previewFullscreen
      }));
    }
  };
  
  
  return (
    <section className="position-relative">
      <div className="grid vh-100 w-100 ">
        <div className={`box grid-item border-primary ${inputFullscreen  ? 'fullscreen': previewFullscreen ? 'index-negative' : ''}`}>
            <div className="box-header">
              <div className="logo">
                <FaFreeCodeCamp className='logo' />
                <span className='title'>editor</span>
              </div>
              <a onClick={() => {
                toggleFullscreen('input');
              }}>
                { inputFullscreen ? <MdFullscreenExit/> : <MdFullscreen /> }
              </a>
            </div>
            <div className="box-content">
              <textarea id="editor" className='editor' onChange={handleInputChange} value={editor} ></textarea>
            </div>
        </div>
        <div className={`box grid-item border-primary ${previewFullscreen ? 'fullscreen': inputFullscreen ? 'index-negative' : ''}`}>
            <div className="box-header">
              <div className="logo">
                <FaFreeCodeCamp />
                <span className='title'>preview</span>
              </div>              <a onClick={() => {
                toggleFullscreen('preview');
              }}>
                { previewFullscreen ? <MdFullscreenExit/> : <MdFullscreen /> }
              </a>          </div>
            <div className="box-content p-2">
                <div id="preview" dangerouslySetInnerHTML={{__html: preview}}></div>
            </div>
        </div>
        <LayoutHandlers inputFullscreen={inputFullscreen} previewFullscreen={previewFullscreen} target='row'/>
        <LayoutHandlers inputFullscreen={inputFullscreen} previewFullscreen={previewFullscreen} target='col'/>
      </div>
    </section>
  )
}