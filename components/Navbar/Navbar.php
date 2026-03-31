<?php
include '../../api/config.php';
?>
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
	<a href="../client/dashboard/">Order Now</a>
	<!--initials ni user ang ipapakita pag naka login, if hindi then login button-->
	<?php if (isset($_SESSION['user'])): ?>
		<div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
			<div
				style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
				id="navAvatar">
				<?php
				$fullname = explode(' ', $_SESSION['username']);
				$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
				echo $initials;
				?></div>
		</div>
	<?php else: ?>
		<a
			onclick="showAuthModal('login')"
			class="btn btn-outline"
			id="loginBtn">Login</a>
	<?php endif; ?>
</div>
<div
	class="mobile-menu-overlay"
	id="mobileOverlay"
	onclick="toggleMobileMenu()"></div>

<nav class="navbar" id="navbar">
	<div class="container flex align-center justify-between" style="width: 100%">
		<a href="../../index.php" class="logo"> <i class="fas fa-print"></i> PRNT </a>
		<ul class="nav-links" id="navLinks">
			<li><a href="../../index.php">Home</a></li>
			<li><a href="../about/">About</a></li>
			<li><a href="../works/">Work</a></li>
			<li><a href="../service/">Services</a></li>
			<li><a href="../contact/">Contact</a></li>
		</ul>
		<div class="flex align-center" style="gap: 1rem">
			<a
				href="../client/dashboard/"
				class="btn btn-primary"
				id="orderNowBtn">
				<i class="fas fa-shopping-cart"></i> Order Now
			</a>
			<!--initials ni user ang ipapakita pag naka login, if hindi then login button-->
			<?php if (isset($_SESSION['user'])): ?>
				<div class="user-nav-profile" id="userNavProfile" style="cursor:pointer;">
					<div
						style="width:38px;height:38px;border-radius:50%;background:white;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;"
						id="navAvatar"><?php
										$fullname = explode(' ', $_SESSION['username']);
										$initials = strtoupper($fullname[0][0] . ($fullname[1][0] ?? ''));
										echo $initials;
										?></div>
				</div>
			<?php else: ?>
				<a
					onclick="showAuthModal('login')"
					class="btn btn-outline"
					id="loginBtn">Login</a>
			<?php endif; ?>

			<button class="mobile-menu-btn" onclick="toggleMobileMenu()">
				<i class="fas fa-bars"></i>
			</button>
		</div>
	</div>
</nav>