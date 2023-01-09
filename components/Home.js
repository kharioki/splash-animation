import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Gallery ..
import Locs from '../assets/locs.png'
import Date from '../assets/date.jpg'
import Selfie from '../assets/selfie.jpg'

const Home = () => {

  const edges = useSafeAreaInsets();

  return (
    <View>
      <ScrollView>
        <View style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: (edges.top + 65),
          paddingBottom: 25,
        }}>
          {
            [Locs, Date, Selfie].map((image, index) => {
              return (
                <Image
                  key={index}
                  source={image}
                  style={{
                    width: Dimensions.get('window').width - 30,
                    height: 250,
                    borderRadius: 15,
                    marginTop: 15,
                  }}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
