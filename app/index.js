import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image style={styles.logo} source={require("./assets/UOL-logo.png")} />
        <Text style={styles.title}>The University of Lahore</Text>
        <Text style={styles.subtitle}>AttenedMe</Text>
      </View>
      <View style={{ flex: 1, justifyContent:"flex-end" }} >
        <Link style={styles.buttonContainer} href={"/login"} >Login</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 2,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#38434D",
  },
  buttonContainer: {
    fontSize: 18,
    backgroundColor: "yellowgreen",
    color: "#fff",
    borderRadius: 30,
    width: 250,
    height: 45,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 5,
    paddingVertical: 10
  }
});