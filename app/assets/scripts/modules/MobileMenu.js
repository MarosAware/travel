import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent= $(".site-header__menu-content");
		this.events();
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this)); /*bind aby zmienic wskaznik ktory wskazuje na wlasnosc obiektu this */
	}

	toggleTheMenu() {
		this.menuContent.toggleClass("site-header__menu-content--is-visible"); /*toggleClass is jquery method.*/
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}
}

export default MobileMenu;