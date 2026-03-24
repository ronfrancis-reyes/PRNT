// Page-specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveBtn');
    const inputs = document.querySelectorAll('.edit-input');

    // When Edit Profile is clicked
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            // 1. Unlock inputs for typing (HTML) and clicking (CSS)
            inputs.forEach(input => {
                input.disabled = false;
                input.classList.add('editable');
            });

            // 2. Toggle button visibility
            saveBtn.classList.remove('d-none');
            editBtn.classList.add('d-none');
            
            console.log("Editing mode enabled.");
        });
    }

    // When Save Changes is clicked
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            // If this is a real form, you'd usually let it submit here.
            // For the UI toggle:
            
            // 1. Lock the inputs again
            inputs.forEach(input => {
                input.disabled = true;
                input.classList.remove('editable');
            });

            // 2. Toggle button visibility back
            saveBtn.classList.add('d-none');
            editBtn.classList.remove('d-none');
            
            console.log("Changes saved and editing disabled.");
        });
    }
});