import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { observer } from 'mobx-react/native';
import store from './store';


@observer
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = { width: 0 };
	}

	setWidthFromLayout(event) {
		const { width } = event.nativeEvent.layout;
		this.setState({ width });
	}

	render() {
		const { animate, seen, coming, story, i } = this.props;
		let style = {};

		if (animate) {
			style = {
				width: store.indicatorAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, this.state.width],
					extrapolate: 'clamp'
				})
			};
		} else if (story.idx > i) { // seen
			style = { flex: 1 };
		} else if (story.idx <= i) { // coming
			style = { width: 0 };
		}

		return (
			<View style={styles.line} onLayout={this.setWidthFromLayout.bind(this)}>
				<Animated.View style={[styles.progress, style]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	line: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,0.4)',
		marginHorizontal: 1,
		height: 2,
	},
	progress: {
		backgroundColor: 'rgba(255,255,255,0.4)',
		height: 2,
	},
});
