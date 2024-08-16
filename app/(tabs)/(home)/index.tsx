import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Surah = {
  id: number;
  nomor: String;
  namaLatin: string;
  nama: string;
  tempatTurun: string;
};
export default function App() {
  const [surah, setSurah] = useState<Surah[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setLoading] = useState(true);

  const getSurah = async () => {
    try {
      const response = await fetch("https://equran.id/api/v2/surat");
      const json = await response.json();
      setSurah(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentTime(hours + ":" + min);
    getSurah();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#f1f1f1" }}>
      <Animated.View style={styles.header}>
        <Image
          style={styles.bgImage}
          source={require("@/assets/images/masjid.png")}
        />
        <Text style={styles.textHeader}>E Quran - Indonesia</Text>
        <Text style={styles.timeHeader}>{currentTime}</Text>
        <Text style={styles.basmallah}>السلام عليكم ورحمة الله وبركاته</Text>
      </Animated.View>

      <ScrollView>
      <View style={[styles.container, {marginTop: 14}]}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={surah}
                keyExtractor={(item) => item.nama}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {router.push(`/surah/${item.nomor}`)}} style={styles.card}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text>{item.nomor}</Text>
                      <View>
                        <Text>{item.namaLatin}</Text>
                        <Text>{item.tempatTurun}</Text>
                      </View>
                      <Text style={{ marginLeft: "auto" }}>{item.nama}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    height: 230,
    width: "100%",
    zIndex: 1,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    backgroundColor: "#00B5AA",
    overflow: "hidden",
  },
  textHeader: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    marginTop: 48,
  },
  timeHeader: {
    fontSize: 48,
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
  basmallah: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    marginTop: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#00B5AA",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
