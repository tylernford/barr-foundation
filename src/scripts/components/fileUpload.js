const fileInputs = document.querySelectorAll(`input[type="file"]`)

// For each file input
fileInputs.forEach(fileInput => {
  // Capture parent div
  const parent = fileInput.parentElement;
  // Create empty div
  const div = document.createElement('div');
  // Append empty div to parent
  parent.append(div);
  // Select empty div
  let messageDiv = parent.querySelector(`div`);
  // Add default message to empty div
  messageDiv.innerHTML = `No files selected.`;

  // On input change
  fileInput.addEventListener("change", (event) => {
    let filesNames = '';

    // Add filenames with `<br>` to `filesNames` string
    for (const file of fileInput.files) {
      filesNames = filesNames + file.name + `<br>`;
    }

    // Update `messageDiv` with `filesNames` string
    messageDiv.innerHTML = filesNames;
  });
});