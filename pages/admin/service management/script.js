// Page-specific JavaScript can go here
let activeCard = null; 

function prepareEdit(element) {
    activeCard = element.closest('.service-card');
    
    // Fill text inputs
    document.getElementById('editName').value = activeCard.querySelector('.service-name').textContent;
    document.getElementById('editFormat').value = activeCard.querySelector('.service-format').textContent;
    document.getElementById('editPrice').value = activeCard.querySelector('.service-price').textContent;

    // Sync the "Available" checkbox with the card's toggle switch
    const isAvailable = activeCard.querySelector('.switch-green').checked;
    document.getElementById('editAvailCheck').checked = isAvailable;
}

function prepareDelete(element) {
    activeCard = element.closest('.col-md-6');
}

document.addEventListener('DOMContentLoaded', function () {
    
    // ADD LOGIC
    document.getElementById('addServiceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Service Name"]').value;
        const format = this.querySelector('input[placeholder="e.g. A4"]').value;
        const price = this.querySelector('input[placeholder="$0.00"]').value;
        const isChecked = document.getElementById('addAvailCheck').checked;

        const newCardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="service-card shadow-sm h-100">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 class="fw-bold mb-0 service-name">${name}</h5>
                            <p class="text-muted small service-format">${format}</p>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input switch-green" type="checkbox" ${isChecked ? 'checked' : ''}>
                        </div>
                    </div>
                    <div class="price-section my-4">
                        <h3 class="fw-bold mb-0 text-orange service-price">${price}</h3>
                        <p class="text-muted small">per unit</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="status-pill ${isChecked ? 'available' : 'unavailable'}">${isChecked ? 'Available' : 'Unavailable'}</span>
                        <div class="actions">
                            <i class="fas fa-edit text-muted me-3 pointer" data-bs-toggle="modal" data-bs-target="#editServiceModal" onclick="prepareEdit(this)"></i>
                            <i class="fas fa-trash text-danger pointer" data-bs-toggle="modal" data-bs-target="#deleteServiceModal" onclick="prepareDelete(this)"></i>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('servicesContainer').insertAdjacentHTML('beforeend', newCardHTML);
        bootstrap.Modal.getInstance(document.getElementById('addServiceModal')).hide();
        this.reset();
    });

    // UPDATE LOGIC
    document.getElementById('editServiceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        if (activeCard) {
            const isChecked = document.getElementById('editAvailCheck').checked;
            
            // Update Text
            activeCard.querySelector('.service-name').textContent = document.getElementById('editName').value;
            activeCard.querySelector('.service-format').textContent = document.getElementById('editFormat').value;
            activeCard.querySelector('.service-price').textContent = document.getElementById('editPrice').value;
            
            // Update Toggle & Pill
            const toggle = activeCard.querySelector('.switch-green');
            const pill = activeCard.querySelector('.status-pill');
            toggle.checked = isChecked;
            pill.textContent = isChecked ? 'Available' : 'Unavailable';
            pill.className = isChecked ? 'status-pill available' : 'status-pill unavailable';

            bootstrap.Modal.getInstance(document.getElementById('editServiceModal')).hide();
        }
    });

    // DELETE LOGIC (Existing)
    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (activeCard) {
            activeCard.style.transition = "all 0.4s ease";
            activeCard.style.opacity = "0";
            setTimeout(() => { activeCard.remove(); activeCard = null; }, 400);
            bootstrap.Modal.getInstance(document.getElementById('deleteServiceModal')).hide();
        }
    });

    // TOGGLE LOGIC (Existing)
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('switch-green')) {
            const card = e.target.closest('.service-card');
            const pill = card.querySelector('.status-pill');
            pill.textContent = e.target.checked ? 'Available' : 'Unavailable';
            pill.className = e.target.checked ? 'status-pill available' : 'status-pill unavailable';
        }
    });
});