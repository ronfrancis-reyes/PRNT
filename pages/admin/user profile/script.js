/**
 * PRNT Admin — User Profile Module
 * script.js v3.0
 *
 * Works alongside the system sidebar.js + topbar.js (loaded in index.php).
 * No local toast/modal — uses window.showToast from the global shell.
 * Falls back to a lightweight inline toast when running standalone.
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // SAMPLE DATA
    // TODO: Replace with PHP session / fetch from backend
    // =========================================================
    const profileData = {
        name:     'Yance Nathan',
        email:    'yancenathanc@gmail.com',
        phone:    '+63 (900) 123-4567',
        location: 'Bulacan, Philippines',
    };

    const activityData = [
        { text: 'Processed order',          highlight: 'ORD-1234',        time: '2 minutes ago',   type: 'active' },
        { text: 'Updated service pricing',  highlight: 'Business Cards',   time: '1 hour ago',      type: 'active' },
        { text: 'Reviewed message from',    highlight: 'John Smith',       time: '3 hours ago',     type: 'muted'  },
        { text: 'Logged in from',           highlight: 'Bulacan, PH',      time: 'Yesterday, 9am',  type: 'muted'  },
    ];

    const statsData = {
        orders:   '1,248',
        revenue:  '₱ 124,580',
        days:     '285',
        activity: '2m ago',
    };

    // =========================================================
    // DOM REFS
    // =========================================================
    const editBtn       = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveBtn       = document.getElementById('saveBtn');
    const editInputs    = document.querySelectorAll('.edit-input');

    const profileInitials    = document.getElementById('profileInitials');
    const profileDisplayName = document.getElementById('profileDisplayName');
    const infoEmail          = document.getElementById('infoEmail');
    const infoPhone          = document.getElementById('infoPhone');
    const infoLocation       = document.getElementById('infoLocation');

    const fieldName     = document.getElementById('fieldName');
    const fieldEmail    = document.getElementById('fieldEmail');
    const fieldPhone    = document.getElementById('fieldPhone');
    const fieldLocation = document.getElementById('fieldLocation');

    const pwToggle      = document.getElementById('pwToggle');
    const passwordPanel = document.getElementById('passwordPanel');
    const cancelPwBtn   = document.getElementById('cancelPwBtn');
    const passwordForm  = document.getElementById('passwordForm');
    const pwCurrent     = document.getElementById('pwCurrent');
    const pwNew         = document.getElementById('pwNew');
    const pwConfirm     = document.getElementById('pwConfirm');
    const pwMatchError  = document.getElementById('pwMatchError');
    const pwStrengthWrap  = document.getElementById('pwStrengthWrap');
    const pwStrengthFill  = document.getElementById('pwStrengthFill');
    const pwStrengthLabel = document.getElementById('pwStrengthLabel');

    const activityFeed = document.getElementById('activityFeed');

    // =========================================================
    // TOAST — uses global shell toast; standalone fallback
    // =========================================================
    function showToast(title, message, type) {
        // 1. Try shell global (set by admin/index.php via script.js)
        if (typeof window.showToast === 'function' && window.showToast !== showToast) {
            window.showToast(title, message, type);
            return;
        }
        // 2. Try parent frame (iframed module)
        if (window.parent && window.parent !== window && typeof window.parent.showToast === 'function') {
            window.parent.showToast(title, message, type);
            return;
        }
        // 3. Standalone fallback — lightweight inline toast
        _inlineToast(title, message, type);
    }

    function _inlineToast(title, message, type) {
        let container = document.getElementById('_profileToastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = '_profileToastContainer';
            Object.assign(container.style, {
                position: 'fixed', top: '90px', right: '20px',
                zIndex: '99999', display: 'flex', flexDirection: 'column', gap: '8px',
                pointerEvents: 'none',
            });
            document.body.appendChild(container);
        }

        const COLORS = { success:'#10b981', danger:'#ef4444', info:'#3b82f6', warning:'#f59e0b' };
        const ICONS  = { success:'fa-circle-check', danger:'fa-circle-exclamation', info:'fa-circle-info', warning:'fa-triangle-exclamation' };
        const color  = COLORS[type] || COLORS.info;
        const icon   = ICONS[type]  || ICONS.info;

        const t = document.createElement('div');
        t.style.cssText = `
            pointer-events:auto; display:flex; align-items:flex-start; gap:10px;
            min-width:260px; max-width:320px; background:#181c27;
            border:1px solid #2a2f42; border-left:4px solid ${color};
            border-radius:12px; padding:12px 14px;
            box-shadow:0 8px 28px rgba(0,0,0,.45);
            animation:_tIn .28s ease both; font-family:inherit;
        `;
        t.innerHTML = `
            <i class="fas ${icon}" style="color:${color};font-size:1rem;margin-top:1px;flex-shrink:0;"></i>
            <div style="flex:1;min-width:0;">
                <div style="font-size:.85rem;font-weight:700;color:#e8eaf0;">${title}</div>
                ${message ? `<div style="font-size:.78rem;color:#6b7280;margin-top:2px;">${message}</div>` : ''}
            </div>
        `;

        if (!document.getElementById('_profileToastKf')) {
            const s = document.createElement('style');
            s.id = '_profileToastKf';
            s.textContent = '@keyframes _tIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}';
            document.head.appendChild(s);
        }

        container.appendChild(t);
        setTimeout(() => {
            t.style.transition = 'opacity .3s, transform .3s';
            t.style.opacity = '0';
            t.style.transform = 'translateX(30px)';
            setTimeout(() => t.remove(), 320);
        }, 3800);
    }

    // =========================================================
    // OBJECTIVE 1: CLOSE PARENT DROPDOWNS ON ANY CLICK
    // =========================================================
    document.addEventListener('click', () => {
        if (window.parent && typeof window.parent.closeAllDropdowns === 'function') {
            window.parent.closeAllDropdowns();
        }
    });

    // =========================================================
    // INIT — populate page from data
    // =========================================================
    function init() {
        // PRIORITIZE DATA FROM SHELL (Objective: Persistence)
        const savedUser = JSON.parse(localStorage.getItem('prnt_admin_user') || '{}');
        const name  = savedUser.name  || profileData.name;
        const email = savedUser.email || profileData.email;
        const avatar = savedUser.avatar || "";

        if (fieldName)     fieldName.value     = name;
        if (fieldEmail)    fieldEmail.value    = email;
        if (fieldPhone)    fieldPhone.value    = profileData.phone;
        if (fieldLocation) fieldLocation.value = profileData.location;

        // Initialize avatar
        if (profileAvatar) {
            if (avatar) {
                profileAvatar.innerHTML = `<img src="${avatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
            } else {
                const initials = name.split(' ').slice(0, 2).map(w => (w[0] || '').toUpperCase()).join('');
                if (profileInitials) profileInitials.textContent = initials;
            }
        }

        syncSidebar(avatar || null);
        renderActivity();

        const statMap = { statOrders: statsData.orders, statRevenue: statsData.revenue, statDays: statsData.days, statActivity: statsData.activity };
        Object.entries(statMap).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });
    }

    // Sync sidebar identity card with current field values
    function syncSidebar(avatarUrl = null) {
        const name     = fieldName     ? fieldName.value.trim()     : profileData.name;
        const email    = fieldEmail    ? fieldEmail.value.trim()    : profileData.email;
        const phone    = fieldPhone    ? fieldPhone.value.trim()    : profileData.phone;
        const location = fieldLocation ? fieldLocation.value.trim() : profileData.location;

        const initials = name.split(' ').slice(0, 2).map(w => (w[0] || '').toUpperCase()).join('');

        if (profileInitials)    profileInitials.textContent    = initials;
        if (profileDisplayName) profileDisplayName.textContent = name;
        if (infoEmail)          infoEmail.textContent          = email;
        if (infoPhone)          infoPhone.textContent          = phone;
        if (infoLocation)       infoLocation.textContent       = location;

        // Update system-level topbar/sidebar initials if the global helper exists
        if (window.parent && typeof window.parent.updateGlobalUserInfo === 'function') {
            window.parent.updateGlobalUserInfo({ name, email, avatar: avatarUrl });
        }
    }

    function renderActivity() {
        if (!activityFeed) return;
        activityFeed.innerHTML = '';
        activityData.forEach(item => {
            const li = document.createElement('li');
            li.className = 'activity-feed-item';
            li.innerHTML = `
                <span class="activity-dot${item.type === 'muted' ? ' muted' : ''}"></span>
                <div>
                    <p class="activity-text">${item.text} <span class="highlight">${item.highlight}</span></p>
                    <p class="activity-time">${item.time}</p>
                </div>
            `;
            activityFeed.appendChild(li);
        });
    }

    // =========================================================
    // EDIT / SAVE / CANCEL — personal info
    // =========================================================
    let _snapshot = {};

    function enterEdit() {
        _snapshot = {
            name:     fieldName     ? fieldName.value     : '',
            email:    fieldEmail    ? fieldEmail.value    : '',
            phone:    fieldPhone    ? fieldPhone.value    : '',
            location: fieldLocation ? fieldLocation.value : '',
        };
        editInputs.forEach(i => { i.disabled = false; i.classList.add('editable'); });
        if (saveBtn)       saveBtn.style.display       = 'inline-flex';
        if (editBtn)       editBtn.style.display       = 'none';
        if (cancelEditBtn) cancelEditBtn.style.display = 'inline-flex';
    }

    function exitEdit(save) {
        if (!save) {
            if (fieldName)     fieldName.value     = _snapshot.name     || '';
            if (fieldEmail)    fieldEmail.value    = _snapshot.email    || '';
            if (fieldPhone)    fieldPhone.value    = _snapshot.phone    || '';
            if (fieldLocation) fieldLocation.value = _snapshot.location || '';
        }
        editInputs.forEach(i => { i.disabled = true; i.classList.remove('editable'); });
        if (saveBtn)       saveBtn.style.display       = 'none';
        if (editBtn)       editBtn.style.display       = 'inline-flex';
        if (cancelEditBtn) cancelEditBtn.style.display = 'none';
    }

    function saveProfile() {
        const name  = fieldName  ? fieldName.value.trim()  : '';
        const email = fieldEmail ? fieldEmail.value.trim() : '';

        if (!name) {
            showToast('Validation Error', 'Full name cannot be empty.', 'danger');
            if (fieldName) fieldName.focus();
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Validation Error', 'Please enter a valid email address.', 'danger');
            if (fieldEmail) fieldEmail.focus();
            return;
        }

        if (fieldName)     profileData.name     = name;
        if (fieldEmail)    profileData.email    = email;
        if (fieldPhone)    profileData.phone    = fieldPhone    ? fieldPhone.value.trim()    : profileData.phone;
        if (fieldLocation) profileData.location = fieldLocation ? fieldLocation.value.trim() : profileData.location;

        exitEdit(true);
        syncSidebar();
        // TODO: POST to backend
        showToast('Profile Updated', 'Your information has been saved.', 'success');
    }

    if (editBtn)       editBtn.addEventListener('click', enterEdit);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => exitEdit(false));
    if (saveBtn)       saveBtn.addEventListener('click', saveProfile);

    // =========================================================
    // PASSWORD PANEL — toggle (click header or button)
    // =========================================================
    let _pwOpen = false;

    function togglePwPanel(open) {
        _pwOpen = (open !== undefined) ? open : !_pwOpen;
        if (passwordPanel) {
            passwordPanel.classList.toggle('open', _pwOpen);
            passwordPanel.setAttribute('aria-hidden', String(!_pwOpen));
        }
        if (pwToggle) pwToggle.setAttribute('aria-expanded', String(_pwOpen));
        if (!_pwOpen) resetPwForm();
    }

    function resetPwForm() {
        if (passwordForm)    passwordForm.reset();
        if (pwMatchError)    pwMatchError.style.display   = 'none';
        if (pwStrengthWrap)  pwStrengthWrap.style.display = 'none';
    }

    if (pwToggle) {
        pwToggle.addEventListener('click', () => togglePwPanel());
        pwToggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePwPanel(); } });
    }
    if (cancelPwBtn) cancelPwBtn.addEventListener('click', e => { e.stopPropagation(); togglePwPanel(false); });

    // Eye toggles
    document.querySelectorAll('.pw-eye-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const input = document.getElementById(btn.getAttribute('data-target'));
            if (!input) return;
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            btn.querySelector('i').className = show ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    });

    // Strength meter
    const STRENGTH = [
        { label: 'Too short', color: '#ef4444', pct:  10 },
        { label: 'Weak',      color: '#ef4444', pct:  25 },
        { label: 'Fair',      color: '#f59e0b', pct:  55 },
        { label: 'Good',      color: '#3b82f6', pct:  75 },
        { label: 'Strong',    color: '#10b981', pct: 100 },
    ];

    function calcStrength(pw) {
        if (!pw || pw.length < 4) return 0;
        let s = 1;
        if (pw.length >= 8)         s++;
        if (/[A-Z]/.test(pw))       s++;
        if (/[0-9]/.test(pw))       s++;
        if (/[^A-Za-z0-9]/.test(pw)) s++;
        return Math.min(s, 4);
    }

    if (pwNew) {
        pwNew.addEventListener('input', () => {
            const v = pwNew.value;
            if (!v) { if (pwStrengthWrap) pwStrengthWrap.style.display = 'none'; return; }
            const cfg = STRENGTH[calcStrength(v)];
            if (pwStrengthWrap)  pwStrengthWrap.style.display  = 'flex';
            if (pwStrengthFill) { pwStrengthFill.style.width = cfg.pct + '%'; pwStrengthFill.style.background = cfg.color; }
            if (pwStrengthLabel) { pwStrengthLabel.textContent = cfg.label; pwStrengthLabel.style.color = cfg.color; }
        });
    }

    // Confirm match indicator
    if (pwConfirm) {
        pwConfirm.addEventListener('input', () => {
            if (pwMatchError) pwMatchError.style.display = (pwConfirm.value && pwNew && pwConfirm.value !== pwNew.value) ? 'flex' : 'none';
        });
    }

    // Password form submit
    if (passwordForm) {
        passwordForm.addEventListener('submit', e => {
            e.preventDefault();
            const cur  = pwCurrent ? pwCurrent.value.trim() : '';
            const npw  = pwNew     ? pwNew.value            : '';
            const conf = pwConfirm ? pwConfirm.value        : '';

            if (!cur)          { showToast('Required', 'Enter your current password.', 'warning'); pwCurrent && pwCurrent.focus(); return; }
            if (npw.length < 8){ showToast('Too Short', 'New password needs at least 8 characters.', 'warning'); pwNew && pwNew.focus(); return; }
            if (npw !== conf)  { showToast('Mismatch', 'Passwords do not match.', 'danger'); pwConfirm && pwConfirm.focus(); return; }

            // TODO: POST to backend
            resetPwForm();
            togglePwPanel(false);
            showToast('Password Updated', 'Your password has been changed.', 'success');
        });
    }

    // =========================================================
    // OBJECTIVE 3 & 4: AVATAR CHANGE
    // =========================================================
    const avatarContainer = document.getElementById('avatarContainer');
    const avatarInput     = document.getElementById('avatarInput');

    if (avatarContainer && avatarInput) {
        avatarContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarInput.click();
        });

        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Simple type validation
            if (!file.type.startsWith('image/')) {
                showToast('Invalid File', 'Please select an image file.', 'danger');
                return;
            }

            // MOCK UI Update (Real system would upload to PHP here)
            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target.result;
                // Update local profile image
                if (profileAvatar) {
                    profileAvatar.innerHTML = `<img src="${url}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
                }
                // Sync with shell
                syncSidebar(url);
                showToast('Photo Updated', 'Your profile picture has been changed.', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    // =========================================================
    // BOOT
    // =========================================================
    init();
});