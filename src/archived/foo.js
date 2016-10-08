import Exponent from 'exponent';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');


class App extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.anim = new Animated.Value(0.7);
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.deck, {
					transform: [
						{
							translateX: this.anim.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -width]
							}),
						}
					],
				}]}>
					<Animated.View style={[styles.foo, {
						width, height,
						backgroundColor: 'pink',
						borderRadius: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 10]
						}),
						transform: [{
							scale: this.anim.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 0.4]
							}),
						}],
					}]} />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	deck: {
		position: 'absolute',
		top: 0, left: 0,
		width, height,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

Exponent.registerRootComponent(App);
