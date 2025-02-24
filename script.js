document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.getElementById("user-table-body");
    const searchInput = document.getElementById("search-bar");
    const filterSelect = document.getElementById("filter-select");
    const spinner = document.getElementById("loading-spinner");

    let users = [];


    async function fetchUsers() {
        try {
            spinner.classList.remove("d-none");
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();

            setTimeout(() => { 
                users = data;
                localStorage.setItem("users", JSON.stringify(users)); 
                renderUsers(users);
                spinner.classList.add("d-none"); 
            }, 2000);

            localStorage.setItem("users", JSON.stringify(users));
            renderUsers(users);
        } catch (error) {
            console.error("Errore nel caricamento degli utenti", error);
            spinner.classList.add("d-none");
        }

    }


    function renderUsers(filteredUsers) {
        userTable.innerHTML = "";
        filteredUsers.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
            `;
            userTable.appendChild(row);
        });
    }


    function filterUsers() {
        spinner.classList.remove("d-none")
        setTimeout(() => {
            const query = searchInput.value.toLowerCase();
            const filterType = filterSelect.value;
            const filteredUsers = users.filter(user => user[filterType].toLowerCase().includes(query));
            renderUsers(filteredUsers);
            spinner.classList.add("d-none");
        }, 500);// ritardoooooo
        
    }


    searchInput.addEventListener("input", filterUsers);
    filterSelect.addEventListener("change", filterUsers);

    fetchUsers();
});
