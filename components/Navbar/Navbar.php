<!-- PRNT Reusable Navbar -->
<div class="mobile-menu-overlay" id="mobileOverlay"></div>
<div class="mobile-menu" id="mobileMenu">
	<button class="close-menu" onclick="toggleMobileMenu()">
		<i class="fas fa-times"></i>
	</button>
	<a href="../../index.php">Home</a>
	<a href="../about/">About</a>
	<a href="../works/">Work</a>
	<a href="../service/">Services</a>
	<a href="../contact/">Contact</a>
	<a href="../client/service-avail/">Order Now</a>
	<a href="#" onclick="showAuthModal('login')">Login</a>
</div>
<div
	class="mobile-menu-overlay"
	id="mobileOverlay"
	onclick="toggleMobileMenu()"
></div>
<div class="mobile-menu" id="mobileMenu">
	<button class="close-menu" onclick="toggleMobileMenu()">
		<i class="fas fa-times"></i>
	</button>
	<a href="../../index.php" data-nav="root">Home</a>
	<a href="../about/" data-nav="about">About</a>
	<a href="../works/" data-nav="works">Work</a>
	<a href="../service/" data-nav="service">Services</a>
	<a href="../contact/" data-nav="contact">Contact</a>
	<a href="./pages/client/service-avail/" data-nav="order">Order Now</a>
	<a  onclick="showAuthModal('login')">Login</a>
</div>

<nav class="navbar" id="navbar">
	<div class="container flex align-center justify-between" style="width: 100%">
		<a href="../../index.php" class="logo"> <i class="fas fa-print"></i> PRNT </a>
		<ul class="nav-links" id="navLinks">
			<li><a href="../../index.php">Home</a></li>
			<li><a href="../about/" >About</a></li>
			<li><a href="../works/" >Work</a></li>
			<li><a href="../service/" >Services</a></li>
			<li><a href="../contact/" >Contact</a></li>
		</ul>
		<div class="flex align-center" style="gap: 1rem">
			<a
				href="../client/service-avail/"
				class="btn btn-primary"
				id="orderNowBtn"
			>
				<i class="fas fa-shopping-cart"></i> Order Now
			</a>
			<a
				onclick="showAuthModal('login')"
				class="btn btn-outline"
				id="loginBtn"
				>Login</a
			>
			<button class="mobile-menu-btn" onclick="toggleMobileMenu()">
				<i class="fas fa-bars"></i>
			</button>
		</div>
	</div>
</nav>
