<?php
include "../../../api/config.php";
if(!isset($_SESSION['user'])) {
header("Location: /PRNT/pages/login/");
} else if ($_SESSION['user'] == 1) {
header("Location: /PRNT/pages/admin/dashboard/");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PRNT - Avail Service</title>

    <!-- Tab Icon -->
    <link rel="icon" href="/PRNT/assets/img/PRNT_logo.png" type="image/png" />

    <!-- Google Font: Geist -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />

    <!-- Google Material Icons (for the upload icon) -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <!-- Font Awesome (for other icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Shared Styles -->
    <link rel="stylesheet" href="/PRNT/global/global.css" />
    <link rel="stylesheet" href="/PRNT/components/Navbar/Navbar.css" />
    <link rel="stylesheet" href="/PRNT/components/Footer/Footer.css" />

    <!-- This Page's Own Styles -->
    <link rel="stylesheet" href="styles.css" />
</head>
<body class="bg-light">

    <!-- ===== NAVIGATION BAR ===== -->
    <!-- This is a custom component defined in /components/Navbar/Navbar.js -->
    <custom-nav></custom-nav>

    <!-- ===== MAIN CONTENT ===== -->
    <div class="container main-content mt-5 mb-5 pb-5">

        <!-- ----- PROGRESS STEPPER ----- -->
        <!-- Shows the user which step they are currently on -->
        <div class="progress-stepper d-flex justify-content-between align-items-center mx-auto">

            <!-- Step 1: Service -->
            <div class="step active text-center" id="stepper-1">
                <div class="step-icon mx-auto mb-2"><i class="fa fa-file-text-o"></i></div>
                <div class="step-label">Service</div>
            </div>
            <div class="step-line" id="line-1"></div>

            <!-- Step 2: Upload -->
            <div class="step text-center" id="stepper-2">
                <div class="step-icon mx-auto mb-2"><i class="fa fa-upload"></i></div>
                <div class="step-label">Upload</div>
            </div>
            <div class="step-line" id="line-2"></div>

            <!-- Step 3: Delivery -->
            <div class="step text-center" id="stepper-3">
                <div class="step-icon mx-auto mb-2"><i class="fa fa-truck"></i></div>
                <div class="step-label">Delivery</div>
            </div>
            <div class="step-line" id="line-3"></div>

            <!-- Step 4: Confirm -->
            <div class="step text-center" id="stepper-4">
                <div class="step-icon mx-auto mb-2"><i class="fa fa-check-circle-o"></i></div>
                <div class="step-label">Confirm</div>
            </div>

        </div>
        <!-- END: PROGRESS STEPPER -->


        <!-- ----- FORM CARD ----- -->
        <!-- All steps are inside this single card. Only one step is shown at a time. -->
        <div class="card form-card shadow-sm mx-auto p-4 p-md-5">


            <!-- ===================================================== -->
            <!--              STEP 1: CHOOSE YOUR SERVICE              -->
            <!-- ===================================================== -->
            <div id="step1-container">
                <h3 class="mb-4 fw-bold">Choose Your Service</h3>

                <!-- Printing Service Dropdown -->
                <div class="mb-4">
                    <label for="printingService" class="form-label text-muted small fw-bold">Printing Service</label>
                    <select class="form-select custom-select" id="printingService">
                        <option value="" selected disabled>Select a service</option>
                        <option value="Document Printing">Document Printing</option>
                        <option value="Photo Printing">Photo Printing</option>
                        <option value="Poster and Large Format Printing">Poster and Large Format Printing</option>
                        <option value="Book Binding">Book Binding</option>
                    </select>
                </div>

                <!-- Format / Size (hidden by default, shows when a service is chosen) -->
                <div class="mb-4" id="formatContainer" style="display: none;">
                    <label for="formatSize" class="form-label text-muted small fw-bold">Format / Size</label>
                    <select class="form-select custom-select" id="formatSize">
                        <option value="" selected disabled>Select a format</option>
                        <option value="Letter">Letter</option>
                        <option value="A4">A4</option>
                        <option value="Legal">Legal</option>
                    </select>
                </div>

                <!-- Quantity Input -->
                <div class="mb-4">
                    <label for="quantity" class="form-label text-muted small fw-bold">Quantity</label>
                    <input type="number" class="form-control custom-input" id="quantity" value="1" min="1" />
                </div>

                <!-- Continue Button (disabled until fields are filled) -->
                <button type="button" class="btn btn-primary-custom w-100 py-2" id="continueToStep2" disabled>
                    Continue &rarr;
                </button>
            </div>
            <!-- END: STEP 1 -->


            <!-- ===================================================== -->
            <!--                STEP 2: UPLOAD YOUR FILE               -->
            <!-- ===================================================== -->
            <div id="step2-container" style="display: none;">
                <h3 class="mb-4 fw-bold">Upload Your Files</h3>

                <!-- Drag & Drop Zone -->
                <div class="upload-drop-zone d-flex flex-column align-items-center justify-content-center py-5 px-3 mb-4" id="dropZone">
                    <span class="material-symbols-outlined upload-icon">upload</span>
                    <p class="text-muted mt-3 mb-3">Drag and drop your file here, or click the button below</p>

                    <!-- Button to open file browser -->
                    <button type="button" class="btn btn-dark px-4 py-2 fw-medium" id="triggerFileInput">
                        Select File
                    </button>

                    <!-- Hidden file input (triggered by button above) -->
                    <input type="file" id="fileInput" class="d-none" />

                    <!-- Shows the selected file name after picking a file -->
                    <div id="fileListContainer" class="mt-3 text-success fw-medium d-none">
                        <i class="fa fa-check me-1"></i>
                        <span id="fileNameDisplay"></span>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex gap-3">
                    <button type="button" class="btn btn-light-custom flex-fill py-2 fw-bold" id="backToStep1">Back</button>
                    <button type="button" class="btn btn-primary-custom flex-fill py-2 fw-bold" id="continueToStep3" disabled>Continue &rarr;</button>
                </div>
            </div>
            <!-- END: STEP 2 -->


            <!-- ===================================================== -->
            <!--           STEP 3: CHOOSE RECEIVING OPTION             -->
            <!-- ===================================================== -->
            <div id="step3-container" style="display: none;">
                <h3 class="mb-4 fw-bold">Choose Receiving Option</h3>

                <!-- Pick-up or Delivery Cards -->
                <div class="row g-3 mb-4">

                    <!-- Pick-up Card -->
                    <div class="col-md-6">
                        <div class="card receiving-card h-100" id="cardPickup">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-center">
                                    <div class="receiving-icon-container text-dark rounded p-3 me-3">
                                        <i class="fa fa-file-text-o fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold mb-1">Pick-up</h5>
                                        <p class="text-muted small mb-0">Pick up your order from our location</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Delivery Card -->
                    <div class="col-md-6">
                        <div class="card receiving-card h-100" id="cardDelivery">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-center">
                                    <div class="receiving-icon-container text-dark rounded p-3 me-3">
                                        <i class="fa fa-truck fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold mb-1">Delivery</h5>
                                        <p class="text-muted small mb-0">Get your order delivered to your address</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Delivery Address (only shown when Delivery is selected) -->
                <div id="addressContainer" class="mb-4" style="display: none;">
                    <label for="deliveryAddress" class="form-label text-muted small fw-bold">Delivery Address</label>
                    <textarea class="form-control custom-input" id="deliveryAddress" rows="3" placeholder="Enter your complete delivery address"></textarea>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex gap-3">
                    <button type="button" class="btn btn-light-custom flex-fill py-2 fw-bold" id="backToStep2">Back</button>
                    <button type="button" class="btn btn-primary-custom flex-fill py-2 fw-bold" id="continueToStep4" disabled>Continue &rarr;</button>
                </div>
            </div>
            <!-- END: STEP 3 -->


            <!-- ===================================================== -->
            <!--              STEP 4: CONFIRM YOUR ORDER               -->
            <!-- ===================================================== -->
            <div id="step4-container" style="display: none;">
                <h3 class="mb-4 fw-bold">Confirm Your Order</h3>

                <!-- Order Summary Box -->
                <!-- These values are filled in automatically by script.js -->
                <div class="summary-box mb-4">
                    <div class="summary-row">
                        <span class="summary-label">Service:</span>
                        <span class="summary-value" id="summaryService">-</span>
                    </div>
                    <div class="summary-row" id="summaryFormatRow" style="display: none;">
                        <span class="summary-label">Format:</span>
                        <span class="summary-value" id="summaryFormat">-</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Quantity:</span>
                        <span class="summary-value" id="summaryQuantity">-</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">File:</span>
                        <span class="summary-value" id="summaryFile">-</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Receiving Option:</span>
                        <span class="summary-value" id="summaryReceiving">-</span>
                    </div>
                    <hr class="my-3">
                    <div class="summary-row">
                        <span class="summary-label fw-bold">Estimated Total:</span>
                        <span class="summary-value summary-total" id="summaryTotal">$0.00</span>
                    </div>
                </div>

                <!-- Additional Notes -->
                <div class="mb-4">
                    <h5 class="fw-bold mb-2">Additional Notes <span class="text-muted fw-normal" style="font-size: 0.9rem;">(Optional)</span></h5>
                    <textarea class="form-control custom-input" id="additionalNotes" rows="3"
                        placeholder="Tell us about your printing needs, specific location, or special requests..."></textarea>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex gap-3">
                    <button type="button" class="btn btn-light-custom flex-fill py-2 fw-bold" id="backToStep3">Back</button>
                    <button type="button" class="btn btn-place-order flex-fill py-2 fw-bold" id="placeOrderBtn">
                        <i class="fa fa-check-circle-o me-2"></i> Place Order
                    </button>
                </div>
            </div>
            <!-- END: STEP 4 -->


        </div>
        <!-- END: FORM CARD -->

    </div>
    <!-- END: MAIN CONTENT -->


    <!-- ===== FOOTER ===== -->
    <!-- This is a custom component defined in /components/Footer/Footer.js -->
    <custom-footer></custom-footer>


    <!-- ===== SCRIPTS ===== -->

    <!-- Bootstrap JS (required for dropdowns, collapse, etc.) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js"></script>

    <!-- Page Script (type="module" allows us to use import/export inside it) -->
    <script type="module" src="script.js"></script>

</body>
</html>
