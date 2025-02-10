import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { deletePlace, fetchPlaceWithId } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.lat,
      initialLng: fetchedPlace.lng,
    });
  }

  function handleDeletePlace() {
    deletePlace(fetchedPlace.id);
    navigation.navigate("AllPlaces");
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const selectedPlace = await fetchPlaceWithId(selectedPlaceId);

      setFetchedPlace(selectedPlace);
      navigation.setOptions({
        title: selectedPlace.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.btnContainer}>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on map
          </OutlinedButton>
          <OutlinedButton
            icon="trash"
            textColor="#DC4C3E"
            onPress={handleDeletePlace}
          >
            Delete Place
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  addressContainer: {
    padding: 20,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: "row",
    gap: 15,
  },
});
