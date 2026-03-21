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

  <!-- SIDEBAR: ALFRED -->
  <div class="sidebar-placeholder" id="sidebar-slot"></div>

  <div class="main-area">

    <!-- TOPBAR: ALFRED-->
    <div class="topbar-placeholder" id="topbar-slot"></div>

    <div class="page-content">

      <h1 class="page-title">User Management</h1>
      <p class="page-subtitle">Manage and monitor all registered users.</p>

      <!-- Toolbar -->
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

      <!-- Table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">

            <!-- SAMPLE DATA:-->
            <tr>
              <td class="user-id">USR-001</td>
              <td><div class="user-name-cell"><div class="avatar">JS</div> John Smith</div></td>
              <td class="email">john.smith@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="muted">2 min ago</td>
              <td class="user-order-id">ORD-1234</td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                    <button onclick="toggleSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete User</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="user-id">USR-002</td>
              <td><div class="user-name-cell"><div class="avatar">SJ</div> Sarah Johnson</div></td>
              <td class="email">sarah.j@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="muted">15 min ago</td>
              <td class="user-order-id">ORD-1235</td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                    <button onclick="toggleSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete User</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="user-id">USR-003</td>
              <td><div class="user-name-cell"><div class="avatar">MB</div> Mike Brown</div></td>
              <td class="email">mike.brown@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="muted">1 hour ago</td>
              <td class="user-order-id">ORD-1236</td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                    <button onclick="toggleSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete User</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="user-id">USR-004</td>
              <td><div class="user-name-cell"><div class="avatar">ED</div> Emma Davis</div></td>
              <td class="email">emma.davis@email.com</td>
              <td><span class="badge badge-active">Active</span></td>
              <td class="muted">2 hours ago</td>
              <td class="user-order-id">ORD-1237</td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                    <button onclick="toggleSuspend(this)"><i class="bi bi-slash-circle"></i> Suspend User</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete User</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="user-id">USR-005</td>
              <td><div class="user-name-cell"><div class="avatar">JW</div> James Wilson</div></td>
              <td class="email">james.w@email.com</td>
              <td><span class="badge badge-suspended">Suspended</span></td>
              <td class="muted">1 day ago</td>
              <td class="user-order-id">ORD-1238</td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="viewDetails(this)"><i class="bi bi-eye"></i> View Details</button>
                    <button onclick="toggleSuspend(this)"><i class="bi bi-person-check"></i> Activate User</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete User</button>
                  </div>
                </div>
              </td>
            </tr>
            <!-- SAMPLE DATA -->

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>