const draggables = document.querySelectorAll('.draggable')
const gridItems = document.querySelectorAll('.grid-items')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', (ev) => {
    draggable.classList.remove('dragging')
  })
})

gridItems.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.append(draggable)
    } else {
        afterElement.before(draggable);
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}