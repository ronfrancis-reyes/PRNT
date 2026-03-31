<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PrintHub – Order Management</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>

      <!-- toolbar -->
      <div class="toolbar">
        <div class="search-wrap">
          <i class="fas fa-search"></i>
          <input type="text" id="searchInput" placeholder="Search orders..." oninput="filterTable()"/>
        </div>
        <select id="statusFilter" class="filter-select" onchange="filterTable()">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
        <button class="btn-export" onclick="exportCSV()">
          <i class="fas fa-download"></i> Export
        </button>
        <button class="btn-delete-completed" onclick="confirmDeleteCompleted()">
          <i class="fas fa-trash-can"></i> Delete Completed
        </button>
      </div>

      <!-- table -->
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

            <!-- for testing -->
            <tr data-order-id="ORD-1234" data-date="Mar 24, 2026" data-customer="John Smith" data-email="john.smith@email.com" data-phone="09171234567" data-service="Business Cards" data-file="business_card.pdf" data-print-type="Colored" data-paper-size="A4" data-copies="50" data-receiving="Delivery" data-address="Activity Center" data-notes="Please use glossy finish." data-amount="₱45.00" data-status="Completed">
              <td class="order-id">ORD-1234</td>
              <td>John Smith</td><td>10:30 AM</td><td>Business Cards</td>
              <td><span class="file-cell"><i class="fas fa-file-pdf"></i> business_card.pdf</span></td>
              <td class="amount">₱45.00</td><td>Delivery</td>
              <td><span class="badge badge-completed">Completed</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-vertical"></i></button></div></td>
            </tr>

            <tr data-order-id="ORD-1235" data-date="Mar 24, 2026" data-customer="Sarah Johnson" data-email="sarah.j@email.com" data-phone="09281234567" data-service="Flyers (A4)" data-file="flyer_design.pdf" data-print-type="Colored" data-paper-size="A4" data-copies="100" data-receiving="Pick-up" data-address="E-Library" data-notes="Double sided printing please." data-amount="₱120.00" data-status="Processing">
              <td class="order-id">ORD-1235</td>
              <td>Sarah Johnson</td><td>11:15 AM</td><td>Flyers (A4)</td>
              <td><span class="file-cell"><i class="fas fa-file-pdf"></i> flyer_design.pdf</span></td>
              <td class="amount">₱120.00</td><td>Pick-up</td>
              <td><span class="badge badge-processing">Processing</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-vertical"></i></button></div></td>
            </tr>

            <tr data-order-id="ORD-1236" data-date="Mar 24, 2026" data-customer="Mike Brown" data-email="mike.brown@email.com" data-phone="09391234567" data-service="Posters (A2)" data-file="poster.pdf" data-print-type="Colored" data-paper-size="A2" data-copies="10" data-receiving="Delivery" data-address="Pimentel Hall" data-notes="None" data-amount="₱85.00" data-status="Pending">
              <td class="order-id">ORD-1236</td>
              <td>Mike Brown</td><td>12:45 PM</td><td>Posters (A2)</td>
              <td><span class="file-cell"><i class="fas fa-file-pdf"></i> poster.pdf</span></td>
              <td class="amount">₱85.00</td><td>Delivery</td>
              <td><span class="badge badge-pending">Pending</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-vertical"></i></button></div></td>
            </tr>

            <tr data-order-id="ORD-1237" data-date="Mar 24, 2026" data-customer="Emma Davis" data-email="emma.davis@email.com" data-phone="09501234567" data-service="Brochures" data-file="brochure.pdf" data-print-type="Colored" data-paper-size="A4" data-copies="200" data-receiving="Pick-up" data-address="CoED" data-notes="Tri-fold layout." data-amount="₱200.00" data-status="Completed">
              <td class="order-id">ORD-1237</td>
              <td>Emma Davis</td><td>01:20 PM</td><td>Brochures</td>
              <td><span class="file-cell"><i class="fas fa-file-pdf"></i> brochure.pdf</span></td>
              <td class="amount">₱200.00</td><td>Pick-up</td>
              <td><span class="badge badge-completed">Completed</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-vertical"></i></button></div></td>
            </tr>

            <tr data-order-id="ORD-1238" data-date="Mar 24, 2026" data-customer="James Wilson" data-email="james.w@email.com" data-phone="09611234567" data-service="Banners" data-file="banner_design.pdf" data-print-type="Colored" data-paper-size="A1" data-copies="5" data-receiving="Delivery" data-address="Carpio Hall" data-notes="Please use tarpaulin material." data-amount="₱350.00" data-status="Processing">
              <td class="order-id">ORD-1238</td>
              <td>James Wilson</td><td>02:10 PM</td><td>Banners</td>
              <td><span class="file-cell"><i class="fas fa-file-pdf"></i> banner_design.pdf</span></td>
              <td class="amount">₱350.00</td><td>Delivery</td>
              <td><span class="badge badge-processing">Processing</span></td>
              <td><div class="action-wrap"><button class="btn-actions" onclick="toggleMenu(this)"><i class="fas fa-ellipsis-vertical"></i></button></div></td>
            </tr>
            <!-- end for testing -->

          </tbody>
        </table>
      </div>

<!-- action panel  -->
<div id="actionPanel"></div>

<!-- view details modal -->
<div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-receipt"></i> View Details</div>
      <button class="modal-close" onclick="closeModal()"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="modal-body" id="modalBody"></div>
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

<!-- status toast notification -->
<div class="toast" id="toast">
  <i class="fas fa-circle-check"></i>
  <span id="toastMsg"></span>
</div>

<script src="script.js"></script>
</body>
</html>