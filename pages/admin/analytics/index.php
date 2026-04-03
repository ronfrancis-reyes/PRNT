<?php
/**
 * Analytics Module - PRNT Admin
 * 
 * Performance insights, user growth tracking, and service delivery metrics.
 * Designed to be loaded via Iframe within the modern Admin Shell.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRNT - Analytics</title>

    <!-- UI Core -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../../../global/variables.css?v=1.5">
    <link rel="stylesheet" href="index.css?v=1.5">

    <!-- Charting & Export Engines -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
    <script src="https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"></script>
</head>
<body class="analytics-body">

    <div class="analytics-wrapper">


        <!-- ─── MODULE HEADER & FILTERS ─── -->
        <div class="module-header">
            <div class="header-info">
                <div class="header-title">PERFORMANCE METRICS</div>
                <h2 class="header-subtitle" id="analyticsPeriodTitle">Monthly Overview</h2>
            </div>
            <div class="header-actions">
                <div class="control-group">
                    <button class="btn-filter" data-period="daily">Day</button>
                    <button class="btn-filter active" data-period="monthly">Month</button>
                    <button class="btn-filter" data-period="yearly">Year</button>
                </div>
                <button class="btn-export" id="btnExportAnalytics"><i class="fas fa-download"></i> Export</button>
            </div>
        </div>

        <!-- ─── KPI SUMMARY ROW ─── -->
        <div class="analytics-grid-top">
            <div class="ani-card">
                <div class="ani-card-label" id="label-orders">TOTAL ORDERS</div>
                <div class="ani-card-main">
                    <span class="ani-value" id="val-orders">1,402</span>
                    <div class="ani-trend trend-up" id="trend-orders"><i class="fas fa-caret-up"></i> +12.5%</div>
                </div>
                <div class="ani-comparison" id="comp-orders">vs last month</div>
            </div>

            <div class="ani-card">
                <div class="ani-card-label" id="label-revenue">TOTAL REVENUE</div>
                <div class="ani-card-main">
                    <span class="ani-value" id="val-revenue">₱ 72,000</span>
                    <div class="ani-trend trend-up" id="trend-revenue"><i class="fas fa-caret-up"></i> +8.2%</div>
                </div>
                <div class="ani-comparison" id="comp-revenue">vs last month</div>
            </div>

            <div class="ani-card">
                <div class="ani-card-label" id="label-customers">TOTAL CUSTOMERS</div>
                <div class="ani-card-main">
                    <span class="ani-value" id="val-customers">203</span>
                    <div class="ani-trend trend-down" id="trend-customers"><i class="fas fa-caret-down"></i> -3.1%</div>
                </div>
                <div class="ani-comparison" id="comp-customers">vs last month</div>
            </div>
        </div>

        <!-- ─── CHARTS & INSIGHTS ─── -->
        <div class="analytics-grid-main">
            
            <!-- Revenue & Services Distribution (Grouped Histogram) -->
            <div class="ani-chart-card lg-span">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-chart-column icon"></i> REVENUE & SERVICES DISTRIBUTION</h3>
                </div>
                <div class="card-body">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>

            <!-- Customer Growth (Histogram) -->
            <div class="ani-chart-card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-users icon"></i> CUSTOMER GROWTH</h3>
                </div>
                <div class="card-body">
                    <canvas id="growthChart"></canvas>
                </div>
            </div>

            <!-- Top Services Performance -->
            <div class="ani-table-card full-span">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-trophy icon"></i> TOP SERVICES PERFORMANCE</h3>
                </div>
                <div class="card-body pb-0">
                    <table class="ani-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>SERVICE NAME</th>
                                <th>FORMAT / CATEGORY</th>
                                <th class="text-center">UNITS SOLD</th>
                                <th class="text-right">REVENUE</th>
                            </tr>
                        </thead>
                        <tbody id="topServicesTableBody">
                            <!-- Populated dynamically via index.js -->
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>

    <!-- Logic Engine -->
    <script src="index.js?v=1.5"></script>
</body>
</html>
