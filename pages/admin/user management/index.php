<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>PrintHub – User Management</title>
    
    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../../global/variables.css?v=4">
    <link rel="stylesheet" href="styles.css?v=5">
</head>
<body class="module-body">

            <div class="toolbar">
                <div class="search-wrap">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="searchInput" placeholder="Search users..." oninput="filterTable()"/>
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

      <!-- table  -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Total Orders</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">

            <!-- for testing -->
            <tr data-user-id="USR-001" data-name="John Smith" data-email="john.smith@email.com" data-contact="09171234567" data-address="Activity Center" data-total-orders="45" data-last-order="2026-03-24" data-status="Active">
              <td class="user-id">USR-001</td>
              <td><div class="user-name-cell"><div class="avatar">JS</div> John Smith</div></td>
              <td class="email">john.smith@email.com</td>
              <td>09171234567</td>
              <td class="user-order-id">45</td>
              <td><span class="badge badge-active">Active</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button></div></td>
            </tr>
            <tr data-user-id="US-201-11" data-name="Andrei De Jesus" data-email="andrei@email.com" data-contact="+63 921 567 8901" data-address="Dasmariñas, Cavite" data-total-orders="12" data-last-order="2024-03-28" data-status="Active">
              <td class="user-id">US-201-11</td>
              <td><div class="user-name-cell"><div class="avatar">AJ</div> Andrei De Jesus</div></td>
              <td class="email">andrei@email.com</td>
              <td>+63 921 567 8901</td>
              <td class="user-order-id">12</td>
              <td><span class="badge badge-active">Active</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button></div></td>
            </tr>
            <tr data-user-id="US-102-12" data-name="Princess Magtalas" data-email="princess@email.com" data-contact="+63 034 321 0987" data-address="Tagaytay City, Cavite" data-total-orders="8" data-last-order="2024-03-20" data-status="Suspended">
              <td class="user-id">US-102-12</td>
              <td><div class="user-name-cell"><div class="avatar">PM</div> Princess Magtalas</div></td>
              <td class="email">princess@email.com</td>
              <td>+63 034 321 0987</td>
              <td class="user-order-id">8</td>
              <td><span class="badge badge-suspended">Suspended</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-v"></i></button></div></td>
            </tr>

<!-- action panel -->
<div id="actionPanel"></div>

<!-- user details modal -->
<div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-user-gear text-primary"></i> View Details</div>
      <button class="modal-close" id="closeDetailModal" onclick="closeModal()"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="modal-body" id="modalBody">
      <!-- USER ID HEADER -->
      <div class="m-user-id">USR-001</div>

      <!-- 2-COLUMN GRID SYSTEM -->
      <div class="m-grid">
        <!-- Row 1: Name | Status -->
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

        <!-- Row 2: Bulsu Email | Contact Number -->
        <div class="detail-card">
          <div class="detail-label">BULSU EMAIL</div>
          <div class="detail-value m-email">—</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">CONTACT NUMBER</div>
          <div class="detail-value m-contact">—</div>
        </div>

        <!-- Row 3: Total Orders | Last Order -->
        <div class="detail-card">
          <div class="detail-label">TOTAL ORDERS</div>
          <div class="detail-value m-total-orders">—</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">LAST ORDER</div>
          <div class="detail-value m-last-order">—</div>
        </div>
      </div>
      
      <!-- BACKEND NOTE: Use Fetch API here to get additional user history/logs if needed -->
    </div>
  </div>
</div>

<!-- delete confirm modal -->
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

<!-- suspend confirm modal -->
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

<!-- toast notification -->
<div class="toast" id="toast">
  <i class="fas fa-circle-check"></i>
  <span id="toastMsg"></span>
</div>

<script src="script.js?v=4"></script>
</body>
</html>