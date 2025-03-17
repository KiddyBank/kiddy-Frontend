import React, { useRef, useState } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../styles/main-kid.styles';

interface Media {
  url: string
  description: string
};

interface Game extends Media {
  image: string
}

interface VideoTypeChoice {
  displayText: string
  videos: Media[]
};

const games: Game[] = [
  {
    url: "https://www.financialfootball.com/", 
    description: "Financial Football",
    image: "https://www.financialfootball.com/assets/images/FF_1200x628.jpg"
  },
  {
    url: "https://flashmuseum.org/money-metropolis/", 
    description: "Money Metropolis",
    image: "https://flashmuseum.org/wp-content/uploads/2023/06/Money_Metropolis_logo.png"
  },
  {
    url: "https://tm4k.ala.org/games/money-trail/index.html", 
    description: "Money Trail",
    image: "https://infographicjournal.com/wp-content/uploads/2015/07/money-trail.jpg"
  },
  {
    url: "https://bizkids.com/games/", 
    description: "Bizkids",
    image: "https://image.pbs.org/contentchannels/Hkp9dLF-show-poster2x3-OnRPEWU.jpg"
  },
  {
    url: "https://coindexter.com/", 
    description: "Coin Dexter",
    image: "https://boostcafe.org/wp-content/uploads/2017/01/Coindexter.jpg"
  },
]

const savingsVideos: Media[] = [
  {
    url: "https://www.youtube.com/watch?v=NIUuHzsVCEI&ab_channel=%D7%94%D7%A9%D7%A7%D7%A2%D7%95%D7%AA%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D%D7%A2%D7%9D%D7%91%D7%95%D7%9C%D7%99", 
    description: "בולי, השור הכי מגניב בעיר מסביר: מהו כסף?"
  },
  {
    url: "https://www.youtube.com/watch?v=kWRXwe5Nq3M&ab_channel=%D7%A8%D7%A9%D7%95%D7%AA%D7%A9%D7%95%D7%A7%D7%94%D7%94%D7%95%D7%9F%2C%D7%91%D7%99%D7%98%D7%95%D7%97%D7%95%D7%97%D7%99%D7%A1%D7%9B%D7%95%D7%9F", 
    description: "משפחת שנקל מבינה שאם לא חוסכים בהתחלה בסוף לא נשאר מספיק..."
  },
  {
    url: "https://www.youtube.com/watch?v=UndnbJsfM78&ab_channel=%D7%A8%D7%A9%D7%95%D7%AA%D7%A9%D7%95%D7%A7%D7%94%D7%94%D7%95%D7%9F%2C%D7%91%D7%99%D7%98%D7%95%D7%97%D7%95%D7%97%D7%99%D7%A1%D7%9B%D7%95%D7%9F", 
    description: "משפחת שנקל מחנכת את הדור הבא להיות חסכנים ונבונים"
  },
  {
    url: "https://www.youtube.com/watch?v=YhVwuJoY3ic&ab_channel=HiliMood-%D7%94%D7%99%D7%9C%D7%99%D7%9E%D7%95%D7%93", 
    description: "מה זה כסף? ומאיפה הוא הגיע?"
  },
];

const wiseConsumerVideos: Media[] = [
  {
    url: "https://www.youtube.com/watch?v=572qL-uQ73Y&ab_channel=%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%94%D7%93%D7%A8%D7%9B%D7%94%D7%9C%D7%94%D7%95%D7%A8%D7%99%D7%9D%D7%95%D7%99%D7%9C%D7%93%D7%99%D7%9D%D7%A9%D7%9C%D7%AA%D7%99%D7%A7%D7%99%D7%AA%D7%94%7CTIKITA.CO.IL", 
    description: "משימת בלשים בסופר"
  },
  {
    url: "https://www.youtube.com/watch?v=k2XHCh7SL38&ab_channel=%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%94%D7%93%D7%A8%D7%9B%D7%94%D7%9C%D7%94%D7%95%D7%A8%D7%99%D7%9D%D7%95%D7%99%D7%9C%D7%93%D7%99%D7%9D%D7%A9%D7%9C%D7%AA%D7%99%D7%A7%D7%99%D7%AA%D7%94%7CTIKITA.CO.IL", 
    description: "דן מאוד אהב לקנות מותגים"
  },
  {
    url: "https://www.youtube.com/watch?v=ENC-YWYZvKA&ab_channel=ORTIsrael", 
    description: "שלבים בתהליך קנייה נכונה"
  },
];

const moneySystemsVideos: Media[] = [
  {
    url: "https://www.youtube.com/watch?v=pIiPOo_fIz8&ab_channel=%D7%94%D7%A9%D7%A7%D7%A2%D7%95%D7%AA%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D%D7%A2%D7%9D%D7%91%D7%95%D7%9C%D7%99", 
    description: "הצטרפו לבולי, השור המגניב, למסע מרתק בעולם הבנקים והריבית! "
  },
  {
    url: "https://www.youtube.com/watch?v=ADKMARYFy_E&ab_channel=HiliMood-%D7%94%D7%99%D7%9C%D7%99%D7%9E%D7%95%D7%93", 
    description: "מה זה בנק? מה זו הלוואה? ומה זה ריבית?"
  },
  {
    url: "https://www.youtube.com/watch?v=cs9lPymYPwM&ab_channel=%D7%9E%D7%98%D7%97%D7%94%D7%9E%D7%A8%D7%9B%D7%96%D7%9C%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94%D7%97%D7%99%D7%A0%D7%95%D7%9B%D7%99%D7%AA", 
    description: "חינוך פיננסי - הלוואות"
  },
  // {
  //   url: "https://www.youtube.com/watch?v=FBGZ0Y8nzfc&ab_channel=%D7%90%D7%9E%D7%99%D7%AA%D7%99%D7%94%D7%9E%D7%A1%D7%A4%D7%A8", 
  //   description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Adipiscing mattis volutpat suscipit duis sagittis nisl torquent commodo blandit nisi aliquam a."
  // },
];

const financialManagementVideos: Media[] = [
  {
    url: "https://www.youtube.com/watch?v=1i-H1Zr_k-M&ab_channel=%D7%9E%D7%99%D7%98%D7%91%D7%91%D7%99%D7%AA%D7%94%D7%A9%D7%A7%D7%A2%D7%95%D7%AA", 
    description: "הקשר בין הכנסות והוצאות, הקשר בין הכנסה ועבודה ואיך מנהלים תקציב"
  },
  {
    url: "https://www.youtube.com/watch?v=qZtOtsSnE0Y&ab_channel=HiliMood-%D7%94%D7%99%D7%9C%D7%99%D7%9E%D7%95%D7%93", 
    description: "מהי כלכלה? עסקאות ושווקים."
  },
  {
    url: "https://www.youtube.com/watch?v=89-ELno5Bgc&ab_channel=PilAnimation%D7%A4%D7%99%D7%9C%D7%90%D7%A0%D7%99%D7%9E%D7%A6%D7%99%D7%94", 
    description: "האוצר של משפחת שנקל - ניהול תקציב"
  },
];

const jobAndTaxesVideos: Media[] = [
  {
    url: "https://www.youtube.com/watch?v=EKP_T2IUXp0&list=PLRg1yDs6QuzI4417Enu7Yta0gXEMu9vn0&index=3&ab_channel=HiliMood-%D7%94%D7%99%D7%9C%D7%99%D7%9E%D7%95%D7%93", 
    description: "מה זו עבודה? ואיזה סוגי עבודות יש?"
  },
  {
    url: "https://www.youtube.com/watch?v=-h9cgKnjniY&list=PLRg1yDs6QuzI4417Enu7Yta0gXEMu9vn0&index=4&ab_channel=HiliMood-%D7%94%D7%99%D7%9C%D7%99%D7%9E%D7%95%D7%93", 
    description: "מה זה עסק? מה זה סניף? ומה זה רשת?"
  },
  {
    url: "https://www.youtube.com/watch?v=qyCXpr-ZDhE&ab_channel=EasyPeasyFinance", 
    description: "מהם מיסים?"
  },
  {
    url: "https://www.youtube.com/watch?v=rAhobLacBrs&ab_channel=Hey%21GuessWhat", 
    description: "איך מיסים עובדים? ועובדות נוספות"
  },
];

const videoTypesChoices: VideoTypeChoice[] = [
  {displayText: "חיסכון", videos: savingsVideos},
  {displayText: "צריכה נבונה", videos: wiseConsumerVideos},
  {displayText: "הלוואות,בנק ופיקדונות", videos: moneySystemsVideos},
  {displayText: "התנהלות כלכלית נכונה", videos: financialManagementVideos},
  {displayText: "עבודה ומיסים", videos: jobAndTaxesVideos},
];

async function openLink(url: string) {
  await Linking.openURL(url);
}

function getYoutubeThumbnail(url: string, quality?: string){
  if(url){
      let video_id, thumbnail, result;
      if(result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))
      {
          video_id = result.pop();
      }
      else if(result = url.match(/youtu.be\/(.{11})/))
      {
          video_id = result.pop();
      }

      if(video_id){
          if(typeof quality == "undefined"){
              quality = 'high';
          }
      
          let quality_key = 'maxresdefault';
          if(quality == 'low'){
              quality_key = 'sddefault';
          }else if(quality == 'medium'){
              quality_key = 'mqdefault';
          } else if (quality == 'high') {
              quality_key = 'hqdefault';
          }

          thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
          return thumbnail;
      }
  }
  return "";
}

export default function GameScreen() {
  const [chosenVideosType, setChosenVideosType] = useState(videoTypesChoices[0])
  const pickerRef = useRef();

  function open() {
    // @ts-ignore
    pickerRef.current.focus();
  }

  function close() {
    // @ts-ignore
    pickerRef.current.blur();
  }


  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.header}>סרטונים</Text>
      <SelectDropdown
        data={videoTypesChoices}
        defaultValue={videoTypesChoices[0]}
        onSelect={(selectedItem) => {
          setChosenVideosType(selectedItem);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={pageStyles.dropdownButtonStyle}>
              <Text style={pageStyles.dropdownButtonTxtStyle}>
                {selectedItem?.displayText}
              </Text>
            </View>
          );
        }}
        renderItem={(item, _, isSelected) => {
          return (
            <View style={{...pageStyles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={pageStyles.dropdownItemTxtStyle}>{item.displayText}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={pageStyles.dropdownMenuStyle}
      />
      <ScrollView horizontal>
        {chosenVideosType.videos.map(video => 
          <TouchableOpacity key={video.url} style={pageStyles.card} onPress={() => openLink(video.url)}>
            <Image style={pageStyles.stretch} source={{
              uri: getYoutubeThumbnail(video.url, 'low')
            }}/>
            <Text style={pageStyles.videoDescription}>{video.description}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Text style={pageStyles.header}>משחקים</Text>
      <ScrollView horizontal>
        {games.map(game => 
          <TouchableOpacity key={game.url} style={pageStyles.card} onPress={() => openLink(game.url)}>
            <Image style={pageStyles.stretch} source={{
              uri: game.image,
            }}/>
            <Text style={pageStyles.gameTitle}>{game.description}</Text>
            <View style={pageStyles.gamePlayButton}>
              <Text style={pageStyles.gameButtonText}>Play</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingTop: 30
  },
  header: {
    ...styles.sectionTitle,
    marginTop: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    width: 200,
    margin: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  videoDescription: {
    fontWeight: "bold"
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#3F51B5",
  },
  gamePlayButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#3F51B5",
    borderRadius: 20,
    display: "flex",
    alignItems: "center"
  },
  gameButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30
  },
  stretch: {
    width: "100%",
    borderRadius: 20,
    height: 130,
    resizeMode: 'stretch',
  },
  dropdownButtonStyle: {
    width: "70%",
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    direction: 'rtl',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    direction: 'rtl',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
