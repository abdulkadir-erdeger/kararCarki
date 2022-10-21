import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./SelectionScreen.styles";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SectionCard from "../../components/SectionCard";
import { useNavigation } from "@react-navigation/native";

const SelectionScreen = () => {
  const navigation = useNavigation();
  const [title, onChangeTitle] = useState("");
  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Başlık</Text>
          <TextInput
            placeholder="Hangi konuda seçim yapmak istiyorsunuz?"
            value={title}
            onChangeText={onChangeTitle}
            style={styles.inputTitle}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>
            Seçenekler -
            <Text
              style={{ fontSize: 15, fontStyle: "italic", color: "lightgrey" }}
            >
              {" "}
              (En az 2 / En Çok 50)
            </Text>
          </Text>

          <FlatList data={[1, 1]} renderItem={({ item }) => <SectionCard />} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Karar")}
      >
        <Text style={styles.buttonTitle}>Hazır</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SelectionScreen;
