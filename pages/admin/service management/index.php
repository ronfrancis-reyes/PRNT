<?php
include "../../../api/config.php";
if(!isset($_SESSION['user'])) {
header("Location: /PRNT/pages/login/");
} else if ($_SESSION['user'] != 1) {
header("Location: /PRNT/pages/client/service-avail/");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Management | PRNT Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-dark-main">

    <div class="d-flex">
		
	  <!-- SIDEBAR: ALFRED-->
        <div class="sidebar vh-100 p-3 shadow-sm" style="width: 250px; position: fixed; z-index: 1000;">
            <div class="d-flex align-items-center mb-4 ps-2">
                <div class="bg-orange text-white rounded p-2 me-2">
                    </div>
            </div>
        </div>
    <!-- SIDEBAR: ALFRED-->
        <div class="flex-grow-1" style="margin-left: 250px; min-height: 100vh;">

              <!-- TOPBAR: ALFRED-->
            <div class="bg-dark-main p-3 d-flex justify-content-between align-items-center border-bottom border-secondary sticky-top" style="height: 70px;">
                <div class="input-group w-50">
                    </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center gap-2 border-start border-secondary ps-3">
                        <div class="lh-sm">
                            </div>
                        <i class="fas fa-chevron-down small text-muted ms-1"></i>
                    </div>
                </div>
            </div>
              <!-- TOPBAR: ALFRED-->

               <!--start of body-->

            <div class="container-fluid p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-bold mb-1 text-white">Service Management</h2>
                        <p class="text-muted small">Manage your printing service options and pricing.</p>
                    </div>
                    <button class="btn btn-orange px-4 py-2 rounded-3 fw-bold shadow-sm" data-bs-toggle="modal" data-bs-target="#addServiceModal">
                        <i class="fas fa-plus me-2"></i>Add Service
                    </button>
                </div>

                <div class="row g-4" id="servicesContainer">
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addServiceModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 p-3 shadow">
                <div class="modal-header border-0 pb-0"><h4 class="fw-bold">Add New Service</h4></div>
                <div class="modal-body">
                    <form id="addServiceForm">
                        <div class="mb-3">
                            <label class="small text-muted">Service Name</label>
                            <input type="text" class="form-control" placeholder="Service Name" id="addName" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted">Price</label>
                            <input type="text" class="form-control" placeholder="0.00" id="addPrice" required>
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
                <div class="modal-header border-0 pb-0"><h4 class="fw-bold mb-0">Edit Service</h4></div>
                <div class="modal-body">
                    <form id="editServiceForm">
                        <div class="mb-3">
                            <label class="small text-muted mb-1">Service Name</label>
                            <input type="text" id="editName" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="small text-muted mb-1">Price</label>
                            <input type="text" id="editPrice" class="form-control" required>
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
                <div class="modal-body">
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