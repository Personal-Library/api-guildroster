(() => {
	const emailBtn = document.querySelector('.email-btn');
	const emailForm = document.querySelector('input[type=email]');
	emailBtn.addEventListener('click', () => {
		/**
		 * Sorry! Not collecting emails at the moment.
		 * Past me is considering using Formspree.
		 */
		emailForm.value = '';
	});
})();
