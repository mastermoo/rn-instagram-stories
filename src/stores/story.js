import { observable, action, computed } from 'mobx';

export default class Story {
	@observable idx = 0;
	@observable items = [];


	constructor = (idx, items) => {
		this.idx = idx;
		this.items = items;
	}

	@action setIdx = (idx) => {
		this.idx = idx;
	}


	@computed get currentDeck() {
		this.stories[this.deckIdx];
	}

}