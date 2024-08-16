import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SurahScreen() {
   const {id} = useLocalSearchParams()

  return (
    <SafeAreaView style={{ backgroundColor: "#f1f1f1" }}>
      <Text>SurahScreen {id}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})