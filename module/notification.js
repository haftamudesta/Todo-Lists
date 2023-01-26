const notificationElement = document.querySelector('.show-notification ');
const notifyUser = (message) => {
  notificationElement.innerHTML = message;
  notificationElement.classList.add('notification-element');
  setTimeout(() => {
    notificationElement.classList.remove('notification-element');
  }, 9000);
};
export { notifyUser };
