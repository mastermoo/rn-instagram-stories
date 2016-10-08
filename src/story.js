import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Components } from 'exponent';
import Indicator from './indicator';

import Image from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';
const circleSnailProps = { thickness: 1, color: '#ddd', size: 80 };

const { width, height } = Dimensions.get('window');


export default class extends React.Component {
	render() {
		const { story, onNextItem, onPressIn } = this.props;
		
		return (
			<TouchableWithoutFeedback
				onPress={onNextItem}
				delayPressIn={200}
				onPressIn={onPressIn}
			>
				<Image
					source={{ uri: story.items[story.idx].src }}
					style={styles.deck}
					indicator={CircleSnail}
					indicatorProps={circleSnailProps}
				>
					{this.renderIndicators()}
					{this.renderBackButton()}
				</Image>
			</TouchableWithoutFeedback>
		);
	}

	renderIndicators() {
		const { story, currentDeck, indicatorAnim } = this.props;

		return (
			<View style={styles.indicatorWrap}>
				<Components.LinearGradient
					colors={['rgba(0,0,0,0.2)', 'transparent']}
					locations={[0, 0.95]}
					style={styles.indicatorBg}
				/>

				<View style={styles.indicators}>
					{story.items.map((item, i) => (
						<Indicator
							key={i}
							animate={currentDeck && story.idx == i}
							seen={story.idx > i}
							coming={story.idx <= i}
							anim={indicatorAnim}
							story={story}
							i={i}
						/>
					))}
				</View>
			</View>
		);
	}

	renderBackButton() {
		const { onPrevItem, backOpacity, setBackOpacity } = this.props;

		return (
			<TouchableWithoutFeedback
				onPress={onPrevItem}
				onPressIn={() => setBackOpacity(1)}
				onLongPress={() => setBackOpacity(0)}
			>
				<Components.LinearGradient
					colors={['rgba(0,0,0,0.33)', 'transparent']}
					locations={[0, 0.85]}
					start={[0, 0]}
					end={[1, 0]}
					style={[styles.back, {
						opacity: backOpacity
					}]}
				/>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	deck: {
		width, height,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},

	progressIndicator: {
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	indicatorWrap: {
		position: 'absolute',
		top: 0, left: 0, right: 0,
	},
	indicators: {
		height: 30,
		alignItems: 'center',
		paddingHorizontal: 8,
		flexDirection: 'row',
	},
	indicatorBg: {
		position: 'absolute',
		top: 0, left: 0, right: 0,
		height: 50,
	},

	back: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 90,
	},
});
