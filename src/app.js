import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { observer } from 'mobx-react/native';
import Stories from './stories';
import store from './stores/app';

const { width, height } = Dimensions.get('window');

@observer
export default class extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={store.openCarousel}>
					<View style={styles.btn} />
				</TouchableWithoutFeedback>

				<View style={[styles.carouselWrap, (store.carouselOpen ? styles.open : styles.closed)]}>
					<Stories />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	carouselWrap: {
		overflow: 'hidden',
		position: 'absolute',
	},
	closed: {
		width: 0,
		height: 0,
		top: height/2,
		left: width/2,
	},
	open: {
		width, height,
		top: 0,
		left: 0,
	},

	btn: {
		width: 40,
		height: 40,
		borderRadius: 40/2,
		backgroundColor: 'black',
	},
});
