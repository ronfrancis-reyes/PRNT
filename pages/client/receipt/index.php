<?php
/**
 * PRNT — Receipt Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Client interface for reviewing and confirming order details.
 * ─────────────────────────────────────────────────────────────────────────────
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Receipt — PRNT</title>
  <meta name="description" content="Review your PRNT order receipt before confirming.">

  <!-- EXTERNAL DEPENDENCIES -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../../../components/Navbar/Navbar.css">
  <link rel="stylesheet" href="../../../components/Footer/Footer.css">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>

  <!-- NAVIGATION -->
  <?php include __DIR__ . '/../../../components/Navbar/Navbar.html'; ?>
  <div class="navbar-spacer"></div>

  <!-- ===== MAIN WRAPPER ===== -->
  <main>
    <div class="page-content">
      <div class="receipt-card" id="receiptCard">

        <!-- WATERMARK -->
        <div class="receipt-watermark" aria-hidden="true">PRNT</div>

        <!-- HEADER: Solid Orange -->
        <div class="receipt-header">
          <div class="success-icon">
            <i class="fas fa-check"></i>
          </div>
          <h1 id="orderId">Order Receipt: ORD-XXXXXX</h1>
          <div class="header-meta">
            <span id="orderStatus">Status: Pending</span>
          </div>
          <div class="zigzag"></div>
        </div>

        <!-- BODY -->
        <div class="receipt-body">

          <!-- PERSONAL & LOGISTICS -->
          <div class="info-section">
            <div class="section-badge">
              <div class="badge-icon"><i class="fas fa-info"></i></div> 
              PERSONAL &amp; LOGISTICS
            </div>
            <div class="info-grid card-box">
              <div class="info-item">
                <label>CUSTOMER</label>
                <span id="custName">Juan Dela Cruz</span>
              </div>
              <div class="info-item">
                <label>PHONE NUMBER</label>
                <span id="custPhone">0912-345-6789</span>
              </div>
              <div class="info-item">
                <label>RECEIVING METHOD</label>
                <span id="recvMethod">—</span>
              </div>
              <div class="info-item">
                <label>LOCATION</label>
                <span id="recvLoc">—</span>
              </div>
              <div class="info-item">
                <label>PAYMENT METHOD</label>
                <span id="payMethod">—</span>
              </div>
              <div class="info-item">
                <label>ORDER DATE</label>
                <span id="orderDate2">—</span>
              </div>
            </div>
          </div>

          <!-- ORDER SUMMARY -->
          <div class="info-section">
            <div class="section-badge">
              <div class="badge-icon"><i class="fas fa-print"></i></div> 
              ORDER SUMMARY
            </div>
            <div id="itemList" class="item-list card-box">
              <!-- Dynamically populated by script.js -->
            </div>
          </div>

          <!-- ADDITIONAL NOTES -->
          <div id="notesSection" class="info-section">
            <div class="section-badge">
              <div class="badge-icon"><i class="fas fa-sticky-note"></i></div> 
              ADDITIONAL NOTES
            </div>
            <p id="orderNotes" class="notes-text card-box">No additional notes.</p>
          </div>

          <!-- TOTALS: Dark Card -->
          <div class="total-card">
            <div class="total-row">
              <span>Subtotal</span>
              <span id="subtotalVal">P0.00</span>
            </div>
            <div class="total-row">
              <span>Delivery Fee</span>
              <span id="deliveryVal">P0.00</span>
            </div>
            <div class="divider-line"></div>
            <div class="grand-total">
              <span>Total Amount</span>
              <span id="totalVal">P0.00</span>
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="action-buttons">
            <button class="btn btn-outline" onclick="window.print()">
              <i class="fas fa-print"></i> Export Receipt
            </button>
            <a href="../tracking/index.php" class="btn btn-primary" style="text-decoration: none;">
              Track Order Status
            </a>
          </div>

        </div><!-- /.receipt-body -->
      </div><!-- /.receipt-card -->
    </div>
  </main>

  <div class="footer-spacer"></div>
  <?php include __DIR__ . '/../../../components/Footer/Footer.html'; ?>

  <!-- ===== CONFIRMATION MODAL ===== -->
  <div class="modal-overlay" id="confirmModal" aria-hidden="true" style="display:none;">
    <div class="modal-content">
      <div style="font-size: 3.5rem; color: var(--primary); margin-bottom: 1rem;">
        <i class="fas fa-question-circle"></i>
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-dark);">Confirm Order</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.5;">
        Are you sure you want to place this order?
      </p>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
        <button class="btn btn-outline" style="width:100%; justify-content:center;" onclick="closeConfirmModal()">Cancel</button>
        <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="executeConfirmOrder()">Confirm</button>
      </div>
    </div>
  </div>

  <!-- ===== SCRIPTS ===== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>

</body>
</html>
