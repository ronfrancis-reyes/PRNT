<?php
/**
 * PRNT — Tracking Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Client interface for real-time order status tracking and progress.
 * ─────────────────────────────────────────────────────────────────────────────
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track Order — PRNT</title>
  <meta name="description" content="Real-time updates on your PRNT print order status.">

  <!-- EXTERNAL DEPENDENCIES -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- COMPONENT STYLES -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../../../components/Navbar/Navbar.css">
  <link rel="stylesheet" href="../../../components/Footer/Footer.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- NAVIGATION -->
  <?php include __DIR__ . '/../../../components/Navbar/Navbar.html'; ?>

  <!-- ===== MAIN WRAPPER ===== -->
  <main class="main-wrapper">
    <div class="page-content">
      <div class="tracking-container">

        <!-- SECTION 1: HEADER -->
        <header class="section-title">
          <h1><i class="fas fa-route"></i> Track My Order</h1>
          <p class="panel-subtitle">Update on your print progress.</p>
        </header>

        <!-- RECEIPT SUMMARY CARD -->
        <div id="receiptSummary" class="receipt-summary-card">
          <div class="receipt-summary-grid">
            
            <div class="summary-info" style="grid-area: 1 / 1;">
              <label><i class="fas fa-fingerprint"></i> ORDER ID</label>
              <span id="orderId">ORD-XXXXXX</span>
            </div>
            
            <div class="summary-info" style="grid-area: 1 / 2;">
              <label><i class="fas fa-circle-notch"></i> STATUS</label>
              <div><span id="statusBadge" class="status-badge status-pending">Pending</span></div>
            </div>
            
            <div class="summary-info" style="grid-area: 2 / 1;">
              <label><i class="fas fa-box-open"></i> ITEMS</label>
              <span id="itemCount">0 Items</span>
            </div>
            
            <div class="summary-info" style="grid-area: 2 / 2;">
              <label><i class="fas fa-wallet"></i> TOTAL AMOUNT</label>
              <span id="totalAmount">P0.00</span>
            </div>
            
            <div class="summary-btn-wrap">
              <button class="btn-text" onclick="viewReceipt()">
                View Receipt <i class="fas fa-external-link-alt"></i>
              </button>
            </div>
            
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Order Progress</span>
            <span class="progress-pct" id="progressPct">0%</span>
          </div>
          <div class="progress-bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="progressBarEl">
            <div class="progress-bar-fill" id="progressFill"></div>
          </div>
        </div>

        <!-- SECTION 2: STATUS TIMELINE -->
        <div class="tracking-panel">
          <div class="timeline-container">

            <div class="timeline-step" id="step-pending">
              <div class="step-icon"><i class="fas fa-clock"></i></div>
              <div class="step-content">
                <h3>Order Pending</h3>
                <p>Waiting for the hub staff to accept your order.</p>
                <span class="step-time" id="time-pending">—</span>
              </div>
            </div>

            <div class="timeline-step" id="step-processing">
              <div class="step-icon"><i class="fas fa-print"></i></div>
              <div class="step-content">
                <h3>Processing &amp; Printing</h3>
                <p>Your files are currently being printed and prepared.</p>
                <span class="step-time" id="time-processing">—</span>
              </div>
            </div>

            <div class="timeline-step" id="step-delivering">
              <div class="step-icon"><i class="fas fa-truck-pickup"></i></div>
              <div class="step-content">
                <h3>Ready / In Transit</h3>
                <p>Items are ready for pick-up or out for delivery.</p>
                <span class="step-time" id="time-delivering">—</span>
              </div>
            </div>

            <div class="timeline-step" id="step-completed">
              <div class="step-icon"><i class="fas fa-check-double"></i></div>
              <div class="step-content">
                <h3>Completed</h3>
                <p>Enjoy your newly printed materials!</p>
                <span class="step-time" id="time-completed">—</span>
              </div>
            </div>

          </div>
        </div>

        <!-- FOOTER ACTIONS -->
        <div class="footer-actions">
          <button class="btn btn-refresh" id="refreshBtn" onclick="handleRefresh()" aria-label="Refresh order status">
            <i class="fas fa-sync-alt" id="refreshIcon"></i> Refresh Status
          </button>
          <button class="btn btn-outline" onclick="window.location.href='../order/index.php'">
            <i class="fas fa-plus"></i> Place Another Order
          </button>
        </div>

      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <?php include __DIR__ . '/../../../components/Footer/Footer.html'; ?>

  <!-- ===== SCRIPTS ===== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
