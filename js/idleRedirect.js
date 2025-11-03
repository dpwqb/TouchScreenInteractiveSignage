// 无操作5分钟后自动跳转到待机页面
(function() {
	// 设置无操作时间（5分钟 = 300000毫秒）
	const IDLE_TIMEOUT = 300000; // 5分钟
	let idleTimer;

	// 重置计时器
	function resetIdleTimer() {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(function() {
			// 跳转到待机页面
			window.location.href = './standby.html';
		}, IDLE_TIMEOUT);
	}

	// 初始化事件监听器
	function initIdleTimer() {
		// 监听鼠标移动、点击、滚动等事件
		document.addEventListener('mousemove', resetIdleTimer);
		document.addEventListener('mousedown', resetIdleTimer);
		document.addEventListener('touchstart', resetIdleTimer);
		document.addEventListener('touchmove', resetIdleTimer);
		document.addEventListener('keydown', resetIdleTimer);
		document.addEventListener('scroll', resetIdleTimer);
		
		// 初始化计时器
		resetIdleTimer();
	}

	// 页面加载完成后启动无操作检测
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initIdleTimer);
	} else {
		initIdleTimer();
	}
})();