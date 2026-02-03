import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
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

export default function SignupScreen() {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image Section with Gradient Overlay */}
      <View style={{ height: "48%", position: "relative" }}>
        {/* Placeholder for hero image - replace with actual food image */}
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
          <Text style={{ fontSize: 60 }}>🥗</Text>
        </View>
        
        {/* Gradient Overlay - Culinea colors */}
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
          {/* Buttons Container */}
          <View>
            {/* Primary Button - Sign up with email */}
            <TouchableOpacity
              onPress={() => router.push("/onboarding")}
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
                Sign up with email
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
                or use social sign up
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
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: "#000000",
                  letterSpacing: 0.3,
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 10 }}>📘</Text>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: "#000000",
                  letterSpacing: 0.3,
                }}
              >
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 10 }}>🍎</Text>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: "#000000",
                  letterSpacing: 0.3,
                }}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer - Already have account */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Already have account?{" "}
              <Text
                onPress={() => router.push("/auth/login")}
                style={{
                  fontFamily: "Inter_600SemiBold",
                  textDecorationLine: "underline",
                  color: "#FFFFFF",
                }}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Home Indicator (iOS style) */}
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
