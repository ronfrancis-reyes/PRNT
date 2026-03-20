<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PrintHub – Order Management</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>

<div class="app-shell">

  <!-- SIDEBAR: ALFRED -->
  <div class="sidebar-placeholder" id="sidebar-slot"></div>

  <div class="main-area">

    <!-- TOPBAR: ALFRED -->
    <div class="topbar-placeholder" id="topbar-slot"></div>

    <div class="page-content">

      <h1 class="page-title">Order Management</h1>
      <p class="page-subtitle">Manage and track all printing orders.</p>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-wrap">
          <i class="bi bi-search"></i>
          <input type="text" id="searchInput" placeholder="Search orders..." oninput="filterTable()"/>
        </div>
        <select id="statusFilter" class="filter-select" onchange="filterTable()">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
        <button class="btn-export" onclick="exportCSV()">
          <i class="bi bi-download"></i> Export
        </button>
        <button class="btn-delete-completed" onclick="deleteCompleted()">
          <i class="bi bi-trash3"></i> Delete Completed
        </button>
      </div>

      <!-- Table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Time</th>
              <th>Service</th>
              <th>File Uploaded</th>
              <th>Amount</th>
              <th>Receiving Option</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">

            <!-- FOR TESTING -->
            <tr>
              <td class="order-id">ORD-1234</td>
              <td>John Smith</td>
              <td>10:30 AM</td>
              <td>Business Cards</td>
              <td><span class="file-cell"><i class="bi bi-file-earmark-text"></i> business_card.pdf</span></td>
              <td class="amount">$45.00</td>
              <td>Delivery</td>
              <td><span class="badge badge-completed">Completed</span></td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="setStatus(this,'Completed')"><i class="bi bi-check-circle"></i> Mark as Completed</button>
                    <button onclick="setStatus(this,'Processing')"><i class="bi bi-gear"></i> Mark as Processing</button>
                    <button onclick="setStatus(this,'Pending')"><i class="bi bi-clock"></i> Mark as Pending</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete this Order</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="order-id">ORD-1235</td>
              <td>Sarah Johnson</td>
              <td>11:15 AM</td>
              <td>Flyers (A4)</td>
              <td><span class="file-cell"><i class="bi bi-file-earmark-text"></i> flyer_design.pdf</span></td>
              <td class="amount">$120.00</td>
              <td>Pick-up</td>
              <td><span class="badge badge-processing">Processing</span></td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="setStatus(this,'Completed')"><i class="bi bi-check-circle"></i> Mark as Completed</button>
                    <button onclick="setStatus(this,'Processing')"><i class="bi bi-gear"></i> Mark as Processing</button>
                    <button onclick="setStatus(this,'Pending')"><i class="bi bi-clock"></i> Mark as Pending</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete this Order</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="order-id">ORD-1236</td>
              <td>Mike Brown</td>
              <td>12:45 PM</td>
              <td>Posters (A2)</td>
              <td><span class="file-cell"><i class="bi bi-file-earmark-text"></i> poster.pdf</span></td>
              <td class="amount">$85.00</td>
              <td>Delivery</td>
              <td><span class="badge badge-pending">Pending</span></td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="setStatus(this,'Completed')"><i class="bi bi-check-circle"></i> Mark as Completed</button>
                    <button onclick="setStatus(this,'Processing')"><i class="bi bi-gear"></i> Mark as Processing</button>
                    <button onclick="setStatus(this,'Pending')"><i class="bi bi-clock"></i> Mark as Pending</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete this Order</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="order-id">ORD-1237</td>
              <td>Emma Davis</td>
              <td>01:20 PM</td>
              <td>Brochures</td>
              <td><span class="file-cell"><i class="bi bi-file-earmark-text"></i> brochure.pdf</span></td>
              <td class="amount">$200.00</td>
              <td>Pick-up</td>
              <td><span class="badge badge-completed">Completed</span></td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="setStatus(this,'Completed')"><i class="bi bi-check-circle"></i> Mark as Completed</button>
                    <button onclick="setStatus(this,'Processing')"><i class="bi bi-gear"></i> Mark as Processing</button>
                    <button onclick="setStatus(this,'Pending')"><i class="bi bi-clock"></i> Mark as Pending</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete this Order</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="order-id">ORD-1238</td>
              <td>James Wilson</td>
              <td>02:10 PM</td>
              <td>Banners</td>
              <td><span class="file-cell"><i class="bi bi-file-earmark-text"></i> banner_design.pdf</span></td>
              <td class="amount">$350.00</td>
              <td>Delivery</td>
              <td><span class="badge badge-processing">Processing</span></td>
              <td>
                <div class="action-wrap">
                  <button class="btn-actions" onclick="toggleMenu(this)"><i class="bi bi-three-dots-vertical"></i></button>
                  <div class="dropdown">
                    <button onclick="setStatus(this,'Completed')"><i class="bi bi-check-circle"></i> Mark as Completed</button>
                    <button onclick="setStatus(this,'Processing')"><i class="bi bi-gear"></i> Mark as Processing</button>
                    <button onclick="setStatus(this,'Pending')"><i class="bi bi-clock"></i> Mark as Pending</button>
                    <hr/>
                    <button class="danger" onclick="deleteRow(this)"><i class="bi bi-trash3"></i> Delete this Order</button>
                  </div>
                </div>
              </td>
            </tr>
            <!-- FOR TESTING -->

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>