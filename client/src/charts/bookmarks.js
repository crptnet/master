import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './charts.css';

const bookmarksArr = [];

const Bookmarks = () => {

  const [bookmarkList, setBookmarkList] = useState(() => {
    const savedDivList = localStorage.getItem("bookmarkList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return bookmarksArr;
    }
  });
  const [BookListLayout, setBookListLayout] = useState(<></>);
  const [highlightedDivId, setHighlightedDivId] = useState(null);
  const [initialValue, setInitialValue] = useState(true);

  useEffect(() => {
      if (initialValue) {
          setInitialValue(false);
          return;
      }
      window.location.reload(true);
  }, [bookmarkList]);
  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    const bookmarksEl = document.querySelector('.bookmarksChart');
    const addBtnEl = document.querySelector('.addBookmarkBtnChart');
    let totalWidth = 0;
    if (bookmarksEl && addBtnEl) {
      for (let i = 0; i < bookmarksEl.children.length; i++) {
        let rect = bookmarksEl.children[i].getBoundingClientRect();
        totalWidth += rect.width;
      }
      console.log(totalWidth,window.innerWidth)
      if (totalWidth + 120 >= window.innerWidth) {
        addBtnEl.classList.add('addBookmarkBtnChart-fixed');
      } else {
        addBtnEl.classList.remove('addBookmarkBtnChart-fixed');
      }
    }
  }, [bookmarkList]);

  useEffect(()=>{
    const layout = bookmarkList.map((item, index) => (
      <Draggable key={item.key} draggableId={item.key} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={(event) =>
              handleOnDragEnter(event, item.key)
            }
            onMouseLeave={handleOnDragLeave}
            style={{
              minWidth:'70px',
              display:'flex', 
              justifyContent:'center',
              alignItems:'center',
              color: '#d1d4dc',
              backgroundColor: highlightedDivId === item.key ? "#333333" : "#252525",
              border: highlightedDivId === item.key ? "1px solid #d1d4dc" : "1px solid #131722",
              padding: "8px",
              ...provided.draggableProps.style
            }}
          >
            {item.symb}
            <button className='deleteBookmarkBtn' onClick={()=>{handleDeleteDiv(item.key)}}>&#215;</button>
          </div>
        )}
      </Draggable>
    ))
    setBookListLayout(layout)
  },[bookmarkList])
  useEffect(()=>{console.log(bookmarkList)},[bookmarkList])
  useEffect(()=>{console.log("LAYOUT",BookListLayout)},[BookListLayout])

  function handleOnDragEnd(result) {
    setHighlightedDivId(null);
    if (!result.destination) return;
    const items = Array.from(bookmarkList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBookmarkList(items);
  }

  function handleOnDragEnter(event, divId) {
    setHighlightedDivId(divId);
  }

  function handleOnDragLeave() {
    setHighlightedDivId(null);
  }

  function handleAddDiv() {
    const newDiv = {
      key: uuidv4(),
      symb: `BTC`,
    };
    setBookmarkList([...bookmarkList, newDiv]);
  }
  function handleDeleteDiv(id) {
    setBookmarkList(bookmarkList.filter(elem => elem.key != id));
  }

  return (
    <div className='bookmarksChart'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bookmarksArr" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
              {BookListLayout}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleAddDiv} className='addBookmarkBtnChart'><span>+</span></button>
    </div>
  );
}

export default Bookmarks;