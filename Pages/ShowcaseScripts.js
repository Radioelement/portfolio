async function loadProject() {
  const urlParams = new URLSearchParams(window.location.search);
  const project = urlParams.get("project"); // e.g. ?project=order277
  try {
    const response = await fetch(`data/${project}.json`);
    const data = await response.json();

    // Header title
    document.getElementById("project-title").textContent = data.title;

    // Main description
    const main = document.getElementById("project-content");
    main.innerHTML = `${data.description}`;

    // Sidebar versions
    const versionList = document.getElementById("version-list");
    versionList.innerHTML = "";

    data.versions.forEach(v => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="javascript:void(0)" data-id="${v.id}">${v.id}</a>`;

      // count dots in id
      const dotCount = (v.id.match(/\./g) || []).length;
      if (dotCount > 0) {
        li.style.marginLeft = `${dotCount * 10}px`;
      }

      versionList.appendChild(li);

      li.querySelector("a").addEventListener("click", () => {
        main.innerHTML = `
          <h2>${v.title}</h2>
          ${v.content}
        `;
      });
    });

  } catch (err) {
    document.getElementById("project-title").textContent = "Error";
    document.getElementById("project-content").textContent = "Failed to fetch project data.";
    console.error(err);
  }
}

// Dark Mode Toggle
const btn = document.getElementById("theme-toggle");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

loadProject();