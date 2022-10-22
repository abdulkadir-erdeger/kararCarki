import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./SelectionScreen.styles";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SectionCard from "../../components/SectionCard";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const SelectionScreen = () => {
  const navigation = useNavigation();
  const [title, onChangeTitle] = useState("");
  const [sectionList, setSectionList] = useState(["", ""]);

  const addSectionList = (item, index) => {
    let oldData = sectionList;
    oldData[index] = item;
    setSectionList(oldData);
  };

  const addSection = () => {
    setSectionList([...sectionList, ""]);
  };

  const deleteSection = (i) => {
    if (sectionList.length > 2) {
      let newList = sectionList.filter((item, index) => index !== i);
      setSectionList(newList);
    }
  };

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

          <FlatList
            data={sectionList}
            renderItem={({ item, index }) => (
              <SectionCard
                dSection={() => deleteSection(index)}
                onSection={(item) => {
                  addSectionList(item, index);
                }}
                setSectionText={sectionList[index]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={() => addSection()}
                style={styles.listIncrementButton}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Karar", { title: title, list: sectionList })
        }
      >
        <Text style={styles.buttonTitle}>Hazır</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SelectionScreen;
