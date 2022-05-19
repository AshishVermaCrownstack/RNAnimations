import React, { useRef, useState } from 'react'

import {
    Animated,
    Button,
    PanResponder,
    View,
  } from 'react-native';

const Animation = () => {

  // const animValue = useState(new Animated.ValueXY())[0];

  const opac = useRef(new Animated.Value(0)).current;

  // function moveBall(){
  //   Animated.timing(animValue,{
  //     toValue:100,
  //     duration:3000,
  //     useNativeDriver:true
  //   }).start()
  // }

  function fadeIn(){
    Animated.timing(opac,{
      toValue:1,
      duration:4000,
      useNativeDriver:true
    }).start()
  }

  // function fadeOut(){
  //   Animated.timing(opac,{
  //     toValue:0,
  //     duration:4000,
  //     useNativeDriver:true
  //   }).start()
  // }

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Animated.View style={[{
          alignItems:'center',
          backgroundColor:'green',
          width:100,
          height:100,
          borderRadius:100/2,
          transform:[{translateX:pan.x},{translateY:pan.y}],
          // opacity:opac
        }]}{...panResponder.panHandlers} />
      {/* <Button title='Click to Move Left' onPress={moveBall}/> */}
      {/* <Button title='Click to Fade In' onPress={fadeIn}/> */}
      {/* <Button title='Click to Fade Out' onPress={fadeOut}/> */}
    </View>
  );
}

export default Animation;


// 