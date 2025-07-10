import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ size = 45, strokeWidth = 5, progress = 0, color = '#0066FF' }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={size / 2} originY={size / 2}>
          <Circle
            stroke="#E0E0E0"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <AnimatedCircle
            stroke={color}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};

export default CircularProgress;
