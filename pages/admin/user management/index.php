<?php
include "../../../api/config.php";
if(!isset($_SESSION['user'])) {
header("Location: /PRNT/pages/login/");
} else if ($_SESSION['user'] != 1) {
header("Location: /PRNT/pages/client/service-avail/");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PrintHub – User Management</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>

<div class="app-shell">

  <!-- sidebar: alfred -->
  <div class="sidebar-placeholder" id="sidebar-slot"></div>

  <div class="main-area">

    <!-- topbar: alfred -->
    <div class="topbar-placeholder" id="topbar-slot"></div>

    <div class="page-content">

      <h1 class="page-title">User Management</h1>
      <p class="page-subtitle">Manage and monitor all registered users.</p>

      <!-- toolbar -->
      <div class="toolbar">
        <div class="search-wrap">
          <i class="bi bi-search"></i>
          <input type="text" id="searchInput" placeholder="Search users..." oninput="filterTable()"/>
        </div>
        <select id="statusFilter" class="filter-select" onchange="filterTable()">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
        <button class="btn-export" onclick="exportCSV()">
          <i class="bi bi-download"></i> Export
        </button>
      </div>

      <!-- table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">

            <!-- for testing -->
            
            <!-- end for testing -->

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

<!-- user details modal -->
<div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <div class="modal-header">
      <div class="modal-title"><i class="bi bi-person-lines-fill"></i> View Details</div>
      <button class="modal-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>

<!-- delete confirm modal -->
<div class="modal-overlay" id="deleteOverlay" onclick="closeDeleteModal()">
  <div class="modal-box modal-box-sm" onclick="event.stopPropagation()">
    <div class="delete-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
    <div class="delete-title">Confirm Delete</div>
    <div class="delete-msg" id="deleteMsg"></div>
    <div class="delete-actions">
      <button class="btn-cancel" onclick="closeDeleteModal()">Cancel</button>
      <button class="btn-confirm-delete" id="btnConfirmDelete"><i class="bi bi-trash3"></i> Delete</button>
    </div>
  </div>
</div>

<!-- suspend confirm modal -->
<div class="modal-overlay" id="suspendOverlay" onclick="closeSuspendModal()">
  <div class="modal-box modal-box-sm" onclick="event.stopPropagation()">
    <div class="suspend-icon"><i class="bi bi-slash-circle-fill"></i></div>
    <div class="delete-title">Confirm Suspend</div>
    <div class="delete-msg" id="suspendMsg"></div>
    <div class="delete-actions">
      <button class="btn-cancel" onclick="closeSuspendModal()">Cancel</button>
      <button class="btn-confirm-suspend" id="btnConfirmSuspend"><i class="bi bi-slash-circle" ></i> Suspend</button>
    </div>
  </div>
</div>

<!-- toast notification -->
<div class="toast" id="toast">
  <i class="bi bi-check-circle-fill"></i>
  <span id="toastMsg"></span>
</div>
<script src="https://code.jquery.com/jquery-4.0.0.js" integrity="sha256-9fsHeVnKBvqh3FB2HYu7g2xseAZ5MlN6Kz/qnkASV8U=" crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>
</html>