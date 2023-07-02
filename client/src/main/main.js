import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSpring, animated } from 'react-spring';

import '../styles/main.css';

const divs = [
  { id: "div1", content: "Div 1" },
  { id: "div2", content: "Div 2" },
  { id: "div3", content: "Div 3" },
  { id: "div4", content: "Div 4" },
  { id: "div5", content: "Div 5" },
];


const Main = () => {
    const [divList, setDivList] = useState(() => {
    const savedDivList = localStorage.getItem("divList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return divs;
    }
  });

  useEffect(() => {
    localStorage.setItem("divList", JSON.stringify(divList));
  }, [divList]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(divList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDivList(items);
  }

  function handleAddDiv() {
    const newDiv = {
      id: `div${divList.length + 1}`,
      content: `Div ${divList.length + 1}`,
    };
    setDivList([...divList, newDiv]);
  }

  return (
    <div>
      <button onClick={handleAddDiv}>Add Div</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="divs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {divList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};


export default Main;