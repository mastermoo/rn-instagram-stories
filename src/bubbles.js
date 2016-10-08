import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import store from './store';

export default class extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View ref='foo'>
					<ScrollView
						style={styles.bubbles}
						contentContainerStyle={{ alignItems: 'center' }}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						{store.stories.map((story, i) => (
							<View ref={`_${i}`} key={i}>
								<TouchableWithoutFeedback
									activeOpacity={0.9}
									onPress={() => {
										this.refs[`_${i}`].measure((ox, oy, width, height, px, py) => {
											const offset = {
												top: (py + bubbleSize/2),
												left: (px + bubbleSize/2)
											};

											store.openCarousel(i, offset);
										});
									}}
								>
									<Image style={styles.img} source={{ uri: story.avatar }} />
								</TouchableWithoutFeedback>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const bubbleSize = 70;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	bubbles: {
		height: 90,
		flexDirection: 'row',
		paddingHorizontal: 5,
		backgroundColor: '#f3f3f3',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc',
		overflow: 'visible',
	},
	img: {
		borderWidth: 2,
		borderColor: '#fff',
		width: bubbleSize,
		height: bubbleSize,
		borderRadius: bubbleSize/2,
		marginHorizontal: 6,
	},
});