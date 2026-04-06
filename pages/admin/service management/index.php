<?php
include "../../../api/config.php";
if (!isset($_SESSION['user'])) {
	header("Location: ../../index.php");
} else if ($_SESSION['role'] == 'Customer') {
	header("Location: ../../client/dashboard/index.php");
}
?><!DOCTYPE html>
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
                    <!-- Services rendered dynamically. Empty in Safe-Mode. -->
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
                            <input type="text" name="service_name" class="form-control" placeholder="Service Name" required>
                        </div>

                        <div id="formatContainer">
                        </div>

                        <button type="button" id="addFormatBtn" class="btn btn btn-orange mb-3 fw-bold" onclick="addFormat()">
                            + Add Format
                        </button>

                        <div class="form-check mb-4 mt-3">
                            <input class="form-check-input custom-check" type="checkbox" id="addAvailCheck" checked>
                            <label class="form-check-label small fw-medium" for="addAvailCheck">
                                Available for orders
                            </label>
                        </div>

                        <button type="submit" class="btn btn-orange w-100 py-2 fw-bold">
                            Add Service
                        </button>
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
                            <label class="small text-muted mb-1">Format</label>
                            <label class="small text-muted mb-1"> and Pricing:</label>
                        <div class="mb-3" id="editFormatContainer">

                            <!-- Format rows will be injected here dynamically -->
                        </div>
                        <!-- Add format button -->
                        <button type="button" id="addEditFormatRow" class="btn btn-orange mb-3 fw-bold">
                            + Add Format
                        </button>
                        <div class="form-check mb-4 mt-3">
                            <input class="form-check-input custom-check" type="checkbox" id="editAvailCheck">
                            <label class="form-check-label small fw-medium" for="editAvailCheck">Available for orders</label>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-secondary flex-grow-1 py-2" data-bs-dismiss="modal" onclick="cancel()">Cancel</button>
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
<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>

    <script src="script.js"></script>
</body>
</html>