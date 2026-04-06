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
    <title>PRNT - Customer Messages</title>

    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css">

    <!-- PDF Export Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
</head>
<body class="module-body">

    <div id="toastContainer" aria-live="polite"></div>

    <!-- Message Detail Modal -->
    <div id="modalOverlay" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Message dialog">
        <div class="modal-card" id="modalCard"></div>
    </div>

    <div class="page-content">
        <!-- Toolbar Controls -->
        <div class="toolbar">
            <div class="search-wrap">
                <i class="fas fa-search search-icon"></i>
                <input type="text" id="searchInput" placeholder="Search by name, subject…" autocomplete="off"/>
            </div>
            <select id="statusFilter" class="filter-select">
                <option value="">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
            </select>
            <button class="btn-export btn-export-pdf" id="btnExportPDF" title="Export table as PDF">
                <i class="fa-solid fa-download"></i>
                <span>Export PDF</span>
            </button>

            <button class="btn-delete-completed" id="btnDeleteSelected">
                <i class="fas fa-trash-can"></i>
                <span>Delete Read Message</span>
            </button>
        </div>

        <!-- Data Table -->
        <div class="table-card">
            <div class="table-scroll-wrap" id="exportTarget">
                <table id="messagesTable">
                    <thead>
                        <tr>
                            <th class="col-msg-id">Message ID</th>
                            <th class="col-customer">Customer Name</th>
                            <th class="col-date">Date & Time</th>
                            <th class="col-message">Subject</th>
                            <th class="col-status">Status</th>
                            <th class="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <!-- Rows injected by script.js -->
                         <!-- THE TEMPLATE ROW (MESSAGES) -->
                        <tr class="msg-row unread" 
                            data-id="101" 
                            data-status="unread" 
                            data-name="Maria Clara" 
                            data-contact="09112223333" 
                            data-email="maria@bulsu.edu.ph" 
                            data-message="I would like to ask about the delivery fee for bulk orders." 
                            data-date="Oct 05, 2024" 
                            data-time="10:30 AM">
                            
                            <!-- 1. Message ID -->
                            <td class="msg-id">MSG-101</td>
                            
                            <!-- 2. Customer Name -->
                            <td>Maria Clara</td>
                            
                            <!-- 3. Date & Time -->
                            <td class="text-center">Oct 05, 2024</td>
                            
                            <!-- 4. Message Snippet -->
                            <td class="message-snippet fw-600">I would like to ask about the...</td>
                            
                            <!-- 5. Status Badge -->
                            <td><span class="badge badge-unread">Unread</span></td>
                            
                            <!-- 6. Action Button -->
                            <td>
                                <div class="action-wrap">
                                    <button class="btn-actions">
                                        <i class="fas fa-ellipsis-vertical"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="empty-state" id="emptyState" style="display:none;">
                    <i class="fas fa-envelope-open"></i>
                    <p>No messages found</p>
                    <span>Try adjusting your search or filter.</span>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>