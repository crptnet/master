import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../terminal.css';

const bookmarksArr = [];

const Bookmarks = () => {

  const [divList, setDivList] = useState(() => {
    const savedDivList = localStorage.getItem("divList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return bookmarksArr;
    }
  });

  const [highlightedDivId, setHighlightedDivId] = useState(null);

  useEffect(() => {
    localStorage.setItem("divList", JSON.stringify(divList));
    const bookmarksEl = document.querySelector('.bookmarks');
    const addBtnEl = document.querySelector('.addBookmarkBtn');
    let totalWidth = 0;
    if (bookmarksEl && addBtnEl) {
      for (let i = 0; i < bookmarksEl.children.length; i++) {
        let rect = bookmarksEl.children[i].getBoundingClientRect();
        totalWidth += rect.width;
      }
      console.log(totalWidth,window.innerWidth)
      if (totalWidth + 120 >= window.innerWidth) {
        addBtnEl.classList.add('addBookmarkBtn-fixed');
      } else {
        addBtnEl.classList.remove('addBookmarkBtn-fixed');
      }
    }
  }, [divList]);

  function handleOnDragEnd(result) {
    setHighlightedDivId(null);
    if (!result.destination) return;
    const items = Array.from(divList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDivList(items);
  }

  function handleOnDragEnter(event, divId) {
    setHighlightedDivId(divId);
  }

  function handleOnDragLeave() {
    setHighlightedDivId(null);
  }

  function handleAddDiv() {
    const newDiv = {
      id: `div ${divList.length + 1}`,
      content: `Div ${divList.length + 1}`,
    };
    setDivList([...divList, newDiv]);
  }

  function handleDeleteDiv(id) {
    setDivList(divList.filter(elem => elem.id != id));
  }

  return (
    <div className='bookmarks'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bookmarksArr" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
              {divList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      onMouseEnter={(event) =>
                        handleOnDragEnter(event, item.id)
                      }
                      onMouseLeave={handleOnDragLeave}
                      style={{
                        minWidth:'70px',
                        display:'flex', 
                        justifyContent:'center',
                        alignItems:'center',
                        color: '#d1d4dc',
                        backgroundColor: highlightedDivId === item.id ? "#333333" : "#252525",
                        border: highlightedDivId === item.id ? "1px solid #d1d4dc" : "1px solid #131722",
                        padding: "8px",
                        ...provided.draggableProps.style
                      }}
                    >
                      {item.content}
                      <button className='deleteBookmarkBtn' onClick={()=>{handleDeleteDiv(item.id)}}>&#215;</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleAddDiv} className='addBookmarkBtn'><span>+</span></button>
    </div>
  );
}

export default Bookmarks;