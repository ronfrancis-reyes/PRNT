<!-- ==========================================================================
     SECTION: ADMIN SIDEBAR
     ========================================================================== -->
<aside class="admin-sidebar" id="adminSidebar">

    <!-- Brand Header -->
    <div class="sidebar-header">
        <a href="#" class="logo">
            <img src="../../assets/img/PRNT_logo.png" alt="PRNT Logo" class="logo-img">
            <span class="logo-text sb-label">PRNT</span>
        </a>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">

        <div class="nav-label">MAIN</div>

        <!-- Dashboard -->
        <a href="" class="active" data-section="dashboard" data-folder="dashboard" data-title="Dashboard">
            <i class="fas fa-th-large nav-icon"></i>
            <span class="sb-label">Dashboard</span>
        </a>

        <!-- Analytics -->
        <a href="#" data-section="analytics" data-folder="../../pages/admin/analytics/" data-title="Analytics">
            <i class="fas fa-chart-line nav-icon"></i>
            <span class="sb-label">Analytics</span>
        </a>

        <div class="sb-divider"></div>
        <div class="nav-label">MANAGEMENT</div>

        <!-- Orders -->
        <a href="#" data-section="orders" data-folder="../../pages/admin/order management" data-title="Order Management">
            <i class="fas fa-shopping-bag nav-icon"></i>
            <span class="sb-label">Orders</span>
            <span class="sidebar-badge" id="pendingOrdersBadge">0</span>
        </a>

        <!-- Services -->
        <a href="#" data-section="services" data-folder="../../pages/admin/service management" data-title="Service Management">
            <i class="fas fa-cogs nav-icon"></i>
            <span class="sb-label">Services</span>
        </a>

        <!-- Users -->
        <a href="#" data-section="users" data-folder="../../pages/admin/user management" data-title="Customer Management">
            <i class="fas fa-users nav-icon"></i>
            <span class="sb-label">Customers</span>
        </a>

        <div class="sb-divider"></div>
        <div class="nav-label">REPORTS</div>

        <!-- Reports -->
        <a href="#" data-section="reports" data-folder="../../pages/admin/reports" data-title="Reports">
            <i class="fas fa-file-alt nav-icon"></i>
            <span class="sb-label">Reports</span>
            <span class="sidebar-badge" id="unreadMessagesBadge" style="display: none;">0</span>
        </a>

    </nav>

    <!-- Profile Footer -->
    <div class="sidebar-profile" data-section="user-profile" data-folder="../../pages/admin/user profile" data-title="Admin Profile">
        <div class="profile-avatar-sm" data-user-initials>Y</div>
        <div class="profile-info sb-label">
            <span data-user-name>Yance</span>
            <small>Administrator</small>
        </div>
        <button class="sidebar-logout sb-label" onclick="logout()" title="Logout">
            <i class="fas fa-sign-out-alt"></i>
        </button>
    </div>

</aside>

<!-- ==========================================================================
        SECTION: SIDEBAR OVERLAY (Mobile Focus)
        ========================================================================== -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleAdminSidebar()"></div>