/**
 * Analytics Module Logic - PRNT Admin
 * 
 * Data-driven engine handling real-time switching between 
 * Daily, Monthly, and Yearly performance metrics.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // SECTION: DATA STORE
    // ==========================================================================
    // SAMPLE DATA (FRONTEND TESTING ONLY)
    // BACKEND INTEGRATION POINT
    // Endpoint: /api/admin/analytics
    // Method: GET
    const SAMPLE_DATA = {
        daily: {
            title: "Daily Overview",
            kpis: {
                orders:    { val: "42",    trend: "+12%", up: true, comp: "vs yesterday" },
                revenue:   { val: "₱ 8,640", trend: "+5%",  up: true, comp: "vs yesterday" },
                customers: { val: "18",    trend: "+2%",  up: true, comp: "vs yesterday" }
            },
            servicesChart: {
                labels: ['Calling Cards', 'Banner Print', 'Booklets', 'Photo Print', 'Doc Print'],
                orders: [15, 8, 12, 4, 3],
                revenue: [1200, 3200, 3600, 440, 200]
            },
            growth: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                data: [3, 1, 4, 0, 5, 2]
            },
            servicesTable: [
                { rank: '01', name: 'Booklets',      cat: 'Full Color', units: '12', rev: '₱ 3,600' },
                { rank: '02', name: 'Banner Print',  cat: 'Digital',    units: '8',  rev: '₱ 3,200' },
                { rank: '03', name: 'Calling Cards', cat: 'Standard',   units: '15', rev: '₱ 1,200' },
                { rank: '04', name: 'Photo Print',   cat: 'Glossy',     units: '4',  rev: '₱ 440' },
                { rank: '05', name: 'Doc Print',     cat: 'Standard',   units: '3',  rev: '₱ 200' },
                { rank: '06', name: 'ID Photo',      cat: 'Passport',   units: '2',  rev: '₱ 100' }
            ]
        },
        monthly: {
            title: "Monthly Overview",
            kpis: {
                orders:    { val: "1,402",  trend: "+12.5%", up: true,  comp: "vs last month" },
                revenue:   { val: "₱ 72,000", trend: "+8.2%",  up: true,  comp: "vs last month" },
                customers: { val: "203",    trend: "-3.1%",  up: false, comp: "vs last month" }
            },
            servicesChart: {
                labels: ['Calling Cards', 'Banner Print', 'Binding', 'Tarp Print', 'Posters'],
                orders: [710, 450, 210, 20, 12],
                revenue: [12500, 28400, 8400, 18000, 4700]
            },
            growth: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [350, 420, 510, 680]
            },
            servicesTable: [
                { rank: '01', name: 'Banner Print',   cat: 'Digital',  units: '450', rev: '₱ 28,400' },
                { rank: '02', name: 'Tarp Print',     cat: 'Format',   units: '20',  rev: '₱ 18,000' },
                { rank: '03', name: 'Calling Cards',  cat: 'Standard', units: '710', rev: '₱ 12,500' },
                { rank: '04', name: 'Binding',        cat: 'Coil',     units: '210', rev: '₱ 8,400' },
                { rank: '05', name: 'Posters',        cat: 'Matte',    units: '12',  rev: '₱ 4,700' },
                { rank: '06', name: 'ID Cards',       cat: 'PVC',      units: '45',  rev: '₱ 2,250' },
                { rank: '07', name: 'Flyers',         cat: 'Standard', units: '120', rev: '₱ 1,800' }
            ]
        },
        yearly: {
            title: "Yearly Overview",
            kpis: {
                orders:    { val: "15,204", trend: "+18%", up: true, comp: "vs last year" },
                revenue:   { val: "₱ 842,000", trend: "+24%", up: true, comp: "vs last year" },
                customers: { val: "1,840", trend: "+45%", up: true, comp: "vs last year" }
            },
            servicesChart: {
                labels: ['Tarp Print', 'Calling Cards', 'Booklets', 'Binding', 'Others'],
                orders: [2400, 8200, 1500, 2100, 1004],
                revenue: [142000, 84000, 72000, 68000, 476000]
            },
            growth: {
                labels: ["2021","2022","2023","2024","2025"],
                data: [150, 250, 350, 420, 680]
            },
            servicesTable: [
                { rank: '01', name: 'Tarp Print',    cat: 'Large Format', units: '2.4k', rev: '₱ 142k' },
                { rank: '02', name: 'Calling Cards', cat: 'Digital',      units: '8.2k', rev: '₱ 84k' },
                { rank: '03', name: 'Booklets',      cat: 'Full Color',   units: '1.5k', rev: '₱ 72k' },
                { rank: '04', name: 'Binding',       cat: 'Plastic',      units: '2.1k', rev: '₱ 68k' },
                { rank: '05', name: 'Stickers',      cat: 'Vinyl',        units: '5.4k', rev: '₱ 52k' },
                { rank: '06', name: 'Invitations',   cat: 'Premium',      units: '1.2k', rev: '₱ 48k' }
            ]
        }
    };

    let currentActivePeriod = 'monthly';

    // ==========================================================================
    // SECTION: CHART INITIALIZATION
    // ==========================================================================

    let revenueChart = null;
    let growthChart  = null;

    const TOOLTIP_STYLE = {
        backgroundColor: '#1e2333',
        borderColor: '#2a2f42',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleColor: '#e8eaf0',
        bodyColor: '#fff',
        titleFont: { size: 13, weight: 'bold' }
    };

    const initCharts = () => {
        // 1. Revenue & Services Grouped Histogram (Dual Axis)
        const revCtx = document.getElementById('revenueChart').getContext('2d');
        revenueChart = new Chart(revCtx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1200, easing: 'easeOutQuart' },
                plugins: {
                    legend: { 
                        display: true, 
                        position: 'top', 
                        labels: { color: '#e8eaf0', font: { size: 10, weight: '700' }, boxWidth: 8, boxHeight: 8, usePointStyle: true, pointStyle: 'circle', padding: 24 } 
                    },
                    tooltip: {
                        ...TOOLTIP_STYLE,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.dataset.yAxisID === 'y-revenue') {
                                    label += '₱ ' + context.parsed.y.toLocaleString();
                                } else {
                                    label += context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                interaction: { mode: 'index', intersect: false },
                hover: { mode: 'index', intersect: false },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#6b7280', font: { size: 10 }, padding: 12 } 
                    },
                    'y-orders': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: { color: '#6b7280', font: { size: 10 }, padding: 8 },
                        title: { display: true, text: 'Orders', color: '#6b7280', font: { size: 9 } }
                    },
                    'y-revenue': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: { drawOnChartArea: false }, // only draw grid lines for one axis
                        ticks: { color: '#FF6B00', font: { size: 10 }, padding: 8, callback: (value) => '₱ ' + value },
                        title: { display: true, text: 'Revenue', color: '#FF6B00', font: { size: 9 } }
                    }
                }
            }
        });

        // 2. Customer Growth Histogram
        const groCtx = document.getElementById('growthChart').getContext('2d');
        growthChart = new Chart(groCtx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1000, easing: 'easeOutBack' },
                plugins: {
                    legend: { display: false },
                    tooltip: TOOLTIP_STYLE
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: { color: '#6b7280', font: { size: 10 }, padding: 8 }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: '#6b7280', font: { size: 10 }, padding: 12 } 
                    }
                }
            }
        });
    };

    // ==========================================================================
    // SECTION: UI UPDATER ENGINE
    // ==========================================================================

    const getGradient = (ctx, color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}10`);
        return gradient;
    };

    const updateDashboard = (period) => {
        const data = SAMPLE_DATA[period];
        if (!data) return;
        currentActivePeriod = period;

        // 1. Update Title
        document.getElementById('analyticsPeriodTitle').textContent = data.title;

        // 2. Update KPIs
        updateKPI('orders',    data.kpis.orders);
        updateKPI('revenue',   data.kpis.revenue);
        updateKPI('customers', data.kpis.customers);

        // 3. Update Revenue & Services Dist. (Dual Dataset)
        const revCtx = document.getElementById('revenueChart').getContext('2d');
        revenueChart.data.labels = data.servicesChart.labels;
        revenueChart.data.datasets = [
            {
                label: 'Orders',
                data: data.servicesChart.orders,
                backgroundColor: getGradient(revCtx, '#00d2ff'),
                borderColor: '#00d2ff',
                yAxisID: 'y-orders',
                borderWidth: 1,
                borderRadius: 6,
                barThickness: period === 'daily' ? 14 : 22,
                maxBarThickness: 30
            },
            {
                label: 'Revenue',
                data: data.servicesChart.revenue,
                backgroundColor: getGradient(revCtx, '#FF6B00'),
                borderColor: '#FF6B00',
                yAxisID: 'y-revenue',
                borderWidth: 1,
                borderRadius: 6,
                barThickness: period === 'daily' ? 14 : 22,
                maxBarThickness: 30
            }
        ];
        revenueChart.update();

        // 4. Update Growth Histogram
        const growthCtx = document.getElementById('growthChart').getContext('2d');
        growthChart.data.labels = data.growth.labels;
        growthChart.data.datasets = [{
            label: 'New Customers',
            data: data.growth.data,
            backgroundColor: getGradient(growthCtx, '#FF6B00'),
            borderColor: '#FF6B00',
            borderWidth: 1,
            borderRadius: 8,
            barThickness: 35
        }];
        growthChart.update();

        // 5. Update Top Services Table
        const tableBody = document.getElementById('topServicesTableBody');
        
        // BACKEND INTEGRATION POINT
        // Endpoint: /api/admin/analytics
        // Server should handle sorting & limiting
        const sortedServices = [...data.servicesTable]
            .sort((a, b) => {
                const parseRev = (str) => {
                    if (!str) return 0;
                    let num = parseFloat(str.replace(/[^\d.-]/g, ''));
                    if (str.toLowerCase().includes('k')) num *= 1000;
                    return num;
                };
                return parseRev(b.rev) - parseRev(a.rev);
            })
            .slice(0, 5);

        tableBody.innerHTML = sortedServices.map((s, idx) => `
            <tr>
                <td class="rank">${String(idx + 1).padStart(2, '0')}</td>
                <td>
                    <div class="service-meta">
                        <div class="service-icon orange"><i class="fas fa-cube"></i></div>
                        <div class="service-info">
                            <div class="service-name">${s.name}</div>
                            <div class="service-sub">${s.cat} Service</div>
                        </div>
                    </div>
                </td>
                <td><span class="format-badge">${s.cat}</span></td>
                <td class="text-center units">${s.units}</td>
                <td class="text-right revenue">${s.rev}</td>
            </tr>
        `).join('');
    };

    const updateKPI = (id, kpi) => {
        document.getElementById(`val-${id}`).textContent = kpi.val;
        document.getElementById(`comp-${id}`).textContent = kpi.comp;
        
        const trendEl = document.getElementById(`trend-${id}`);
        trendEl.innerHTML = `<i class="fas fa-caret-${kpi.up ? 'up' : 'down'}"></i> ${kpi.trend}`;
        trendEl.className = `ani-trend trend-${kpi.up ? 'up' : 'down'}`;
    };

    // ==========================================================================
    // SECTION: EXCEL EXPORT ENGINE (SheetJS)
    // ==========================================================================

    const exportAnalyticsToExcel = () => {
        if (typeof XLSX === 'undefined') {
            console.error("SheetJS library not loaded!");
            return;
        }
        
        const data = SAMPLE_DATA[currentActivePeriod];
        const wb = XLSX.utils.book_new();

        // Helper to get Top 5 for Export (matching UI logic)
        const getTop5 = (services) => {
            return [...services]
                .sort((a, b) => {
                    const parseRev = (str) => {
                        if (!str) return 0;
                        let num = parseFloat(str.replace(/[^\d.-]/g, ''));
                        if (str.toLowerCase().includes('k')) num *= 1000;
                        return num;
                    };
                    return parseRev(b.rev) - parseRev(a.rev);
                })
                .slice(0, 5);
        };

        // Sheet 1: KPIs
        const wsKPIs = XLSX.utils.json_to_sheet([
            { Metric: "Total Orders", Value: data.kpis.orders.val, Trend: data.kpis.orders.trend },
            { Metric: "Total Revenue", Value: data.kpis.revenue.val, Trend: data.kpis.revenue.trend },
            { Metric: "Total Customers", Value: data.kpis.customers.val, Trend: data.kpis.customers.trend }
        ]);
        XLSX.utils.book_append_sheet(wb, wsKPIs, "KPIs");

        // Sheet 2: Revenue and Orders Distribution
        const wsServicesDist = XLSX.utils.json_to_sheet(
            data.servicesChart.labels.map((label, idx) => ({
                "Service": label,
                "Orders": data.servicesChart.orders[idx],
                "Revenue": data.servicesChart.revenue[idx]
            }))
        );
        XLSX.utils.book_append_sheet(wb, wsServicesDist, "Services Distribution");

        // Sheet 3: Customer Growth
        const wsGrowth = XLSX.utils.json_to_sheet(
            data.growth.labels.map((label, idx) => ({
                "Period": label,
                "New Customers": data.growth.data[idx]
            }))
        );
        XLSX.utils.book_append_sheet(wb, wsGrowth, "Customer Growth");

        // Sheet 4: Top Services Performance Table (Top 5 Only)
        const wsTopTable = XLSX.utils.json_to_sheet(
            getTop5(data.servicesTable).map((s, idx) => ({
                "Rank": String(idx + 1).padStart(2, '0'),
                "Service Name": s.name,
                "Format/Category": s.cat,
                "Units Sold": s.units,
                "Revenue": s.rev
            }))
        );
        XLSX.utils.book_append_sheet(wb, wsTopTable, "Top Services Table");

        // Generate and download
        XLSX.writeFile(wb, `PRNT_Analytics_${currentActivePeriod}_export.xlsx`);
    };

    // ==========================================================================
    // SECTION: EVENT BINDING
    // ==========================================================================

    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateDashboard(period);
        });
    });

    document.getElementById('btnExportAnalytics')?.addEventListener('click', () => {
        exportAnalyticsToExcel();
    });

    // Initialize View
    initCharts();
    updateDashboard('monthly'); // Default view
});
