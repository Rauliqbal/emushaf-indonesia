import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

type Surah = {
  id: number;
  nomor: String;
  namaLatin: string;
  nama: string;
  tempatTurun: string;
  arti: string;
  jumlahAyat: number
};
export default function SurahScreen() {
   const {id} = useLocalSearchParams()
   const [surah,setSurah] = useState<Surah>()
   const [loading,setLoading] = useState(true)

   const getDetail = async () =>{
    try {
      const response = await fetch('https://equran.id/api/v2/surat/'+ id)
      const json = await response.json()
      setSurah(json.data)
    } catch (error) {
      console.error(error)
    } finally  {
      setLoading(false);
    }
   }

   useEffect(()=> {
    getDetail()
   },[])

  return (
    <SafeAreaView style={{ backgroundColor: "#f1f1f1" }}>
      
      {loading  ? (
        <ActivityIndicator/> 
      ): (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image
          style={styles.bgImage}
          source={require("@/assets/images/masjid.png")}
        />
          <View style={styles.wrapper}>
          <View  style={styles.noWrap}>
          <Text style={styles.nomor}>{surah?.nomor}</Text>
          </View>

          <Text style={styles.nama}>{surah?.namaLatin}</Text>
          <Text style={styles.arti}>{surah?.arti}</Text>

          <View style={{flexDirection: 'row', alignItems:'center',gap: 5, marginTop:12}}>
          <Text style={{fontSize: 10, color: 'white',fontWeight: '300'}}>{surah?.tempatTurun}</Text>
          <Text style={{color: 'white',fontWeight: '300'}}>-</Text>
          <Text style={{fontSize: 10, color: 'white',fontWeight: '300'}}>{surah?.jumlahAyat} Ayat</Text>

          </View>
          </View>
        </View>
      </View>
      
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16
 },
 header: {
  backgroundColor: "#00B5AA",
  height: 140,
  borderRadius: 12,
  overflow: 'hidden',
  elevation: 20,
  shadowColor: '#52006A',
 },
 wrapper: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 bgImage: {
  flex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
},
noWrap: {
  alignItems: 'center',
  justifyContent: 'center',
  width:26,
  height:26,
  borderWidth: 2,
  borderColor: 'white',
  borderRadius: 1000
 },
nomor: {
  fontSize: 14,
  color: 'white',
  fontWeight: '700',
 },
 nama: {
  fontSize: 24,
  color: 'white',
  fontWeight: '700',
  marginTop: 8
 },
 arti: {
  fontSize: 14,
  color: 'white',
  fontWeight: '300',
  
 }
})