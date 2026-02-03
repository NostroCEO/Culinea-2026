import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from "react-native";
import { useTheme } from "@/utils/theme";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ChevronLeft } from "lucide-react-native";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    // TODO: Implement actual authentication
    router.push("/(tabs)/plan");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image Section with Gradient Overlay */}
      <View style={{ height: "35%", position: "relative" }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 60,
            left: 24,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.primaryLight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 60 }}>🍃</Text>
        </View>
        
        <LinearGradient
          colors={["transparent", colors.primary]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "60%",
          }}
        />
      </View>

      {/* Content Section */}
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}>
          <View>
            {/* Title */}
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 32,
                color: "#FFFFFF",
                marginBottom: 8,
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 32,
              }}
            >
              Log in to access your meal plans
            </Text>

            {/* Email Input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: 8,
                }}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: 8,
                }}
              >
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.4)"
                secureTextEntry
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 24 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                  textDecorationLine: "underline",
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: "#060606",
                borderRadius: 8,
                paddingVertical: 16,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                  letterSpacing: 0.3,
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                  marginHorizontal: 16,
                }}
              >
                or continue with
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              />
            </View>

            {/* Social Login Buttons */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24 }}>🔍</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24 }}>📘</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24 }}>🍎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer - Don't have account */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Don't have an account?{" "}
              <Text
                onPress={() => router.push("/auth/signup")}
                style={{
                  fontFamily: "Inter_600SemiBold",
                  textDecorationLine: "underline",
                  color: "#FFFFFF",
                }}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Home Indicator */}
      <View
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 134,
            height: 5,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
}
