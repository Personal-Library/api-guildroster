const darkBtn = document.querySelector('.dark-btn');
const bodyTag = document.querySelector('body');
const state = {
	darkMode: false,
};

const transition = () => {
	bodyTag.classList.add('transition');
	setTimeout(() => {
		bodyTag.classList.remove('transition');
	}, 1000);
};

darkBtn.addEventListener('click', () => {
	if (state.darkMode === false) {
		console.log('if block');
		transition();
		document.documentElement.setAttribute('data-theme', 'dark');
		state.darkMode = true;
		darkBtn.textContent = 'Too Dark? 🌞';
	} else {
		console.log('else block');
		transition();
		document.documentElement.setAttribute('data-theme', 'light');
		state.darkMode = false;
		darkBtn.textContent = 'Too Bright? 🌑';
	}
});
