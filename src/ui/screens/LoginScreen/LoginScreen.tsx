import { useNavigation } from "@react-navigation/native";
import { useSupabase } from "../../../utils/supabase";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Input } from "react-native-elements";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInTapped = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mt-40 p-12">
        <View className="py-4 self-stretch mt-20">
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View className="py-4 self-stretch">
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View className="py-4 self-stretch mt-20">
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => onSignInTapped()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
