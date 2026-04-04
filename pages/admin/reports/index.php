<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>PRNT - Customer Messages</title>

    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css?v=2.5">

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
                            <th class="col-message">Message</th>
                            <th class="col-status">Status</th>
                            <th class="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <!-- Rows injected by script.js -->
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

    <script src="script.js?v=2.5"></script>
</body>
</html>