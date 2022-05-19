import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const PanReAnim = () => {

    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const reanimatedstyle = useAnimatedStyle(()=>{
        return {
            transform:[{translateX:x.value},{translateY:y.value}]
        }
    },[])

    type context = {
        x:number,
        y:number
    }

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, context>({
        onStart:(event, ctx)=>{
            ctx.x=x.value,
            ctx.y=y.value
        },
        onActive:(event, ctx)=>{
            x.value=event.translationX + ctx.x,
            y.value=event.translationY + ctx.y
        },
        onEnd:(event, ctx)=>{
            const dist= Math.sqrt(x.value**2 + y.value**2)
            if(dist<200){
                x.value = withSpring(0),
                y.value = withSpring(0)
            }
        }
    })

  return (
    <View style={[{flex:1},styles.center]}>
        <View style={[styles.circle, styles.center]}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.square, reanimatedstyle]}/>
            </PanGestureHandler>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    square:{
        width:80,
        height:80,
        backgroundColor:'blue',
        borderRadius:20,
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    circle:{
        width:320,
        height:320,
        borderRadius:160,
        borderColor:'blue',
        borderWidth:5,
        opacity:0.5
    }
})

export default PanReAnim