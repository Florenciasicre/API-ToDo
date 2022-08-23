buildList();
let activeItem = null;
//Take data and put into Html
function buildList() {
  let wrapper = document.getElementById('list-wrapper');
  // need start in blank
  wrapper.innerHTML = '';
  //call de data in api url
  let url = 'http://127.0.0.1:8000/api/taskList';

  fetch(url)
    .then(resp => resp.json())
    .then(function (data) {
      console.log('Data:', data);
      for (let i in data) {
        let title = `<span class='title'>${data[i].title}</span>`;

        //check if the task is complet strike out
        if (data[i].completed == true) {
          title = `<strike class='title'>${data[i].title}</strike>`;
        }
        let item = `
            <div id="data-row-${i}" class="task-wrapper flex-wrapper">
							<div style="flex:7">
								${title}
							</div>
							<div style="flex:1">
								<button class="btn btn-sm btn-outline-info edit">Edit </button>
							</div>
							<div style="flex:1">
								<button class="btn btn-sm btn-outline-dark delete">-</button>
							</div>
						</div>
      `;
        wrapper.innerHTML += item;
      }
      //Take the id
      for (let i in data) {
        let editBtn = document.getElementsByClassName('edit')[i];
        let deleteBtn = document.getElementsByClassName('delete')[i];
        let title = document.getElementsByClassName('title')[i];
        editBtn.addEventListener('click', function () {
          editItem(data[i]);
        });

        deleteBtn.addEventListener('click', function () {
          deleteItem(data[i]);
        });

        title.addEventListener('click', function () {
          strikeUndStike(data[i]);
        });
      }
    });
}

//Submite the data
let form = document.getElementById('form-wrapper');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let url = 'http://127.0.0.1:8000/api/taskCreate';
  //Change the url if want to creat or update
  if (activeItem != null) {
    url = `http://127.0.0.1:8000/api/taskUpdate/${activeItem.id}/`;
    activeItem = null;
  }
  //id of form is title--> take the data
  let title = document.getElementById('title').value;
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ title: title }),
  }).then(function (response) {
    buildList();
    //clean the form. Is only a detail
    document.getElementById('form').reset();
  });
});

function editItem(item) {
  activeItem = item;
  document.getElementById('title').value = activeItem.title;
}
function deleteItem(item) {
  fetch(`http://127.0.0.1:8000/api/taskDelete/${item.id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ title: title }),
    //creat a list again
  }).then(response => {
    buildList();
  });
}
//strick out
function strikeUndStike(item) {
  console.log(item);
  fetch(`http://127.0.0.1:8000/api/taskUpdate/${item.id}/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ 'title': item.title, 'completed': !item.completed }),

    //creat a list again
  }).then(response => {
    buildList();
  });
}
