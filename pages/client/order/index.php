<?php
/**
 * PRNT — Order Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Client interface for uploading files and configuring print orders.
 * ─────────────────────────────────────────────────────────────────────────────
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Place an Order — PRNT</title>
  <meta name="description" content="Upload your files, configure your print settings, and place an order with PRNT — fast, easy, and reliable printing service.">

  <!-- EXTERNAL DEPENDENCIES -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- COMPONENT STYLES -->
  <link rel="stylesheet" href="/wst/PRNT/components/Navbar/Navbar.css?v=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'] . '/wst/PRNT/components/Navbar/Navbar.css'); ?>">
  <link rel="stylesheet" href="../../../components/Footer/Footer.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- ===== TOAST CONTAINER ===== -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- NAVIGATION -->
  <?php include __DIR__ . '/../../../components/Navbar/Navbar.html'; ?>

  <!-- ===== MAIN WRAPPER ===== -->
  <main class="main-wrapper" id="mainContent">
    <div class="page-content">

      <div class="order-container">
        <!-- SECTION HEADER -->
        <header class="section-title" style="text-align: center; margin-bottom: 2rem;">
          <h1 style="justify-content: center;"><i class="fas fa-print"></i> Print Your Ideas</h1>
          <p class="subtitle">Easily upload your files, choose your preferred print format, and get your prints right away.</p>
        </header>

        <!-- PROGRESS STEPPER -->
        <div class="stepper" id="stepper" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="1">
          <div class="step active" id="step-indicator-1">
            <div class="step-bubble"><i class="fas fa-cloud-upload-alt"></i></div>
            <span>Upload</span>
          </div>
          <div class="step-line"></div>
          <div class="step" id="step-indicator-2">
            <div class="step-bubble"><i class="fas fa-sliders-h"></i></div>
            <span>Configure</span>
          </div>
          <div class="step-line"></div>
          <div class="step" id="step-indicator-3">
            <div class="step-bubble"><i class="fas fa-check"></i></div>
            <span>Checkout</span>
          </div>
        </div>

        <!-- SECTION 2: 2-COLUMN GRID — Upload + Configure -->
        <div class="grid-2-col">

          <!-- LEFT: Upload Files -->
          <div class="order-panel" id="uploadPanel">
            <div class="panel-header">
              <span class="step-num" aria-label="Step 1">1</span>
              <h2>Upload Your Files</h2>
            </div>

            <input type="file" id="fileInput" multiple style="display:none;" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onchange="handleFileUpload(event)">

            <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()" role="button" tabindex="0" aria-label="Click or drag files to upload">
              <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
              </div>
              <h3>Click or drag files here</h3>
              <p>PDF, DOCX, JPG, PNG &mdash; Max 50MB per file</p>
            </div>

            <!-- File Library -->
            <div class="library-container">
              <div class="library-header">
                <h3><i class="fas fa-layer-group"></i> Your Library <span class="file-count-badge" id="fileCountBadge">0</span></h3>
                <button class="btn-text" id="addMoreBtn" onclick="document.getElementById('fileInput').click()" aria-label="Add more files">
                  <i class="fas fa-plus"></i> Add More
                </button>
              </div>
              <div id="fileList" class="file-list" aria-live="polite" aria-label="Uploaded files">
                <div class="empty-library" id="emptyLibrary">
                  <i class="fas fa-folder-open"></i>
                  <p>No files yet. Upload to begin.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Configure Printing -->
          <div class="order-panel" id="configPanel">
            <div class="panel-header">
              <span class="step-num" aria-label="Step 2">2</span>
              <h2>Configure Printing</h2>
            </div>

            <div class="config-hint" id="configHint">
              <i class="fas fa-info-circle"></i>
              Select a file from your library to enable configuration.
            </div>

            <div class="form-body">
              <div class="form-group">
                <label for="serviceSelect">Service / Format</label>
                <div class="select-wrapper">
                  <select id="serviceSelect" onchange="handleServiceChange()" disabled aria-label="Select print service">
                    <option value="">Select a service...</option>
                    <option value="photo">Photo Printing</option>
                    <option value="id_photo">ID Photo Packages</option>
                    <option value="document">Document Printing</option>
                    <option value="large_format">Large Format</option>
                    <option value="brochure">Brochures</option>
                  </select>
                  <i class="fas fa-chevron-down select-icon"></i>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="printType">Print Type</label>
                  <div class="select-wrapper">
                    <select id="printType" onchange="updatePrice()" disabled aria-label="Select print type">
                      <option value="bw">Black &amp; White</option>
                      <option value="color">Full Color</option>
                    </select>
                    <i class="fas fa-chevron-down select-icon"></i>
                  </div>
                </div>
                <div class="form-group">
                  <label for="paperSize">Paper Size</label>
                  <div class="select-wrapper">
                    <select id="paperSize" onchange="updatePrice(); validateSteps();" disabled aria-label="Select paper size">
                      <option value="">Select size...</option>
                    </select>
                    <i class="fas fa-chevron-down select-icon"></i>
                  </div>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="pages">Pages</label>
                  <div class="number-input-wrapper">
                    <button type="button" class="num-btn" onclick="adjustNumber('pages', -1)" aria-label="Decrease pages" tabindex="-1">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" id="pages" value="1" min="1" oninput="updatePrice()" disabled aria-label="Number of pages">
                    <button type="button" class="num-btn" onclick="adjustNumber('pages', 1)" aria-label="Increase pages" tabindex="-1">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <label for="copies">Copies</label>
                  <div class="number-input-wrapper">
                    <button type="button" class="num-btn" onclick="adjustNumber('copies', -1)" aria-label="Decrease copies" tabindex="-1">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" id="copies" value="1" min="1" oninput="updatePrice()" disabled aria-label="Number of copies">
                    <button type="button" class="num-btn" onclick="adjustNumber('copies', 1)" aria-label="Increase copies" tabindex="-1">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Estimated Price Strip -->
              <div class="price-strip" id="priceStrip">
                <div class="price-info">
                  <strong>Estimated Price</strong>
                  <span>per print service</span>
                </div>
                <div class="price-value" id="priceDisplay">P0.00</div>
              </div>

              <button id="addToOrderBtn" class="btn btn-primary btn-full" onclick="addToOrder()" disabled aria-label="Add configured item to order">
                <i class="fas fa-plus"></i> Add to Order
              </button>
            </div>
          </div>
        </div>

        <!-- SECTION 3: FULL WIDTH ORDER SUMMARY -->
        <div class="order-panel summary-panel" id="summaryPanel">
          <div class="panel-header">
            <i class="fas fa-list-ul" aria-hidden="true"></i>
            <h2>Order Summary <span class="cart-badge" id="cartBadge" aria-label="Items in cart">0</span></h2>
          </div>
          <p class="panel-subtitle">Review your items before proceeding to checkout.</p>

          <div class="table-container">
            <table class="order-table" aria-label="Order summary table">
              <thead>
                <tr>
                  <th scope="col">FILE NAME</th>
                  <th scope="col">SERVICE</th>
                  <th scope="col">FORMAT</th>
                  <th scope="col">PAGES</th>
                  <th scope="col">COPIES</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col" style="text-align: center; width: 100px;">ACTION</th>
                </tr>
              </thead>
              <tbody id="orderTableBody" aria-live="polite"></tbody>
            </table>
          </div>
        </div>

        <!-- SECTION 4: BOTTOM GRID — Options + Checkout -->
        <div class="grid-2-col bottom-grid">

          <!-- LEFT: Options Column -->
          <div class="options-container">

            <!-- Receiving Options -->
            <div class="order-panel">
              <div class="panel-header">
                <i class="fas fa-truck" aria-hidden="true"></i>
                <h2>Receiving Options</h2>
              </div>

              <div class="receiving-options" role="group" aria-label="Choose receiving method">
                <div class="opt-card" id="opt-pick" onclick="setReceiving('pick-up')" role="button" tabindex="0" aria-pressed="false" aria-label="Pick-up from BSU Hub">
                  <div class="opt-icon"><i class="fas fa-store"></i></div>
                  <div class="opt-info">
                    <strong>Pick-up</strong>
                    <span>From PRNT Hub</span>
                  </div>
                  <i class="fas fa-check opt-check"></i>
                </div>
                <div class="opt-card" id="opt-del" onclick="setReceiving('delivery')" role="button" tabindex="0" aria-pressed="false" aria-label="Delivery within campus or nearby">
                  <div class="opt-icon"><i class="fas fa-truck-moving"></i></div>
                  <div class="opt-info">
                    <strong>Delivery</strong>
                    <span>Within Campus/Nearby</span>
                  </div>
                  <i class="fas fa-check opt-check"></i>
                </div>
              </div>

              <div id="locationField" class="form-group delivery-location" style="display:none;" aria-live="polite">
                <label for="deliveryLocation">Delivery Location</label>
                <div class="select-wrapper">
                  <select id="deliveryLocation" onchange="validateCheckout()" aria-label="Select delivery location">
                    <option value="">Select location...</option>
                    <option value="Alvarado Hall">Alvarado Hall</option>
                    <option value="Activity Center">Activity Center</option>
                    <option value="Pimentel Hall">Pimentel Hall</option>
                    <option value="College of Law">College of Law</option>
                    <option value="Roxas Hall">Roxas Hall</option>
                    <option value="Carpio Hall">Carpio Hall</option>
                    <option value="Natividad Hall">Natividad Hall</option>
                    <option value="Federizo Hall">Federizo Hall</option>
                    <option value="Flores Hall">Flores Hall</option>
                    <option value="Valencia Hall">Valencia Hall</option>
                    <option value="Mendoza Hall">Mendoza Hall</option>
                  </select>
                  <i class="fas fa-chevron-down select-icon"></i>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="order-panel">
              <div class="panel-header">
                <i class="fas fa-wallet" aria-hidden="true"></i>
                <h2>Payment Method</h2>
              </div>
              <div class="form-group">
                <label for="paymentMethod">Select Method</label>
                <div class="select-wrapper">
                  <select id="paymentMethod" onchange="validateCheckout()" aria-label="Select payment method">
                    <option value="Cash on Pick-up/Delivery">Cash on Pick-up/Delivery</option>
                    <option value="GCash">GCash</option>
                  </select>
                  <i class="fas fa-chevron-down select-icon"></i>
                </div>
              </div>
            </div>

            <!-- Additional Notes -->
            <div class="order-panel">
              <div class="panel-header">
                <i class="fas fa-comment-alt" aria-hidden="true"></i>
                <h2>Additional Notes</h2>
              </div>
              <div class="form-group">
                <textarea id="additionalNotes" placeholder="E.g. Specific margins, color codes, or deadline requests..." rows="4" aria-label="Additional order notes"></textarea>
              </div>
            </div>
          </div>

          <!-- RIGHT: Checkout Sidebar (Dark Card) -->
          <div class="checkout-sidebar">
            <div class="checkout-card" id="stickyCheckout">
              <div class="checkout-header">
                <h3>Checkout</h3>
              </div>

              <div class="checkout-breakdown">
                <div class="checkout-row">
                  <span>Subtotal</span>
                  <span id="subtotalVal">P0.00</span>
                </div>
                <div class="checkout-row">
                  <span>Delivery Fee</span>
                  <span id="deliveryFeeVal">P0.00</span>
                </div>
              </div>

              <div class="checkout-divider"></div>

              <div class="checkout-total">
                <span>Total Amount</span>
                <span id="totalVal">P0.00</span>
              </div>

              <div class="checkout-validation" id="checkoutValidation" aria-live="polite"></div>

              <button id="checkoutBtn" class="btn btn-primary btn-full btn-large" onclick="proceedToReceipt()" disabled aria-label="Proceed to receipt and confirm order">
                PRINT NOW <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </main>

  <?php include __DIR__ . '/../../../components/Footer/Footer.html'; ?>

  <!-- ===== EDIT ITEM MODAL ===== -->
  <div class="modal-overlay" id="editItemModal" aria-hidden="true" style="display:none;">
    <div class="modal-content" style="max-width: 440px;">
      <div class="modal-header">
        <h3><i class="fas fa-edit"></i> Edit Your Order</h3>
        <button class="btn-icon" onclick="closeEditModal()" aria-label="Close modal"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="editItemIndex">
        <div class="form-group">
          <label>File Name</label>
          <div class="read-only-box" id="editFileName">filename.pdf</div>
        </div>
        <div class="form-group">
          <label for="editServiceSelect">Service / Format</label>
          <div class="select-wrapper">
            <select id="editServiceSelect" onchange="handleEditServiceChange()">
              <option value="photo">Photo Printing</option>
              <option value="id_photo">ID Photo Packages</option>
              <option value="document">Document Printing</option>
              <option value="large_format">Large Format</option>
              <option value="brochure">Brochures</option>
            </select>
            <i class="fas fa-chevron-down select-icon"></i>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="editPrintType">Print Type</label>
            <div class="select-wrapper">
              <select id="editPrintType" onchange="updateEditPrice()">
                <option value="bw">Black &amp; White</option>
                <option value="color">Full Color</option>
              </select>
              <i class="fas fa-chevron-down select-icon"></i>
            </div>
          </div>
          <div class="form-group">
            <label for="editPaperSize">Paper Size</label>
            <div class="select-wrapper">
              <select id="editPaperSize" onchange="updateEditPrice()"></select>
              <i class="fas fa-chevron-down select-icon"></i>
            </div>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="editPages">Pages</label>
            <div class="number-input-wrapper">
              <button type="button" class="num-btn" onclick="adjustEditNumber('editPages', -1)"><i class="fas fa-minus"></i></button>
              <input type="number" id="editPages" min="1" oninput="updateEditPrice()">
              <button type="button" class="num-btn" onclick="adjustEditNumber('editPages', 1)"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="form-group">
            <label for="editCopies">Copies</label>
            <div class="number-input-wrapper">
              <button type="button" class="num-btn" onclick="adjustEditNumber('editCopies', -1)"><i class="fas fa-minus"></i></button>
              <input type="number" id="editCopies" min="1" oninput="updateEditPrice()">
              <button type="button" class="num-btn" onclick="adjustEditNumber('editCopies', 1)"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
        
        <div class="price-strip" style="background: #000000; border-radius: var(--radius);">
          <div class="price-info">
            <strong>Estimated Price</strong>
            <span>per print service</span>
          </div>
          <div class="price-value" id="editPriceDisplay">P0.00</div>
        </div>
      </div>
      <div class="modal-footer" style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; padding: 1.5rem; border-top: 1px solid var(--border);">
        <button class="btn btn-outline" style="width: 100%; justify-content: center;" onclick="closeEditModal()">Cancel</button>
        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="saveEditItem()">Save Changes</button>
      </div>
    </div>
  </div>

  <!-- ===== DELETE CONFIRMATION MODAL ===== -->
  <div class="modal-overlay" id="deleteModal" aria-hidden="true" style="display:none;">
    <div class="modal-content" style="max-width: 420px; padding: 2.5rem 2rem; text-align: center;">
      <div style="font-size: 3.8rem; color: #EF4444; margin-bottom: 1.25rem;">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.85rem; color: var(--text-dark);">Confirm Delete</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2.25rem; line-height: 1.6;">
        Are you sure you want to delete this order item? This action cannot be undone.
      </p>
      <input type="hidden" id="deleteItemIndex">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
        <button class="btn btn-outline" style="width:100%; justify-content: center;" onclick="closeDeleteModal()">Cancel</button>
        <button class="btn btn-danger" style="width:100%; justify-content: center;" onclick="executeDelete()"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    </div>
  </div>

  <!-- ===== CHECKOUT CONFIRMATION MODAL ===== -->
  <div class="modal-overlay" id="checkoutModal" aria-hidden="true" style="display:none;">
    <div class="modal-content" style="max-width: 420px; padding: 2.5rem 2rem; text-align: center;">
      <div style="font-size: 3.8rem; color: var(--primary); margin-bottom: 1.25rem;">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.85rem; color: var(--text-dark);">Confirm Your Order</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2.25rem; line-height: 1.6;">
        Ready to print? Double-check your items and receiving details before we finalize your order.
      </p>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
        <button class="btn btn-outline" style="width:100%; justify-content: center;" onclick="closeCheckoutModal()">Review Again</button>
        <button class="btn btn-primary" style="width:100%; justify-content: center;" onclick="executeCheckout()"><i class="fas fa-print"></i> Confirm & Print</button>
      </div>
    </div>
  </div>

  <!-- ===== SCRIPTS ===== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
