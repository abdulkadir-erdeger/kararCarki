import { View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SectionCard.styles";

const SectionCard = ({ dSection, onSection, setSectionText }) => {
  const [sectionText, onChangeSectionText] = useState();
  useEffect(() => {
    onChangeSectionText(setSectionText);
  }, [setSectionText]);
  const haydi = () => {
    onSection(sectionText);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      <TextInput
        style={styles.inputSection}
        placeholder="Seçeneğinizi giriniz..."
        value={sectionText}
        onChangeText={onChangeSectionText}
        onEndEditing={haydi}
      />
      <Ionicons
        style={styles.trashIcon}
        name="trash-bin"
        size={28}
        color="black"
        onPress={dSection}
      />
    </View>
  );
};

export default SectionCard;
