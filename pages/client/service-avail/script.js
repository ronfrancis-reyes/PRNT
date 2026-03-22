/**
 * script.js — Service Avail Page
 *
 * This file controls the 4-step transaction process:
 *   Step 1: Choose Your Service
 *   Step 2: Upload Your File
 *   Step 3: Choose Receiving Option (Pick-up or Delivery)
 *   Step 4: Confirm Your Order
 *
 * It also loads the shared Navbar and Footer components.
 */

// ===============================================================
// COMPONENT IMPORTS
// These load the custom <custom-nav> and <custom-footer> elements.
// They must be imported here because this script uses type="module".
// ===============================================================
import "/PRNT/components/Navbar/Navbar.js";
import "/PRNT/components/Footer/Footer.js";
// Wait for the entire HTML page to load before running any code
document.addEventListener("DOMContentLoaded", () => {
	// ===========================================================
	// SECTION 1: GET REFERENCES TO HTML ELEMENTS
	// We "grab" elements from the page so we can control them.
	// document.getElementById('some-id') finds the element with that id.
	// ===========================================================

	// --- Step Containers (the visible form section for each step) ---
	const step1Container = document.getElementById("step1-container");
	const step2Container = document.getElementById("step2-container");
	const step3Container = document.getElementById("step3-container");
	const step4Container = document.getElementById("step4-container");

	// --- Stepper Icons (the circles at the top) ---
	const stepper1 = document.getElementById("stepper-1");
	const stepper2 = document.getElementById("stepper-2");
	const stepper3 = document.getElementById("stepper-3");
	const stepper4 = document.getElementById("stepper-4");

	// --- Stepper Lines (the connecting lines between icons) ---
	const line1 = document.getElementById("line-1");
	const line2 = document.getElementById("line-2");
	const line3 = document.getElementById("line-3");

	// --- Step 1: Service Form Elements ---
	const serviceSelect = document.getElementById("printingService");
	const formatContainer = document.getElementById("formatContainer");
	const formatSelect = document.getElementById("formatSize");
	const quantityInput = document.getElementById("quantity");
	const continueToStep2 = document.getElementById("continueToStep2");

	// --- Step 2: Upload Elements ---
	const dropZone = document.getElementById("dropZone");
	const triggerFileInput = document.getElementById("triggerFileInput");
	const fileInput = document.getElementById("fileInput");
	const fileListContainer = document.getElementById("fileListContainer");
	const fileNameDisplay = document.getElementById("fileNameDisplay");
	const backToStep1 = document.getElementById("backToStep1");
	const continueToStep3 = document.getElementById("continueToStep3");

	// --- Step 3: Receiving Option Elements ---
	const cardPickup = document.getElementById("cardPickup");
	const cardDelivery = document.getElementById("cardDelivery");
	const addressContainer = document.getElementById("addressContainer");
	const deliveryAddress = document.getElementById("deliveryAddress");
	const backToStep2 = document.getElementById("backToStep2");
	const continueToStep4 = document.getElementById("continueToStep4");

	// --- Step 4: Confirmation Elements ---
	const backToStep3 = document.getElementById("backToStep3");
	const placeOrderBtn = document.getElementById("placeOrderBtn");
	const summaryService = document.getElementById("summaryService");
	const summaryFormatRow = document.getElementById("summaryFormatRow");
	const summaryFormat = document.getElementById("summaryFormat");
	const summaryQuantity = document.getElementById("summaryQuantity");
	const summaryFile = document.getElementById("summaryFile");
	const summaryReceiving = document.getElementById("summaryReceiving");
	const summaryTotal = document.getElementById("summaryTotal");

	// A variable to remember what receiving option the user picked
	let selectedReceivingOption = null;

	// ===========================================================
	// SECTION 2: HELPER FUNCTIONS
	// Reusable functions that we call multiple times.
	// ===========================================================

	/**
	 * showStep(stepToShow, stepToHide)
	 * Hides one step container and shows another.
	 */
	function showStep(stepToShow, stepToHide) {
		stepToHide.style.display = "none";
		stepToShow.style.display = "block";
	}

	/**
	 * completeStepper(currentStepper, nextStepper, line)
	 * Marks a stepper circle as "completed" and activates the next one.
	 * This updates the orange progress visuals at the top.
	 */
	function completeStepper(currentStepper, nextStepper, line) {
		currentStepper.classList.remove("active");
		currentStepper.classList.add("completed");
		line.classList.add("active");
		nextStepper.classList.add("active");
	}

	/**
	 * revertStepper(currentStepper, prevStepper, line)
	 * Reverses a stepper back (used when clicking "Back").
	 */
	function revertStepper(currentStepper, prevStepper, line) {
		currentStepper.classList.remove("active");
		currentStepper.classList.remove("completed");
		line.classList.remove("active");
		prevStepper.classList.remove("completed");
		prevStepper.classList.add("active");
	}

	// ===========================================================
	// SECTION 3: STEP 1 — CHOOSE YOUR SERVICE
	// ===========================================================

	/**
	 * checkStep1Validity()
	 * Checks if all required fields in Step 1 are filled.
	 * Enables or disables the "Continue" button accordingly.
	 */
	function checkStep1Validity() {
		const serviceChosen = serviceSelect.value !== "";
		const formatVisible = formatContainer.style.display !== "none";
		const formatChosen = formatSelect.value !== "";
		const quantityValid = quantityInput.value >= 1;

		// If format is visible, it must also be chosen
		const isValid =
			serviceChosen && quantityValid && (!formatVisible || formatChosen);

		continueToStep2.disabled = !isValid;
	}

	// Show or hide the Format/Size field based on which service is chosen
	serviceSelect.addEventListener("change", () => {
		if (serviceSelect.value !== "") {
			formatContainer.style.display = "block";
		} else {
			formatContainer.style.display = "none";
			formatSelect.value = "";
		}
		checkStep1Validity();
	});

	// Re-check validity whenever format or quantity changes
	formatSelect.addEventListener("change", checkStep1Validity);
	quantityInput.addEventListener("input", checkStep1Validity);

	// Run the check once on page load (button starts disabled)
	checkStep1Validity();

	// "Continue" button: go from Step 1 → Step 2
	continueToStep2.addEventListener("click", () => {
		showStep(step2Container, step1Container);
		completeStepper(stepper1, stepper2, line1);
	});

	// ===========================================================
	// SECTION 4: STEP 2 — UPLOAD YOUR FILE
	// ===========================================================

	/**
	 * handleFiles(files)
	 * Called when the user selects or drops a file.
	 * Displays the file name and enables the Continue button.
	 */
	function handleFiles(files) {
		if (files.length > 0) {
			fileNameDisplay.textContent = files[0].name; // Show first file name
			fileListContainer.classList.remove("d-none"); // Make the name visible
			continueToStep3.disabled = false; // Allow continuing
		} else {
			fileListContainer.classList.add("d-none");
			continueToStep3.disabled = true;
		}
	}

	// Clicking the "Select File" button opens the hidden file input
	triggerFileInput.addEventListener("click", () => fileInput.click());

	// When user picks a file from the dialog
	fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

	// --- Drag and Drop Functionality ---
	// Highlight the drop zone when a file is dragged over it
	dropZone.addEventListener("dragover", (e) => {
		e.preventDefault(); // Needed so the drop event fires
		dropZone.classList.add("dragover");
	});

	// Remove highlight when file leaves the drop zone
	dropZone.addEventListener("dragleave", () => {
		dropZone.classList.remove("dragover");
	});

	// When file is dropped onto the zone
	dropZone.addEventListener("drop", (e) => {
		e.preventDefault();
		dropZone.classList.remove("dragover");
		if (e.dataTransfer.files.length) {
			handleFiles(e.dataTransfer.files);
		}
	});

	// "Back" button: go from Step 2 → Step 1
	backToStep1.addEventListener("click", () => {
		showStep(step1Container, step2Container);
		revertStepper(stepper2, stepper1, line1);
	});

	// "Continue" button: go from Step 2 → Step 3
	continueToStep3.addEventListener("click", () => {
		showStep(step3Container, step2Container);
		completeStepper(stepper2, stepper3, line2);
	});

	// ===========================================================
	// SECTION 5: STEP 3 — RECEIVING OPTION
	// ===========================================================

	/**
	 * checkStep3Validity()
	 * Enables Continue if user picked Pick-up,
	 * OR if user picked Delivery AND entered an address.
	 */
	function checkStep3Validity() {
		const isPickup = selectedReceivingOption === "pickup";
		const isDelivery =
			selectedReceivingOption === "delivery" &&
			deliveryAddress.value.trim() !== "";
		continueToStep4.disabled = !(isPickup || isDelivery);
	}

	// When user clicks the "Pick-up" card
	cardPickup.addEventListener("click", () => {
		selectedReceivingOption = "pickup";
		cardPickup.classList.add("selected");
		cardDelivery.classList.remove("selected");
		addressContainer.style.display = "none"; // Hide address field
		checkStep3Validity();
	});

	// When user clicks the "Delivery" card
	cardDelivery.addEventListener("click", () => {
		selectedReceivingOption = "delivery";
		cardDelivery.classList.add("selected");
		cardPickup.classList.remove("selected");
		addressContainer.style.display = "block"; // Show address field
		checkStep3Validity();
	});

	// Re-check validity as user types their address
	deliveryAddress.addEventListener("input", checkStep3Validity);

	// "Back" button: go from Step 3 → Step 2
	backToStep2.addEventListener("click", () => {
		showStep(step2Container, step3Container);
		revertStepper(stepper3, stepper2, line2);
	});

	// "Continue" button: go from Step 3 → Step 4
	continueToStep4.addEventListener("click", () => {
		// Fill in the summary box with the user's choices before showing Step 4
		populateSummary();
		showStep(step4Container, step3Container);
		completeStepper(stepper3, stepper4, line3);
	});

	// ===========================================================
	// SECTION 6: STEP 4 — CONFIRM YOUR ORDER
	// ===========================================================

	/**
	 * populateSummary()
	 * Pulls the user's choices from previous steps and
	 * fills in the order summary box in Step 4.
	 */
	function populateSummary() {
		// Service selected
		summaryService.textContent =
			serviceSelect.options[serviceSelect.selectedIndex].text;

		// Format (only show this row if format was chosen)
		if (formatContainer.style.display !== "none" && formatSelect.value) {
			summaryFormatRow.style.display = "flex";
			summaryFormat.textContent =
				formatSelect.options[formatSelect.selectedIndex].text;
		} else {
			summaryFormatRow.style.display = "none";
		}

		// Quantity
		summaryQuantity.textContent = quantityInput.value;

		// File name
		summaryFile.textContent = fileNameDisplay.textContent;

		// Receiving option (with address if delivery)
		let receivingText =
			selectedReceivingOption === "pickup" ? "Store Pick-up" : "Delivery";
		if (selectedReceivingOption === "delivery") {
			receivingText += ` — ${deliveryAddress.value}`;
		}
		summaryReceiving.textContent = receivingText;

		// Estimated total (placeholder calculation: ₱2.50 per copy)
		const pricePerCopy = 2.5;
		const total = (pricePerCopy * parseInt(quantityInput.value)).toFixed(2);
		summaryTotal.textContent = `$${total}`;
	}

	// "Back" button: go from Step 4 → Step 3
	backToStep3.addEventListener("click", () => {
		showStep(step3Container, step4Container);
		revertStepper(stepper4, stepper3, line3);
	});

	// "Place Order" button: final submission
	placeOrderBtn.addEventListener("click", () => {
		alert(
			"Your order has been placed successfully!\nThank you for choosing PRNT.",
		);
		// In a real project, this would send data to the server using AJAX or a form submit.
		// Example: window.location.href = "success.php";
	});
}); // End of DOMContentLoaded

$(document).ready(function () {
	getServices();
});

function getServices() {
	$.ajax({
		type: "GET",
		url: "../../../api/service-avail.php",
		data: "action=get",
		success: function (response) {
			let data = JSON.parse(response);

			let select = $("#printingService");

			data.forEach((service) => {
				select.append(
					`<option value="${service.service_name}">
                        ${service.service_name}
                    </option>`,
				);
			});
		},
	});
}
