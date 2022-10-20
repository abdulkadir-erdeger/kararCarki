import {
  View,
  Text as RNText,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Svg, { Path, G, TSpan, Text } from "react-native-svg";
import * as d3Shape from "d3-shape";
import { Feather } from "@expo/vector-icons";

import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get("screen");

const Wheel = ({ options }) => {
  const wheelOpacity = useRef(new Animated.Value(1)).current;
  const gameScreen = useRef(new Animated.Value(width - 40)).current;
  const angleX = useRef(new Animated.Value(0)).current;

  const [angle, setAngle] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const Rewards = options.rewards;

  const numberOfSegments = options.rewards.length;
  const fontSize = 20;
  const oneTurn = 360;
  const angleBySegment = oneTurn / numberOfSegments;
  const angleOffset = angleBySegment / 2;
  const [winner, setWinner] = useState(null);

  const makeWheel = () => {
    const data = Array.from({ length: numberOfSegments }).fill(1);
    const arcs = d3Shape.pie()(data);
    const colors = options.colors
      ? options.colors
      : [
          "#E07026",
          "#E8C22E",
          "#ABC937",
          "#4F991D",
          "#22AFD3",
          "#5858D0",
          "#7B48C8",
          "#D843B9",
          "#E23B80",
          "#D82B2B",
        ];

    return arcs.map((arc, index) => {
      const instance = d3Shape
        .arc()
        .padAngle(0.01)
        .outerRadius(width / 2)
        .innerRadius(options.innerRadius || 100);

      return {
        path: instance(arc),
        color: colors[index % colors.length],
        value: Rewards[index],
        centroid: instance.centroid(arc),
      };
    });
  };
  const _wheelPaths = makeWheel();
  const _angle = useRef(new Animated.Value(0)).current;

  const resetWheelState = () => {
    setEnabled(false);
    setStarted(false);
    setFinished(false);
    setWinner(null);
    _angle.setValue(0);
    wheelOpacity.setValue(1);
    gameScreen.setValue(width - 40);
  };

  const angleListener = () => {
    _angle.addListener((event) => {
      if (enabled) {
        setEnabled(false);
        setFinished(false);
      }
      //setAngle(event.value);
      angleX.setValue(event.value);
    });
  };

  useEffect(() => {
    angleListener();
  }, []);

  const _textRender = (x, y, number, i) => {
    return (
      <Text
        x={x - number.length * 5}
        y={y - 70}
        fill={options.textColor ? options.textColor : "#fff"}
        textAnchor="middle"
        fontSize={fontSize}
      >
        {Array.from({ length: number.length }).map((_, j) => {
          if (options.textAngle === "vertical") {
            return (
              <TSpan x={x} dy={fontSize} key={`arc-${i}-slice-${j}`}>
                {number.charAt(j)}
              </TSpan>
            );
          } else {
            return (
              <TSpan
                y={y - 10}
                dx={fontSize * 0.07}
                key={`arc-${i}-slice-${j}`}
              >
                {number.charAt(j)}
              </TSpan>
            );
          }
        })}
      </Text>
    );
  };

  const _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {_renderKnob()}
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                rotate: _angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`],
                }),
              },
            ],
            backgroundColor: options.backgroundColor
              ? options.backgroundColor
              : "#fff",
            width: width - 20,
            height: width - 20,
            borderRadius: (width - 20) / 2,
            borderWidth: options.borderWidth ? options.borderWidth : 2,
            borderColor: options.borderColor ? options.borderColor : "#fff",
            opacity: wheelOpacity,
          }}
        >
          {winner && (
            <TouchableOpacity
              onPress={() => _tryAgain()}
              style={{
                width: 80,
                height: 80,
                backgroundColor: "black",
                position: "absolute",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Feather name="refresh-ccw" size={35} color="white" />
            </TouchableOpacity>
          )}

          <AnimatedSvg
            width={gameScreen}
            height={gameScreen}
            viewBox={`0 0 ${width} ${width}`}
            style={{
              transform: [{ rotate: `-${angleOffset}deg` }],
              margin: 10,
            }}
          >
            <G y={width / 2} x={width / 2}>
              {_wheelPaths.map((arc, i) => {
                const number = arc.value.toString();
                const [x, y] = arc.centroid;

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      {_textRender(x, y, number, i)}
                    </G>
                  </G>
                );
              })}
            </G>
          </AnimatedSvg>
        </Animated.View>
      </View>
    );
  };

  const _getWinnerIndex = () => {
    let x = Number(JSON.stringify(angleX));
    const deg = Math.abs(Math.round(x % oneTurn));

    if (x < 0) {
      return Math.floor(deg / angleBySegment);
    }
    return (
      (numberOfSegments - Math.floor(deg / angleBySegment)) % numberOfSegments
    );
  };

  const _tryAgain = () => {
    resetWheelState();
  };

  const _renderKnob = () => {
    const knobSize = options.knobSize ? options.knobSize : 20;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(_angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: "flex-end",
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  "0deg",
                  "0deg",
                  "35deg",
                  "-35deg",
                  "0deg",
                  "0deg",
                ],
              }),
            },
          ],
        }}
      >
        <Svg
          style={{ transform: [{ translateY: 18 }] }}
          width={50}
          height={(50 * 100) / 57}
          viewBox={"0 0 297 100"}
        >
          <Path
            fill="#000"
            d="M 148.5 0 C 87.43 0 37.747 49.703 37.747 110.797 c 0 91.026 99.729 179.905 103.976 183.645 c 1.936 1.705 4.356 2.559 6.777 2.559 c 2.421 0 4.841 -0.853 6.778 -2.559 c 4.245 -3.739 103.975 -92.618 103.975 -183.645 C 259.253 49.703 209.57 0 148.5 0 Z M 148.5 79.693 c 16.964 0 30.765 13.953 30.765 31.104 c 0 17.151 -13.801 31.104 -30.765 31.104 c -16.964 0 -30.765 -13.953 -30.765 -31.104 C 117.735 93.646 131.536 79.693 148.5 79.693 Z"
          />
        </Svg>
      </Animated.View>
    );
  };

  const _renderWinner = () => {
    return (
      <RNText style={{ fontSize: 32, position: "absolute", bottom: 10 }}>
        Kazanan : {winner}
      </RNText>
    );
  };

  const onPan = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { velocityY } = nativeEvent;

      Animated.decay(_angle, {
        velocity: velocityY / 1000,
        deceleration: 0.997,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const winnerIndex = _getWinnerIndex();
          setEnabled(true);
          setFinished(true);
          setWinner(_wheelPaths[winnerIndex].value);
        }
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onHandlerStateChange={onPan} enabled={!enabled}>
        <View style={styles.container}>
          <View
            style={{
              width: width,
              height: height / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View style={[styles.content, { padding: 10 }]}>
              {_renderSvgWheel()}
            </Animated.View>
          </View>
          {winner && _renderWinner()}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Wheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
