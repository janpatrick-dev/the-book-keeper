const DOMUtils = {
  showDrawer: () => {
    const drawerElement = document.querySelector('.drawer');
    if (drawerElement === null) { return; }
    drawerElement.classList.remove('hide-side');
  },
  hideDrawer: () => {
    const drawerElement = document.querySelector('.drawer');
    if (drawerElement === null) { return; }
    drawerElement.classList.add('hide-side');
  },
  showAddBookPopup: () => {
    const addBookPopupElement = document.querySelector('.add-book-popup');
    if (addBookPopupElement === null) { return; }
    addBookPopupElement.classList.remove('hide');
  },
  hideAddBookPopup: () => {
    const addBookPopupElement = document.querySelector('.add-book-popup');
    if (addBookPopupElement === null) { return; }
    addBookPopupElement.classList.add('hide');
  }
}

export default DOMUtils;