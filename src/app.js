import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import Stories from './stories';

const { width, height } = Dimensions.get('window');


export default class extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open: false,
	  };
	}

	open = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({ open: true });
	}

	close = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({ open: false });
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.open}>
					<View style={styles.btn} />
				</TouchableWithoutFeedback>

				<View style={[styles.foo, (this.state.open ? styles.open : styles.closed)]}>
					<Stories close={this.close} />
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

	foo: {
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
	
	back: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 90,
	},
});
