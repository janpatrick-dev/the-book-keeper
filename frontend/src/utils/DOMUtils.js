const DOMUtils = {
  showDrawer: () => {
    const drawerElement = document.querySelector('.drawer');
    drawerElement.classList.remove('hide');
  },
  hideDrawer: () => {
    const drawerElement = document.querySelector('.drawer');
    drawerElement.classList.add('hide');
  },
  showAddBookPopup: () => {
    const addBookPopupElement = document.querySelector('.add-book-popup');
    addBookPopupElement.classList.remove('hide');
  },
  hideAddBookPopup: () => {
    const addBookPopupElement = document.querySelector('.add-book-popup');
    addBookPopupElement.classList.add('hide');
  }
}

export default DOMUtils;