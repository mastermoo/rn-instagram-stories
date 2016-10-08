import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, 
	LayoutAnimation, StatusBar, PanResponder } from 'react-native';
import Story from './story';
import stories from './stories_data';

const { width, height } = Dimensions.get('window');


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stories,
			animating: false,
			paused: false,
			backOpacity: 0,
			deckIdx: 0,
		};

		this.indicatorAnim = new Animated.Value(0);
		this.pan = new Animated.Value(0);
	}


	///////////////////////////////////
	// Pan Methods
	///////////////////////////////////

	componentWillMount() {
		this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, { dx }) => Math.abs(dx) > 5,

      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value);
        this.pan.setValue(0);
        this.pause();
        this.setBackOpacity(0);
      },

      onPanResponderMove: (e, { dx }) => this.pan.setValue(-dx),

      onPanResponderRelease: (e, { dx }) => {
        this.pan.flattenOffset();
        const deckIdx = this.state.deckIdx;

        if (deckIdx == -1) {
        	this.play();
        	return this.animateDeck(0);
        }

        if (dx > 100) { // previous deck
        	return this.animateDeck(width * (deckIdx - 1), true);
        }
        
        if (dx < -100) { // -> next deck
        	return this.animateDeck(width * (deckIdx + 1), true);
        }

        this.play();
        return this.animateDeck(width * deckIdx);
      }
    });
	}


	///////////////////////////////////
	// Indicator Methods
	///////////////////////////////////

	componentDidMount() {
		StatusBar.setHidden(true);
		this.animateIndicator();
	}

	animateIndicator = (reset=true) => {
		if (reset) this.indicatorAnim.setValue(0);

		requestAnimationFrame(() => {
			Animated.timing(this.indicatorAnim, {
				toValue: 1,
				duration: 5000 * (1-this.indicatorAnim._value),
			}).start(({ finished }) => {
				if (finished) this.onNextItem();
			});
		});
	}

	pause = () => {
		if (this.state.paused) return;

		this.setState({ paused: true });
		this.indicatorAnim.stopAnimation();
	}

	play = () => {
		if (this.state.paused) {
			this.setState({ paused: false });
			this.animateIndicator(false);
		}
	}

	
	///////////////////////////////////
	// Story Methods
	///////////////////////////////////

	onNextItem = () => {
		if (this.state.paused) return this.play();

		const story = this.state.stories[this.state.deckIdx];

		if (story.idx >= story.items.length - 1)
			return this.onNextDeck();

		this.animateIndicator();
		this.updateStoryIdx(story.idx + 1);
	}

	onPrevItem = () => {
		if (this.state.backOpacity == 1) this.setBackOpacity(0);

		const story = this.state.stories[this.state.deckIdx];

		if (story.idx == 0)
			return this.onPrevDeck();

		this.animateIndicator();
		this.updateStoryIdx(story.idx - 1);
	}

	updateStoryIdx(idx) {
		const story = Object.assign({}, this.state.stories[this.state.deckIdx]);
		story.idx = idx;

		const stories = [
			...this.state.stories.slice(0, this.state.deckIdx),
			story,
			...this.state.stories.slice(this.state.deckIdx + 1, this.state.stories.length),
		]

		this.setState({ stories });
	}



	///////////////////////////////////
	// Deck Methods
	///////////////////////////////////

	onNextDeck() {
		if (this.state.deckIdx >= this.state.stories.length - 1) return;
		this.animateDeck((this.state.deckIdx + 1)*width, true);
	}

	onPrevDeck() {
		if (this.state.deckIdx == 0) return;
		this.animateDeck((this.state.deckIdx - 1)*width, true);
	}

	animateDeck(toValue, reset=false) {
		if (reset) {
			this.setState({
				animating: true,
				deckIdx: parseInt(toValue / width)
			});
				
			this.animateIndicator();
		}

		Animated.spring(this.pan, {
			toValue, friction: 9
		}).start(() => {
			if (reset) {
				this.setState({ animating: false });
			}
		});
	}


	setBackOpacity = (backOpacity) => {
		this.setState({ backOpacity });
	}

	///////////////////////////////////
	// Render
	///////////////////////////////////

	render() {
		return (
			<View style={styles.container} {...this._panResponder.panHandlers}>
				{this.state.stories.map((story, idx) => (
					<Animated.View
						key={idx} 
						pointerEvents={this.state.animating ? 'none' : 'auto'}
						style={[styles.deck, {
							transform: [{ 
								translateX: this.pan.interpolate({
									inputRange: [width*(idx-1), width*idx, width*(idx+1)],
									outputRange: [width, 0, -width]
								})
							}]
						}]
					}>
						<Story
							story={story}
							animateIndicator={this.animateIndicator}
							indicatorAnim={this.indicatorAnim}
							currentDeck={this.state.deckIdx == idx}
							onNextItem={this.onNextItem}
							onPrevItem={this.onPrevItem}
							onPressIn={this.pause}
							setBackOpacity={this.setBackOpacity}
							backOpacity={this.state.backOpacity}
						/>
					</Animated.View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	deck: {
		position: 'absolute',
		width, height,
		top: 0, left: 0,
	},
});
