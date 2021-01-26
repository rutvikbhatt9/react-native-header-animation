import React, {Component} from 'react'
import {Animated, Easing} from 'react-native'

export default class MaterialAnimatedView extends Component {

    constructor(props) {
        super(props);
        this.left = [];
        this.top = [];
        this.opacity = [];
    }

    componentWillMount() {
        this.left[this.getAnimatedValue(this.props.index)] = new Animated.Value(0);
        this.top[this.getAnimatedValue(this.props.index)] = new Animated.Value(1000);
        this.opacity[this.getAnimatedValue(this.props.index)] = new Animated.Value(0);
        this.startAnimation(this.props.index)
    }

    getAnimatedValue = (id) => {
        return "id_" + id;
    };

    startAnimation = (i) => {
        this.parallel = Animated.parallel([
            Animated.timing(this.left[this.getAnimatedValue(i)], {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(this.top[this.getAnimatedValue(i)], {
                toValue: 0,
                duration: 1000,
                delay: i * 10,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic)
            }),
            Animated.timing(this.opacity[this.getAnimatedValue(i)], {
                toValue: 1,
                duration: 1000,
                delay: i * 30,
                useNativeDriver: true
            })
        ]).start();

    };

    render() {
        return (
            <Animated.View key={this.props.index.toString()}
                           style={[this.props.style, {
                               transform: [
                                   {
                                       translateX: this.left[this.getAnimatedValue(this.props.index)]
                                   },
                                   {
                                       translateY: this.top[this.getAnimatedValue(this.props.index)]
                                   }
                               ]
                           }]}>
                {this.props.children}
            </Animated.View>
        )
    }
}