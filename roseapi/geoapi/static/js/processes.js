const API_URL = "http://localhost:8000/api/processes";

async function fetchProcesses() {
  const loader = document.getElementById("loader");
  const tableWrapper = document.querySelector(".table-wrapper");
  const emptyMessage = document.getElementById("empty-message");
  const tbody = document.querySelector("#processes-table tbody");

  loader.style.display = "block";
  tableWrapper.style.display = "none";
  emptyMessage.style.display = "none";
  tbody.innerHTML = "";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const processes = data.processes || [];

    loader.style.display = "none";

    if (processes.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    processes.forEach(item => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const link = document.createElement("a");
      link.href = item.id ? `${API_URL}/${item.id}` : "#";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.title || item.id;
      nameCell.appendChild(link);

      const descCell = document.createElement("td");
      descCell.textContent = item.description || "No description";

      row.appendChild(nameCell);
      row.appendChild(descCell);
      tbody.appendChild(row);
    });

    tableWrapper.style.display = "block";
  } catch (error) {
    loader.style.display = "none";
    emptyMessage.style.display = "block";
    emptyMessage.textContent = "Error loading processes.";
    console.error("Ошибка при загрузке данных:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProcesses);
