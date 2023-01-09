import { useEffect, useRef } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Logo...
import Logo from '../assets/fedora.png'
import Home from './Home'

const BG_COLOR = '#4d4a95'

const SplashScreen = () => {

  // SafeArea Value...
  const edges = useSafeAreaInsets();

  // Animation Values...
  const startAnimation = useRef(new Animated.Value(0)).current;

  // Scaling down logo and title...
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  // Offset Animation...
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Animating content ...
  const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {

    // Starting Animation after 500ms...
    setTimeout(() => {

      // Parallel Animation...
      Animated.parallel([
        Animated.timing(startAnimation, {
          // use same height for non safe area devices...
          toValue: -Dimensions.get('window').height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          // scale to 0.3...
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          // scale to 0.8...
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          // move to right most corner...
          toValue: {
            x: (Dimensions.get('window').width / 2) - 35,
            y: (Dimensions.get('window').height / 2) - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          // move to center...
          toValue: {
            x: 0,
            // since image size is 100
            y: (Dimensions.get('window').height / 2) - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          // move to center...
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

    }, 500);
  }, [])

  // Going to move up like Nav Bar...
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <Animated.View style={{
        flex: 1,
        backgroundColor: BG_COLOR,
        zIndex: 1,
        transform: [
          { translateY: startAnimation }
        ],
      }}>
        <Animated.View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Animated.Image source={Logo} style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            transform: [
              { translateX: moveLogo.x },
              { translateY: moveLogo.y },
              { scale: scaleLogo }
            ],
          }} />

          <Animated.Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            transform: [
              { translateX: moveTitle.x },
              { translateY: moveTitle.y },
              { scale: scaleTitle }
            ],
          }}>Fedora</Animated.Text>

        </Animated.View>
      </Animated.View>

      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.04))',
        zIndex: 0,
        transform: [
          { translateY: contentTransition }
        ],
      }}>
        <Home />
      </Animated.View>
    </View>
  )
}

export default SplashScreen
