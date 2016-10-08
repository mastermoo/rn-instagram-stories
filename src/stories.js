import React from 'react';
import { StyleSheet, View, Dimensions, Animated, StatusBar } from 'react-native';
import { observer } from 'mobx-react/native';
import Story from './story';
import store from './stores/app';

const { width, height } = Dimensions.get('window');


@observer
export default class extends React.Component {
	componentDidMount() {
		StatusBar.setHidden(true);
	}


	///////////////////////////////////
	// Render
	///////////////////////////////////

	render() {
		return (
			<View style={styles.container} {...store.panResponder.panHandlers}>
				{store.stories.map((story, idx) => (
					<Animated.View
						key={idx} 
						pointerEvents={store.animating ? 'none' : 'auto'}
						style={[styles.deck, {
							transform: [
								{
									translateX: store.horizontalSwipe.interpolate({
										inputRange: [width*(idx-1), width*idx, width*(idx+1)],
										outputRange: [width, 0, -width]
									}),
								},
								{
									translateY: store.verticalSwipe.interpolate({
										inputRange: [-1, 0, height],
										outputRange: [0, 0, height/2]
									}),
								},
							]
						}]
					}>
						<Story story={story} currentDeck={store.deckIdx == idx} />
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
