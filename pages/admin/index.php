<?php
/**
 * PRNT Admin Panel — Dashboard (index.php)
 * Location: /admin/
 *
 * Shell file: includes shared sidebar + topbar components,
 * renders the built-in Dashboard section, and hosts the
 * dynamic iframe container for all other admin modules.
 *
 * ── BACK-END INTEGRATION ──────────────────────────────────
 * 1. Add session/auth guard below (currently commented out).
 * 2. Replace each "SAMPLE DATA" block in script.js with an
 *    API fetch() call or PHP-encoded JSON echo.
 * 3. KPI values marked <!-- DB: --> can be echoed directly
 *    from PHP query results.
 * ─────────────────────────────────────────────────────────
 */

// ── BACK-END: Session authentication guard ───────────────
// session_start();
// if (!isset($_SESSION['admin_id'])) {
//     header('Location: /admin/login.php');
//     exit;
// }
// ─────────────────────────────────────────────────────────

$compPath = "../../components/";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRNT Admin — Dashboard</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../global/variables.css?v=1.5">
    <link rel="stylesheet" href="../../global/modals.css?v=1.5">
    <link rel="stylesheet" href="../../global/dropdowns.css?v=1.5">
    <link rel="stylesheet" href="../../components/Admin%20Sidebar/sidebar.css?v=1.5">
    <link rel="stylesheet" href="../../components/Admin%20Topbar/topbar.css?v=1.5">
    <link rel="stylesheet" href="style.css?v=1.5">

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
</head>
<body>

<div class="admin-wrapper">

    <!-- ══ SIDEBAR ══════════════════════════════════════════
         Shared component. Navigation driven by data-section
         and data-folder attributes; handled in script.js.
    ════════════════════════════════════════════════════════ -->
    <div class="sidebar-placeholder" id="sidebar-slot">
        <?php
        $sidebarPath = $compPath . "Admin Sidebar/sidebar.html";
        if (file_exists($sidebarPath)) {
            include $sidebarPath;
        } else {
            echo '<div class="comp-error"><i class="fas fa-triangle-exclamation"></i> Sidebar not found.</div>';
        }
        ?>
    </div>

    <main class="admin-main">

        <!-- ══ TOPBAR ═════════════════════════════════════════
             Shared component. Contains page title, notifications,
             and profile dropdown.
        ════════════════════════════════════════════════════════ -->
        <div class="topbar-placeholder" id="topbar-slot">
            <?php
            $topbarPath = $compPath . "Admin Topbar/topbar.html";
            if (file_exists($topbarPath)) {
                include $topbarPath;
            } else {
                echo '<div class="comp-error"><i class="fas fa-triangle-exclamation"></i> Topbar not found.</div>';
            }
            ?>
        </div>

        <div class="admin-body" id="view-container">

            <!-- ══ DASHBOARD SECTION (built-in, not iframed) ═════ -->
            <section class="admin-section active" id="sec-dashboard">
                <div class="dashboard-grid">

                    <!-- ── KPI CARDS ──────────────────────────────
                         DB: Replace hardcoded values with PHP echoes.
                         e.g. <?php echo $todayOrders; ?>
                    ─────────────────────────────────────────────── -->
                    <div class="stat-grid">

                        <div class="stat-card" data-kpi="today-orders">
                            <div class="stat-icon orange-glow">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="stat-content">
                                <h4 class="stat-title">Today's Orders</h4>
                                <div class="stat-value" id="kpi-today-orders">48</div><!-- DB: $todayOrders -->
                                <div class="trend-up" id="kpi-today-orders-trend">
                                    <i class="fas fa-arrow-up"></i> 12% vs yesterday
                                </div><!-- DB: computed trend -->
                            </div>
                        </div>

                        <div class="stat-card" data-kpi="pending-orders">
                            <div class="stat-icon orange-glow">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <h4 class="stat-title">Pending Orders</h4>
                                <div class="stat-value" id="kpi-pending-orders">14</div><!-- DB: $pendingOrders -->
                                <div class="trend-down" id="kpi-pending-orders-trend">
                                    <i class="fas fa-arrow-down"></i> 3% vs yesterday
                                </div>
                            </div>
                        </div>

                        <div class="stat-card" data-kpi="today-revenue">
                            <div class="stat-icon orange-glow">
                                <i class="fas fa-coins"></i>
                            </div>
                            <div class="stat-content">
                                <h4 class="stat-title">Today's Revenue</h4>
                                <div class="stat-value" id="kpi-count-revenue">₱ 8,640</div><!-- DB: $todayRevenue -->
                                <div class="trend-up" id="kpi-today-revenue-trend">
                                    <i class="fas fa-arrow-up"></i> 5% vs yesterday
                                </div>
                            </div>
                        </div>

                    </div><!-- /stat-grid -->


                    <!-- ── TODAY'S ORDERS BY SERVICE (Bar Chart) ──
                         Shows today's order count per service type.
                         DB: Replace SAMPLE_ORDERS_BY_SERVICE in script.js
                             with data from your orders API/query.
                    ─────────────────────────────────────────────── -->
                    <div class="card-shell overview-card">
                        <div class="card-header">
                            <div class="card-title-group">
                                <h3 class="card-title">Today's Orders by Service</h3>
                                <span class="card-subtitle" id="ordersChartDate"></span>
                            </div>
                            <div class="card-header-actions">
                                <span class="live-badge"><span class="live-dot"></span> Live</span>
                                <button class="btn-icon-sm" id="refreshOrdersChart" title="Refresh data">
                                    <i class="fas fa-rotate-right"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <canvas id="ordersPerServiceChart" style="min-height:320px;"></canvas>
                        </div>
                    </div>

                </div><!-- /dashboard-grid -->
            </section><!-- /sec-dashboard -->


            <!-- ══ DYNAMIC SECTION ═══════════════════════════════
                 All non-dashboard modules (orders, analytics, etc.)
                 are loaded here as iframes via script.js routing.
                 Do NOT place content here directly.
            ════════════════════════════════════════════════════ -->
            <section class="admin-section" id="sec-dynamic" style="display:none; padding:0; background:transparent;">
                <div id="dynamic-content"></div>
            </section>

        </div><!-- /admin-body -->
    </main>
</div><!-- /admin-wrapper -->


<!-- ══ GLOBAL MODAL — content injected by openModal() ══════ -->
<div id="modalOverlay" class="modal-overlay" onclick="window.closeModal && window.closeModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
        <div id="modalBody"></div>
    </div>
</div>

<!-- ══ GLOBAL TOAST CONTAINER ══════════════════════════════ -->
<div id="toastContainer" aria-live="polite"></div>

<script src="script.js?v=1.5"></script>
</body>
</html>