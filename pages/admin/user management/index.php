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
    <title>PRNT – Customer Management</title>
    
    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../../global/admin/variables.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="module-body">

    <!-- Toolbar Controls -->
    <div class="toolbar">
        <div class="search-wrap">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="searchInput" placeholder="Search customers..." oninput="filterTable()"/>
        </div>
        <select id="statusFilter" class="filter-select" onchange="filterTable()">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
        </select>
        <button class="btn-export" onclick="exportCSV()">
            <i class="fas fa-download"></i> Export
        </button>
    </div>

    <!-- Data Table -->
    <div class="table-card">
        <table>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Total Orders</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Data rendered via JavaScript (Empty in Safe-Mode) -->
            </tbody>
        </table>
    </div>

    <!-- Action Components -->
    <div id="actionPanel"></div>

    <!-- User Details Modal -->
    <div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
        <div class="modal-box" onclick="event.stopPropagation()">
            <div class="modal-header">
                <div class="modal-title"><i class="fas fa-user-gear text-primary"></i> View Details</div>
                <button class="modal-close" id="closeDetailModal" onclick="closeModal()"><i class="fas fa-xmark"></i></button>
            </div>
            <div class="modal-body" id="modalBody">
                <div class="m-user-id">USR-001</div>

                <div class="m-grid">
                    <div class="detail-card">
                        <div class="detail-label">NAME</div>
                        <div class="detail-value m-name">—</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">STATUS</div>
                        <div id="v-status-wrapper">
                            <span class="badge m-status">—</span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">BULSU EMAIL</div>
                        <div class="detail-value m-email">—</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">CONTACT NUMBER</div>
                        <div class="detail-value m-contact">—</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">TOTAL ORDERS</div>
                        <div class="detail-value m-total-orders">—</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">LAST ORDER DATE</div>
                        <div class="detail-value m-last-order-date">—</div>
                    </div>
                </div>
                
                <div class="m-grid" style="grid-template-columns: 1fr; margin-top: 14px;">
                    <div class="detail-card">
                        <div class="detail-label">LAST ORDERED FILE</div>
                        <div class="detail-value m-last-file">—</div>
                    </div>
                </div>
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

    <!-- Suspend Confirmation Modal -->
    <div class="modal-overlay" id="suspendOverlay" onclick="closeSuspendModal()">
        <div class="modal-box modal-box-sm" onclick="event.stopPropagation()">
            <div class="suspend-icon"><i class="fas fa-ban"></i></div>
            <div class="delete-title">Confirm Suspend</div>
            <div class="delete-msg" id="suspendMsg"></div>
            <div class="delete-actions">
                <button class="btn-cancel" onclick="closeSuspendModal()">Cancel</button>
                <button class="btn-confirm-suspend" id="btnConfirmSuspend"><i class="fas fa-ban"></i> Suspend</button>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <i class="fas fa-circle-check"></i>
        <span id="toastMsg"></span>
    </div>

    <script src="script.js"></script>
</body>
</html>
