import 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { transform } from '@babel/core'

const ReAnimation = () => {

  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const rotateAnim = ()=>{
    'worklet'
    return `${progress.value*2*Math.PI}rad`;
  }

  const reanimatedstyle = useAnimatedStyle(()=>{
    return {
      opacity: progress.value,
      transform:[{scale:scale.value},{rotate: rotateAnim()}],
      borderRadius:progress.value*50
    }
  }, [])



  useEffect(() =>{
    progress.value = withRepeat(withSpring(0.5),-1,true);
    scale.value = withRepeat(withSpring(1),-1, true);
  },[])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Animated.View style={[{width:100.0, height:100.0, backgroundColor:'blue'}, reanimatedstyle]} />
    </View>
  )
}

export default ReAnimation