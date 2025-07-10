import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import  Feather  from "react-native-vector-icons/Feather";
import { Countries } from "../data/index";
const { width, height } = Dimensions.get("window");
const CountryPicker = ({
  modalVisible,
  onRequestClose,
  onPress,
  countryName,
}) => {
    console.log("🚀 ~ modalVisible123:", modalVisible)
    
  const [search, setSearch] = useState("");
  const Item = ({ title, flag, code }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress(title, flag, code)}
    > 
       
      <Image source={flag} style={styles.modalFlag} />
     
      <View style={styles.itemInner}>
        <Text style={styles.modalCountryName}>{title}</Text>
        <View
          style={[
            styles.radio,
            {
              borderColor: title === countryName ? "#000000" : "#94CAFE99",
            },
          ]}
        >
          {title === countryName && <View style={styles.radioInner} />}
        </View>
      </View>
    </TouchableOpacity>
  );
  const filterData = Countries.filter((itme) => {
    return itme.name?.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.centeredViewInner}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderInner}>
              <TouchableOpacity onPress={onRequestClose}>
                <Text style={styles.closeButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderHeading}>Select Country</Text>
              <Text style={{ color: "transparent" }}>Cancel</Text>
            </View>
            <View style={styles.searchMain}>
              <Feather name="search" size={22} color={'#000000'} />
              <TextInput
                placeholder="Search ..."
                placeholderTextColor={"#000000B2"}
                style={styles.searchInput}
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
            </View>
          </View>

          <View style={styles.modalDataMain}>
            <View>
              {filterData.length === 0 ? (
                <Text style={styles.noDataFound}>
                  No data found{" "}
                  <Text style={{ color: '#000000' }}>"{search}"</Text>
                </Text>
              ) : (
                <FlatList
                  data={filterData}
                  renderItem={({ item }) => (
                    <Item
                      title={item.name}
                      flag={item.flag}
                      code={item.callingCode}
                    />
                  )}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 12,
    color: '#0860FB',
  },
  centeredView: {
    height: height,
    width: width,
    backgroundColor: "#00000014",
    padding: 15,
    marginTop:35
  },
  centeredViewInner: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 10,
  },
  modalDataMain: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: '#000000',
    marginTop: 15,
  },
  itemInner: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderColor: "#0000004D",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  modalHeader: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#0860FB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeaderInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderHeading: {
    fontSize: 12,
    color: '#ffffff',
  },
  closeButton: {
    color: '#ffffff',
    opacity: 0.7,
    fontSize: 10,
  },
  searchMain: {
    backgroundColor: '#ffffff',
    height: 38,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  noDataFound: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 16,
    color: '#000000',
    marginTop: 30,
  },
  radio: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 20 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 10,
    width: 10,
    backgroundColor: '#000000',
    borderRadius: 10 / 2,
  },
  modalFlag: {
    width: 30,
    height: 30,
    borderRadius: 5,
    
  },
  modalCountryName: {
    color: '#000000',
    fontSize: 14,
    marginRight: 10,
    flex: 1,
  },
});
export default CountryPicker;
