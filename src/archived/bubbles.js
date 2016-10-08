import Exponent from 'exponent';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, Animated, 
	Image, Dimensions, TouchableOpacity, LayoutAnimation } from 'react-native';

const { width, height } = Dimensions.get('window');

const THUMBS = [
'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/csswizardry/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/rssems/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/felipenogs/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/shalt0ni/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/flamekaizar/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/itsjonq/128.jpg',
'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg'
];


class App extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    selectedIndex: -1,
	    scrollOffset: 0,
	  };
	}

	onPress(selectedIndex) {
		LayoutAnimation.easeInEaseOut();
		this.setState({ selectedIndex });
	}

	handleScroll(e) {
		this.setState({ scrollOffset: e.nativeEvent.contentOffset.x });
	}

	render() {
		const { selectedIndex, scrollOffset } = this.state;

		return (
			<View style={styles.container}>
				<View>
					<ScrollView style={styles.bubbles} horizontal={true} 
						onScroll={this.handleScroll.bind(this)} scrollEventThrottle={50}
					>
						<View style={styles.band}>
							{THUMBS.map((uri, i) => (
								<View key={i} style={[styles.thumbBg, (selectedIndex == i) && styles.selectedBg]}>
									<TouchableOpacity activeOpacity={0.9}
										onPress={this.onPress.bind(this, i)}
										style={[
											{ position: 'absolute', left: (bubbleSize + 8) * i + 8 }, 
											(selectedIndex == i) && { top: -220, left: scrollOffset }
										]}
									>
						        <Image style={[styles.img,(selectedIndex == i) && styles.selectedImg]} source={{ uri }} />
						      </TouchableOpacity>
					      </View>
							))}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const bubbleSize = 64;

const styles = StyleSheet.create({
	container: {
		height,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	bubbles: {
		height: 100,
		backgroundColor: '#f3f3f3',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc',
		overflow: 'visible',
	},
	band: {
		backgroundColor: 'purple',
		height: 100,
		width: (bubbleSize+16) * 12,
	},
  bubblePlaceholder: {
  	position: 'absolute',
  	top: 0, left: 0,
  	marginHorizontal: 8,
    width: bubbleSize,
    height: bubbleSize,
  },
  img: {
    width: bubbleSize,
    height: bubbleSize,
    borderRadius: bubbleSize/2,
  },
  selectedImg: {
  	transform: [{
  		scale: 0.7
  	}]
  },
  thumbBg: {
  	// width: 0,
  	// height: 0,
  	// backgroundColor: 'pink'
  },
  selectedBg: {
  	backgroundColor: 'pink',
  	// position: 'absolute',
  	top: -20, left: 0,
  	width, 
  	height: height + 20,
  }
});

Exponent.registerRootComponent(App);
