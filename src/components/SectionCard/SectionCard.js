import { View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SectionCard.styles";

const SectionCard = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      <TextInput
        style={styles.inputSection}
        placeholder="Seçeneğinizi giriniz..."
      />
      <Ionicons
        style={styles.trashIcon}
        name="trash-bin"
        size={28}
        color="black"
      />
    </View>
  );
};

export default SectionCard;
