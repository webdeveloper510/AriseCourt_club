import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import CourtItem from '../components/CourtItem';
import Feather from '@react-native-vector-icons/feather';
const MOCK_DATA = [
  {
    id: '1',
    name: 'Barrie North Winter Tennis',
    address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    id: '2',
    name: 'Dill Dinkers North Bethesda',
    address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    id: '3',
    name: 'North American Tennis League',
    address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
];

const SearchCourtScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredData = useMemo(() => {
    if (!searched || query.length < 4) return [];
    return MOCK_DATA.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, searched]);

  return (
    <View style={styles.container}>
      <CommonHeader title="Search Court" onBack={() => navigation.goBack()} />

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Organization ..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            setSearched(true);
            Keyboard.dismiss();
          }}
          style={styles.searchBtn}>
          <Feather name="search" color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.hintText}>Enter At Least 4 Characters</Text>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 16}}
        renderItem={({item}) => (
          <CourtItem
            item={item}
            selected={selectedItems.some(i => i.id === item.id)}
            onSelect={() => {
              setSelectedItems(prevSelected => {
                const exists = prevSelected.find(i => i.id === item.id);
                if (exists) {
                  return prevSelected.filter(i => i.id !== item.id); // unselect
                } else {
                  return [...prevSelected, item]; // select
                }
              });
            }}
          />
        )}
      />

      {filteredData.length > 0 && (
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchCourtScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
  },
  searchBtn: {
    backgroundColor: '#0066FF',
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  continueBtn: {
    backgroundColor: '#0066FF',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
