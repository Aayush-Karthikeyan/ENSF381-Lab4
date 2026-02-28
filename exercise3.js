const userGrid = document.getElementById('userGrid');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const deleteIdInput = document.getElementById('deleteIdInput');
const deleteBtn = document.getElementById('deleteBtn');
const sortByGroupBtn = document.getElementById('sortByGroupBtn');
const sortByIdBtn = document.getElementById('sortByIdBtn');

const API_URL = 'https://69a1e0f32e82ee536fa27417.mockapi.io/user_api';

let users = [];

async function retrieveData() {
  const response = await fetch(API_URL);
  users = await response.json();
  console.log(users);
  render(users);
}

function render(usersArray) {
  userGrid.innerHTML = usersArray.map(user =>
    `<article class="user-card">
      <h3>${user.first_name ?? ""}</h3>
      <p>first_name: ${user.first_name ?? ""}</p>
      <p>user_group: ${user.user_group ?? ""}</p>
      <p>id: ${user.id ?? ""}</p>
    </article>`
  ).join('');
}

viewToggleBtn.addEventListener('click', () => {
  if (userGrid.classList.contains('grid-view')) {
    userGrid.classList.remove('grid-view');
    userGrid.classList.add('list-view');
  } else {
    userGrid.classList.remove('list-view');
    userGrid.classList.add('grid-view');
  }
});

sortByGroupBtn.addEventListener('click', () => {
  users.sort((a, b) => a.user_group - b.user_group);
  render(users);
});

sortByIdBtn.addEventListener('click', () => {
  users.sort((a, b) => Number(a.id) - Number(b.id));
  render(users);
});

deleteBtn.addEventListener('click', async () => {
  const id = deleteIdInput.value;
  if (!id) {
    console.error('No ID entered.');
    return;
  }
  const userExists = users.find(user => user.id === String(id));
  if (!userExists) {
    console.error(`No user found with ID: ${id}`);
    return;
  }
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    console.error(`Failed to delete user with ID: ${id}`);
    return;
  }
  users = users.filter(user => user.id !== String(id));
  deleteIdInput.value = '';
  render(users);
});

retrieveData();
