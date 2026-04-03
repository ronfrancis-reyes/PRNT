<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRNT - Service Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-dark-main">

    <!--start of body-->
    <div class="container-fluid p-4">
        <div class="d-flex justify-content-end mb-4">
            <button class="btn btn-orange px-4 py-2 rounded-3 fw-bold shadow-sm" data-bs-toggle="modal" data-bs-target="#addServiceModal">
                        <i class="fas fa-plus me-2"></i>Add Service
                    </button>
                </div>

                <div class="row g-4" id="servicesContainer">
                    <div class="col-md-6 col-lg-4">
                        <div class="service-card shadow-sm h-100">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 class="fw-bold mb-0 service-name text-white">Business Cards</h5>
                                    <p class="text-muted small service-format">Standard (3.5" x 2")</p>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input switch-green" type="checkbox" checked>
                                </div>
                            </div>
                            <div class="price-section my-4">
                                <h3 class="fw-bold mb-0 text-orange service-price">$45.00</h3>
                                <p class="text-muted small">per unit</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="status-pill available">Available</span>
                                <div class="actions">
                                    <i class="fas fa-edit text-muted me-3 pointer" data-bs-toggle="modal" data-bs-target="#editServiceModal" onclick="prepareEdit(this)"></i>
                                    <i class="fas fa-trash text-danger pointer" data-bs-toggle="modal" data-bs-target="#deleteServiceModal" onclick="prepareDelete(this)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <div class="service-card shadow-sm h-100">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 class="fw-bold mb-0 service-name text-white">Flyers</h5>
                                    <p class="text-muted small service-format">A4 (8.27" x 11.69")</p>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input switch-green" type="checkbox" checked>
                                </div>
                            </div>
                            <div class="price-section my-4">
                                <h3 class="fw-bold mb-0 text-orange service-price">$120.00</h3>
                                <p class="text-muted small">per unit</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="status-pill available">Available</span>
                                <div class="actions">
                                    <i class="fas fa-edit text-muted me-3 pointer" data-bs-toggle="modal" data-bs-target="#editServiceModal" onclick="prepareEdit(this)"></i>
                                    <i class="fas fa-trash text-danger pointer" data-bs-toggle="modal" data-bs-target="#deleteServiceModal" onclick="prepareDelete(this)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addServiceModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 p-3 shadow">
                <div class="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                    <h4 class="fw-bold mb-0">Add New Service</h4>
                    <button type="button" class="btn btn-modal-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addServiceForm">
                        <div class="mb-3">
                            <label class="small text-muted">Service Name</label>
                            <input type="text" class="form-control" placeholder="Service Name" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted">Format Type</label>
                            <input type="text" class="form-control" placeholder="e.g. A4" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted">Price</label>
                            <input type="text" class="form-control" placeholder="$0.00" required>
                        </div>
                        <div class="form-check mb-4 mt-3">
                            <input class="form-check-input custom-check" type="checkbox" id="addAvailCheck" checked>
                            <label class="form-check-label small fw-medium" for="addAvailCheck">Available for orders</label>
                        </div>
                        <button type="submit" class="btn btn-orange w-100 py-2 fw-bold">Add Service</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editServiceModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 p-3 shadow">
                <div class="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                    <h4 class="fw-bold mb-0">Edit Service</h4>
                    <button type="button" class="btn btn-modal-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editServiceForm">
                        <div class="mb-3">
                            <label class="small text-muted mb-1">Service Name</label>
                            <input type="text" id="editName" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted mb-1">Format Type</label>
                            <input type="text" id="editFormat" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted mb-1">Price</label>
                            <input type="text" id="editPrice" class="form-control" required>
                        </div>
                        <div class="form-check mb-4 mt-3">
                            <input class="form-check-input custom-check" type="checkbox" id="editAvailCheck">
                            <label class="form-check-label small fw-medium" for="editAvailCheck">Available for orders</label>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-secondary flex-grow-1 py-2" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-orange flex-grow-1 py-2 fw-bold">Update Service</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteServiceModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content border-0 p-3 text-center">
                <div class="modal-header border-0 pb-0 d-flex justify-content-end">
                    <button type="button" class="btn btn-modal-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body pt-0">
                    <i class="fas fa-exclamation-triangle text-danger mb-3" style="font-size: 3rem;"></i>
                    <h5 class="fw-bold">Are you sure?</h5>
                    <p class="text-muted small">This service will be removed from your view.</p>
                    <div class="d-flex gap-2 mt-4">
                        <button type="button" class="btn btn-secondary flex-grow-1" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger flex-grow-1" id="confirmDelete">Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>