<?php
include "../../../api/config.php";
if (!isset($_SESSION['user'])) {
	header("Location: ../../index.php");
} else if ($_SESSION['role'] == 'Customer') {
	header("Location: ../../client/dashboard/index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>PRNT – Order Management</title>
    
    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css"/>
</head>
<body class="module-body">

    <!-- Toolbar Controls -->
    <div class="toolbar">
        <div class="search-wrap">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="searchInput" placeholder="Search orders..." oninput="filterTable()"/>
        </div>
        
        <!-- Status Filter -->
        <select id="statusFilter" class="filter-select" onchange="filterTable()">
            <option value="">All Status</option>
            <option value="Reviewing">Reviewing</option>
            <option value="For pickup">For Pickup</option>
            <option value="Printing">Printing</option>
            <option value="For delivery">For Delivery</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
        </select>
        
        <button class="btn-export" onclick="exportCSV()">
            <i class="fas fa-download"></i> Export
        </button>

        <button class="btn-delete-completed" onclick="confirmDeleteCompleted()">
            <i class="fas fa-trash-can"></i> Archive Completed
        </button>
        
    </div>

    <!-- Data Table -->
    <div class="table-card">
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date & Time</th>
                    <th>Amount</th>
                    <th>Receiving Option</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                
            </tbody>
        </table>
    </div>

    <!-- Action Components -->
    <div id="actionPanel"></div>

    <!-- View Details Modal -->
    <div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
        <div class="modal-box" onclick="event.stopPropagation()">
            <div class="modal-header">
                <div class="modal-title"><i class="fas fa-receipt"></i> View Details</div>
                <button class="modal-close" onclick="closeModal()"><i class="fas fa-xmark"></i></button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Receipt content rendered via JavaScript -->
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal-overlay" id="deleteOverlay" onclick="closeDeleteModal()">
        <div class="modal-box modal-box-sm" onclick="event.stopPropagation()">
            <div class="delete-icon"><i class="fas fa-triangle-exclamation"></i></div>
            <div class="delete-title">Confirm Delete</div>
            <div class="delete-msg" id="deleteMsg"></div>
            <div class="delete-actions">
                <button class="btn-cancel" onclick="closeDeleteModal()">Cancel</button>
                <button class="btn-confirm-delete" id="btnConfirmDelete"><i class="fas fa-trash-can"></i> Delete</button>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <i class="fas fa-circle-check"></i>
        <span id="toastMsg"></span>
    </div>

	<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
