import React, { useContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TodoStateContext } from '../App';
import TodoItem from './TodoItem';

const TodoForm = () => {
    const todoForm = useContext(TodoStateContext);
    return (
        <div>
            <DragDropContext>
                <Droppable droppableId='todo'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoForm.map((it, index) => <Draggable key={it.id} draggableId={it.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <TodoItem key={it.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} {...it}
                                    />
                                )}
                            </Draggable>
                            )}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
        </div>

    )
}

export default TodoForm;