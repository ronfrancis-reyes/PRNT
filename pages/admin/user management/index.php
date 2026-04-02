<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>PRNT – Customer Management</title>
    
    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../../global/variables.css?v=4">
    <link rel="stylesheet" href="styles.css?v=2">
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
                <!-- Sample Rows (Backend Integration Point) -->
                <tr data-user-id="USR-001" data-name="John Smith" data-email="john.smith@email.com" data-contact="0917-123-4567" data-address="Activity Center" data-total-orders="45" data-last-order="2026-03-24" data-last-file="event_flyer_v2.pdf" data-status="Active">
                    <td class="user-id">USR-001</td>
                    <td><div class="user-name-cell">John Smith</div></td>
                    <td class="email">john.smith@email.com</td>
                    <td>0917-123-4567</td>
                    <td class="user-order-id">45</td>
                    <td><span class="badge badge-active">Active</span></td>
                    <td>
                        <div class="action-wrap">
                            <button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </td>
                </tr>
                <tr data-user-id="US-201-11" data-name="Andrei De Jesus" data-email="andrei@email.com" data-contact="+63 921 567 8901" data-address="Dasmariñas, Cavite" data-total-orders="12" data-last-order="2026-03-28" data-last-file="thesis_final_print.docx" data-status="Active">
                    <td class="user-id">US-201-11</td>
                    <td><div class="user-name-cell">Andrei De Jesus</div></td>
                    <td class="email">andrei@email.com</td>
                    <td>+63 921 567 8901</td>
                    <td class="user-order-id">12</td>
                    <td><span class="badge badge-active">Active</span></td>
                    <td>
                        <div class="action-wrap">
                            <button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </td>
                </tr>
                <tr data-user-id="US-102-12" data-name="Princess Magtalas" data-email="princess@email.com" data-contact="+63 034 321 0987" data-address="Tagaytay City, Cavite" data-total-orders="8" data-last-order="2026-03-20" data-last-file="org_shirt_design.png" data-status="Suspended">
                    <td class="user-id">US-102-12</td>
                    <td><div class="user-name-cell">Princess Magtalas</div></td>
                    <td class="email">princess@email.com</td>
                    <td>+63 034 321 0987</td>
                    <td class="user-order-id">8</td>
                    <td><span class="badge badge-suspended">Suspended</span></td>
                    <td>
                        <div class="action-wrap">
                            <button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </td>
                </tr>
                <tr data-user-id="USR-004" data-name="Sarah Johnson" data-email="sarah.j@email.com" data-contact="0921-555-8899" data-address="Makati City" data-total-orders="32" data-last-order="2026-04-01" data-last-file="annual_report_2025.pdf" data-status="Active">
                    <td class="user-id">USR-004</td>
                    <td><div class="user-name-cell">Sarah Johnson</div></td>
                    <td class="email">sarah.j@email.com</td>
                    <td>0921-555-8899</td>
                    <td class="user-order-id">32</td>
                    <td><span class="badge badge-active">Active</span></td>
                    <td>
                        <div class="action-wrap">
                            <button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </td>
                </tr>
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

    <script src="script.js?v=2"></script>
</body>
</html>