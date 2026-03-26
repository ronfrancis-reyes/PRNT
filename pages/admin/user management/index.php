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
            <tr data-user-id="USR-001" data-name="John Smith" data-email="john.smith@email.com" data-phone="09171234567" data-address="Activity Center" data-last-order="ORD-1234" data-status="Active">
              <td class="user-id">USR-001</td>
              <td><div class="user-name-cell"><div class="avatar">JS</div> John Smith</div></td>
              <td class="email">john.smith@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="user-order-id">ORD-1234</td>
              <td><div class="action-wrap">
                <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  <button onclick="confirmSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div></td>
            </tr>

            <tr data-user-id="USR-002" data-name="Sarah Johnson" data-email="sarah.j@email.com" data-phone="09281234567" data-address="E-Library" data-last-order="ORD-1235" data-status="Active">
              <td class="user-id">USR-002</td>
              <td><div class="user-name-cell"><div class="avatar">SJ</div> Sarah Johnson</div></td>
              <td class="email">sarah.j@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="user-order-id">ORD-1235</td>
              <td><div class="action-wrap">
                <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  <button onclick="confirmSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div></td>
            </tr>

            <tr data-user-id="USR-003" data-name="Mike Brown" data-email="mike.brown@email.com" data-phone="09391234567" data-address="Pimentel Hall" data-last-order="ORD-1236" data-status="Active">
              <td class="user-id">USR-003</td>
              <td><div class="user-name-cell"><div class="avatar">MB</div> Mike Brown</div></td>
              <td class="email">mike.brown@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="user-order-id">ORD-1236</td>
              <td><div class="action-wrap">
                <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  <button onclick="confirmSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div></td>
            </tr>

            <tr data-user-id="USR-004" data-name="Emma Davis" data-email="emma.davis@email.com" data-phone="09501234567" data-address="CoED" data-last-order="ORD-1237" data-status="Active">
              <td class="user-id">USR-004</td>
              <td><div class="user-name-cell"><div class="avatar">ED</div> Emma Davis</div></td>
              <td class="email">emma.davis@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="user-order-id">ORD-1237</td>
              <td><div class="action-wrap">
                <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  <button onclick="confirmSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div></td>
            </tr>

            <!-- james is already suspended — activate user directly -->
            <tr data-user-id="USR-005" data-name="James Wilson" data-email="james.w@email.com" data-phone="09611234567" data-address="Carpio Hall" data-last-order="ORD-1238" data-status="Suspended">
              <td class="user-id">USR-005</td>
              <td><div class="user-name-cell"><div class="avatar">JW</div> James Wilson</div></td>
              <td class="email">james.w@email.com</td>
              <td><span class="badge badge-suspended">Suspended</span></td>
              <td class="user-order-id">ORD-1238</td>
              <td><div class="action-wrap">
                <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                <div class="dropdown">
                  <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                  <button onclick="activateUser(this)"><i class="bi bi-person-check"></i> Activate User</button>
                  <hr/>
                  <button class="danger" onclick="confirmDelete(this)"><i class="bi bi-trash3"></i> Delete User</button>
                </div>
              </div></td>
            </tr>
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
      <button class="btn-confirm-suspend" id="btnConfirmSuspend"><i class="bi bi-slash-circle"></i> Suspend</button>
    </div>
  </div>
</div>

<!-- toast notification -->
<div class="toast" id="toast">
  <i class="bi bi-check-circle-fill"></i>
  <span id="toastMsg"></span>
</div>

<script src="script.js"></script>
</body>
</html>