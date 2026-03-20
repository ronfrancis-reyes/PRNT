// Close all dropdowns on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.action-wrap'))
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
});

// Toggle per-row dropdown
function toggleMenu(btn) {
  const dropdown = btn.nextElementSibling;
  const isOpen   = dropdown.classList.contains('show');
  document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
  if (!isOpen) dropdown.classList.add('show');
}

// View user details
function viewDetails(btn) {
  const cells  = btn.closest('tr').querySelectorAll('td');
  const id     = cells[0]?.innerText.trim();
  const name   = cells[1]?.innerText.trim();
  const email  = cells[2]?.innerText.trim();
  const status = cells[3]?.innerText.trim();
  const last   = cells[4]?.innerText.trim();
  const order  = cells[5]?.innerText.trim();
  alert(`User Details\n\nID: ${id}\nName: ${name}\nEmail: ${email}\nStatus: ${status}\nLast Active: ${last}\nLast Order: ${order}`);
  btn.closest('.dropdown').classList.remove('show');
}

// Suspend or activate user — checks current badge status
function toggleSuspend(btn) {
  const row    = btn.closest('tr');
  const badge  = row.querySelector('.badge');

  if (badge.classList.contains('badge-suspended')) {

    //  suspended to activate
    badge.textContent = 'Active';
    badge.className   = 'badge badge-active';
    btn.innerHTML     = '<i class="bi bi-slash-circle"></i> Suspend User';
  } else {

    //  active to suspend
    badge.textContent = 'Suspended';
    badge.className   = 'badge badge-suspended';
    btn.innerHTML     = '<i class="bi bi-person-check"></i> Activate User';
  }

  btn.closest('.dropdown').classList.remove('show');
}

// Delete single row
function deleteRow(btn) {
  if (confirm('Delete this user?')) btn.closest('tr').remove();
}

// Search and filter
function filterTable() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const s = document.getElementById('statusFilter').value;
  document.querySelectorAll('#tableBody tr').forEach(row => {
    const matchQ = !q || row.innerText.toLowerCase().includes(q);
    const matchS = !s || row.querySelector('.badge')?.innerText.trim() === s;
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

// Export visible rows
function exportCSV() {
  const rows = [...document.querySelectorAll('#tableBody tr')].filter(r => r.style.display !== 'none');
  if (!rows.length) return alert('No users to export.');
  const headers = ['User ID','User Name','Email','Status','Last Active','Last Order'];
  const data = rows.map(r =>
    [...r.querySelectorAll('td')].slice(0, 6)
      .map(td => `"${td.innerText.trim().replace(/"/g, '""')}"`)
      .join(',')
  );
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([[headers.join(','), ...data].join('\n')], { type: 'text/csv' })),
    download: `users_${Date.now()}.csv`
  });
  a.click();
}