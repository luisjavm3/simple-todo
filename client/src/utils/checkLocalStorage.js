// eslint-disable-next-line import/no-anonymous-default-export
export default function (user) {
  let todoStore = JSON.parse(localStorage.getItem('todo_store'));

  if (!todoStore) todoStore = { user };

  // Reset the store if the authenticated user is not the same than the previos one.
  if (todoStore.user.id !== user.id) todoStore = { user };

  localStorage.setItem('todo_store', JSON.stringify(todoStore));
}
